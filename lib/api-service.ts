import {
  Service,
  CaseStudy,
  BlogPost,
  TeamMember,
  Lead,
  DashboardStats,
} from '../types/index';
import {
  mockServices,
  mockCaseStudies,
  mockBlogPosts,
  mockTeamMembers,
  mockLeads,
  mockDashboardStats,
} from './mock-data';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Services API
export async function getServices(): Promise<Service[]> {
  await delay(300);
  return mockServices;
}

export async function getServiceById(id: string): Promise<Service | null> {
  await delay(200);
  return mockServices.find((s) => s.id === id) || null;
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
  await delay(400);
  const service = mockServices.find((s) => s.id === id);
  if (service) {
    Object.assign(service, data);
    return service;
  }
  return null;
}

// Case Studies API
export async function getCaseStudies(): Promise<CaseStudy[]> {
  await delay(300);
  return mockCaseStudies;
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  await delay(300);
  return mockCaseStudies.filter((cs) => cs.featured);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  await delay(200);
  return mockCaseStudies.find((cs) => cs.link.includes(slug)) || null;
}

// Blog API
export async function getBlogPosts(published = true): Promise<BlogPost[]> {
  await delay(300);
  return mockBlogPosts.filter((post) => !published || post.published);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  await delay(200);
  return mockBlogPosts.find((post) => post.slug === slug) || null;
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  await delay(200);
  const lowerQuery = query.toLowerCase();
  return mockBlogPosts.filter(
    (post) =>
      post.published &&
      (post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
  );
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  await delay(400);
  const newPost: BlogPost = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockBlogPosts.push(newPost);
  return newPost;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  await delay(400);
  const post = mockBlogPosts.find((p) => p.id === id);
  if (post) {
    Object.assign(post, data, { updatedAt: new Date() });
    return post;
  }
  return null;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await delay(400);
  const index = mockBlogPosts.findIndex((p) => p.id === id);
  if (index > -1) {
    mockBlogPosts.splice(index, 1);
    return true;
  }
  return false;
}

// Team API
export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(300);
  return mockTeamMembers;
}

export async function addTeamMember(data: Omit<TeamMember, 'id'>): Promise<TeamMember> {
  await delay(400);
  const newMember: TeamMember = {
    ...data,
    id: Date.now().toString(),
  };
  mockTeamMembers.push(newMember);
  return newMember;
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember | null> {
  await delay(400);
  const member = mockTeamMembers.find((m) => m.id === id);
  if (member) {
    Object.assign(member, data);
    return member;
  }
  return null;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  await delay(400);
  const index = mockTeamMembers.findIndex((m) => m.id === id);
  if (index > -1) {
    mockTeamMembers.splice(index, 1);
    return true;
  }
  return false;
}

// Leads API
export async function getLeads(): Promise<Lead[]> {
  await delay(300);
  return mockLeads;
}

export async function getLeadById(id: string): Promise<Lead | null> {
  await delay(200);
  return mockLeads.find((l) => l.id === id) || null;
}

export async function createLead(data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  await delay(400);
  const newLead: Lead = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  mockLeads.push(newLead);
  return newLead;
}

export async function updateLead(id: string, data: Partial<Lead>): Promise<Lead | null> {
  await delay(400);
  const lead = mockLeads.find((l) => l.id === id);
  if (lead) {
    Object.assign(lead, data);
    return lead;
  }
  return null;
}

// Dashboard Stats API
export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(500);
  return mockDashboardStats;
}

// Authentication API
interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export async function loginAdmin(credentials: AuthCredentials): Promise<AuthResponse> {
  await delay(600);
  // Mock authentication - in production this would validate against a real backend
  if (credentials.email === 'admin@agency.com' && credentials.password === 'password') {
    return {
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now(),
    };
  }
  return {
    success: false,
    message: 'Invalid email or password',
  };
}
