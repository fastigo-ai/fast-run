/**
 * Fastigo Careers & Admin API Client
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export type JobStatus = 'published' | 'draft' | 'closed';
export type ApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  status: JobStatus;
  created_at: string;
  updated_at: string;
  views_count?: number;
  applications_count?: number;
}

export interface JobInput {
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  status: JobStatus;
}

export interface CandidateApplication {
  id: string;
  job_id: string;
  job_title?: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  experience_years?: string;
  message?: string;
  resume_url?: string;
  status: ApplicationStatus;
  created_at: string;
}

export interface ApplicationInput {
  job_id: string;
  job_title?: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  experience_years?: string;
  message?: string;
  resume_url?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export interface ContactMessage extends ContactInput {
  id: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  draft_jobs: number;
  closed_jobs: number;
  total_applications: number;
  recent_applications_count: number;
}

// Helper to get auth token from sessionStorage (tab-scoped session)
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('fastigo_admin_token');
};

export const setAuthToken = (token: string) => {
  sessionStorage.setItem('fastigo_admin_token', token);
  // Clear any legacy localStorage token to prevent leaking into new tabs
  localStorage.removeItem('fastigo_admin_token');
  localStorage.removeItem('fastigo_admin_user');
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('fastigo_admin_token');
  sessionStorage.removeItem('fastigo_admin_user');
  localStorage.removeItem('fastigo_admin_token');
  localStorage.removeItem('fastigo_admin_user');
};

// Global promise lock to prevent duplicate refresh requests
let refreshPromise: Promise<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }> | null = null;

// Base Fetcher with cookie credentials and automatic token refresh on 401
async function apiRequest<T>(endpoint: string, options: RequestInit & { _isRetry?: boolean } = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Always include credentials so HttpOnly cookies (refresh token) are sent/stored
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  // Handle Token Expiry & Automatic Refresh on 401 Unauthorized
  if (response.status === 401 && !options._isRetry && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh') && !endpoint.includes('/auth/logout')) {
    try {
      if (!refreshPromise) {
        refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error('Refresh failed');
          }
          return res.json();
        }).finally(() => {
          refreshPromise = null;
        });
      }

      const refreshed = await refreshPromise;
      if (refreshed?.access_token) {
        setAuthToken(refreshed.access_token);
        if (refreshed.admin) {
          sessionStorage.setItem('fastigo_admin_user', JSON.stringify(refreshed.admin));
        }

        // Retry original request with newly acquired access token
        headers.set('Authorization', `Bearer ${refreshed.access_token}`);
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          _isRetry: true,
          credentials: 'include',
          headers,
        });

        if (!retryResponse.ok) {
          let retryErr = 'Request failed after refresh';
          try {
            const errJson = await retryResponse.json();
            retryErr = errJson.detail || errJson.message || retryResponse.statusText;
          } catch {
            retryErr = retryResponse.statusText;
          }
          throw new Error(retryErr);
        }

        return retryResponse.json();
      }
    } catch (refreshErr) {
      clearAuthToken();
      throw new Error('Session expired. Please sign in again.');
    }
  }

  if (!response.ok) {
    let errorDetail = 'An error occurred';
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.detail || errorJson.message || response.statusText;
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

// API Methods
export const api = {
  // Auth
  auth: {
    login: async (email: string, password: string) => {
      const res = await apiRequest<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setAuthToken(res.access_token);
      sessionStorage.setItem('fastigo_admin_user', JSON.stringify(res.admin));
      return res;
    },
    refresh: async () => {
      const res = await apiRequest<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }>('/auth/refresh', {
        method: 'POST',
      });
      setAuthToken(res.access_token);
      sessionStorage.setItem('fastigo_admin_user', JSON.stringify(res.admin));
      return res;
    },
    getMe: async (): Promise<AdminUser> => {
      return apiRequest<AdminUser>('/auth/me');
    },
    logout: async () => {
      try {
        await apiRequest('/auth/logout', { method: 'POST' });
      } catch (err) {
        console.warn('Backend logout notification failed:', err);
      } finally {
        clearAuthToken();
      }
    },
  },

  // Jobs
  jobs: {
    list: async (params?: {
      search?: string;
      department?: string;
      job_type?: string;
      status?: string;
      include_all?: boolean;
    }): Promise<Job[]> => {
      const query = new URLSearchParams();
      if (params?.search) query.set('search', params.search);
      if (params?.department && params.department !== 'All') query.set('department', params.department);
      if (params?.job_type && params.job_type !== 'All') query.set('job_type', params.job_type);
      if (params?.status && params.status !== 'All') query.set('status', params.status);
      if (params?.include_all) query.set('include_all', 'true');

      const qStr = query.toString();
      return apiRequest<Job[]>(`/jobs${qStr ? `?${qStr}` : ''}`);
    },
    get: async (idOrSlug: string): Promise<Job> => {
      return apiRequest<Job>(`/jobs/${idOrSlug}`);
    },
    create: async (data: JobInput): Promise<Job> => {
      return apiRequest<Job>('/jobs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: Partial<JobInput>): Promise<Job> => {
      return apiRequest<Job>(`/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string): Promise<{ message: string; id: string }> => {
      return apiRequest<{ message: string; id: string }>(`/jobs/${id}`, {
        method: 'DELETE',
      });
    },
    publish: async (id: string): Promise<Job> => {
      return apiRequest<Job>(`/jobs/${id}/publish`, {
        method: 'PATCH',
      });
    },
    close: async (id: string): Promise<Job> => {
      return apiRequest<Job>(`/jobs/${id}/close`, {
        method: 'PATCH',
      });
    },
  },

  // Applications
  applications: {
    submit: async (data: ApplicationInput): Promise<CandidateApplication> => {
      return apiRequest<CandidateApplication>('/applications', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    list: async (params?: { job_id?: string; status?: string }): Promise<CandidateApplication[]> => {
      const query = new URLSearchParams();
      if (params?.job_id) query.set('job_id', params.job_id);
      if (params?.status && params.status !== 'All') query.set('status', params.status);
      const qStr = query.toString();
      return apiRequest<CandidateApplication[]>(`/applications${qStr ? `?${qStr}` : ''}`);
    },
    updateStatus: async (id: string, status: ApplicationStatus): Promise<CandidateApplication> => {
      return apiRequest<CandidateApplication>(`/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    delete: async (id: string): Promise<{ message: string; id: string }> => {
      return apiRequest<{ message: string; id: string }>(`/applications/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Admin Stats
  stats: {
    get: async (): Promise<DashboardStats> => {
      return apiRequest<DashboardStats>('/admin/stats');
    },
  },

  // Contact Messages
  contact: {
    submit: async (data: ContactInput): Promise<{ message: string; id: string }> => {
      return apiRequest<{ message: string; id: string }>('/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    list: async (): Promise<ContactMessage[]> => {
      return apiRequest<ContactMessage[]>('/contact');
    },
    delete: async (id: string): Promise<{ message: string; id: string }> => {
      return apiRequest<{ message: string; id: string }>(`/contact/${id}`, {
        method: 'DELETE',
      });
    },
  },
};
