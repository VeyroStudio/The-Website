/**
 * VEYRO logo system.
 *
 * The mark is an asymmetric V — the right arm overshoots where a V would
 * stop and keeps climbing. It reads as a letterform and as an upward
 * vector at the same time. The final segment carries the brass accent.
 *
 * The wordmark is drawn as geometric monoline paths rather than set in a
 * webfont, so it renders identically with no font loaded, carries no font
 * licence, and never shifts on a slow connection.
 *
 * Geometry is shared between the standalone mark and the lockup so the
 * two can never drift apart. The overshoot carries the amber accent.
 */

type Props = {
  className?: string;
  /** Single colour throughout — for one-colour print, embroidery, favicons. */
  mono?: boolean;
  /** Accessible name. Pass null for a decorative instance. */
  title?: string | null;
};

const ACCENT = "#D9822B";

const MARK_STROKE = 11;
const MARK_PATH = "M10 22 L44 76 L90 10";
const MARK_ACCENT = "M74.8 31.8 L90 10";

const WORD_STROKE = 8;

function MarkPaths({ mono }: { mono: boolean }) {
  return (
    <>
      <path
        d={MARK_PATH}
        stroke="currentColor"
        strokeWidth={MARK_STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      {!mono && (
        <path
          d={MARK_ACCENT}
          stroke={ACCENT}
          strokeWidth={MARK_STROKE}
          strokeLinecap="butt"
        />
      )}
    </>
  );
}

function WordPaths() {
  return (
    <>
      {/* V */}
      <path d="M10 18 L36 82 L62 18" />
      {/* E */}
      <path d="M128 18 L84 18 L84 82 L128 82" />
      <path d="M84 50 L120 50" />
      {/* Y */}
      <path d="M150 18 L176 48 L202 18" />
      <path d="M176 48 L176 82" />
      {/* R */}
      <path d="M224 82 L224 18 L252 18 A16 16 0 0 1 252 50 L224 50" />
      <path d="M248 50 L272 82" />
      {/* O */}
      <ellipse cx="320" cy="50" rx="28" ry="32" />
    </>
  );
}

function a11y(title: string | null | undefined) {
  return title
    ? ({ role: "img" as const, "aria-label": title })
    : ({ role: "presentation" as const, "aria-hidden": true as const });
}

/** Symbol only. Use where VEYRO is already named — favicons, avatars, seals. */
export function Mark({ className, mono = false, title = "VEYRO" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <MarkPaths mono={mono} />
    </svg>
  );
}

/** Wordmark only. Use where the mark appears separately on the same surface. */
export function Wordmark({ className, title = "VEYRO" }: Props) {
  return (
    <svg
      viewBox="0 0 358 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={WORD_STROKE}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <WordPaths />
    </svg>
  );
}

/** Primary horizontal lockup. The default identity. */
export function Logo({ className, mono = false, title = "VEYRO" }: Props) {
  return (
    <svg
      viewBox="0 0 311 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y(title)}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(0 17.7) scale(0.7)">
        <MarkPaths mono={mono} />
      </g>
      <g
        transform="translate(88.5 19) scale(0.62)"
        stroke="currentColor"
        strokeWidth={WORD_STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <WordPaths />
      </g>
    </svg>
  );
}

export default Logo;
