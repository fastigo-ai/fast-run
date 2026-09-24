/**
 * Fastigo Careers & Admin API Client
 * Includes automatic fallback to Local / Demo Mode when backend is offline
 */

const getApiBaseUrl = (): string => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();
  if (envUrl) {
    const cleanUrl = envUrl.replace(/\/+$/, '');
    return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
  }
  // If in production without explicit VITE_API_URL in hosting dashboard, connect to Render cloud backend
  if (import.meta.env.PROD) {
    return 'https://fast-run.onrender.com/api';
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

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

// --------------------------------------------------------------------------
// Auth Token & User Storage Helpers (Local + Session for Multi-Tab support)
// --------------------------------------------------------------------------

export const getAuthToken = (): string | null => {
  return localStorage.getItem('fastigo_admin_token') || sessionStorage.getItem('fastigo_admin_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('fastigo_admin_token', token);
  sessionStorage.setItem('fastigo_admin_token', token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('fastigo_admin_refresh_token') || sessionStorage.getItem('fastigo_admin_refresh_token');
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('fastigo_admin_refresh_token', token);
  sessionStorage.setItem('fastigo_admin_refresh_token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('fastigo_admin_token');
  localStorage.removeItem('fastigo_admin_refresh_token');
  localStorage.removeItem('fastigo_admin_user');
  sessionStorage.removeItem('fastigo_admin_token');
  sessionStorage.removeItem('fastigo_admin_refresh_token');
  sessionStorage.removeItem('fastigo_admin_user');
};

export const getAuthUser = (): AdminUser | null => {
  const saved = localStorage.getItem('fastigo_admin_user') || sessionStorage.getItem('fastigo_admin_user');
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const setAuthUser = (user: AdminUser) => {
  localStorage.setItem('fastigo_admin_user', JSON.stringify(user));
  sessionStorage.setItem('fastigo_admin_user', JSON.stringify(user));
};

// Clean up any legacy mock artifacts from browser storage so MongoDB data is exclusively used
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('fastigo_mock_apps');
    localStorage.removeItem('fastigo_mock_jobs');
    const existingToken = localStorage.getItem('fastigo_admin_token');
    if (existingToken && existingToken.startsWith('demo_')) {
      localStorage.removeItem('fastigo_admin_token');
      localStorage.removeItem('fastigo_admin_refresh_token');
      localStorage.removeItem('fastigo_admin_user');
      sessionStorage.removeItem('fastigo_admin_token');
      sessionStorage.removeItem('fastigo_admin_refresh_token');
      sessionStorage.removeItem('fastigo_admin_user');
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

export const isDemoModeActive = (): boolean => false;

// Global promise lock to prevent duplicate refresh requests
let refreshPromise: Promise<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }> | null = null;

// Base Fetcher connecting directly to Fastigo Backend and remote MongoDB Atlas
async function apiRequest<T>(endpoint: string, options: RequestInit & { _isRetry?: boolean } = {}): Promise<T> {
  const token = getAuthToken();

  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token && !endpoint.includes('/auth/login')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: options.signal || controller.signal,
      credentials: 'include',
      headers,
    });
  } catch (networkError: any) {
    if (networkError.name === 'AbortError') {
      throw new Error('Server request timed out. Please check your network or try again.');
    }
    throw new Error(`Unable to reach Fastigo server at ${API_BASE_URL}${endpoint}. Please check backend service status.`);
  } finally {
    clearTimeout(timeoutId);
  }

  // Handle Token Expiry & Automatic Refresh on 401 Unauthorized
  if (response.status === 401 && !options._isRetry && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh') && !endpoint.includes('/auth/logout')) {
    try {
      if (!refreshPromise) {
        const storedRefreshToken = getRefreshToken();
        refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: storedRefreshToken ? JSON.stringify({ refresh_token: storedRefreshToken }) : undefined,
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
        if (refreshed.refresh_token) {
          setRefreshToken(refreshed.refresh_token);
        }
        if (refreshed.admin) {
          setAuthUser(refreshed.admin);
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
      if (res.refresh_token) {
        setRefreshToken(res.refresh_token);
      }
      setAuthUser(res.admin);
      return res;
    },
    refresh: async () => {
      const storedRefreshToken = getRefreshToken();
      const res = await apiRequest<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }>('/auth/refresh', {
        method: 'POST',
        body: storedRefreshToken ? JSON.stringify({ refresh_token: storedRefreshToken }) : undefined,
      });
      setAuthToken(res.access_token);
      if (res.refresh_token) {
        setRefreshToken(res.refresh_token);
      }
      setAuthUser(res.admin);
      return res;
    },
    getMe: async (): Promise<AdminUser> => {
      return apiRequest<AdminUser>('/auth/me');
    },
    logout: async () => {
      try {
        await apiRequest('/auth/logout', { method: 'POST' });
      } catch (err) {
        console.warn('Backend logout notification notice:', err);
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
    uploadResume: async (file: File): Promise<{ resume_url: string; file_name: string; message?: string }> => {
      const formData = new FormData();
      formData.append('file', file);

      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/applications/upload-resume`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Resume upload failed on server.');
      }

      return response.json();
    },
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
