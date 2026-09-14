import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, memo } from "react";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Lazy load route components
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const CategoryDetail = lazy(() => import("./pages/CategoryDetail"));
const Products = lazy(() => import("./pages/Products"));
const ProductSubscription = lazy(() => import("./pages/ProductSubscription"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Leadership = lazy(() => import("./pages/Leadership"));
const Careers = lazy(() => import("./pages/Careers"));
const IndustriesSection = lazy(() => import("./components/IndustriesSection"));
const ResearchSection = lazy(() => import("./components/ResearchSection"));
const AllianceSection = lazy(() => import("./components/AllianceSection"));

// Admin Portal Pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const AnimatedRoutes = memo(() => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-background">
            <div className="w-8 h-8 border-4 border-[#0070AD] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          {/* Public Website Routes */}
          <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/services/:serviceId" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
          <Route path="/:category/:itemSlug" element={<PageWrapper><CategoryDetail /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
          <Route path="/products/:productId" element={<PageWrapper><ProductSubscription /></PageWrapper>} />
          <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/portfolio/:id" element={<PageWrapper><PortfolioDetail /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/blog/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/industries" element={<PageWrapper><IndustriesSection /></PageWrapper>} />
          <Route path="/research" element={<PageWrapper><ResearchSection /></PageWrapper>} />
          <Route path="/alliances" element={<PageWrapper><AllianceSection /></PageWrapper>} />
          <Route path="/leadership" element={<PageWrapper><Leadership /></PageWrapper>} />
          <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />

          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AdminJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute>
                <AdminApplications />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
});

const AppShell = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <AnimatedRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppShell />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

