'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plus, Trash2, Megaphone, Power, X, Edit, Search } from 'lucide-react';

export default function OffersAdmin() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: string}>({isOpen: false, id: ''});
  
  // Form State
  const [labelLeft, setLabelLeft] = useState('LIMITED TIME EXCLUSIVE OFFER');
  const [title, setTitle] = useState('25% OFF');
  const [subtitle, setSubtitle] = useState('ON SELECTED COLLECTIONS');
  const [labelRight, setLabelRight] = useState('OFFER ENDS IN');
  
  const [durationType, setDurationType] = useState('days'); // 'days', 'hours', 'date'
  const [daysValid, setDaysValid] = useState('5');
  const [hoursValid, setHoursValid] = useState('24');
  const [specificDate, setSpecificDate] = useState('');
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

  const resetForm = () => {
    setEditingId(null);
    setLabelLeft('LIMITED TIME EXCLUSIVE OFFER');
    setTitle('25% OFF');
    setSubtitle('ON SELECTED COLLECTIONS');
    setLabelRight('OFFER ENDS IN');
    setDurationType('days');
    setDaysValid('5');
    setHoursValid('24');
    setSpecificDate('');
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (offer: any) => {
    setEditingId(offer.id);
    setLabelLeft(offer.label_left || '');
    setTitle(offer.title || offer.text || '');
    setSubtitle(offer.subtitle || '');
    setLabelRight(offer.label_right || '');
    setDurationType('date');
    
    const localDate = new Date(offer.end_date);
    const tzOffset = localDate.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(localDate.getTime() - tzOffset)).toISOString().slice(0, 16);
    setSpecificDate(localISOTime);
    
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Calculate end date based on duration type
    const endDate = new Date();
    if (durationType === 'days') {
      endDate.setDate(endDate.getDate() + parseInt(daysValid));
    } else if (durationType === 'hours') {
      endDate.setHours(endDate.getHours() + parseInt(hoursValid));
    } else if (durationType === 'date' && specificDate) {
      endDate.setTime(new Date(specificDate).getTime());
    }

    const offerData = {
      text: title, // keep for backward compatibility
      label_left: labelLeft,
      title,
      subtitle,
      label_right: labelRight,
      end_date: endDate.toISOString()
    };

    let error;
    if (editingId) {
      const res = await supabase.from('offers').update(offerData).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('offers').insert([{ ...offerData, is_active: true }]);
      error = res.error;
    }

    if (!error) {
      resetForm();
      setIsModalOpen(false);
      fetchOffers();
    } else {
      alert("Error saving offer: " + error.message);
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

  const deleteOffer = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const { error } = await supabase.from('offers').delete().eq('id', deleteConfirm.id);
    if (!error) fetchOffers();
    setDeleteConfirm({ isOpen: false, id: '' });
  };

  const filteredOffers = offers.filter(offer => 
    (offer.title && offer.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (offer.text && offer.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (offer.subtitle && offer.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Megaphone size={24} className="text-[#8B3A2B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A12]">Offer Pinning</h2>
            <p className="text-[#5C3D2E] text-sm">Manage dynamic top-banner offers for your Home Page.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#DCD0C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A2B] bg-white w-full h-[38px]"
            />
          </div>
          <button 
            onClick={openAddModal}
            className="bg-[#2A1A12] text-white px-4 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#4A2C11] transition-colors flex items-center justify-center gap-2 w-full sm:w-44 whitespace-nowrap"
          >
            <Plus size={16} /> Create New Offer
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Offers List */}
        <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#DCD0C3] bg-[#F8F2EA]">
            <h3 className="font-bold text-[#2A1A12]">Manage Offers</h3>
          </div>
          
          <div className="divide-y divide-[#DCD0C3]">
            {loading ? (
              <div className="p-8 text-center text-[#5C3D2E]">Loading offers...</div>
            ) : filteredOffers.length === 0 ? (
              <div className="p-8 text-center text-[#5C3D2E]">No offers created yet.</div>
            ) : (
              filteredOffers.map(offer => {
                const isExpired = new Date(offer.end_date) < new Date();
                
                return (
                  <div key={offer.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${offer.is_active && !isExpired ? 'bg-green-50/50' : ''}`}>
                    <div className="flex-1">
                      <p className="text-[#2A1A12] font-bold text-lg mb-1">{offer.title || offer.text}</p>
                      <p className="text-[#5C3D2E] text-sm mb-2">{offer.subtitle}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`${isExpired ? 'text-red-600 font-medium' : 'text-[#8C7A6B]'}`}>
                          Expires: {new Date(offer.end_date).toLocaleDateString()} {new Date(offer.end_date).toLocaleTimeString()}
                        </span>
                        {isExpired && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Expired</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:shrink-0 self-end sm:self-auto">
                      <button 
                        onClick={() => openEditModal(offer)}
                        className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
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

      {/* Create/Edit Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg flex items-center gap-2">
                {editingId ? <Edit size={18} className="text-[#8B3A2B]" /> : <Plus size={18} className="text-[#8B3A2B]" />}
                {editingId ? 'Edit Offer' : 'Create New Offer'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }} 
                className="text-[#5C3D2E] hover:text-[#2A1A12]"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <form id="offerForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                    Left Label
                  </label>
                  <input 
                    type="text"
                    value={labelLeft}
                    onChange={(e) => setLabelLeft(e.target.value)}
                    placeholder="e.g. LIMITED TIME EXCLUSIVE OFFER"
                    className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                    Main Title
                  </label>
                  <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 25% OFF"
                    className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                    Subtitle
                  </label>
                  <input 
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. ON SELECTED COLLECTIONS"
                    className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                    Right Label (Above Timer)
                  </label>
                  <input 
                    type="text"
                    value={labelRight}
                    onChange={(e) => setLabelRight(e.target.value)}
                    placeholder="e.g. OFFER ENDS IN"
                    className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                    Duration Type
                  </label>
                  <select
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B] mb-4"
                  >
                    <option value="days">Valid for Days</option>
                    <option value="hours">Valid for Hours</option>
                    <option value="date">Specific End Date</option>
                  </select>

                  {durationType === 'days' && (
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
                  )}
                  {durationType === 'hours' && (
                    <div>
                      <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                        Valid For (Hours)
                      </label>
                      <input 
                        type="number" 
                        min="1"
                        value={hoursValid}
                        onChange={(e) => setHoursValid(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                        required
                      />
                    </div>
                  )}
                  {durationType === 'date' && (
                    <div>
                      <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
                        Specific End Date & Time
                      </label>
                      <input 
                        type="datetime-local" 
                        value={specificDate}
                        onChange={(e) => setSpecificDate(e.target.value)}
                        className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                        required
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }} 
                className="px-4 py-2 border border-[#DCD0C3] rounded text-sm font-bold text-[#5C3D2E] hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="offerForm"
                disabled={submitting}
                className="px-6 py-2 bg-[#8B3A2B] rounded text-white text-sm font-bold tracking-wider hover:bg-[#6A2A1F] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Saving...' : (editingId ? 'Save Changes' : 'Pin Offer')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-sm w-full mx-4 border border-[#DCD0C3]">
            <h3 className="text-xl font-bold text-[#2A1A12] mb-2">Confirm Deletion</h3>
            <p className="text-[#5C3D2E] text-sm mb-8">
              Are you sure you want to delete this offer?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirm({ isOpen: false, id: '' })}
                className="flex-1 px-4 py-2.5 rounded text-sm font-bold tracking-wider text-[#2A1A12] bg-[#F8F2EA] hover:bg-[#EBE2D5] transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded text-sm font-bold tracking-wider text-white bg-[#8B3A2B] hover:bg-[#6A2A1F] transition-colors"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
