import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SupportDashboard from "./pages/SupportDashboard";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/book" element={<Book />} />
          <Route path="/login" element={<Login />} />
          {/* Role-based dashboards */}
          <Route path="/support" element={<SupportDashboard />} />
          <Route path="/support/*" element={<SupportDashboard />} />
          <Route path="/affiliate" element={<AffiliateDashboard />} />
          <Route path="/affiliate/*" element={<AffiliateDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/*" element={<CustomerDashboard />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/*" element={<ProviderDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
