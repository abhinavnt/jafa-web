'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Plus, Trash2, Edit, X, Image as ImageIcon, LayoutGrid, ArrowUp, ArrowDown } from 'lucide-react';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: string}>({isOpen: false, id: ''});
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  
  const supabase = createClient();

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });
      
    if (data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
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

    if (!editingId && categories.length >= 3) {
      alert('You can only have a maximum of 3 categories.');
      return;
    }

    const categoryData = {
      ...formData,
    };

    if (editingId) {
      const { error } = await supabase.from('categories').update(categoryData).eq('id', editingId);
      if (!error) closeModal();
      else alert('Error updating category: ' + error.message);
    } else {
      const { error } = await supabase.from('categories').insert([{ ...categoryData, display_order: categories.length }]);
      if (!error) closeModal();
      else alert('Error adding category: ' + error.message);
    }
    
    fetchCategories();
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    setLoading(true);
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index - 1];
    newCategories[index - 1] = temp;
    
    for (let i = 0; i < newCategories.length; i++) {
      await supabase.from('categories').update({ display_order: i }).eq('id', newCategories[i].id);
    }
    fetchCategories();
  };

  const handleMoveDown = async (index: number) => {
    if (index === categories.length - 1) return;
    setLoading(true);
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index + 1];
    newCategories[index + 1] = temp;
    
    for (let i = 0; i < newCategories.length; i++) {
      await supabase.from('categories').update({ display_order: i }).eq('id', newCategories[i].id);
    }
    fetchCategories();
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    await supabase.from('categories').delete().eq('id', deleteConfirm.id);
    fetchCategories();
    setDeleteConfirm({ isOpen: false, id: '' });
  };

  const openEditModal = (category: any) => {
    setEditingId(category.id);
    setFormData({
      title: category.title || '',
      description: category.description || '',
      image: category.image || '',
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    if (categories.length >= 3) {
      alert('You have reached the maximum limit of 3 categories.');
      return;
    }
    setEditingId(null);
    setFormData({ title: '', description: '', image: '' });
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
            <LayoutGrid size={24} className="text-[#8B3A2B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A12]">Home Page Categories</h2>
            <p className="text-[#5C3D2E] text-sm">Manage the top 3 main categories displayed on the home page.</p>
          </div>
        </div>
        
        <button 
          onClick={openAddModal}
          disabled={categories.length >= 3}
          className={`${categories.length >= 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2A1A12] hover:bg-[#4A2C11]'} text-white px-5 py-2.5 rounded font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2`}
        >
          <Plus size={16} /> Add Category ({categories.length}/3)
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F2EA] border-b border-[#DCD0C3] text-[#5C3D2E] text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <tr><td colSpan={2} className="p-8 text-center text-[#5C3D2E]">Loading categories...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={2} className="p-8 text-center text-[#5C3D2E]">No categories found.</td></tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F2EA]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {c.image ? (
                          <img src={c.image} alt={c.title} className="w-16 h-16 rounded object-cover border border-[#DCD0C3]" />
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200"><ImageIcon size={20} /></div>
                        )}
                        <span className="font-medium text-[#2A1A12]">{c.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleMoveUp(categories.indexOf(c))} 
                        disabled={categories.indexOf(c) === 0}
                        className={`p-2 rounded transition-colors ${categories.indexOf(c) === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#8B3A2B] hover:bg-[#F8F2EA]'}`}
                        title="Move Up"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button 
                        onClick={() => handleMoveDown(categories.indexOf(c))} 
                        disabled={categories.indexOf(c) === categories.length - 1}
                        className={`p-2 rounded transition-colors mr-2 ${categories.indexOf(c) === categories.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#8B3A2B] hover:bg-[#F8F2EA]'}`}
                        title="Move Down"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button onClick={() => openEditModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-[#DCD0C3] flex justify-between items-center bg-[#F8F2EA]">
              <h3 className="font-bold text-[#2A1A12] text-lg">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={closeModal} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="categoryForm" onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Category Image *</label>
                  <div className="flex flex-col gap-4">
                    {formData.image ? (
                      <div className="relative w-full h-48 rounded border border-[#DCD0C3] overflow-hidden">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:text-red-600">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-48 rounded border-2 border-dashed border-[#DCD0C3] flex items-center justify-center bg-[#F8F2EA] text-[#8C7A6B]">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className={`inline-block border border-[#DCD0C3] px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors text-center w-full ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image'}
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Title *</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required placeholder="e.g. DATES, NUTS & DRY FRUITS" />
                </div>

                <div>
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Description *</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required rows={3} placeholder="A short description of the category..." />
                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-[#DCD0C3] rounded text-sm font-bold text-[#5C3D2E] hover:bg-white transition-colors">
                Cancel
              </button>
              <button type="submit" form="categoryForm" className="px-6 py-2 bg-[#8B3A2B] rounded text-white text-sm font-bold tracking-wider hover:bg-[#6A2A1F] transition-colors">
                {editingId ? 'Save Changes' : 'Create Category'}
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
              Are you sure you want to delete this category?
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
