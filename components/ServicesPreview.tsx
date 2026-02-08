'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Service } from '@/types/index';
import { getServices } from '@/lib/api-service';
import Image from 'next/image';

export function ServicesPreview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text- mb-4 text-primary">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className=" p-8 rounded-lg  border-border bg-card transition-colors hover:shadow-lg"
            >
              <div className=" mb-4">
                <Image src={service.image} alt={service.name} width={64} height={64} /></div>
              <h3 className="text-2xl font-bold text-primary mb-2">{service.name}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link
                href={`/services/${service.id}`}
                className="text-muted hover:opacity-80 transition-opacity"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="btn-primary text-white border border-white"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
