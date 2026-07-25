/**
 * PM2 process definition for the Hostinger VPS.
 *
 * PM2 keeps the Next.js server running, restarts it if it crashes, and
 * brings it back up after a reboot. Start it with:
 *
 *   pm2 start ecosystem.config.cjs
 *
 * Next is invoked directly rather than through `npm start` so PM2 can
 * signal the actual server process — going via npm leaves an extra
 * shell in between, which swallows the stop and reload signals.
 */
module.exports = {
  apps: [
    {
      name: "veyro",
      script: "./node_modules/next/dist/bin/next",
      args: "start --port 3000",
      interpreter: "node",

      /* One instance is ample. Every page on this site is prerendered
         static HTML, so the server is doing almost nothing per request
         and a second process would only duplicate memory. */
      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      /* Restart if it leaks past this, rather than letting the VPS
         start swapping. */
      max_memory_restart: "400M",

      /* Never restart-loop a build that cannot boot. */
      min_uptime: "20s",
      max_restarts: 10,
      restart_delay: 3000,

      autorestart: true,
      watch: false,

      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
