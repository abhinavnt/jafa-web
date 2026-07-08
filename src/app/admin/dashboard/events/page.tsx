'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import ImageCropperModal from '@/components/admin/ImageCropperModal';
import { Plus, Trash2, Edit, X, CalendarHeart, FolderPlus, Image as ImageIcon, Search } from 'lucide-react';
import { deleteCloudinaryImage } from '@/app/actions/cloudinary';
import { IconMap, availableIcons } from '@/lib/icons';

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropQueue, setCropQueue] = useState<string[]>([]);
  
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    gallery_images: [] as string[],
    description: '',
    about_event: '',
    event_location: '',
    guest_capacity: '',
    duration: '',
    our_service: ''
  });

  const [categoryFormData, setCategoryFormData] = useState({ id: '', title: '', icon: '' });
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: string, type: 'event' | 'category'}>({isOpen: false, id: '', type: 'event'});
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  const supabase = createClient();

  const fetchEventsAndCategories = async () => {
    setLoading(true);

    // Fetch Categories
    const { data: catData } = await supabase
      .from('product_categories')
      .select('*')
      .eq('section', 'events')
      .order('title', { ascending: true });
      
    if (catData) setCategories(catData);

    // Fetch Events with Pagination
    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (submittedSearchQuery) {
      query = query.ilike('title', `%${submittedSearchQuery}%`);
    }

    const { data, count, error } = await query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
      
    if (data) setEvents(data);
    if (count !== null) setTotalCount(count);
    setLoading(false);
  };

  useEffect(() => {
    fetchEventsAndCategories();
  }, [page, submittedSearchQuery]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }
      const { data } = await supabase
        .from('events')
        .select('*')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      if (data) setSuggestions(data);
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentTotal = (formData.image ? 1 : 0) + formData.gallery_images.length;
    if (currentTotal + files.length > 5) {
      alert('You can only upload a maximum of 5 images per event.');
      return;
    }

    const urls = files.map(f => URL.createObjectURL(f));
    setCropQueue(prev => [...prev, ...urls]);
  };

  const removeImage = async (index: number) => {
    let urlToDelete = '';

    setFormData(prev => {
      if (index === -1) {
        urlToDelete = prev.image;
        if (prev.gallery_images.length > 0) {
          return { ...prev, image: prev.gallery_images[0], gallery_images: prev.gallery_images.slice(1) };
        }
        return { ...prev, image: '' };
      } else {
        urlToDelete = prev.gallery_images[index];
        const newGallery = [...prev.gallery_images];
        newGallery.splice(index, 1);
        return { ...prev, gallery_images: newGallery };
      }
    });

    if (urlToDelete) {
      await deleteCloudinaryImage(urlToDelete);
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
    
    fetchEventsAndCategories();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryFormData.id) {
      // Edit
      const { error } = await supabase.from('product_categories').update({ title: categoryFormData.title, icon: categoryFormData.icon }).eq('id', categoryFormData.id);
      if (!error) {
        setIsCategoryModalOpen(false);
        setCategoryFormData({ id: '', title: '', icon: '' });
        fetchEventsAndCategories();
      } else {
        alert('Error updating category: ' + error.message);
      }
    } else {
      // Add
      const { error } = await supabase.from('product_categories').insert([{ title: categoryFormData.title, icon: categoryFormData.icon, section: 'events' }]);
      if (!error) {
        setIsCategoryModalOpen(false);
        setCategoryFormData({ id: '', title: '', icon: '' });
        fetchEventsAndCategories();
      } else {
        alert('Error adding category: ' + error.message);
      }
    }
  };

  const handleCategoryDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id, type: 'category' });
  };

  const openCategoryEditModal = (category: any) => {
    setCategoryFormData({ id: category.id, title: category.title, icon: category.icon || '' });
    setIsCategoryModalOpen(true);
  };

  const openCategoryAddModal = () => {
    setCategoryFormData({ id: '', title: '', icon: '' });
    setIsCategoryModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id, type: 'event' });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteConfirm;
    if (type === 'category') {
      await supabase.from('product_categories').delete().eq('id', id);
      fetchEventsAndCategories();
    } else {
      const eventToDelete = events.find(e => e.id === id);
      const { error } = await supabase.from('events').delete().eq('id', id);
      
      if (!error && eventToDelete) {
        if (eventToDelete.image) await deleteCloudinaryImage(eventToDelete.image);
        if (eventToDelete.gallery_images) {
          for (const img of eventToDelete.gallery_images) {
            await deleteCloudinaryImage(img);
          }
        }
        fetchEventsAndCategories();
      }
    }
    setDeleteConfirm({ isOpen: false, id: '', type: 'event' });
  };

  const openEditModal = (eventItem: any) => {
    setEditingId(eventItem.id);
    setFormData({
      title: eventItem.title || '',
      category: eventItem.category || '',
      image: eventItem.image || '',
      gallery_images: eventItem.gallery_images || [],
      description: eventItem.description || '',
      about_event: eventItem.about_event || '',
      event_location: eventItem.event_location || '',
      guest_capacity: eventItem.guest_capacity || '',
      duration: eventItem.duration || '',
      our_service: eventItem.our_service || ''
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ 
      title: '', category: '', image: '', gallery_images: [],
      description: '', about_event: '', event_location: '',
      guest_capacity: '', duration: '', our_service: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
            <CalendarHeart size={24} className="text-[#8B3A2B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A12]">Events Portfolio</h2>
            <p className="text-[#5C3D2E] text-sm">Manage your event galleries and portfolio items.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val === '') {
                  setSubmittedSearchQuery('');
                  setPage(1);
                  setIsSuggestionsOpen(false);
                } else {
                  setIsSuggestionsOpen(true);
                }
              }}
              onFocus={() => setIsSuggestionsOpen(true)}
              onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSubmittedSearchQuery(searchQuery);
                  setPage(1);
                  setIsSuggestionsOpen(false);
                }
              }}
              className="pl-10 pr-4 py-2 border border-[#DCD0C3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A2B] bg-white w-full sm:w-64"
            />
            {isSuggestionsOpen && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#DCD0C3] rounded-lg shadow-lg overflow-hidden">
                {suggestions.map((s) => (
                  <div 
                    key={s.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchQuery(s.title);
                      setSubmittedSearchQuery(s.title);
                      setPage(1);
                      setIsSuggestionsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#F8F2EA] cursor-pointer text-sm text-[#2A1A12] border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsManageCategoriesOpen(true)}
            className="bg-white border border-[#DCD0C3] text-[#5C3D2E] px-4 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#F8F2EA] transition-colors flex items-center justify-center gap-2 w-full sm:w-48 whitespace-nowrap"
          >
            Manage Categories
          </button>
          <button 
            onClick={openCategoryAddModal}
            className="bg-white border border-[#DCD0C3] text-[#5C3D2E] px-4 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#F8F2EA] transition-colors flex items-center justify-center gap-2 w-full sm:w-48 whitespace-nowrap"
          >
            <FolderPlus size={16} /> Add Category
          </button>
          <button 
            onClick={openAddModal}
            className="bg-[#2A1A12] text-white px-4 py-2.5 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#4A2C11] transition-colors flex items-center justify-center gap-2 w-full sm:w-48 whitespace-nowrap"
          >
            <Plus size={16} /> Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F2EA] border-b border-[#DCD0C3] text-[#5C3D2E] text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Event Title</th>
                <th className="p-4 font-bold hidden sm:table-cell">Category</th>
                <th className="p-4 font-bold hidden sm:table-cell">Date Added</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-[#5C3D2E] sm:hidden">Loading events...</td>
                  <td colSpan={4} className="p-8 text-center text-[#5C3D2E] hidden sm:table-cell">Loading events...</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-[#5C3D2E] sm:hidden">No events found.</td>
                  <td colSpan={4} className="p-8 text-center text-[#5C3D2E] hidden sm:table-cell">No events found.</td>
                </tr>
              ) : (
                events.map((e) => (
                  <React.Fragment key={e.id}>
                  <tr className="hover:bg-[#F8F2EA]/50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}>
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
                    <td className="p-4 text-[#5C3D2E] text-sm hidden sm:table-cell">{e.category}</td>
                    <td className="p-4 text-[#5C3D2E] text-sm hidden sm:table-cell">{new Date(e.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button onClick={(event) => { event.stopPropagation(); openEditModal(e); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                        <Edit size={16} />
                      </button>
                      <button onClick={(event) => { event.stopPropagation(); handleDelete(e.id); }} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors ml-2">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                  {expandedId === e.id && (
                    <tr className="sm:hidden bg-[#F8F2EA]/30 border-b border-[#DCD0C3]">
                      <td colSpan={2} className="p-4 pt-0">
                        <div className="flex flex-col gap-1 text-sm text-[#5C3D2E]">
                          <div><span className="font-semibold">Category:</span> {e.category}</div>
                          <div><span className="font-semibold">Date Added:</span> {new Date(e.created_at).toLocaleDateString()}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalCount > ITEMS_PER_PAGE && (
          <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex items-center justify-between">
            <span className="text-sm text-[#5C3D2E]">
              Showing <span className="font-bold">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold">{Math.min(page * ITEMS_PER_PAGE, totalCount)}</span> of <span className="font-bold">{totalCount}</span> events
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-[#DCD0C3] bg-white text-[#5C3D2E] text-sm rounded hover:bg-[#F8F2EA] disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * ITEMS_PER_PAGE >= totalCount}
                className="px-3 py-1 border border-[#DCD0C3] bg-white text-[#5C3D2E] text-sm rounded hover:bg-[#F8F2EA] disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isManageCategoriesOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg">Manage Categories</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-1.5 border border-[#DCD0C3] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A2B] bg-white w-48"
                  />
                </div>
                <button onClick={() => setIsManageCategoriesOpen(false)} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8F2EA] border-b border-[#DCD0C3] text-[#5C3D2E] text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Category Title</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCD0C3]">
                    {categories.filter(c => c.title.toLowerCase().includes(categorySearchQuery.toLowerCase())).length === 0 ? (
                      <tr><td colSpan={2} className="p-8 text-center text-[#5C3D2E]">No categories found.</td></tr>
                    ) : (
                      categories.filter(c => c.title.toLowerCase().includes(categorySearchQuery.toLowerCase())).map((c) => (
                        <tr key={c.id} className="hover:bg-[#F8F2EA]/50 transition-colors">
                          <td className="p-4 font-medium text-[#2A1A12]">{c.title}</td>
                          <td className="p-4 text-right">
                            <button onClick={() => openCategoryEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleCategoryDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
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
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={closeModal} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="eventForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Event Images (Max 5) *</label>
                  <div className="flex flex-wrap items-end gap-4">
                    {/* Main Image */}
                    {formData.image && (
                      <div className="relative w-32 h-24 rounded border-2 border-[#8B3A2B] overflow-hidden">
                        <div className="absolute top-0 left-0 bg-[#8B3A2B] text-white text-[10px] px-2 py-0.5 font-bold z-10">COVER</div>
                        <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(-1)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600 z-10">
                          <X size={12} />
                        </button>
                      </div>
                    )}
                    {/* Gallery Images */}
                    {formData.gallery_images.map((img, idx) => (
                      <div key={idx} className="relative w-24 h-24 rounded border border-[#DCD0C3] overflow-hidden">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600 z-10">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    
                    {/* Uploader */}
                    {(formData.image ? 1 : 0) + formData.gallery_images.length < 5 && (
                      <div className="flex flex-col items-start gap-2">
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple
                          onChange={handleImageUpload} 
                          className="hidden" 
                          id="imageUpload"
                        />
                        <label htmlFor="imageUpload" className={`w-32 h-24 rounded border-2 border-dashed border-[#DCD0C3] flex items-center justify-center bg-[#F8F2EA] text-[#8C7A6B] cursor-pointer hover:bg-[#EAE0D5] transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                          <Plus size={24} />
                        </label>
                      </div>
                    )}
                  </div>
                  {uploadingImage && <p className="text-xs text-[#8B3A2B] mt-2 font-bold animate-pulse">Uploading images, please wait...</p>}
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Event Title *</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required />
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Category *</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required>
                    <option value="">Select Category...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Short Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" rows={2} />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">About Event</label>
                  <textarea value={formData.about_event} onChange={e => setFormData({...formData, about_event: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" rows={4} />
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Event Location</label>
                  <input type="text" value={formData.event_location} onChange={e => setFormData({...formData, event_location: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Guest Capacity</label>
                  <input type="text" value={formData.guest_capacity} onChange={e => setFormData({...formData, guest_capacity: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Duration</label>
                  <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
                </div>

                <div className="col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Our Service</label>
                  <input type="text" value={formData.our_service} onChange={e => setFormData({...formData, our_service: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
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

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg">{categoryFormData.id ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
            </div>
            <div className="p-6">
              <form id="categoryForm" onSubmit={handleCategorySubmit}>
                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Category Title *</label>
                <input type="text" value={categoryFormData.title} onChange={e => setCategoryFormData({...categoryFormData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] mb-4" required placeholder="e.g. Weddings" />

                <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Select Icon</label>
                <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded">
                  {availableIcons.map(iconName => {
                    const IconComp = IconMap[iconName];
                    const isSelected = categoryFormData.icon === iconName;
                    return (
                      <button 
                        key={iconName}
                        type="button"
                        onClick={() => setCategoryFormData({...categoryFormData, icon: iconName})}
                        className={`flex items-center justify-center p-2 rounded transition-colors ${isSelected ? 'bg-[#8B3A2B] text-white' : 'bg-white text-[#8C7A6B] hover:bg-[#EBE2D5] border border-[#DCD0C3]'}`}
                        title={iconName}
                      >
                        <IconComp size={20} />
                      </button>
                    );
                  })}
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex justify-end gap-3">
              <button onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 border border-[#DCD0C3] rounded text-sm font-bold text-[#5C3D2E] hover:bg-white transition-colors">Cancel</button>
              <button type="submit" form="categoryForm" className="px-6 py-2 bg-[#8B3A2B] rounded text-white text-sm font-bold tracking-wider hover:bg-[#6A2A1F] transition-colors">Save Category</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-sm w-full mx-4 border border-[#DCD0C3]">
            <h3 className="text-xl font-bold text-[#2A1A12] mb-2">Confirm Deletion</h3>
            
            {(() => {
              const categoryToDelete = categories.find(c => c.id === deleteConfirm.id);
              const isInUse = deleteConfirm.type === 'category' && categoryToDelete && events.some(e => e.category === categoryToDelete.title);
              
              if (isInUse) {
                return (
                  <>
                    <p className="text-red-600 text-sm mb-8 font-medium">
                      Cannot delete this category because it is currently assigned to one or more events. Please reassign or delete those events first.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setDeleteConfirm({ isOpen: false, id: '', type: 'event' })}
                        className="flex-1 px-4 py-2.5 rounded text-sm font-bold tracking-wider text-white bg-[#8B3A2B] hover:bg-[#6A2A1F] transition-colors"
                      >
                        OKAY
                      </button>
                    </div>
                  </>
                );
              }
              
              return (
                <>
                  <p className="text-[#5C3D2E] text-sm mb-8">
                    {deleteConfirm.type === 'category' 
                      ? 'Are you sure you want to delete this category? Make sure no events are using it.'
                      : 'Are you sure you want to delete this event from the portfolio?'}
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setDeleteConfirm({ isOpen: false, id: '', type: 'event' })}
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
                </>
              );
            })()}
          </div>
        </div>
      )}

      {cropQueue.length > 0 && (
        <ImageCropperModal
          imageSrc={cropQueue[0]}
          aspectRatio={16/9}
          onClose={() => setCropQueue(prev => prev.slice(1))}
          onCropComplete={async (croppedFile) => {
            setUploadingImage(true);
            try {
              const url = await uploadImageToCloudinary(croppedFile);
              setFormData(prev => {
                let newImage = prev.image;
                let newGallery = [...prev.gallery_images];
                if (!newImage) {
                  newImage = url;
                } else {
                  newGallery.push(url);
                }
                return { ...prev, image: newImage, gallery_images: newGallery };
              });
            } catch (error: any) {
              alert("Image upload failed: " + error.message);
            } finally {
              setUploadingImage(false);
              setCropQueue(prev => prev.slice(1));
            }
          }}
        />
      )}
    </div>
  );
}
