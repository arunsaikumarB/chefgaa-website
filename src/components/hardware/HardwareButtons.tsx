import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export function HwPrimaryButton({
  children,
  to = "/contact",
}: {
  children: ReactNode;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-md bg-[#ED3C18] px-5 py-2.5 text-[15px] font-medium leading-none text-white transition-opacity hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export function HwTextLink({
  children,
  to = "/contact",
}: {
  children: ReactNode;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="text-[15px] font-medium text-[#ED3C18] transition-opacity hover:opacity-80 hover:underline"
    >
      {children}
    </Link>
  );
}

export function HwArrowLink({
  children,
  to = "/contact",
}: {
  children: ReactNode;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1 text-[15px] font-medium text-[#ED3C18] hover:underline"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
