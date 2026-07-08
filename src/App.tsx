import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { OnlineOrdering } from "./pages/OnlineOrdering";
import { CustomizedWebsite } from "./pages/CustomizedWebsite";
import { TableReservation } from "./pages/TableReservation";
import { CateringServices } from "./pages/CateringServices";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Hardware } from "./pages/Hardware";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/online-ordering" element={<OnlineOrdering />} />
        <Route path="/customized-website" element={<CustomizedWebsite />} />
        <Route path="/table-reservation" element={<TableReservation />} />
        <Route path="/catering-services" element={<CateringServices />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
