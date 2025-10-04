import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TenantProvider } from "./contexts/TenantContext";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Inventory from "./pages/Inventory";
import Security from "./pages/Security";
import Patches from "./pages/Patches";
import Backups from "./pages/Backups";
import Services from "./pages/Services";
import Applications from "./pages/Applications";
import Docs from "./pages/Docs";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TenantProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/security" element={<Security />} />
            <Route path="/patches" element={<Patches />} />
            <Route path="/backups" element={<Backups />} />
            <Route path="/services" element={<Services />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
