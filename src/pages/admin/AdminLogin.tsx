import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles, PlayCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import fastigoLogo from '@/assets/fastigo-logo.webp';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@fastigo.co');
  const [password, setPassword] = useState('Fastigo@2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  // If already authenticated, redirect straight to admin dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 font-body">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-10 h-10 border-4 border-[#0070AD] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('connection refused')) {
        setError('Cannot reach backend server. You can start it via "npm run backend" or click below to enter Demo Mode.');
      } else {
        setError(msg || 'Invalid email or password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@fastigo.co');
    setPassword('Fastigo@2026!');
    setError(null);
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login('admin@fastigo.co', 'Fastigo@2026!');
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 relative overflow-hidden font-body selection:bg-[#0070ad] selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0070AD]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="rounded-3xl bg-[#0b1426]/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group mb-4">
              <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl border border-white/40 inline-block group-hover:scale-105 transition-transform">
                <img
                  src={fastigoLogo}
                  alt="Fastigo"
                  className="h-10 sm:h-13 w-auto mx-auto object-contain"
                />
              </div>
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0070AD]/15 text-[#38bdf8] border border-[#0070AD]/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Career Portal Admin
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Sign In to Dashboard</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manage Fastigo job openings and candidate applications
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex flex-col gap-2"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              {error.includes('backend') && (
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="self-start mt-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium rounded-lg text-xs transition-colors cursor-pointer border border-amber-500/30"
                >
                  Enter in Offline Demo Mode →
                </button>
              )}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fastigo.co"
                  className="w-full bg-[#080f1e] border border-slate-700/80 focus:border-[#0070AD] focus:ring-2 focus:ring-[#0070AD]/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#080f1e] border border-slate-700/80 focus:border-[#0070AD] focus:ring-2 focus:ring-[#0070AD]/20 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 transition-all outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#0070AD] to-[#0096E6] hover:from-[#006095] hover:to-[#0085cc] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#0070AD]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 mb-2">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" />
              <span>Default Credentials:</span>
            </div>
            <div className="bg-[#080f1e]/80 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>admin@fastigo.co / Fastigo@2026!</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[11px] text-[#38bdf8] hover:underline font-sans font-semibold cursor-pointer"
                >
                  Auto-Fill
                </button>
                <span className="text-slate-600">|</span>
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="text-[11px] text-emerald-400 hover:underline font-sans font-semibold cursor-pointer flex items-center gap-1"
                >
                  <PlayCircle className="w-3 h-3" /> Quick Enter
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/careers"
              className="text-xs text-slate-400 hover:text-[#38bdf8] transition-colors"
            >
              ← Back to Fastigo Public Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
