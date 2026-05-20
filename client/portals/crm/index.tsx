/**
 * CRM Portal — Shell wrapper with state-based internal navigation
 *
 * Uses PortalRouter instead of MemoryRouter to avoid the React Router v6
 * "cannot render a Router inside another Router" constraint.
 */
import { PortalRouter, usePortalPath } from "@/lib/portalRouter";
import Index from "./pages/Index";
import FulfilmentCenter from "./pages/FulfilmentCenter";

function CrmRoutes() {
  const path = usePortalPath();
  if (path === "/fulfilment-center") return <FulfilmentCenter />;
  return <Index />;
}

export default function CrmPortal() {
  return (
    <PortalRouter>
      <CrmRoutes />
    </PortalRouter>
  );
}
