import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  LayoutDashboard,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  PlusCircle,
  Building,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import fastigoLogo from '@/assets/fastigo-logo.webp';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: 'Career Management',
      path: '/admin/jobs',
      icon: Briefcase,
    },
    {
      name: 'Applications',
      path: '/admin/applications',
      icon: Users,
    },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col font-body selection:bg-[#0070ad] selection:text-white">
      {/* Top Bar matching Fastigo main website color & styling */}
      <header className="sticky top-0 z-40 h-[68px] sm:h-[76px] border-b border-slate-200/80 bg-white/95 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between shadow-[0_4px_24px_rgba(0,112,173,0.08)]">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-3 group">
            <img
              src={fastigoLogo}
              alt="Fastigo Technology"
              className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0070AD]/10 text-[#0070AD] border border-[#0070AD]/25 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0070AD]" /> Admin Portal
            </span>
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0070AD] bg-slate-50 hover:bg-sky-50/80 border border-slate-200 hover:border-[#0070AD]/40 rounded-xl transition-all shadow-xs group"
          >
            <span>Live Careers Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0070AD] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Admin User Info */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0070AD] to-[#00A3E0] flex items-center justify-center font-bold text-xs text-white shadow-sm ring-2 ring-[#0070AD]/20">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Talent Admin'}</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">{user?.email || 'admin@fastigo.co'}</p>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1 border border-transparent hover:border-rose-200"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-[#080f1e]/80 shrink-0 p-4 justify-between">
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                Core Management
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = isActive(item.path, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-[#0070AD] text-white shadow-lg shadow-[#0070AD]/25'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1.5">
              <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                Quick Actions
              </p>
              <Link
                to="/admin/jobs?action=create"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 hover:bg-[#0070AD]/20 border border-slate-700/50 hover:border-[#0070AD]/50 transition-all group"
              >
                <PlusCircle className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                <span>Create New Job</span>
              </Link>
              <a
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 hover:bg-[#0070AD]/20 border border-slate-700/50 hover:border-[#0070AD]/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
                  <span>Live Careers Page</span>
                </div>
                <span className="text-[10px] tracking-wider font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Tab ↗</span>
              </a>
            </div>
          </div>

          {/* System Status Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-slate-400 font-medium">MongoDB + FastAPI</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Fastigo Career Engine v1.0</p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-64 h-full bg-[#080f1e] border-r border-slate-800 p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="bg-white px-2 py-1 rounded-lg shadow-xs">
                    <img src={fastigoLogo} alt="Fastigo" className="h-5 w-auto object-contain" />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const active = isActive(item.path, item.exact);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                          active
                            ? 'bg-[#0070AD] text-white shadow-lg'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <Link
                  to="/careers"
                  target="_blank"
                  className="flex items-center justify-between text-xs text-slate-400 hover:text-white p-2"
                >
                  <span>View Public Site</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#070d18] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
