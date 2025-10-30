
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clinics from "./pages/Clinics";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Auth from "./pages/Auth";
import HospitalDetail from "./pages/HospitalDetail";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin"; // ✅ add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />

          {/* ✅ Add Admin Route */}
          <Route path="/admin" element={<Admin />} />

          {/* CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
