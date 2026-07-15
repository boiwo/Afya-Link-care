import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; 
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"; // Swapped to HashRouter to fix local 404s
import Index from "./pages/Index";
import Clinics from "./pages/Clinics";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Auth from "./pages/Auth";
import HospitalDetail from "./pages/HospitalDetail";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin"; 

// SHA Routes
import SHARegistration from "./pages/sha/SHARegistration";
import SHADashboard from "./pages/sha/SHADashboard"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> 
      
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />

          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />

          {/* SHA Routes */}
          <Route path="/sha/register" element={<SHARegistration />} />
          <Route path="/sha/dashboard" element={<SHADashboard />} />

          {/* Backward compatibility redirects (just in case) */}
          <Route path="/dashboard" element={<Navigate to="/sha/dashboard" replace />} />
          <Route path="/account" element={<Navigate to="/sha/dashboard" replace />} />

          {/* CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;