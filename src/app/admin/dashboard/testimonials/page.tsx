'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Plus, Trash2, MessageSquareQuote, Edit2, Image as ImageIcon, X } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('5');
  const [avatar, setAvatar] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const supabase = createClient();

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setAvatar(url);
    } catch (error: any) {
      alert("Image upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setText(t.text);
    setAuthor(t.author);
    setLocation(t.location || '');
    setRating(t.rating?.toString() || '5');
    setAvatar(t.avatar || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setText('');
    setAuthor('');
    setLocation('');
    setRating('5');
    setAvatar('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const payload = {
      text,
      author,
      location: location || null,
      rating: parseInt(rating),
      avatar: avatar || null
    };

    let error;

    if (editingId) {
      const res = await supabase.from('testimonials').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('testimonials').insert([payload]);
      error = res.error;
    }

    if (!error) {
      handleCancelEdit();
      fetchTestimonials();
    } else {
      alert("Error saving testimonial: " + error.message);
    }
    setSubmitting(false);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) fetchTestimonials();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <MessageSquareQuote size={24} className="text-[#8B3A2B]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2A1A12]">Testimonials</h2>
          <p className="text-[#5C3D2E] text-sm">Manage customer reviews displayed on the Home Page.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create/Edit Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#DCD0C3] shadow-sm sticky top-24">
            <h3 className="font-bold text-[#2A1A12] mb-4 flex items-center gap-2">
              {editingId ? <Edit2 size={18} className="text-[#8B3A2B]" /> : <Plus size={18} className="text-[#8B3A2B]" />} 
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Avatar Image (Optional)</label>
                <div className="flex flex-col gap-4">
                  {avatar ? (
                    <div className="relative w-24 h-24 rounded-full border border-[#DCD0C3] overflow-hidden mx-auto">
                      <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setAvatar('')} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:text-red-600">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#DCD0C3] flex items-center justify-center bg-[#F8F2EA] text-[#8C7A6B] mx-auto">
                      <ImageIcon size={24} />
                    </div>
                  )}
                  <div className="text-center">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      id="avatarUpload"
                    />
                    <label htmlFor="avatarUpload" className={`inline-block border border-[#DCD0C3] px-4 py-2 rounded text-xs cursor-pointer hover:bg-gray-50 transition-colors text-center w-full ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Author Name *</label>
                <input 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Location</label>
                <input 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lucknow"
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                />
              </div>

              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Rating (1-5)</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Review Text *</label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="The quality of dates is simply unmatched..."
                  className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded text-sm focus:outline-none focus:border-[#8B3A2B]"
                  rows={4}
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 bg-[#2A1A12] text-white py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#4A2C11] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    disabled={submitting}
                    className="flex-1 bg-gray-200 text-[#2A1A12] py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#DCD0C3] bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12]">Current Testimonials</h3>
            </div>
            
            <div className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <div className="p-8 text-center text-[#5C3D2E]">Loading...</div>
              ) : testimonials.length === 0 ? (
                <div className="p-8 text-center text-[#5C3D2E]">No testimonials found.</div>
              ) : (
                testimonials.map(t => (
                  <div key={t.id} className="p-5 flex items-start justify-between gap-4 transition-colors hover:bg-gray-50">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#DCD0C3] flex items-center justify-center shrink-0">
                        <span className="text-[#5C3D2E] font-bold">{t.author.charAt(0)}</span>
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="text-[#2A1A12] font-bold text-sm">{t.author}</h4>
                        {t.location && <span className="text-xs text-[#8C7A6B]">({t.location})</span>}
                        <span className="text-yellow-500 text-xs ml-2">{'★'.repeat(t.rating)}</span>
                      </div>
                      <p className="text-[#5C3D2E] text-sm leading-relaxed">{t.text}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => handleEdit(t)}
                        className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteTestimonial(t.id)}
                        className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
