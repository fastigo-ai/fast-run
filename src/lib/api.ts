/**
 * Fastigo Careers & Admin API Client
 * Includes automatic fallback to Local / Demo Mode when backend is offline
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

export const isDemoModeActive = (): boolean => {
  const token = getAuthToken();
  return !!token && token.startsWith('demo_');
};

// --------------------------------------------------------------------------
// Default Mock Data for Seamless Demo Mode & Offline Fallback
// --------------------------------------------------------------------------

const INITIAL_MOCK_JOBS: Job[] = [
  {
    id: "job-ai-intern-01",
    slug: "ai-developer-intern",
    title: "AI Developer Intern",
    department: "Engineering & Research",
    location: "Remote / New Delhi",
    job_type: "Internship (3-6 Months)",
    experience: "Freshers / Students",
    salary: "₹25,000 - ₹40,000 / month",
    description: "Dive into the deep end of Artificial Intelligence. You will be working shoulder-to-shoulder with our senior architects to train models, build AI Agents, and deploy LLM applications for real-world enterprise use cases.",
    responsibilities: [
      "Assist in developing autonomous AI agents and fine-tuning open-source LLMs.",
      "Build robust API integrations connecting LLMs to external enterprise data pipelines.",
      "Write clean, documented Python code and participate in sprint planning and code reviews.",
      "Benchmark and optimize model response latency and accuracy."
    ],
    requirements: [
      "Strong foundational knowledge of Python and Machine Learning concepts.",
      "Experience (academic or personal projects) with PyTorch, LangChain, or TensorFlow.",
      "Familiarity with NLP, LLMs (OpenAI, Anthropic APIs), and Vector Databases (Pinecone/Chroma).",
      "A hungry, problem-solving mindset and willingness to learn extremely fast."
    ],
    skills: ["Python", "PyTorch", "LangChain", "LLMs", "FastAPI", "Vector DBs"],
    status: "published",
    created_at: "2026-09-01T10:00:00Z",
    updated_at: "2026-09-01T10:00:00Z",
    views_count: 148,
    applications_count: 12
  },
  {
    id: "job-seo-spec-02",
    slug: "seo-marketing-specialist",
    title: "SEO Marketing Specialist",
    department: "Marketing & Growth",
    location: "Remote",
    job_type: "Full-time",
    experience: "2+ years",
    salary: "₹6,00,000 - ₹9,00,000 / annum",
    description: "Drive the organic growth engine of Fastigo. You will be responsible for architecting and executing advanced SEO strategies, content architectures, and technical site audits to dominate search rankings in the highly competitive B2B tech space.",
    responsibilities: [
      "Execute end-to-end technical SEO audits, core web vitals optimization, and structured data.",
      "Perform comprehensive keyword research and content gap analysis for enterprise AI keywords.",
      "Collaborate with engineering and design to ensure modern SEO best practices across web applications.",
      "Monitor, analyze, and report on organic search traffic, impressions, and conversions."
    ],
    requirements: [
      "Demonstrated track record of scaling organic traffic for tech or B2B SaaS websites.",
      "Deep understanding of technical SEO, Google Search Console, Ahrefs, and Semrush.",
      "Experience with Next.js/React SEO considerations (SSR, SSG, structured schema markup).",
      "Excellent analytical abilities and clear written communication."
    ],
    skills: ["Technical SEO", "Ahrefs", "Semrush", "Google Search Console", "Content Strategy", "Web Vitals"],
    status: "published",
    created_at: "2026-09-02T11:00:00Z",
    updated_at: "2026-09-02T11:00:00Z",
    views_count: 94,
    applications_count: 7
  },
  {
    id: "job-senior-fs-03",
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering & Research",
    location: "Remote / Bangalore",
    job_type: "Full-time",
    experience: "4+ years",
    salary: "₹18,00,000 - ₹28,00,000 / annum",
    description: "Lead the frontend and backend architectures for Fastigo client solutions. You will own high-performance React frontends, robust Node/Python microservices, and ensure sub-second latency across real-time data flows.",
    responsibilities: [
      "Architect and build responsive, accessible, and high-performance web applications using React, TypeScript, and modern CSS.",
      "Design resilient REST and GraphQL APIs backed by scalable MongoDB and PostgreSQL databases.",
      "Implement automated testing, CI/CD deployment pipelines, and observability monitoring.",
      "Mentor junior developers and participate in architectural design RFCs."
    ],
    requirements: [
      "4+ years of professional full-stack development experience in production environments.",
      "Deep proficiency in React, TypeScript, Tailwind CSS, and state management patterns.",
      "Strong server-side experience with FastAPI (Python) or Express/NestJS (Node.js).",
      "Solid database modeling and indexing skills with MongoDB and SQL databases."
    ],
    skills: ["React", "TypeScript", "Python", "FastAPI", "MongoDB", "Tailwind CSS", "Docker"],
    status: "published",
    created_at: "2026-09-03T09:00:00Z",
    updated_at: "2026-09-03T09:00:00Z",
    views_count: 210,
    applications_count: 19
  },
  {
    id: "job-cloud-arch-04",
    slug: "enterprise-cloud-architect",
    title: "Enterprise Cloud Architect",
    department: "Cloud & Infrastructure",
    location: "Remote / Hybrid (Mumbai)",
    job_type: "Full-time",
    experience: "6+ years",
    salary: "₹24,00,000 - ₹35,00,000 / annum",
    description: "Define multi-cloud architecture and governance for global enterprise digital transformations. You will lead cloud security, microservices infrastructure, and cost-optimization strategies across AWS, GCP, and Azure.",
    responsibilities: [
      "Design secure, fault-tolerant, and elastic cloud infrastructure solutions using Terraform and Kubernetes.",
      "Advise enterprise clients on cloud migration roadmaps, landing zones, and compliance frameworks.",
      "Establish automated DevSecOps pipelines and infrastructure-as-code standards.",
      "Conduct cloud cost optimization audits and performance tuning."
    ],
    requirements: [
      "6+ years architecting enterprise-scale cloud deployments (AWS, Azure, or GCP).",
      "Certified Cloud Solutions Architect (AWS Certified Solutions Architect Professional or equivalent).",
      "Hands-on expertise with Kubernetes, Docker, Terraform, and GitOps workflows.",
      "Strong executive communication and stakeholder management experience."
    ],
    skills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "DevOps", "Microservices"],
    status: "published",
    created_at: "2026-09-05T14:00:00Z",
    updated_at: "2026-09-05T14:00:00Z",
    views_count: 125,
    applications_count: 8
  },
  {
    id: "job-strat-lead-05",
    slug: "strategic-growth-partnerships-lead",
    title: "Strategic Growth & Partnerships Lead",
    department: "Sales & Strategy",
    location: "Remote / Gurgaon",
    job_type: "Full-time",
    experience: "3+ years",
    salary: "₹12,00,000 - ₹18,00,000 / annum",
    description: "Spearhead corporate alliances, client expansion, and market penetration for Fastigo AI solutions across North America, Europe, and APAC regions.",
    responsibilities: [
      "Identify, nurture, and close strategic partnerships with mid-market and enterprise technology clients.",
      "Work closely with executive leadership to define go-to-market strategies for emerging AI verticals.",
      "Represent Fastigo at industry conferences, webinars, and executive briefing sessions.",
      "Build scalable sales pipeline funnels and collaborate with marketing on demand generation."
    ],
    requirements: [
      "3+ years of experience in B2B tech sales, strategic alliances, or business development.",
      "Demonstrated ability to close high-ticket enterprise contracts and manage long sales cycles.",
      "Familiarity with AI, cloud computing, and digital transformation technology trends.",
      "Exceptional negotiation, presentation, and relationship-building skills."
    ],
    skills: ["B2B Sales", "Strategic Partnerships", "Enterprise Tech", "Negotiation", "Client Growth"],
    status: "draft",
    created_at: "2026-09-08T16:00:00Z",
    updated_at: "2026-09-08T16:00:00Z",
    views_count: 42,
    applications_count: 0
  }
];

const INITIAL_MOCK_APPS: CandidateApplication[] = [
  {
    id: "app-001",
    job_id: "job-ai-intern-01",
    job_title: "AI Developer Intern",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/rohan-sharma-ai",
    portfolio: "https://github.com/rohan-ai",
    experience_years: "1 year",
    message: "I have built multiple autonomous agent workflows with LangChain and fine-tuned LLaMA-3 models on custom domain datasets. Excited to contribute to Fastigo!",
    status: "shortlisted",
    created_at: "2026-09-12T14:30:00Z"
  },
  {
    id: "app-002",
    job_id: "job-senior-fs-03",
    job_title: "Senior Full-Stack Engineer",
    name: "Pooja Mehta",
    email: "pooja.mehta@example.com",
    phone: "+91 98123 45678",
    linkedin: "https://linkedin.com/in/pooja-mehta-dev",
    portfolio: "https://poojamehta.dev",
    experience_years: "5 years",
    message: "5 years scaling React and FastAPI architectures. Spearheaded migration of legacy monolith to containerized microservices handling 2M requests/day.",
    status: "reviewed",
    created_at: "2026-09-13T09:15:00Z"
  },
  {
    id: "app-003",
    job_id: "job-seo-spec-02",
    job_title: "SEO Marketing Specialist",
    name: "Amitav Verma",
    email: "amitav.verma@example.com",
    phone: "+91 99887 76655",
    linkedin: "https://linkedin.com/in/amitav-verma-seo",
    experience_years: "3 years",
    message: "Scaled organic B2B tech traffic by 340% in 12 months using topical authority clustering and programmatic SEO schema.",
    status: "pending",
    created_at: "2026-09-14T16:45:00Z"
  }
];

function getStoredMockJobs(): Job[] {
  try {
    const raw = localStorage.getItem('fastigo_mock_jobs');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  localStorage.setItem('fastigo_mock_jobs', JSON.stringify(INITIAL_MOCK_JOBS));
  return INITIAL_MOCK_JOBS;
}

function setStoredMockJobs(jobs: Job[]) {
  localStorage.setItem('fastigo_mock_jobs', JSON.stringify(jobs));
}

function getStoredMockApps(): CandidateApplication[] {
  try {
    const raw = localStorage.getItem('fastigo_mock_apps');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  localStorage.setItem('fastigo_mock_apps', JSON.stringify(INITIAL_MOCK_APPS));
  return INITIAL_MOCK_APPS;
}

function setStoredMockApps(apps: CandidateApplication[]) {
  localStorage.setItem('fastigo_mock_apps', JSON.stringify(apps));
}

// --------------------------------------------------------------------------
// Offline Mock API Handler (Activated automatically if backend is offline)
// --------------------------------------------------------------------------

function handleMockRequest<T>(endpoint: string, options: RequestInit = {}): T {
  const method = (options.method || 'GET').toUpperCase();
  const cleanEndpoint = endpoint.split('?')[0];

  // Auth: Login
  if (cleanEndpoint === '/auth/login' && method === 'POST') {
    const body = options.body ? JSON.parse(options.body as string) : {};
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (email === 'admin@fastigo.co' && password === 'Fastigo@2026!') {
      const demoToken = 'demo_token_fastigo_admin_' + Date.now();
      const demoUser: AdminUser = {
        id: 'demo-admin-001',
        email: 'admin@fastigo.co',
        name: 'Fastigo Talent Admin (Demo Mode)',
        role: 'admin',
      };
      setAuthToken(demoToken);
      setAuthUser(demoUser);
      return {
        access_token: demoToken,
        token_type: 'bearer',
        admin: demoUser,
      } as T;
    } else {
      throw new Error('Invalid email or password. Please check your credentials.');
    }
  }

  // Auth: Me
  if (cleanEndpoint === '/auth/me') {
    const user = getAuthUser();
    if (user) return user as T;
    return {
      id: 'demo-admin-001',
      email: 'admin@fastigo.co',
      name: 'Fastigo Talent Admin (Demo Mode)',
      role: 'admin',
    } as T;
  }

  // Auth: Refresh
  if (cleanEndpoint === '/auth/refresh') {
    const user = getAuthUser() || {
      id: 'demo-admin-001',
      email: 'admin@fastigo.co',
      name: 'Fastigo Talent Admin (Demo Mode)',
      role: 'admin',
    };
    const newToken = 'demo_token_fastigo_admin_' + Date.now();
    setAuthToken(newToken);
    setAuthUser(user);
    return {
      access_token: newToken,
      token_type: 'bearer',
      admin: user,
    } as T;
  }

  // Auth: Logout
  if (cleanEndpoint === '/auth/logout') {
    clearAuthToken();
    return { message: 'Logged out successfully' } as T;
  }

  // Stats
  if (cleanEndpoint === '/admin/stats') {
    const jobs = getStoredMockJobs();
    const apps = getStoredMockApps();
    const stats: DashboardStats = {
      total_jobs: jobs.length,
      active_jobs: jobs.filter(j => j.status === 'published').length,
      draft_jobs: jobs.filter(j => j.status === 'draft').length,
      closed_jobs: jobs.filter(j => j.status === 'closed').length,
      total_applications: apps.length,
      recent_applications_count: apps.length,
    };
    return stats as T;
  }

  // Jobs: List
  if (cleanEndpoint === '/jobs' && method === 'GET') {
    let jobs = getStoredMockJobs();
    if (endpoint.includes('?')) {
      const params = new URLSearchParams(endpoint.split('?')[1]);
      const status = params.get('status');
      const dept = params.get('department');
      const search = params.get('search');
      const includeAll = params.get('include_all') === 'true';

      if (!includeAll && !status) {
        jobs = jobs.filter(j => j.status === 'published');
      } else if (status && status !== 'All') {
        jobs = jobs.filter(j => j.status === status);
      }
      if (dept && dept !== 'All') {
        jobs = jobs.filter(j => j.department.toLowerCase() === dept.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        jobs = jobs.filter(j => 
          j.title.toLowerCase().includes(q) || 
          j.description.toLowerCase().includes(q) ||
          j.skills.some(s => s.toLowerCase().includes(q))
        );
      }
    } else {
      jobs = jobs.filter(j => j.status === 'published');
    }
    return jobs as T;
  }

  // Jobs: Create
  if (cleanEndpoint === '/jobs' && method === 'POST') {
    const body: JobInput = JSON.parse(options.body as string);
    const jobs = getStoredMockJobs();
    const newJob: Job = {
      ...body,
      id: 'job-demo-' + Date.now(),
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views_count: 0,
      applications_count: 0,
    };
    jobs.unshift(newJob);
    setStoredMockJobs(jobs);
    return newJob as T;
  }

  // Jobs: Single Get, Update, Delete, Publish, Close
  if (cleanEndpoint.startsWith('/jobs/')) {
    const parts = cleanEndpoint.split('/');
    const idOrSlug = parts[2];
    const subAction = parts[3];
    const jobs = getStoredMockJobs();
    const jobIndex = jobs.findIndex(j => j.id === idOrSlug || j.slug === idOrSlug);

    if (subAction === 'publish' && method === 'PATCH') {
      if (jobIndex >= 0) {
        jobs[jobIndex].status = 'published';
        jobs[jobIndex].updated_at = new Date().toISOString();
        setStoredMockJobs(jobs);
        return jobs[jobIndex] as T;
      }
    }
    if (subAction === 'close' && method === 'PATCH') {
      if (jobIndex >= 0) {
        jobs[jobIndex].status = 'closed';
        jobs[jobIndex].updated_at = new Date().toISOString();
        setStoredMockJobs(jobs);
        return jobs[jobIndex] as T;
      }
    }
    if (method === 'PUT' && jobIndex >= 0) {
      const body = JSON.parse(options.body as string);
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        ...body,
        updated_at: new Date().toISOString(),
      };
      setStoredMockJobs(jobs);
      return jobs[jobIndex] as T;
    }
    if (method === 'DELETE' && jobIndex >= 0) {
      jobs.splice(jobIndex, 1);
      setStoredMockJobs(jobs);
      return { message: 'Job deleted successfully', id: idOrSlug } as T;
    }
    if (jobIndex >= 0) {
      return jobs[jobIndex] as T;
    }
  }

  // Applications: List
  if (cleanEndpoint === '/applications' && method === 'GET') {
    let apps = getStoredMockApps();
    if (endpoint.includes('?')) {
      const params = new URLSearchParams(endpoint.split('?')[1]);
      const status = params.get('status');
      const jobId = params.get('job_id');
      if (status && status !== 'All') {
        apps = apps.filter(a => a.status === status);
      }
      if (jobId) {
        apps = apps.filter(a => a.job_id === jobId);
      }
    }
    return apps as T;
  }

  // Applications: Submit
  if (cleanEndpoint === '/applications' && method === 'POST') {
    const body: ApplicationInput = JSON.parse(options.body as string);
    const apps = getStoredMockApps();
    const newApp: CandidateApplication = {
      ...body,
      id: 'app-demo-' + Date.now(),
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    apps.unshift(newApp);
    setStoredMockApps(apps);
    return newApp as T;
  }

  // Applications: Update Status
  if (cleanEndpoint.startsWith('/applications/') && method === 'PATCH') {
    const parts = cleanEndpoint.split('/');
    const appId = parts[2];
    const body = JSON.parse(options.body as string);
    const apps = getStoredMockApps();
    const appIndex = apps.findIndex(a => a.id === appId);
    if (appIndex >= 0) {
      apps[appIndex].status = body.status;
      setStoredMockApps(apps);
      return apps[appIndex] as T;
    }
  }

  // Contact: Submit
  if (cleanEndpoint === '/contact' && method === 'POST') {
    return { message: 'Message sent successfully', id: 'contact-' + Date.now() } as T;
  }

  return {} as T;
}

// Global promise lock to prevent duplicate refresh requests
let refreshPromise: Promise<{ access_token: string; token_type: string; refresh_token?: string; admin: AdminUser }> | null = null;

// Base Fetcher with cookie credentials, automatic token refresh, and offline demo fallback
async function apiRequest<T>(endpoint: string, options: RequestInit & { _isRetry?: boolean } = {}): Promise<T> {
  const token = getAuthToken();

  // If already in offline demo session, route directly to mock handler
  if (token && token.startsWith('demo_')) {
    return handleMockRequest<T>(endpoint, options);
  }

  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers,
    });
  } catch (networkError) {
    // Network Error: Backend is offline / unreachable.
    // Fall back to local mock data seamlessly for demo & offline testing!
    console.warn(`Fastigo API unreachable at ${API_BASE_URL}${endpoint}. Switching to Offline / Demo Mode.`);
    return handleMockRequest<T>(endpoint, options);
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
