type ChefgaaLogoProps = {
  className?: string;
};

export function ChefgaaLogo({ className = "" }: ChefgaaLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 14h3M6 11h2.5M6 17h2.5"
          stroke="#ff6e14"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M11 22h14"
          stroke="#1d1d1f"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M13.5 22c0-5.2 2.2-9.5 4.5-9.5s4.5 4.3 4.5 9.5"
          stroke="#ff6e14"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M12 22h12"
          stroke="#ff6e14"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="18" cy="8" r="1.15" fill="#ff6e14" />
      </svg>
      <span className="font-sf-pro-display text-[22px] font-semibold tracking-[-0.02em] text-primary-ink">
        Chefgaa
      </span>
    </span>
  );
}
