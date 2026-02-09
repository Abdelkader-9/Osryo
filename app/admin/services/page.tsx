'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types/index';
import { getServices, updateService } from '@/lib/api-service';
import { Eye, EyeOff } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editData, setEditData] = useState<Service | null>(null);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setEditData({ ...service });
  };

  const handleSave = async () => {
    if (editData) {
      await updateService(editData.id, editData);
      setServices(services.map((s) => (s.id === editData.id ? editData : s)));
      setSelectedService(null);
      setEditData(null);
    }
  };

  const handleChange = (field: keyof Service, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const toggleVisibility = async (service: Service) => {
    await updateService(service.id, { isVisible: !service.isVisible });
    setServices(services.map((s) => (s.id === service.id ? { ...s, isVisible: !s.isVisible } : s)));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading services...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">Services Management</h1>
        <p className="text-muted-foreground">Manage your service offerings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-accent border border-border rounded-lg p-4 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h3 className="font-semibold text-primary">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleVisibility(service)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {service.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                <p className="text-sm text-foreground mb-4 line-clamp-2">{service.description}</p>

                <button
                  onClick={() => handleEdit(service)}
                  className="w-full border text-primary-foreground px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {editData && (
          <div className="bg-accent border border-border rounded-lg p-6 sticky top-8 h-fit">
            <h2 className="text-xl font-bold text-primary-foreground mb-4">Edit Service</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Long Description</label>
                <textarea
                  value={editData.longDescription}
                  onChange={(e) => handleChange('longDescription', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent"
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
                    setSelectedService(null);
                    setEditData(null);
                  }}
                  className="flex-1  text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-border transition-colors"
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
