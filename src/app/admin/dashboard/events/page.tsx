'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Plus, Trash2, Edit, X, Image as ImageIcon, CalendarHeart } from 'lucide-react';

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
  });
  
  const supabase = createClient();

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error: any) {
      alert("Image upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image first.');
      return;
    }

    if (editingId) {
      const { error } = await supabase.from('events').update(formData).eq('id', editingId);
      if (!error) closeModal();
    } else {
      const { error } = await supabase.from('events').insert([formData]);
      if (!error) closeModal();
    }
    
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event from the portfolio?')) return;
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  };

  const openEditModal = (eventItem: any) => {
    setEditingId(eventItem.id);
    setFormData({
      title: eventItem.title || '',
      category: eventItem.category || '',
      image: eventItem.image || '',
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', category: '', image: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <CalendarHeart size={24} className="text-[#8B3A2B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A12]">Events Portfolio</h2>
            <p className="text-[#5C3D2E] text-sm">Manage your event galleries and portfolio items.</p>
          </div>
        </div>
        
        <button 
          onClick={openAddModal}
          className="bg-[#2A1A12] text-white px-5 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#4A2C11] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F2EA] border-b border-[#DCD0C3] text-[#5C3D2E] text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Event Title</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Date Added</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-[#5C3D2E]">Loading events...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-[#5C3D2E]">No events found.</td></tr>
              ) : (
                events.map((e) => (
                  <tr key={e.id} className="hover:bg-[#F8F2EA]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {e.image ? (
                          <img src={e.image} alt={e.title} className="w-16 h-12 rounded object-cover border border-[#DCD0C3]" />
                        ) : (
                          <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200"><ImageIcon size={20} /></div>
                        )}
                        <span className="font-medium text-[#2A1A12]">{e.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[#5C3D2E] text-sm">{e.category}</td>
                    <td className="p-4 text-[#5C3D2E] text-sm">{new Date(e.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEditModal(e)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(e.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={closeModal} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="eventForm" onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                
                <div className="col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Event Cover Image *</label>
                  <div className="flex items-center gap-4">
                    {formData.image ? (
                      <div className="relative w-32 h-24 rounded border border-[#DCD0C3] overflow-hidden">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600">
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-24 rounded border-2 border-dashed border-[#DCD0C3] flex items-center justify-center bg-[#F8F2EA] text-[#8C7A6B]">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className={`inline-block border border-[#DCD0C3] px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image'}
                      </label>
                      <p className="text-xs text-[#8C7A6B] mt-2">Uploads directly to Cloudinary and saves URL.</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Event Title *</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Category *</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required>
                    <option value="">Select Category...</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Corporate Events">Corporate Events</option>
                    <option value="Private Celebrations">Private Celebrations</option>
                    <option value="Social Gatherings">Social Gatherings</option>
                    <option value="Stage & Themes">Stage & Themes</option>
                    <option value="Floral & Decor">Floral & Decor</option>
                  </select>
                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-[#DCD0C3] rounded text-sm font-bold text-[#5C3D2E] hover:bg-white transition-colors">
                Cancel
              </button>
              <button type="submit" form="eventForm" className="px-6 py-2 bg-[#8B3A2B] rounded text-white text-sm font-bold tracking-wider hover:bg-[#6A2A1F] transition-colors">
                {editingId ? 'Save Changes' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
