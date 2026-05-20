/**
 * CRM Portal — Shell wrapper
 *
 * MemoryRouter provides the Router context that useNavigate() / useLocation()
 * need inside the CRM pages, isolated from the shell (no BrowserRouter needed).
 */
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FulfilmentCenter from "./pages/FulfilmentCenter";

export default function CrmPortal() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/"                  element={<Index />} />
        <Route path="/fulfilment-center" element={<FulfilmentCenter />} />
      </Routes>
    </MemoryRouter>
  );
}
