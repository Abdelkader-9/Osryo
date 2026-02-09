'use client';

import { useEffect, useState } from 'react';
import { TeamMember } from '@/types/index';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/api-service';
import { Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    email: '',
    image: '',
    social: { twitter: '', linkedin: '', github: '' },
  });

  useEffect(() => {
    getTeamMembers().then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  const handleNewMember = () => {
    setIsCreating(true);
    setSelectedMember(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      email: '',
      image: '/images/team-default.jpg',
      social: { twitter: '', linkedin: '', github: '' },
    });
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setIsCreating(false);
    setFormData(member);
  };

  const handleChange = (field: keyof TeamMember, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: 'twitter' | 'linkedin' | 'github', value: string) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [platform]: value },
    }));
  };

  const handleSave = async () => {
    if (isCreating) {
      const newMember = await addTeamMember(formData as Omit<TeamMember, 'id'>);
      setTeam([...team, newMember]);
    } else if (selectedMember) {
      await updateTeamMember(selectedMember.id, formData);
      setTeam(team.map((m) => (m.id === selectedMember.id ? { ...selectedMember, ...formData } : m)));
    }
    setIsCreating(false);
    setSelectedMember(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      await deleteTeamMember(id);
      setTeam(team.filter((m) => m.id !== id));
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading team...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <button
          onClick={handleNewMember}
          className="flex items-center gap-2 border text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map((member) => (
              <div key={member.id} className="bg-accent border border-border rounded-lg p-4 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
                             <Image 
                                    src={member.image} 
                                    alt={member.name} 
                                    width={200} 
                                    height={200} 
                                    className="rounded-lg object-cover" 
                                    loading='lazy'
                                />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-2">{member.bio}</p>

                <button
                  onClick={() => handleEdit(member)}
                  className="w-full border text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {(isCreating || selectedMember) && (
          <div className="bg-accent border border-border rounded-lg p-6 sticky top-8 h-fit overflow-y-auto max-h-[calc(100vh-120px)]">
            <h2 className="text-xl font-bold text-primary-foreground mb-4">{isCreating ? 'New Member' : 'Edit Member'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Twitter</label>
                <input
                  type="url"
                  value={formData.social?.twitter || ''}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.social?.linkedin || ''}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.social?.github || ''}
                  onChange={(e) => handleSocialChange('github', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 border text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1 bg-accent text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-border transition-colors"
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
