import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  MapPin,
  IndianRupee,
  Layers,
  X,
  PlusCircle,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api, Job, JobInput, JobStatus } from '@/lib/api';

const DEFAULT_JOB_INPUT: JobInput = {
  title: '',
  department: 'Engineering & Research',
  location: 'Remote / New Delhi',
  job_type: 'Full-time',
  experience: '1-3 years',
  salary: 'Competitive',
  description: '',
  responsibilities: [''],
  requirements: [''],
  skills: [],
  status: 'published',
};

export const AdminJobs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobInput>(DEFAULT_JOB_INPUT);
  const [skillsInput, setSkillsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Delete Confirmation State
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await api.jobs.list({
        include_all: true,
        search: searchQuery || undefined,
        department: selectedDept !== 'All' ? selectedDept : undefined,
        status: selectedStatus !== 'All' ? selectedStatus : undefined,
      });
      setJobs(data);
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedDept, selectedStatus]);

  // Handle URL query trigger for "create" or "edit"
  useEffect(() => {
    const action = searchParams.get('action');
    const editId = searchParams.get('edit');

    if (action === 'create') {
      openCreateModal();
      setSearchParams({}, { replace: true });
    } else if (editId && jobs.length > 0) {
      const target = jobs.find((j) => j.id === editId);
      if (target) {
        openEditModal(target);
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, jobs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const openCreateModal = () => {
    setEditingJobId(null);
    setFormData(DEFAULT_JOB_INPUT);
    setSkillsInput('');
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJobId(job.id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      job_type: job.job_type,
      experience: job.experience,
      salary: job.salary || '',
      description: job.description,
      responsibilities: job.responsibilities.length ? job.responsibilities : [''],
      requirements: job.requirements.length ? job.requirements : [''],
      skills: job.skills || [],
      status: job.status || 'published',
    });
    setSkillsInput((job.skills || []).join(', '));
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJobId(null);
    setSearchParams({});
  };

  // Dynamic bullet list handlers
  const handleResponsibilityChange = (index: number, val: string) => {
    const list = [...formData.responsibilities];
    list[index] = val;
    setFormData({ ...formData, responsibilities: list });
  };

  const addResponsibility = () => {
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, ''] });
  };

  const removeResponsibility = (index: number) => {
    const list = formData.responsibilities.filter((_, i) => i !== index);
    setFormData({ ...formData, responsibilities: list.length ? list : [''] });
  };

  const handleRequirementChange = (index: number, val: string) => {
    const list = [...formData.requirements];
    list[index] = val;
    setFormData({ ...formData, requirements: list });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const list = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: list.length ? list : [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    const parsedSkills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload: JobInput = {
      ...formData,
      responsibilities: formData.responsibilities.map((r) => r.trim()).filter((r) => r.length > 0),
      requirements: formData.requirements.map((r) => r.trim()).filter((r) => r.length > 0),
      skills: parsedSkills,
    };

    try {
      if (editingJobId) {
        await api.jobs.update(editingJobId, payload);
      } else {
        await api.jobs.create(payload);
      }
      closeModal();
      fetchJobs();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save job posting');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async (job: Job) => {
    try {
      if (job.status === 'published') {
        await api.jobs.close(job.id);
      } else {
        await api.jobs.publish(job.id);
      }
      fetchJobs();
    } catch (err) {
      console.error('Failed to change job status:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingJob) return;
    try {
      await api.jobs.delete(deletingJob.id);
      setDeletingJob(null);
      fetchJobs();
    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  const departments = [
    'All',
    'Engineering & Research',
    'Marketing & Growth',
    'Sales & Strategy',
    'Sales',
    'Cloud & Infrastructure',
    'Cybersecurity',
    'Design & Product',
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Career Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Create, update, publish, or archive hiring positions for Fastigo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchJobs}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700/60 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#38bdf8]' : ''}`} />
            </button>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0070AD] hover:bg-[#005f94] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#0070AD]/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Role</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-4 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, skill, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080f1e] border border-slate-700/70 focus:border-[#0070AD] rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 outline-hidden"
            />
          </form>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Department:</span>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#080f1e] border border-slate-700/70 text-xs text-white rounded-xl px-3 py-2 outline-hidden focus:border-[#0070AD]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#080f1e] border border-slate-700/70 text-xs text-white rounded-xl px-3 py-2 outline-hidden focus:border-[#0070AD]"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {isLoading ? (
          <div className="space-y-4 py-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 p-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Jobs Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              No job postings match your active search filters. Adjust your criteria or post a new job.
            </p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#0070AD] text-white text-xs font-semibold rounded-xl hover:bg-[#005f94] transition-all"
            >
              Post a Role Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl bg-[#0b1426]/90 border border-slate-800/90 hover:border-slate-700 p-5 sm:p-6 backdrop-blur-xl transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#38bdf8]">
                      {job.title}
                    </h3>
                    
                    {/* Status Badge */}
                    {job.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Published
                      </span>
                    ) : job.status === 'draft' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Draft
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        Closed
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.job_type} ({job.experience})
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {job.salary.replace(/\$/g, '₹').replace(/^₹\s*/, '')}
                      </span>
                    )}
                  </div>

                  {/* Skills tags */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-mono border border-slate-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap lg:flex-col items-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-1">
                    <span>
                      <strong className="text-white">{job.views_count ?? 0}</strong> views
                    </span>
                    <span>
                      <strong className="text-white">{job.applications_count ?? 0}</strong> applicants
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Publish/Close Toggle */}
                    <button
                      onClick={() => handlePublishToggle(job)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        job.status === 'published'
                          ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                      }`}
                    >
                      {job.status === 'published' ? 'Close Role' : 'Publish Role'}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(job)}
                      className="p-2 bg-slate-800 hover:bg-[#0070AD] text-slate-300 hover:text-white rounded-xl transition-colors"
                      title="Edit Job"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeletingJob(job)}
                      className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-colors"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CREATE / EDIT JOB MODAL ── */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-3xl max-h-[90vh] bg-[#0b1426] border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {editingJobId ? 'Edit Job Opening' : 'Create New Job Opening'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter full role details, requirements, and publishing status.
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title & Department */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Senior AI Research Scientist"
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. Engineering & Research"
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Location, Job Type, Experience, Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Remote / New Delhi"
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Job Type *
                      </label>
                      <select
                        value={formData.job_type}
                        onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Experience *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="e.g. 2-4 years"
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="e.g. ₹10 - 18 LPA"
                        className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Publishing Status
                    </label>
                    <div className="flex gap-4">
                      {(['published', 'draft'] as JobStatus[]).map((st) => (
                        <label
                          key={st}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                            formData.status === st
                              ? 'bg-[#0070AD] text-white border-[#0070AD]'
                              : 'bg-[#080f1e] text-slate-400 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="status"
                            value={st}
                            checked={formData.status === st}
                            onChange={() => setFormData({ ...formData, status: st })}
                            className="hidden"
                          />
                          <span className="capitalize">{st}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Role Overview / Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the mission, impact, and high-level scope of the position..."
                      className="w-full bg-[#080f1e] border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:border-[#0070AD] outline-hidden resize-none"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Key Responsibilities
                      </label>
                      <button
                        type="button"
                        onClick={addResponsibility}
                        className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Add Item
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleResponsibilityChange(idx, e.target.value)}
                            placeholder={`Responsibility #${idx + 1}`}
                            className="flex-1 bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-[#0070AD] outline-hidden"
                          />
                          {formData.responsibilities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeResponsibility(idx)}
                              className="p-2 text-slate-400 hover:text-rose-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Requirements &amp; Qualifications
                      </label>
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Add Item
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleRequirementChange(idx, e.target.value)}
                            placeholder={`Requirement #${idx + 1}`}
                            className="flex-1 bg-[#080f1e] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-[#0070AD] outline-hidden"
                          />
                          {formData.requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRequirement(idx)}
                              className="p-2 text-slate-400 hover:text-rose-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Tag Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Required Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="e.g. Python, PyTorch, LangChain, FastAPI, Docker"
                      className="w-full bg-[#080f1e] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#0070AD] outline-hidden"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#0070AD] hover:bg-[#005f94] text-white transition-all shadow-lg shadow-[#0070AD]/25 disabled:opacity-50"
                    >
                      {isSaving ? 'Saving Position...' : editingJobId ? 'Update Role' : 'Publish Role'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── DELETE CONFIRMATION MODAL ── */}
        <AnimatePresence>
          {deletingJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0b1426] border border-slate-800 rounded-2xl p-6 shadow-2xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Delete Job Opening?</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-white">{deletingJob.title}</strong>? This action cannot be undone.
                </p>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setDeletingJob(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-lg shadow-rose-600/20"
                  >
                    Delete Permanently
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminJobs;
