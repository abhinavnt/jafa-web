'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plus, Trash2, Megaphone, Power } from 'lucide-react';

export default function OffersAdmin() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [text, setText] = useState('');
  const [daysValid, setDaysValid] = useState('5');
  const [submitting, setSubmitting] = useState(false);
  
  const supabase = createClient();

  const fetchOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setOffers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Calculate end date based on days valid
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(daysValid));

    const { error } = await supabase.from('offers').insert({
      text,
      end_date: endDate.toISOString(),
      is_active: true // New offers are active by default
    });

    if (!error) {
      setText('');
      setDaysValid('5');
      fetchOffers();
    } else {
      alert("Error creating offer: " + error.message);
    }
    setSubmitting(false);
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('offers')
      .update({ is_active: !currentStatus })
      .eq('id', id);
      
    if (!error) fetchOffers();
  };

  const deleteOffer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    const { error } = await supabase.from('offers').delete().eq('id', id);
    if (!error) fetchOffers();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Megaphone size={24} className="text-[#8B3A2B]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2A1A12]">Offer Pinning</h2>
          <p className="text-[#5C3D2E] text-sm">Manage dynamic top-banner offers for your Home Page.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#DCD0C3] shadow-sm">
            <h3 className="font-bold text-[#2A1A12] mb-4 flex items-center gap-2">
              <Plus size={18} className="text-[#8B3A2B]" /> Create New Offer
            </h3>
            
            <form onSubmit={handleCreateOffer} className="space-y-4">
              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                  Offer Text
                </label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. RAMADAN COLLECTION OFFER - Up to 25% Off"
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                  Valid For (Days)
                </label>
                <input 
                  type="number" 
                  min="1"
                  value={daysValid}
                  onChange={(e) => setDaysValid(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#2A1A12] text-white py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#4A2C11] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Pin Offer'}
              </button>
            </form>
          </div>
        </div>

        {/* Offers List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#DCD0C3] bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12]">Manage Offers</h3>
            </div>
            
            <div className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <div className="p-8 text-center text-[#5C3D2E]">Loading offers...</div>
              ) : offers.length === 0 ? (
                <div className="p-8 text-center text-[#5C3D2E]">No offers created yet.</div>
              ) : (
                offers.map(offer => {
                  const isExpired = new Date(offer.end_date) < new Date();
                  
                  return (
                    <div key={offer.id} className={`p-4 flex items-center justify-between transition-colors ${offer.is_active && !isExpired ? 'bg-green-50/50' : ''}`}>
                      <div className="flex-1 pr-4">
                        <p className="text-[#2A1A12] font-medium text-sm mb-1">{offer.text}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className={`${isExpired ? 'text-red-600 font-medium' : 'text-[#8C7A6B]'}`}>
                            Expires: {new Date(offer.end_date).toLocaleDateString()} {new Date(offer.end_date).toLocaleTimeString()}
                          </span>
                          {isExpired && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Expired</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => toggleActive(offer.id, offer.is_active)}
                          className={`p-2 rounded transition-colors ${offer.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                          title={offer.is_active ? "Deactivate" : "Activate"}
                        >
                          <Power size={16} />
                        </button>
                        <button 
                          onClick={() => deleteOffer(offer.id)}
                          className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
