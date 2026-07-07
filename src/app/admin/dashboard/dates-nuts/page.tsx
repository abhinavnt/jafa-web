'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { Plus, Trash2, Edit, X, Nut, FolderPlus, Image as ImageIcon, Search } from 'lucide-react';
import { deleteCloudinaryImage } from '@/app/actions/cloudinary';
import { IconMap, availableIcons } from '@/lib/icons';

export default function DatesNutsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: string, type: 'product' | 'category'}>({isOpen: false, id: '', type: 'product'});

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    original_price: '',
    image: '',
    gallery_images: [] as string[],
    status: 'In Stock',
    is_exclusive: false,
    variants: [] as { name: string, price: string }[],
  });

  const [categoryFormData, setCategoryFormData] = useState({ id: '', title: '', icon: '' });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  const supabase = createClient();

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    
    // Fetch Categories
    const { data: catData } = await supabase
      .from('product_categories')
      .select('*')
      .eq('section', 'dates_nuts')
      .order('title', { ascending: true });
      
    if (catData) setCategories(catData);

    // Fetch Products with Pagination
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('type', 'dates_nuts')
      .order('created_at', { ascending: false });

    if (submittedSearchQuery) {
      query = query.ilike('title', `%${submittedSearchQuery}%`);
    }

    const { data, count, error } = await query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
      
    if (data) setProducts(data);
    if (count !== null) setTotalCount(count);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, [page, submittedSearchQuery]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'dates_nuts')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);
      if (data) setSuggestions(data);
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const currentTotal = (formData.image ? 1 : 0) + formData.gallery_images.length;
    if (currentTotal + files.length > 5) {
      alert('You can only upload a maximum of 5 images per product.');
      return;
    }

    setUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadImageToCloudinary(file);
        uploadedUrls.push(url);
      }
      
      setFormData(prev => {
        let newImage = prev.image;
        let newGallery = [...prev.gallery_images];
        
        uploadedUrls.forEach(url => {
          if (!newImage) {
            newImage = url;
          } else {
            newGallery.push(url);
          }
        });
        
        return { ...prev, image: newImage, gallery_images: newGallery };
      });
    } catch (error: any) {
      alert("Image upload failed: " + error.message);
    } finally {
      setUploadingImage(false);
    }
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

    const productData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      variants: formData.variants.map(v => ({ name: v.name, price: parseFloat(v.price) || 0 })),
      type: 'dates_nuts'
    };

    if (editingId) {
      const { error } = await supabase.from('products').update(productData).eq('id', editingId);
      if (!error) closeModal();
    } else {
      const { error } = await supabase.from('products').insert([productData]);
      if (!error) closeModal();
    }
    
    fetchProductsAndCategories();
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryFormData.id) {
      // Edit
      const { error } = await supabase.from('product_categories').update({ title: categoryFormData.title, icon: categoryFormData.icon }).eq('id', categoryFormData.id);
      if (!error) {
        setIsCategoryModalOpen(false);
        setCategoryFormData({ id: '', title: '', icon: '' });
        fetchProductsAndCategories();
      } else {
        alert('Error updating category: ' + error.message);
      }
    } else {
      // Add
      const { error } = await supabase.from('product_categories').insert([{ title: categoryFormData.title, icon: categoryFormData.icon, section: 'dates_nuts' }]);
      if (!error) {
        setIsCategoryModalOpen(false);
        setCategoryFormData({ id: '', title: '', icon: '' });
        fetchProductsAndCategories();
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
    setDeleteConfirm({ isOpen: true, id, type: 'product' });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteConfirm;
    if (type === 'category') {
      await supabase.from('product_categories').delete().eq('id', id);
      fetchProductsAndCategories();
    } else {
      const productToDelete = products.find(p => p.id === id);
      const { error } = await supabase.from('products').delete().eq('id', id);
      
      if (!error && productToDelete) {
        if (productToDelete.image) await deleteCloudinaryImage(productToDelete.image);
        if (productToDelete.gallery_images) {
          for (const img of productToDelete.gallery_images) {
            await deleteCloudinaryImage(img);
          }
        }
        fetchProductsAndCategories();
      }
    }
    setDeleteConfirm({ isOpen: false, id: '', type: 'product' });
  };

  const openEditModal = (product: any) => {
    setEditingId(product.id);
    setFormData({
      title: product.title || '',
      category: product.category || '',
      description: product.description || '',
      price: product.price ? product.price.toString() : '',
      original_price: product.original_price ? product.original_price.toString() : '',
      image: product.image || '',
      gallery_images: product.gallery_images || [],
      status: product.status || 'In Stock',
      is_exclusive: product.is_exclusive || false,
      variants: Array.isArray(product.variants) 
        ? product.variants.map((v: any) => ({ name: v.name, price: v.price.toString() })) 
        : [],
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', category: '', description: '', price: '', original_price: '', image: '', gallery_images: [], status: 'In Stock', is_exclusive: false, variants: [] });
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
            <Nut size={24} className="text-[#8B3A2B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2A1A12]">Dates & Nuts</h2>
            <p className="text-[#5C3D2E] text-sm">Manage your premium dates and nuts inventory.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
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
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#DCD0C3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F2EA] border-b border-[#DCD0C3] text-[#5C3D2E] text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold hidden sm:table-cell">Category</th>
                <th className="p-4 font-bold hidden sm:table-cell">Price</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCD0C3]">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-[#5C3D2E] sm:hidden">Loading products...</td>
                  <td colSpan={5} className="p-8 text-center text-[#5C3D2E] hidden sm:table-cell">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-[#5C3D2E] sm:hidden">No products found.</td>
                  <td colSpan={5} className="p-8 text-center text-[#5C3D2E] hidden sm:table-cell">No products found.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <React.Fragment key={p.id}>
                  <tr className="hover:bg-[#F8F2EA]/50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-12 h-12 rounded object-cover border border-[#DCD0C3]" />
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200"><ImageIcon size={20} /></div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-[#2A1A12]" title={p.title}>
                            {p.title.length > 9 ? `${p.title.slice(0, 9)}...` : p.title}
                          </span>
                          {p.is_exclusive && (
                            <span className="text-[10px] font-bold text-[#8B3A2B] uppercase tracking-wider mt-0.5">
                              ★ Exclusive
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#5C3D2E] text-sm hidden sm:table-cell">{p.category}</td>
                    <td className="p-4 text-[#2A1A12] font-medium hidden sm:table-cell">{p.price ? `${p.price}` : '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${p.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal(p); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                        <Edit size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors ml-2">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                  {expandedId === p.id && (
                    <tr className="sm:hidden bg-[#F8F2EA]/30 border-b border-[#DCD0C3]">
                      <td colSpan={3} className="p-4 pt-0">
                        <div className="flex flex-col gap-1 text-sm text-[#5C3D2E]">
                          <div><span className="font-semibold">Category:</span> {p.category}</div>
                          <div><span className="font-semibold">Price:</span> {p.price ? `${p.price}` : '-'}</div>
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
              Showing <span className="font-bold">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold">{Math.min(page * ITEMS_PER_PAGE, totalCount)}</span> of <span className="font-bold">{totalCount}</span> products
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
              <h3 className="font-bold text-[#2A1A12] text-lg">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={closeModal} className="text-[#5C3D2E] hover:text-[#2A1A12]"><X size={20} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="productForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Product Images (Max 5) *</label>
                  <div className="flex flex-wrap items-end gap-4">
                    {/* Main Image */}
                    {formData.image && (
                      <div className="relative w-24 h-24 rounded border-2 border-[#8B3A2B] overflow-hidden">
                        <div className="absolute top-0 left-0 bg-[#8B3A2B] text-white text-[10px] px-2 py-0.5 font-bold z-10">COVER</div>
                        <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(-1)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-red-600 z-10">
                          <X size={12} />
                        </button>
                      </div>
                    )}
                    {/* Gallery Images */}
                    {formData.gallery_images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded border border-[#DCD0C3] overflow-hidden">
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
                        <label htmlFor="imageUpload" className={`w-20 h-20 rounded border-2 border-dashed border-[#DCD0C3] flex items-center justify-center bg-[#F8F2EA] text-[#8C7A6B] cursor-pointer hover:bg-[#EAE0D5] transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                          <Plus size={24} />
                        </label>
                      </div>
                    )}
                  </div>
                  {uploadingImage && <p className="text-xs text-[#8B3A2B] mt-2 font-bold animate-pulse">Uploading images, please wait...</p>}
                </div>

                <div className="col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Product Title *</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required />
                </div>

                <div className="col-span-2">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Description (Optional)</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" placeholder="Describe the product details..." />
                </div>

                <div className="col-span-2 border border-[#DCD0C3] p-4 rounded bg-[#F8F2EA]/50">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider">Product Variants (Sizes/Weights)</label>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, variants: [...formData.variants, { name: '', price: '' }]})}
                      className="text-[#8B3A2B] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      <Plus size={14} /> Add Variant
                    </button>
                  </div>
                  {formData.variants.length > 0 ? (
                    <div className="space-y-3">
                      {formData.variants.map((v, i) => (
                        <div key={i} className="flex flex-wrap sm:flex-nowrap gap-3 items-start">
                          <input 
                            type="text" 
                            placeholder="Variant Name (e.g. 500g)" 
                            value={v.name}
                            onChange={(e) => {
                              const newV = [...formData.variants];
                              newV[i].name = e.target.value;
                              setFormData({...formData, variants: newV});
                            }}
                            className="flex-1 px-3 py-2 bg-white border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] text-sm"
                            required
                          />
                          <input 
                            type="number" 
                            placeholder="Price (₹)" 
                            value={v.price}
                            onChange={(e) => {
                              const newV = [...formData.variants];
                              newV[i].price = e.target.value;
                              setFormData({...formData, variants: newV});
                            }}
                            className="w-32 px-3 py-2 bg-white border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] text-sm"
                            required
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const newV = [...formData.variants];
                              newV.splice(i, 1);
                              setFormData({...formData, variants: newV});
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8C7A6B]">No variants added. Product will use the base price below.</p>
                  )}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Category *</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" required>
                    <option value="">Select Category...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                {formData.variants.length === 0 && (
                  <>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Base Price (₹)</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Original Price</label>
                      <input type="number" step="0.01" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]" />
                    </div>
                  </>
                )}

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B]">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.is_exclusive} 
                      onChange={e => setFormData({...formData, is_exclusive: e.target.checked})}
                      className="w-5 h-5 accent-[#8B3A2B] rounded border-[#DCD0C3] cursor-pointer"
                    />
                    <span className="text-[#5C3D2E] text-sm font-bold uppercase tracking-wider">Mark as Exclusive Offer</span>
                  </label>
                </div>

              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-[#DCD0C3] bg-[#F8F2EA] flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-[#DCD0C3] rounded text-sm font-bold text-[#5C3D2E] hover:bg-white transition-colors">
                Cancel
              </button>
              <button type="submit" form="productForm" className="px-6 py-2 bg-[#8B3A2B] rounded text-white text-sm font-bold tracking-wider hover:bg-[#6A2A1F] transition-colors">
                {editingId ? 'Save Changes' : 'Create Product'}
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
                <input type="text" value={categoryFormData.title} onChange={e => setCategoryFormData({...categoryFormData, title: e.target.value})} className="w-full px-3 py-2 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] mb-4" required placeholder="e.g. Premium Dates" />

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
            <p className="text-[#5C3D2E] text-sm mb-8">
              {deleteConfirm.type === 'category' 
                ? 'Are you sure you want to delete this category? Make sure no products are using it.'
                : 'Are you sure you want to delete this product?'}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirm({ isOpen: false, id: '', type: 'product' })}
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
