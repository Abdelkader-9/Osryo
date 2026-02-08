'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Service } from '@/types/index';
import { getServiceById } from '@/lib/api-service';
import { useParams } from 'next/navigation';

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    getServiceById(id).then((data) => {
      setService(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <p>Loading service...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold text-primary">Service not found</h1>
          <Link href="/services" className="text-accent hover:opacity-80">
            Back to Services
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
            <Link href="/services" className="text-accent hover:opacity-80 mb-6 inline-block">
              ← Back to Services
            </Link>
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-5xl font-bold text-primary mb-4">{service.name}</h1>
            <p className="text-xl text-muted-foreground">{service.description}</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-4">About This Service</h2>
                  <p className="text-lg text-foreground leading-relaxed mb-6">{service.longDescription}</p>
                </div>

                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-4">What We Deliver</h2>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Strategic insights and comprehensive analysis</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Custom solutions tailored to your needs</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Expert execution and ongoing support</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Measurable results and ROI</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-primary mb-4">Our Process</h2>
                  <div className="space-y-6">
                    {['Discovery', 'Strategy', 'Execution', 'Optimization'].map((step, index) => (
                      <div key={step} className="flex gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-full font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary mb-2">{step}</h3>
                          <p className="text-muted-foreground">
                            {step === 'Discovery'
                              ? 'Understanding your business, goals, and target audience'
                              : step === 'Strategy'
                                ? 'Developing a customized strategy and roadmap'
                                : step === 'Execution'
                                  ? 'Implementing the strategy with excellence'
                                  : 'Monitoring, measuring, and continuously improving'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 bg-secondary p-8 rounded-lg border border-border">
                  <h3 className="text-2xl font-bold text-primary mb-4">Ready to get started?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how {service.name.toLowerCase()} can help your business grow.
                  </p>
                  <Link
                    href="/contact"
                    className="block bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-center"
                  >
                    Get in Touch
                  </Link>
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
