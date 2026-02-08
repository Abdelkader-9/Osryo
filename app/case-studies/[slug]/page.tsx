'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CaseStudy } from '@/types/index';
import { getCaseStudyBySlug } from '@/lib/api-service';
import { useParams } from 'next/navigation';
import Cta from '@/components/Cta';

export default function CaseStudyDetailPage() {
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    getCaseStudyBySlug(slug).then((data) => {
      setCaseStudy(data);
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <p>Loading case study...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!caseStudy) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold text-primary">Case study not found</h1>
          <Link href="/case-studies" className="text-accent hover:opacity-80">
            Back to Case Studies
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <Link href="/case-studies" className="text-accent hover:opacity-80 mb-6 inline-block">
              ← Back to Case Studies
            </Link>
            <h1 className="text-5xl font-bold text-primary mb-4">{caseStudy.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{caseStudy.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Year</p>
                <p className="font-semibold text-primary">{caseStudy.year}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Impact</p>
                <p className="font-semibold text-accent">+45%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold text-primary">3 months</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                <p className="font-semibold text-primary">4 people</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="relative h-96 bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <span className="text-white text-center font-semibold relative z-10">Project Visual</span>
              </div>

              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Project Overview</h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">{caseStudy.longDescription}</p>

              <p className="text-foreground leading-relaxed">
                This project showcased our ability to deliver complex solutions on tight timelines. The client saw significant improvements in user engagement and conversion rates within the first month of launch.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Challenges</h2>
              <ul className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">—</span>
                  <span>Complex integrations with legacy systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">—</span>
                  <span>Need for real-time data synchronization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">—</span>
                  <span>High-performance requirements under peak load</span>
                </li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Solution</h2>
              <p className="text-foreground leading-relaxed mb-6">
                We implemented a modern, scalable architecture using cutting-edge technologies. Our approach focused on performance, reliability, and user experience, resulting in a solution that exceeded expectations.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-secondary p-6 rounded-lg border border-border">
                  <p className="text-4xl font-bold text-accent mb-2">45%</p>
                  <p className="text-foreground">Increase in Conversion</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg border border-border">
                  <p className="text-4xl font-bold text-accent mb-2">60%</p>
                  <p className="text-foreground">Faster Load Times</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg border border-border">
                  <p className="text-4xl font-bold text-accent mb-2">3M+</p>
                  <p className="text-foreground">Monthly Users</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech) => (
                  <span key={tech} className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

            <Cta/>
      </main>
      <Footer />
    </>
  );
}
