/**
 * Analytics Portal — Shell wrapper
 * Scoped in .portal-analytics so the dark navy CSS variables apply only here.
 */
import AnalyticsPage from "./pages/Index";

export default function AnalyticsPortal() {
  return (
    <div className="portal-analytics min-h-full">
      <AnalyticsPage />
    </div>
  );
}
