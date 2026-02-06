

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  isVisible: boolean;
  image: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  link: string;
  technologies: string[];
  year: number;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
  budget?: string;
  timeline?: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'negotiating' | 'closed' | 'lost';
  notes: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  servicesCount: number;
  publishedPosts: number;
  teamMembers: number;
  conversionRate: number;
}
