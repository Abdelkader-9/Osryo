'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseStudy } from '@/types/index';
import { getFeaturedCaseStudies } from '@/lib/api-service';

export function FeaturedCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedCaseStudies().then((data) => {
      setCaseStudies(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading case studies...</div>;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Featured Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore some of our most successful projects and the impact we've delivered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={study.link}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent transition-all hover:shadow-lg"
            >
              <div className="relative h-80 bg-muted flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <span className="text-white text-center font-semibold">Project Image</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs bg-muted text-foreground px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-accent font-semibold">Read case study →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/case-studies"
            className="btn-primary px-8 py-3 inline-block"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
