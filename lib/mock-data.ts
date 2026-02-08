import { Service, CaseStudy, BlogPost, TeamMember, Lead, DashboardStats } from '../types/index';
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Brand Strategy',
    description: 'Strategic brand positioning and identity',
    longDescription:
      'We help you define your brand identity, messaging, and positioning. Our comprehensive brand strategy process ensures your business stands out in a competitive market.',
      icon: '🎨',
    category: 'Strategy',
    isVisible: true,
    image: '/images/pexels-eva-bronzini-7661590.webp',
  },
  {
    id: '2',
    name: 'Web Design',
    description: 'Modern, responsive website design',
    longDescription:
      'Custom website design that converts visitors into customers. We create beautiful, user-friendly experiences that reflect your brand values.',
      icon: '💻',
    category: 'Design',
    isVisible: true,
    image: '/images/pexels-davidebiza-11813187.webp',
  },
  {
    id: '3',
    name: 'Development',
    description: 'Full-stack web application development',
    longDescription:
      'Scalable, robust web applications built with modern technologies. From frontend to backend, we deliver solutions that perform.',
      icon: '⚙️',
    category: 'Development',
    isVisible: true,
    image: '/images/pexels-fotios-photos-16129705.webp',
  },
  {
    id: '4',
    name: 'Digital Marketing',
    description: 'SEO, SEM, and content marketing',
    longDescription:
      'Drive traffic and engagement through strategic digital marketing. We combine SEO, paid ads, and content to maximize your ROI.',
      icon: '📊',
    category: 'Marketing',
    isVisible: true,
    image: '/images/pexels-mikael-blomkvist-6476808.webp',
  },
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'Increased conversion rate by 45%',
    longDescription:
      'Complete redesign of an e-commerce platform resulting in improved user experience and significant revenue increase.',
    image: '/images/case-study-1.jpg',
    link: '/case-studies/ecommerce-redesign',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    title: 'SaaS Dashboard Launch',
    description: 'Delivered in 3 months',
    longDescription:
      'Built a comprehensive analytics dashboard for a B2B SaaS company with real-time data visualization.',
    image: '/images/case-study-2.jpg',
    link: '/case-studies/saas-dashboard',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Chart.js'],
    year: 2024,
    featured: true,
  },
  {
    id: '3',
    title: 'Mobile App for Startups',
    description: 'Raised Series A funding',
    longDescription: 'Designed and developed a mobile app that helped a startup secure Series A funding.',
    image: '/images/case-study-3.jpg',
    link: '/case-studies/mobile-app',
    technologies: ['React Native', 'Firebase', 'Node.js'],
    year: 2023,
    featured: false,
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Design in 2024',
    slug: 'future-web-design-2024',
    excerpt:
      'Exploring emerging trends in web design and what they mean for your business.',
    content: `Web design continues to evolve rapidly. In 2024, we're seeing increased focus on AI-powered personalization, accessibility-first design, and performance optimization. Learn how these trends can benefit your business...`,
    author: 'Sarah Johnson',
    image: '/images/blog-1.jpg',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    published: true,
    tags: ['web-design', 'trends', 'future'],
  },
  {
    id: '2',
    title: 'Why User Experience Matters',
    slug: 'why-ux-matters',
    excerpt: 'UX isn\'t just about design—it\'s about business results.',
    content: `A great user experience can increase conversions, reduce bounce rates, and build customer loyalty. Here's what research shows about the impact of UX on business...`,
    author: 'Mike Chen',
    image: '/images/blog-2.jpg',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    published: true,
    tags: ['ux', 'design', 'conversion'],
  },
  {
    id: '3',
    title: 'Building Scalable Web Applications',
    slug: 'scalable-web-apps',
    excerpt:
      'Best practices for building web apps that grow with your business.',
    content: `Scalability is critical for growing businesses. Learn about architecture decisions, database design, and deployment strategies...`,
    author: 'James Wilson',
    image: '/images/blog-3.jpg',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    published: true,
    tags: ['development', 'architecture', 'backend'],
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Founder & Creative Director',
    bio: 'Award-winning designer with 10+ years of experience in digital agencies.',
    image: '/images/team-1.jpg',
    email: 'alex@agency.com',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: '2',
    name: 'Jordan Lee',
    role: 'Lead Developer',
    bio: 'Full-stack developer passionate about building scalable web applications.',
    image: '/images/team-2.jpg',
    email: 'jordan@agency.com',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '3',
    name: 'Maya Patel',
    role: 'UX/UI Designer',
    bio: 'Creative problem solver focused on user-centered design.',
    image: '/images/team-3.jpg',
    email: 'maya@agency.com',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '4',
    name: 'Chris Thompson',
    role: 'Digital Marketing Specialist',
    bio: 'Data-driven marketer helping businesses grow online.',
    image: '/images/team-4.jpg',
    email: 'chris@agency.com',
    social: {
      linkedin: 'https://linkedin.com',
    },
  },
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Anderson',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Startup Inc',
    projectDetails: 'Need a new website and mobile app for our SaaS platform',
    budget: '$50,000 - $75,000',
    timeline: '3-4 months',
    status: 'new',
    notes: 'Very interested, wants to meet next week',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    name: 'Sarah Green',
    email: 'sarah@ecommerce.io',
    phone: '+1 (555) 234-5678',
    company: 'Online Retail Solutions',
    projectDetails: 'E-commerce platform overhaul and digital marketing campaign',
    budget: '$100,000+',
    timeline: '6 months',
    status: 'contacted',
    notes: 'Initial call scheduled for Feb 5th',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@finance.co',
    phone: '+1 (555) 345-6789',
    company: 'Finance Corporation',
    projectDetails: 'Dashboard and analytics platform',
    budget: '$75,000 - $100,000',
    timeline: '4-5 months',
    status: 'proposal_sent',
    notes: 'Proposal sent on Jan 30, waiting for feedback',
    createdAt: new Date('2024-01-22'),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalLeads: 15,
  newLeads: 3,
  servicesCount: 4,
  publishedPosts: 8,
  teamMembers: 4,
  conversionRate: 12.5,
};
