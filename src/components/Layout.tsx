import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SmoothScroll } from "./effects/SmoothScroll";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
