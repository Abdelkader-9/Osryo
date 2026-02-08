'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TeamMember } from '@/types/index';
import { getTeamMembers } from '@/lib/api-service';
import Image from 'next/image';
export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers().then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Meet the talented people behind your next great project
            </p>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-12">Loading team...</div>
        ) : (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                  <div key={member.id} className="bg-accent p-6 rounded-lg  text-center">
                    <div className=" mx-auto m-2 flex items-center justify-center">
                      <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={200} 
                      height={200} 
                      className="rounded-md object-cover" 
                      loading='lazy'
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary-foreground mb-1">{member.name}</h3>
                    <p className="text-muted-foreground font-semibold mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-3 text-sm">
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="text-muted-foreground hover:opacity-80 transition-opacity">
                          Twitter
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="text-muted-foreground hover:opacity-80 transition-opacity">
                          LinkedIn
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} className="text-muted-foreground hover:opacity-80 transition-opacity">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Let's create together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get to know our team and let's start working on your next project.
            </p>
            <a
              href="/contact"
              className=" btn-secondary py-4"
            >
              Start a Conversation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
