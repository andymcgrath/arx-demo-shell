/**
 * arx-demo-shell — App entry point
 *
 * DemoShell owns all portal rendering and layout. React Router is no longer
 * used for portal tab switching — DemoShell manages that with local state so
 * the same layout system can show one, two, or three portals simultaneously.
 */
import "./global.css";
import { createRoot } from "react-dom/client";
import { Component, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import DemoShell from "@/shell/DemoShell";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: 32, fontFamily: "monospace", color: "#c00" }}>
          <h2>Runtime Error</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {err.message}{"\n\n"}{err.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Navigate to="/hub" replace />} />
          <Route path="/hub" element={<DemoShell />} />
          <Route path="/patient" element={<DemoShell />} />
          <Route path="/analytics" element={<DemoShell />} />
          <Route path="/provider" element={<DemoShell />} />
          <Route path="*" element={<Navigate to="/hub" replace />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
