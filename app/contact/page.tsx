'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { createLead } from '@/lib/api-service';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
    budget: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createLead({
        ...formData,
        status: 'new',
        notes: '',
      });
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectDetails: '',
        budget: '',
        timeline: '',
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Let's Connect</h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your project and let's see how we can help
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {submitted && (
              <div className="bg-accent text-accent-foreground p-4 rounded-lg mb-6 text-center">
                Thank you for reaching out! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-2">
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-foreground mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-semibold text-foreground mb-2">
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3  border border-border rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent rounded-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground mb-12 text-center">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-lg text-muted-foreground mb-2">Email</h3>
                <a href="mailto:hello@studio.com" className="text-muted-foreground hover:opacity-80 transition-opacity">
                  hello@studio.com
                </a>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-muted-foreground mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-muted-foreground hover:opacity-80 transition-opacity">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-muted-foreground mb-2">Social</h3>
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-muted-foreground hover:opacity-80 transition-opacity">
                    Twitter
                  </a>
                  <a href="#" className="text-muted-foreground hover:opacity-80 transition-opacity">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
