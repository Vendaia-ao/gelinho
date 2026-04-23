import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Expostands from "./pages/Expostands";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";

import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import SiteSettings from "./pages/admin/SiteSettings";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ClientsAdmin from "./pages/admin/ClientsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import ExpostandsAdmin from "./pages/admin/ExpostandsAdmin";
import ProcessAdmin from "./pages/admin/ProcessAdmin";
import ValuesAdmin from "./pages/admin/ValuesAdmin";
import StatsAdmin from "./pages/admin/StatsAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";

import "@fortawesome/fontawesome-free/css/all.min.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/expostands" element={<Expostands />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contacto" element={<Contact />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="site" element={<SiteSettings />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="clients" element={<ClientsAdmin />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="expostands" element={<ExpostandsAdmin />} />
              <Route path="process" element={<ProcessAdmin />} />
              <Route path="values" element={<ValuesAdmin />} />
              <Route path="stats" element={<StatsAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
