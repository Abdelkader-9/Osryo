'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CaseStudy } from '@/types/index';
import { getCaseStudies } from '@/lib/api-service';
import Cta from '@/components/Cta';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCaseStudies().then((data) => {
      setCaseStudies(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground">
              Explore our successful projects and see the impact we've made for our clients
            </p>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-12">Loading case studies...</div>
        ) : (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudies.map((study) => (
                  <Link
                    key={study.id}
                    href={study.link}
                    className="group bg-card rounded-lg border border-border hover:border-accent transition-all overflow-hidden hover:shadow-lg"
                  >
                    <div className="relative h-72 bg-muted flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/40 transition-all" />
                      <span className="text-white text-center font-semibold relative z-10">Project Image</span>
                    </div>
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 text-lg font-semibold">{study.description}</p>
                      <p className="text-foreground mb-6">{study.longDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span key={tech} className="text-xs bg-muted text-foreground px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Cta/>
      </main>
      <Footer />
    </>
  );
}
