import { createFileRoute, Outlet, useNavigate, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  Phone,
  BookOpen,
  Mic2,
  GraduationCap,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  User,
  Lightbulb,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Home Page", path: "/admin/pages/home", icon: Home },
  { label: "About Page", path: "/admin/pages/about", icon: Info },
  { label: "Work (Services) Page", path: "/admin/pages/services", icon: Briefcase },
  { label: "Contact Page", path: "/admin/pages/contact", icon: Phone },
  { label: "Training Page", path: "/admin/pages/training", icon: GraduationCap },
  { label: "Book Page", path: "/admin/pages/book", icon: BookOpen },
  { label: "Podcast Page", path: "/admin/pages/podcast", icon: Mic2 },
  { label: "Insights Page", path: "/admin/pages/insights", icon: Lightbulb },
  { label: "Privacy Policy", path: "/admin/pages/privacy", icon: Shield },
  { label: "Terms of Service", path: "/admin/pages/terms", icon: FileText },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, logout, session } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const isLoginRoute = location.pathname === "/admin/login";

  // Initialize Lenis smooth scroll for admin container on desktop
  useEffect(() => {
    if (typeof window === "undefined" || !mainRef.current || isLoginRoute) return;

    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 1023px)").matches;
    if (isMobileDevice) return;

    const lenis = new Lenis({
      wrapper: mainRef.current,
      content: (mainRef.current.firstElementChild as HTMLElement) || mainRef.current,
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoginRoute]);

  // Reset scroll on admin page navigation
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Redirect to login if not authenticated and trying to access admin dashboard
  useEffect(() => {
    if (!isLoginRoute && !loading && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isLoginRoute, isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin/login" });
  };

  if (isLoginRoute) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050d1a]">
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
          <Shield className="w-4.5 h-4.5 text-white" />
        </div>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-0"
          >
            <p className="text-sm font-bold text-white truncate">Ambesh CMS</p>
            <p className="text-[10px] text-white/40 truncate">Admin Panel</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-blue-400" : "text-white/35 group-hover:text-white/70"}`} />
              {sidebarOpen && (
                <span className="truncate">{item.label}</span>
              )}
              {sidebarOpen && active && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / logout */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        {sidebarOpen && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{session?.user?.email}</p>
              <p className="text-[10px] text-white/30">Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          id="admin-logout-btn"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {sidebarOpen && <span>Sign out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050d1a] flex">
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col border-r border-white/8 bg-[#07111f] relative shrink-0"
        style={{ height: "100dvh", position: "sticky", top: 0 }}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-[72px] w-6 h-6 rounded-full border border-white/10 bg-[#07111f] flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
        >
          <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`} />
        </button>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#07111f] border-r border-white/8 z-50 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-white/8 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[#07111f]/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white/50 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">
                {navItems.find((n) => isActive(n.path, n.exact))?.label ?? "Admin Panel"}
              </p>
            </div>
          </div>

          {/* Live site link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <span>View live site</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </header>

        {/* Page outlet */}
        <main ref={mainRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
