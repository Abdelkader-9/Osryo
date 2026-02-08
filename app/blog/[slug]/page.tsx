'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogPost } from '@/types/index';
import { getBlogPostBySlug } from '@/lib/api-service';
import { useParams } from 'next/navigation';
import Cta from '@/components/Cta';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    getBlogPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <p>Loading post...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-24 flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold text-primary">Post not found</h1>
          <Link href="/blog" className="text-accent hover:opacity-80">
            Back to Blog
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
        <article>
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="text-accent hover:opacity-80 mb-6 inline-block">
                ← Back to Blog
              </Link>

              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-muted text-foreground px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl font-bold text-primary mb-6">{post.title}</h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div>
                  <p className="text-sm opacity-80">By</p>
                  <p className="font-semibold text-foreground">{post.author}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Published</p>
                  <p className="font-semibold text-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Updated</p>
                  <p className="font-semibold text-foreground">{new Date(post.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6">{post.excerpt}</p>

                <div className="bg-accent p-8 rounded-lg border border-border mb-8">
                  <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="text-xl  text-primary-foreground mb-4">Share this article</h3>
                  <div className="flex gap-4">
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      Twitter
                    </a>
                    <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                      LinkedIn
                    </a>
                    <a href="#" className="text-primary-foreground hover:opacity-80 transition-opacity">
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>

      <Cta/>
      </main>
      <Footer />
    </>
  );
}
