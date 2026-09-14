import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Building,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api, DashboardStats, Job, CandidateApplication } from '@/lib/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [recentApps, setRecentApps] = useState<CandidateApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [statsData, jobsData, appsData] = await Promise.all([
        api.stats.get(),
        api.jobs.list({ include_all: true }),
        api.applications.list(),
      ]);
      setStats(statsData);
      setRecentJobs(jobsData.slice(0, 5));
      setRecentApps(appsData.slice(0, 5));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Draft
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const getAppStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      shortlisted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      hired: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
          colors[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/30'
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Talent &amp; Career Dashboard
              </h1>
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#0070AD]/20 text-[#38bdf8] border border-[#0070AD]/40">
                Live Engine
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Real-time monitoring of open positions, incoming candidates, and talent pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#38bdf8]' : ''}`} />
            </button>
            <a
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold rounded-xl border border-slate-700/80 shadow-md transition-all group"
            >
              <ExternalLink className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" />
              <span>Career Page</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-700">Tab ↗</span>
            </a>
            <Link
              to="/admin/jobs?action=create"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0070AD] hover:bg-[#005f94] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#0070AD]/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Active Openings */}
          <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#0070AD]/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Openings
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-white">
                {isLoading ? '-' : stats?.active_jobs ?? 0}
              </span>
              <span className="text-xs text-emerald-400 font-medium">Published &amp; Live</span>
            </div>
          </div>

          {/* Card 2: Total Jobs */}
          <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#0070AD]/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Positions
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#0070AD]/15 border border-[#0070AD]/30 flex items-center justify-center text-[#38bdf8]">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-white">
                {isLoading ? '-' : stats?.total_jobs ?? 0}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {stats?.draft_jobs ?? 0} Drafts • {stats?.closed_jobs ?? 0} Closed
              </span>
            </div>
          </div>

          {/* Card 3: Applications Received */}
          <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#0070AD]/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Applicants
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-white">
                {isLoading ? '-' : stats?.total_applications ?? 0}
              </span>
              <span className="text-xs text-purple-400 font-medium">Candidates</span>
            </div>
          </div>

          {/* Card 4: Recent Activity */}
          <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-5 backdrop-blur-xl relative overflow-hidden group hover:border-[#0070AD]/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                7-Day Velocity
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-white">
                {isLoading ? '-' : stats?.recent_applications_count ?? 0}
              </span>
              <span className="text-xs text-amber-400 font-medium">New Submissions</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Recent Job Listings & Recent Candidate Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Recent Jobs (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Job Listings</h3>
                <p className="text-xs text-slate-400">Current positions managed in MongoDB</p>
              </div>
              <Link
                to="/admin/jobs"
                className="text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-1"
              >
                <span>View All Jobs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3 py-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-slate-800/40 animate-pulse" />
                ))}
              </div>
            ) : recentJobs.length === 0 ? (
              <div className="py-12 text-center">
                <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">No job postings created yet.</p>
                <Link
                  to="/admin/jobs?action=create"
                  className="inline-block mt-3 text-xs text-[#38bdf8] hover:underline"
                >
                  Create your first job listing →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3.5 rounded-xl bg-[#080f1e]/80 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-white group-hover:text-[#38bdf8] transition-colors">
                          {job.title}
                        </span>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.job_type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400">
                        <strong className="text-white">{job.applications_count ?? 0}</strong> apps
                      </span>
                      <Link
                        to={`/admin/jobs?edit=${job.id}`}
                        className="px-3 py-1 bg-slate-800 hover:bg-[#0070AD] text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Recent Applications (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Recent Applicants</h3>
                <p className="text-xs text-slate-400">Latest candidate submissions</p>
              </div>
              <Link
                to="/admin/applications"
                className="text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc] flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-3 py-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-slate-800/40 animate-pulse" />
                ))}
              </div>
            ) : recentApps.length === 0 ? (
              <div className="py-12 text-center">
                <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">No candidate applications yet.</p>
                <p className="text-xs text-slate-500 mt-1">Applications from the public page appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl bg-[#080f1e]/80 border border-slate-800 hover:border-slate-700/80 transition-all flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-sm text-white">{app.name}</p>
                      <p className="text-xs text-[#38bdf8] truncate max-w-[180px]">
                        {app.job_title || 'General Application'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{app.email}</p>
                    </div>

                    <div className="text-right shrink-0">
                      {getAppStatusBadge(app.status)}
                      <p className="text-[10px] text-slate-400 mt-1.5">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
