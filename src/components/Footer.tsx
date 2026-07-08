import { Link } from "react-router-dom";

const columns = [
  {
    heading: "Product",
    links: [
      { to: "/hardware", label: "Hardware" },
      { to: "/online-ordering", label: "Online Ordering" },
      { to: "/customized-website", label: "Customized Website" },
      { to: "/table-reservation", label: "Table Reservation" },
      { to: "/catering-services", label: "Catering Services" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/", label: "Home" },
    ],
  },
  {
    heading: "Support",
    links: [
      { to: "/contact", label: "Request a Demo" },
      { to: "/contact", label: "Get in Touch" },
      { to: "/pricing", label: "Plans" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-[1600px] border-t border-black/[0.06] px-6 pt-24 pb-16 md:px-20 md:pt-32 md:pb-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-16">
            <div className="col-span-2 md:col-span-1">
              <Link
                to="/"
                className="font-sf-pro-display text-[24px] font-semibold leading-[1.6] text-[#111111]"
              >
                Chefgaa
              </Link>
              <p className="mt-6 max-w-[280px] text-[16px] leading-[1.6] text-[#666666]">
                All-in-One POS &amp; Online Ordering for Restaurants.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[16px] font-semibold uppercase tracking-[0.08em] leading-[1.6] text-[#666666]">
                  {col.heading}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {col.links.map((link, i) => (
                    <li key={`${link.to}-${link.label}-${i}`}>
                      <Link
                        to={link.to}
                        className="text-[16px] leading-[1.6] text-[#444444] transition-colors hover:text-[#111111]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-black/[0.06] pt-8 md:mt-20">
            <p className="text-[16px] leading-[1.6] text-[#666666]">
              &copy; {new Date().getFullYear()} Chefgaa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
