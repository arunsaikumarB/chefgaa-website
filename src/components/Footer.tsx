import { Link } from "react-router-dom";

const columns = [
  {
    heading: "Product",
    links: [
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
    <footer className="bg-paper">
      <div className="mx-auto w-full max-w-[1200px] border-t border-hairline px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="font-sf-pro-display text-[21px] font-semibold text-primary-ink"
            >
              Chefgaa
            </Link>
            <p className="mt-3 max-w-[240px] text-[14px] leading-[1.5] text-mid-gray">
              All-in-One POS &amp; Online Ordering for Restaurants.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[12px] font-semibold uppercase tracking-wide text-quiet-dot">
                {col.heading}
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {col.links.map((link, i) => (
                  <li key={`${link.to}-${link.label}-${i}`}>
                    <Link
                      to={link.to}
                      className="text-[12px] text-deep-gray transition-colors hover:text-primary-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-hairline pt-8 md:mt-12">
          <p className="text-[12px] leading-[1.5] text-mid-gray">
            &copy; {new Date().getFullYear()} Chefgaa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
