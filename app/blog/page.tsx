'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogPost } from '@/types/index';
import { getBlogPosts, searchBlogPosts } from '@/lib/api-service';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    getBlogPosts(true).then((data) => {
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let results = posts;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedTag) {
      results = results.filter((post) => post.tags.includes(selectedTag));
    }

    setFilteredPosts(results);
  }, [searchQuery, selectedTag, posts]);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(0, 5);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-primary mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, stories, and ideas about digital design and development
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-12">Loading blog posts...</div>
        ) : (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No posts found. Try adjusting your search.</p>
                    </div>
                  ) : (
                    <div className="space-y-12">
                      {filteredPosts.map((post) => (
                        <article key={post.id} className="border-b border-border pb-12">
                          <div className="mb-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                  selectedTag === tag
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-muted text-foreground hover:bg-border'
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                          <Link href={`/blog/${post.slug}`} className="group">
                            <h2 className="text-3xl font-bold text-primary-foreground mb-2 group-hover:text-natural-800 transition-colors">
                              {post.title}
                            </h2>
                          </Link>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <span>{post.author}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-lg text-foreground mb-4">{post.excerpt}</p>
                          <Link href={`/blog/${post.slug}`} className="text-primary-foreground hover:opacity-80 transition-opacity">
                            Read more →
                          </Link>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <aside>
                  <div className="sticky top-24 bg-secondary p-8 rounded-lg border border-border">
                    <h3 className="text-xl font-bold text-primary mb-6">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`text-sm px-3 py-2 rounded-full transition-colors ${
                            selectedTag === tag
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-background text-foreground border border-border hover:border-accent'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
