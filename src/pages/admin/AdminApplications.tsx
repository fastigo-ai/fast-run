import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  X,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  FileText,
  Download,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api, CandidateApplication, ApplicationStatus } from '@/lib/api';

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Details Modal
  const [selectedApp, setSelectedApp] = useState<CandidateApplication | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await api.applications.list({
        status: statusFilter !== 'All' ? statusFilter : undefined,
      });
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await api.applications.updateStatus(appId, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: updated.status } : app))
      );
      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp({ ...selectedApp, status: updated.status });
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async (appId: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.applications.delete(appId);
      setApplications((prev) => prev.filter((app) => app.id !== appId));
      if (selectedApp?.id === appId) setSelectedApp(null);
    } catch (err) {
      console.error('Failed to delete application:', err);
    }
  };

  const filteredApps = applications.filter((app) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      (app.job_title && app.job_title.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string; border: string }> = {
      pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
      reviewed: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      shortlisted: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      rejected: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
      hired: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    };
    const s = map[status] || { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Candidate Applications
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review profiles, cover notes, and progress applicants through hiring stages.
            </p>
          </div>

          <button
            onClick={fetchApplications}
            className="p-2.5 self-start sm:self-auto bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#38bdf8]' : ''}`} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-4 backdrop-blur-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080f1e] border border-slate-700/70 focus:border-[#0070AD] rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-medium">Stage:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#080f1e] border border-slate-700/70 text-xs text-white rounded-xl px-3 py-2 outline-hidden focus:border-[#0070AD]"
            >
              <option value="All">All Stages</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="hired">Hired</option>
            </select>
          </div>
        </div>

        {/* Applications List Table */}
        <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 backdrop-blur-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-slate-800/40 animate-pulse" />
              ))}
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Applications</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Candidate submissions from the public careers page will show up here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#080f1e] text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Candidate</th>
                    <th className="px-6 py-3.5">Target Role</th>
                    <th className="px-6 py-3.5">Date Applied</th>
                    <th className="px-6 py-3.5">Resume (PDF)</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredApps.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                            {app.name}
                          </p>
                          <p className="text-xs text-slate-400">{app.email}</p>
                          {app.phone && <p className="text-[11px] text-slate-500">{app.phone}</p>}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-[#0070AD]/10 text-[#38bdf8] text-xs font-medium border border-[#0070AD]/20">
                          {app.job_title || 'Open Position'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(app.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Resume PDF Slot */}
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        {app.resume_url ? (
                          <a
                            href={app.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all shadow-xs group/res"
                            title="Open candidate PDF resume"
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-400" />
                            <span>PDF Resume</span>
                            <ExternalLink className="w-3 h-3 text-emerald-400/70 group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono px-2 py-0.5 rounded-md bg-slate-800/40">
                            No PDF
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          disabled={isUpdatingStatus}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          className="bg-[#080f1e] border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-white focus:border-[#0070AD] outline-hidden"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 bg-slate-800 hover:bg-[#0070AD] text-slate-300 hover:text-white rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── CANDIDATE DETAILS MODAL / DRAWER ── */}
        <AnimatePresence>
          {selectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-[#0b1426] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-display text-2xl font-bold text-white">
                        {selectedApp.name}
                      </h2>
                      {getStatusBadge(selectedApp.status)}
                    </div>
                    <p className="text-xs text-[#38bdf8] font-medium">
                      Applied for: {selectedApp.job_title || 'Position'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedApp(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 text-sm">
                  {/* Contact Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-[#080f1e] border border-slate-800 flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#38bdf8]" />
                      <div>
                        <p className="text-[11px] text-slate-400">Email Address</p>
                        <a
                          href={`mailto:${selectedApp.email}`}
                          className="font-medium text-white hover:underline text-xs"
                        >
                          {selectedApp.email}
                        </a>
                      </div>
                    </div>

                    {selectedApp.phone && (
                      <div className="p-3 rounded-xl bg-[#080f1e] border border-slate-800 flex items-center gap-3">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-[11px] text-slate-400">Phone</p>
                          <a
                            href={`tel:${selectedApp.phone}`}
                            className="font-medium text-white hover:underline text-xs"
                          >
                            {selectedApp.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Links: LinkedIn & Portfolio */}
                  {(selectedApp.linkedin || selectedApp.portfolio) && (
                    <div className="flex flex-wrap gap-3">
                      {selectedApp.linkedin && (
                        <a
                          href={selectedApp.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0070AD]/15 hover:bg-[#0070AD]/30 text-[#38bdf8] border border-[#0070AD]/30 text-xs font-semibold transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>View LinkedIn Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {selectedApp.portfolio && (
                        <a
                          href={selectedApp.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>View Portfolio / GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* ── DEDICATED CANDIDATE RESUME (PDF) SLOT ── */}
                  <div className="rounded-2xl bg-[#080f1e] border border-slate-800 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Candidate Resume (PDF / CV)
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Stored securely via Cloudinary
                          </p>
                        </div>
                      </div>

                      {selectedApp.resume_url ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> PDF Attached
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-800 px-2.5 py-0.5 rounded-full">
                          Not Provided
                        </span>
                      )}
                    </div>

                    {selectedApp.resume_url ? (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0b1426] border border-slate-700/60">
                          <div className="min-w-0 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                            <p className="text-xs font-mono text-slate-300 truncate">
                              {selectedApp.resume_url.split('/').pop() || 'Candidate_Resume.pdf'}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={selectedApp.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0070AD] hover:bg-[#005a8c] text-white rounded-xl text-xs font-semibold shadow-md shadow-[#0070AD]/25 transition-all"
                            >
                              <span>Open PDF</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={selectedApp.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                              title="Download PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Download</span>
                            </a>
                          </div>
                        </div>

                        {/* Interactive PDF Document Viewer */}
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                          <div className="px-3 py-1.5 bg-[#0d182e] border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                            <span>PDF Viewer Slot</span>
                            <a
                              href={selectedApp.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#38bdf8] hover:underline flex items-center gap-1"
                            >
                              Expand <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <iframe
                            src={selectedApp.resume_url}
                            title="Candidate Resume Preview"
                            className="w-full h-72 sm:h-96 bg-white/5 border-0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-xl bg-[#0b1426] border border-dashed border-slate-800">
                        <FileText className="w-7 h-7 text-slate-600 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-slate-400">
                          No PDF resume was uploaded with this application
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Candidate submitted contact details and message only.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Cover Message / Why Fastigo */}
                  {selectedApp.message && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#38bdf8]" />
                        Why Fastigo? / Candidate Note
                      </h4>
                      <div className="p-4 rounded-xl bg-[#080f1e] border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedApp.message}
                      </div>
                    </div>
                  )}

                  {/* Status update selector inside modal */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">Update Status:</span>
                      <select
                        value={selectedApp.status}
                        onChange={(e) =>
                          handleStatusChange(selectedApp.id, e.target.value as ApplicationStatus)
                        }
                        className="bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:border-[#0070AD] outline-hidden font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setSelectedApp(null)}
                      className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    >
                      Close View
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;
