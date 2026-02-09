'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/index';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/api-service';
import { Trash2, Plus } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    published: false,
    tags: [],
  });

  useEffect(() => {
    getBlogPosts(false).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleNewPost = () => {
    setIsCreating(true);
    setSelectedPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      image: '/images/blog-default.jpg',
      published: false,
      tags: [],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsCreating(false);
    setFormData(post);
  };

  const handleChange = (field: keyof BlogPost, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (isCreating) {
      const newPost = await createBlogPost(formData as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>);
      setPosts([newPost, ...posts]);
    } else if (selectedPost) {
      await updateBlogPost(selectedPost.id, formData);
      setPosts(posts.map((p) => (p.id === selectedPost.id ? { ...selectedPost, ...formData } : p)));
    }
    setIsCreating(false);
    setSelectedPost(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id);
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading posts...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage blog posts</p>
        </div>
        <button
          onClick={handleNewPost}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-accent  border border-border rounded-lg overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No blog posts yet</div>
            ) : (
              <div className="divide-y  divide-border">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4  hover:bg-secondary transition-colors cursor-pointer ${
                      selectedPost?.id === post.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => handleEdit(post)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary">{post.title}</h3>
                        <p className="text-xs text-muted-foreground">{post.slug}</p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2 line-clamp-1">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground flex gap-3">
                        <span>{post.author}</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {(isCreating || selectedPost) && (
          <div className="bg-muted-foreground border border-border rounded-lg p-6 sticky top-8 h-fit overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="text-xl font-bold text-primary mb-4">{isCreating ? 'New Post' : 'Edit Post'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Content</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => handleChange('tags', e.target.value.split(',').map((t) => t.trim()))}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published || false}
                    onChange={(e) => handleChange('published', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-semibold text-foreground">Publish this post</span>
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setSelectedPost(null);
                  }}
                  className="flex-1 bg-secondary text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
