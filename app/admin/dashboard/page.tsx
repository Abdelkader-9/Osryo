'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DashboardStats } from '@/types/index';
import { getDashboardStats, getLeads, getBlogPosts, getTeamMembers } from '@/lib/api-service';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getLeads(), getBlogPosts(), getTeamMembers()]).then(
      ([dashStats]) => {
        setStats(dashStats);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Unable to load dashboard</div>;
  }

  const statCards = [
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Services',
      value: stats.servicesCount,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Published Posts',
      value: stats.publishedPosts,
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Team Members',
      value: stats.teamMembers,
      color: 'from-pink-500 to-pink-600',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const leadTrendData = [
    { month: 'Jan', leads: 4, closed: 1 },
    { month: 'Feb', leads: 5, closed: 2 },
    { month: 'Mar', leads: 8, closed: 2 },
    { month: 'Apr', leads: 6, closed: 3 },
    { month: 'May', leads: 10, closed: 3 },
    { month: 'Jun', leads: 12, closed: 4 },
  ];

  const leadStatusData = [
    { name: 'New', value: 3, fill: '#3b82f6' },
    { name: 'Contacted', value: 4, fill: '#10b981' },
    { name: 'Proposal', value: 2, fill: '#f59e0b' },
    { name: 'Negotiating', value: 2, fill: '#8b5cf6' },
    { name: 'Closed', value: 4, fill: '#06b6d4' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your agency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-accent border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{card.label}</p>
                <p className="text-4xl font-bold text-primary-foreground">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} opacity-10`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-accent border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Lead Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e6e3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#2d5a3d" strokeWidth={2} name="New Leads" />
              <Line type="monotone" dataKey="closed" stroke="#d4af37" strokeWidth={2} name="Closed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-accent border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Lead Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={leadStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#2d5a3d" dataKey="value">
                {leadStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-accent border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-foreground">Lead Response Rate</span>
              <span className="font-semibold text-muted-foreground ">24 hours avg</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-foreground">Active Projects</span>
              <span className="font-semibold text-muted-foreground">{Math.floor(stats.totalLeads * 0.6)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-foreground">Team Utilization</span>
              <span className="font-semibold text-muted-foreground">85%</span>
            </div>
          </div>
        </div>

        <div className="bg-accent border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              ✓ New lead received from TechStartup Inc
            </p>
            <p className="text-sm text-muted-foreground">✓ Blog post published: Digital Trends 2024</p>
            <p className="text-sm text-muted-foreground">✓ Team member profile updated</p>
            <p className="text-sm text-muted-foreground">✓ Service description modified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
