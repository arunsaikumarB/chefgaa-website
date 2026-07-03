import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

/**
 * Filled blue pill — the only chromatic button in the system.
 * Use at most once per section.
 */
export function PrimaryButton({
  to,
  href,
  onClick,
  type = "button",
  children,
  disabled,
  className = "",
}: PrimaryButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full bg-electric-blue text-paper text-[17px] font-normal leading-none px-[22px] py-[11px] transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

type GhostButtonProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

/** Ghost pill — transparent fill, 1px ink border. */
export function GhostButton({
  to,
  href,
  onClick,
  children,
  className = "",
}: GhostButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border border-primary-ink bg-transparent text-primary-ink text-[17px] font-normal leading-none px-[22px] py-[11px] transition-colors duration-200 hover:bg-primary-ink hover:text-paper ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

type ArrowLinkProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
};

/** Inline text link in link-blue with trailing chevron; underline on hover. */
export function ArrowLink({ to, href, children, className = "" }: ArrowLinkProps) {
  const classes = `group inline-flex items-center gap-[2px] text-link-blue text-[17px] font-normal ${className}`;
  const content = (
    <>
      <span className="group-hover:underline underline-offset-2">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[2px]">
        &rsaquo;
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
