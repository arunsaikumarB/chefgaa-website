import { HARDWARE_SUBNAV } from "./data";

export function HardwareSubNav() {
  return (
    <nav
      className="sticky top-14 z-40 border-b border-black/[0.06] bg-paper/95 backdrop-blur-md"
      aria-label="Hardware categories"
    >
      <div className="mx-auto max-w-[1080px] overflow-x-auto px-6 md:px-10">
        <ul className="flex min-w-max items-stretch justify-center gap-0 md:min-w-0 md:justify-between">
          {HARDWARE_SUBNAV.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="flex flex-col items-center gap-2 px-4 py-4 text-center transition-colors hover:text-[#ED3C18] md:px-3"
                >
                  <Icon size={22} strokeWidth={1.5} className="text-[#444444]" aria-hidden="true" />
                  <span className="whitespace-nowrap text-[12px] font-medium text-[#111111]">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
