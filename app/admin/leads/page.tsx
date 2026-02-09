'use client';

import { useEffect, useState } from 'react';
import { Lead } from '@/types/index';
import { getLeads, updateLead } from '@/lib/api-service';
import { Mail, Phone, Calendar } from 'lucide-react';

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  proposal_sent: 'bg-purple-100 text-purple-800',
  negotiating: 'bg-orange-100 text-orange-800',
  closed: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  proposal_sent: 'Proposal Sent',
  negotiating: 'Negotiating',
  closed: 'Closed',
  lost: 'Lost',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Lead['status']>('new');

  useEffect(() => {
    getLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setNotes(lead.notes);
    setStatus(lead.status);
  };

  const handleSave = async () => {
    if (selectedLead) {
      await updateLead(selectedLead.id, { notes, status });
      setLeads(leads.map((l) => (l.id === selectedLead.id ? { ...l, notes, status } : l)));
      setSelectedLead(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading leads...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">Leads Management</h1>
        <p className="text-muted-foreground">Manage and track potential clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-accent border border-border rounded-lg overflow-hidden">
            {leads.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No leads yet</div>
            ) : (
              <div className="divide-y divide-border">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => handleSelectLead(lead)}
                    className={`p-4 cursor-pointer hover:bg-secondary transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-secondary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-primary">{lead.name}</h3>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {lead.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedLead && (
          <div className="bg-accent border border-border rounded-lg p-6 sticky top-8 h-fit">
            <h2 className="text-xl font-bold text-primary mb-4">Lead Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <p className="text-foreground">{selectedLead.name}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <p className="text-foreground">{selectedLead.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company</label>
                <p className="text-foreground">{selectedLead.company}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Project Details</label>
                <p className="text-foreground text-sm line-clamp-2">{selectedLead.projectDetails}</p>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-foreground mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Lead['status'])}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
                >
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-accent border border-border rounded-lg focus:outline-none focus:border-accent resize-none text-sm"
                  placeholder="Add your notes here..."
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-primary border  text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
