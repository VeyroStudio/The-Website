# Deploying VEYRO to a Hostinger VPS

The site is a Next.js app, so it needs Node running on the server. A VPS
gives you that. Nginx answers the internet on ports 80/443 and hands
requests to Next on port 3000; PM2 keeps Next alive and restarts it after
a reboot.

Do this once. After that, deploying an update is four commands — see
[Updating the site](#updating-the-site) at the bottom.

---

## 1. Point the domain at the VPS

In your domain's DNS, create two **A records** pointing at the VPS IP
address (Hostinger shows it on the VPS overview page):

| Type | Name | Value |
|---|---|---|
| A | `@` | your VPS IP |
| A | `www` | your VPS IP |

DNS can take anything from ten minutes to a few hours. Everything below
works before it has propagated except the SSL step, which needs the
domain resolving.

---

## 2. Connect and secure the server

```bash
ssh root@YOUR_VPS_IP
```

```bash
apt update && apt upgrade -y
apt install -y ufw git curl
ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw --force enable
```

Working as `root` is fine for a single-app box. If you would rather not,
create a user with `adduser veyro && usermod -aG sudo veyro` and prefix
the commands below with `sudo`.

---

## 3. Install Node

Node 22 LTS, via nvm so upgrading later is painless:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
nvm alias default 22
node -v      # expect v22.x
```

---

## 4. Get the code

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/VeyroStudio/The-Website.git veyro
cd veyro/veyro-site
```

The repository holds both the site and the brand assets — the app itself
lives in `veyro-site/`, which is where everything below runs.

---

## 5. Set the environment

```bash
cp .env.example .env.local
nano .env.local
```

Fill in the form endpoint. **Register the key against
`ethan@veyrostudio.co.uk`** or enquiries will go to the wrong inbox —
both providers deliver to whichever address the key belongs to.

Save with `Ctrl+O`, `Enter`, then `Ctrl+X`.

`.env.local` is git-ignored, so it stays on the server and never reaches
GitHub.

---

## 6. Install and build

```bash
npm ci
npm run build
```

`npm ci` installs exactly what the lockfile specifies — use it rather
than `npm install` on a server, so a deploy can never quietly pull a
different version of something.

Check it boots before wiring anything else up:

```bash
npm start
```

Visit `http://YOUR_VPS_IP:3000`. If the site loads, stop it with
`Ctrl+C` and carry on.

---

## 7. Keep it running with PM2

```bash
npm install -g pm2
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup        # prints one more command — run it, that survives reboots
```

Useful afterwards:

```bash
pm2 status         # is it up?
pm2 logs veyro     # live logs
pm2 reload veyro   # restart with no downtime
```

---

## 8. Put Nginx in front

```bash
apt install -y nginx
cp /var/www/veyro/deploy/nginx-veyrostudio.conf /etc/nginx/sites-available/veyrostudio
ln -s /etc/nginx/sites-available/veyrostudio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

`nginx -t` tests the config. **If it reports an error, fix it before
reloading** — reloading a broken config takes the site down.

The site should now answer on `http://veyrostudio.co.uk`.

---

## 9. Add SSL

Only once the domain resolves to the VPS:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d veyrostudio.co.uk -d www.veyrostudio.co.uk
```

Choose the redirect option when asked, so HTTP traffic is sent to HTTPS.
Certbot edits the Nginx config for you and renews automatically; confirm
renewal works with `certbot renew --dry-run`.

---

## Updating the site

After pushing changes to GitHub:

```bash
cd /var/www/veyro && git pull
cd veyro-site && npm ci && npm run build && pm2 reload veyro
```

`pm2 reload` swaps the process without dropping requests.

---

## If something breaks

| Symptom | Where to look |
|---|---|
| 502 Bad Gateway | Next isn't running. `pm2 status`, then `pm2 logs veyro`. |
| Changes not showing | The build didn't run. `npm run build && pm2 reload veyro`. |
| Enquiries not arriving | `.env.local` missing or the key is registered to the wrong inbox. Rebuild after changing it — `NEXT_PUBLIC_*` values are baked in at build time. |
| Site down after reboot | `pm2 startup` was never completed. Run it again and follow the command it prints. |
| Nginx won't reload | `nginx -t` will name the file and line. |

---

## A note on the form

`NEXT_PUBLIC_FORM_ENDPOINT` and `NEXT_PUBLIC_WEB3FORMS_KEY` are compiled
into the client bundle at build time, not read at runtime. **Changing
`.env.local` does nothing until you rebuild.** That is also why they are
public values — never put anything genuinely secret behind a
`NEXT_PUBLIC_` name.
