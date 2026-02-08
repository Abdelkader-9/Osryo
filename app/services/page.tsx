'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Service } from '@/types/index';
import { getServices } from '@/lib/api-service';
import Cta from '@/components/Cta';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions designed to elevate your business
            </p>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-12">Loading services...</div>
        ) : (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group bg-card p-8 rounded-lg border border-border hover:border-accent transition-all hover:shadow-lg"
                  >
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h2 className="text-3xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>
                    <p className="text-foreground mb-6 line-clamp-3">{service.longDescription}</p>
                    <span className="text-accent font-semibold group-hover:opacity-80 transition-opacity">
                      Learn more →
                    </span>
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
