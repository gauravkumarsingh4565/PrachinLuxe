"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CldImageUploader from '@/components/CldImageUploader';
import { jewelryType } from '@/data/constant';

export default function ProductsAddForm({ mode = 'create', productId }) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  const [isLoading, setIsLoading] = useState(isEdit);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Field States
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    isNewArrival: false,
    price: '',
    originalPrice: '',
    inStock: true,
    description: '',
    craftsmanship: '',
    position: ''
  });

  const [story, setStory] = useState({
    title: '',
    description: '',
    subDescription: ''
  });

  const [material, setMaterial] = useState({
    ingdrients: [],
    specification: []
  });

  const [care, setCare] = useState([]);

  // List Management States
  const [ingredientForm, setIngredientForm] = useState({ label: '' });
  const [editingIngredientId, setEditingIngredientId] = useState(null);

  const [specForm, setSpecForm] = useState({ key: '', val: '' });
  const [editingSpecId, setEditingSpecId] = useState(null);

  const [careForm, setCareForm] = useState({ tittle: '', des: '' });
  const [editingCareId, setEditingCareId] = useState(null);

  // 4-Side Product Images
  const [images, setImages] = useState({
    front: null,
    left: null,
    right: null,
    back: null,
  });

  // Fetch product data if in Edit mode
  useEffect(() => {
    if (!isEdit || !productId) return;

    async function fetchProductData() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        if (data.success && data.product) {
          const p = data.product;
          setFormData({
            name: p.name || '',
            category: p.category || '',
            isNewArrival: p.isNewArrival || false,
            price: p.price !== undefined ? String(p.price) : '',
            originalPrice: p.originalPrice !== undefined ? String(p.originalPrice) : '',
            inStock: p.inStock ?? true,
            description: p.description || '',
            craftsmanship: p.craftsmanship || '',
            position: p.position !== undefined ? String(p.position) : ''
          });

          if (p.story) {
            setStory({
              title: p.story.title || '',
              description: p.story.description || '',
              subDescription: p.story.subDescription || ''
            });
          }

          if (p.material) {
            setMaterial({
              ingdrients: Array.isArray(p.material.ingdrients) ? p.material.ingdrients : [],
              specification: Array.isArray(p.material.specification) ? p.material.specification : []
            });
          }

          if (Array.isArray(p.care)) {
            setCare(p.care);
          }

          if (p.images) {
            setImages({
              front: p.images.front || null,
              left: p.images.left || null,
              right: p.images.right || null,
              back: p.images.back || null,
            });
          }
        } else {
          setErrorMsg(data.error || 'Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product for edit:', err);
        setErrorMsg('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductData();
  }, [isEdit, productId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStory(prev => ({ ...prev, [name]: value }));
  };

  // Ingredient Handlers
  const saveIngredient = () => {
    if (!ingredientForm.label.trim()) return;
    if (editingIngredientId) {
      setMaterial(prev => ({
        ...prev,
        ingdrients: prev.ingdrients.map(i => i.id === editingIngredientId ? { ...ingredientForm, id: editingIngredientId } : i)
      }));
      setEditingIngredientId(null);
    } else {
      setMaterial(prev => ({
        ...prev,
        ingdrients: [...prev.ingdrients, { ...ingredientForm, id: Date.now().toString() }]
      }));
    }
    setIngredientForm({ label: '' });
  };

  const editIngredient = (ing) => {
    setIngredientForm({ label: ing.label || '' });
    setEditingIngredientId(ing.id);
  };

  const deleteIngredient = (id) => {
    setMaterial(prev => ({
      ...prev,
      ingdrients: prev.ingdrients.filter(i => i.id !== id)
    }));
  };

  // Specification Handlers
  const saveSpecification = () => {
    if (!specForm.key.trim() || !specForm.val.trim()) return;
    if (editingSpecId) {
      setMaterial(prev => ({
        ...prev,
        specification: prev.specification.map(s => s.id === editingSpecId ? { ...specForm, id: editingSpecId } : s)
      }));
      setEditingSpecId(null);
    } else {
      setMaterial(prev => ({
        ...prev,
        specification: [...prev.specification, { ...specForm, id: Date.now().toString() }]
      }));
    }
    setSpecForm({ key: '', val: '' });
  };

  const editSpecification = (spec) => {
    setSpecForm({ key: spec.key || '', val: spec.val || '' });
    setEditingSpecId(spec.id);
  };

  const deleteSpecification = (id) => {
    setMaterial(prev => ({
      ...prev,
      specification: prev.specification.filter(s => s.id !== id)
    }));
  };

  // Care Instructions Handlers
  const saveCare = () => {
    if (!careForm.tittle.trim() || !careForm.des.trim()) return;
    if (editingCareId) {
      setCare(prev => prev.map(c => c.id === editingCareId ? { ...careForm, id: editingCareId } : c));
      setEditingCareId(null);
    } else {
      setCare(prev => [...prev, { ...careForm, id: Date.now().toString() }]);
    }
    setCareForm({ tittle: '', des: '' });
  };

  const editCare = (c) => {
    setCareForm({ tittle: c.tittle || '', des: c.des || '' });
    setEditingCareId(c.id);
  };

  const deleteCare = (id) => {
    setCare(prev => prev.filter(c => c.id !== id));
  };

  // Form Submit Handler (Handles Create & Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : 0,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      position: formData.position ? Number(formData.position) : undefined,
      story,
      material: {
        ingdrients: material.ingdrients.filter(i => i.label && i.label.trim() !== ''),
        specification: material.specification.filter(s => s.key && s.key.trim() !== '' && s.val && s.val.trim() !== '')
      },
      care: care.filter(c => (c.tittle && c.tittle.trim() !== '') || (c.des && c.des.trim() !== '')),
      images: {
        front: typeof images.front === 'object' && images.front !== null
          ? { url: images.front.url || '', publicKey: images.front.publicKey || images.front.publicId || '' }
          : { url: images.front || '', publicKey: '' },
        left: typeof images.left === 'object' && images.left !== null
          ? { url: images.left.url || '', publicKey: images.left.publicKey || images.left.publicId || '' }
          : { url: images.left || '', publicKey: '' },
        right: typeof images.right === 'object' && images.right !== null
          ? { url: images.right.url || '', publicKey: images.right.publicKey || images.right.publicId || '' }
          : { url: images.right || '', publicKey: '' },
        back: typeof images.back === 'object' && images.back !== null
          ? { url: images.back.url || '', publicKey: images.back.publicKey || images.back.publicId || '' }
          : { url: images.back || '', publicKey: '' },
      },
    };

    const endpoint = isEdit ? `/api/products/${productId}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(isEdit ? 'Product updated successfully!' : 'Product saved successfully!');
        router.push('/admin');
      } else {
        throw new Error(data.error || `Failed to ${isEdit ? 'update' : 'create'} product`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-sand-100 flex flex-col items-center justify-center font-cormorant">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-cinzel text-royal-blue-900 tracking-wider font-bold">Loading Product Details...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="w-full min-h-screen bg-sand-100 flex flex-col items-center justify-center p-4 font-cormorant">
        <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-md text-center max-w-md">
          <p className="font-cinzel text-red-600 text-lg font-bold mb-4">{errorMsg}</p>
          <Link href="/admin" className="px-6 py-2.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold uppercase hover:bg-gold-600 transition-colors">
            Back to Admin Panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sand-100 py-12 px-4 sm:px-6 lg:px-8 font-cormorant">
      <div className="max-w-[1000px] mx-auto space-y-8">

        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 font-semibold tracking-wide uppercase flex items-center">
          <Link href="/admin" className="hover:text-gold-600 transition-colors">ADMIN DASHBOARD</Link>
          <span className="mx-2 text-gold-400">/</span>
          <span className="text-royal-blue-900 font-bold">
            {isEdit ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
          </span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="font-cinzel text-3xl font-bold text-royal-blue-950 tracking-wider uppercase mb-1">
              {isEdit ? 'Edit Product' : 'Product Onboarding'}
            </h1>
            <p className="text-gold-700 font-cinzel text-[10px] tracking-widest uppercase">
              {isEdit ? 'Modify piece specifications & media' : 'Expand your royal collection'}
            </p>
            <div className="h-0.5 bg-gold-500/20 w-32 mt-3" />
          </div>

          <Link 
            href="/admin" 
            className="px-4 py-2 border border-gold-500/30 text-royal-blue-900 hover:bg-white rounded-lg font-cinzel text-xs font-bold uppercase transition-all self-start sm:self-auto"
          >
            Cancel & Return
          </Link>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8 text-sm">

          {/* SECTION: BASIC INFO */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-1 sm:col-span-2">
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Kundan Disc Earrings"
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Position (Number) *</label>
                <input
                  type="number"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. 1"
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium appearance-none"
                >
                  <option value="">Select Category</option>
                  {jewelryType
                    .filter((type) => type.id !== 'new-arrivals')
                    .map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isNewArrival"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-gold-600 rounded border-gold-500/30 focus:ring-gold-500 cursor-pointer"
                />
                <label htmlFor="isNewArrival" className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel cursor-pointer">
                  Mark as New Arrival
                </label>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter detailed description..."
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium resize-y"
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Craftsmanship Details</label>
                <textarea
                  name="craftsmanship"
                  rows={2}
                  value={formData.craftsmanship}
                  onChange={handleInputChange}
                  placeholder="Details about craftsmanship..."
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium resize-y"
                />
              </div>
            </div>
          </div>

          {/* SECTION: PRICING & INVENTORY */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Selling Price (Rs.) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 24999"
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Original MRP (Rs.)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="e.g. 28999"
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="inStock"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="h-5 w-5 rounded border-gold-500/30 text-royal-blue-900 focus:ring-royal-blue-900"
                />
                <label htmlFor="inStock" className="font-bold text-royal-blue-900 uppercase text-[12px] tracking-widest font-cinzel cursor-pointer">
                  Product is currently in stock
                </label>
              </div>
            </div>
          </div>

          {/* SECTION: THE STORY */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">The Story</h2>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={story.title}
                    onChange={handleStoryChange}
                    placeholder="e.g. The Legacy of Kundan"
                    className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Highlight Text (Sub-Description)</label>
                  <input
                    type="text"
                    name="subDescription"
                    value={story.subDescription}
                    onChange={handleStoryChange}
                    placeholder="e.g. Handcrafted by 5th generation artisans"
                    className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  value={story.description}
                  onChange={handleStoryChange}
                  placeholder="Elaborate on the story behind the piece..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium resize-y"
                />
              </div>
            </div>

            {/* Table display */}
            {(story.title || story.description || story.subDescription) && (
              <div className="overflow-x-auto border border-gold-500/20 rounded-xl shadow-sm">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-sand-50/80 text-royal-blue-900 font-cinzel text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Title</th>
                      <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Description</th>
                      <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Highlight Text</th>
                      <th className="px-4 py-3 border-b border-gold-500/20 text-right font-bold w-[100px]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-sand-50/50 transition-colors">
                      <td className="px-4 py-3 border-b border-gray-100 font-medium">{story.title}</td>
                      <td className="px-4 py-3 border-b border-gray-100 max-w-[200px] truncate" title={story.description}>{story.description}</td>
                      <td className="px-4 py-3 border-b border-gray-100">{story.subDescription}</td>
                      <td className="px-4 py-3 border-b border-gray-100 text-right">
                        <button type="button" onClick={() => setStory({ title: '', description: '', subDescription: '' })} className="text-red-400 hover:text-red-600 p-1 bg-white rounded-md shadow-sm border border-gray-100">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SECTION: MATERIALS & SPECIFICATIONS */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8 space-y-10">
            {/* Ingredients */}
            <div>
              <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Ingredients</h2>

              <div className="flex items-end gap-3 bg-sand-50/50 p-4 rounded-xl border border-gold-500/20 mb-6">
                <div className="flex-grow">
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">
                    {editingIngredientId ? 'Edit Ingredient' : 'New Ingredient'}
                  </label>
                  <input
                    type="text"
                    value={ingredientForm.label}
                    onChange={(e) => setIngredientForm({ label: e.target.value })}
                    placeholder="e.g. 22k Gold Plated Brass"
                    className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white font-medium"
                  />
                </div>
                <button
                  type="button"
                  onClick={saveIngredient}
                  className="px-6 py-2.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gold-600 transition-colors uppercase whitespace-nowrap h-[42px]"
                >
                  {editingIngredientId ? 'Update' : 'Add'}
                </button>
                {editingIngredientId && (
                  <button
                    type="button"
                    onClick={() => { setEditingIngredientId(null); setIngredientForm({ label: '' }); }}
                    className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gray-300 transition-colors uppercase h-[42px]"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Table display */}
              {material.ingdrients.length > 0 && (
                <div className="overflow-x-auto border border-gold-500/20 rounded-xl shadow-sm">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-sand-50/80 text-royal-blue-900 font-cinzel text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Ingredient Name</th>
                        <th className="px-4 py-3 border-b border-gold-500/20 text-right font-bold w-[120px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {material.ingdrients.map((ing) => (
                        <tr key={ing.id || ing.label} className="hover:bg-sand-50/50 transition-colors">
                          <td className="px-4 py-3 border-b border-gray-100 font-medium">{ing.label}</td>
                          <td className="px-4 py-3 border-b border-gray-100 text-right">
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={() => editIngredient(ing)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-royal-blue-600 hover:text-gold-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button type="button" onClick={() => deleteIngredient(ing.id)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-red-400 hover:text-red-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 pb-3">Specifications</h2>

              <div className="flex flex-col sm:flex-row items-end gap-3 bg-sand-50/50 p-4 rounded-xl border border-gold-500/20 mb-6">
                <div className="w-full sm:w-1/3">
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Key</label>
                  <input
                    type="text"
                    value={specForm.key}
                    onChange={(e) => setSpecForm({ ...specForm, key: e.target.value })}
                    placeholder="e.g. Weight"
                    className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white font-medium"
                  />
                </div>
                <div className="w-full sm:flex-grow">
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Value</label>
                  <input
                    type="text"
                    value={specForm.val}
                    onChange={(e) => setSpecForm({ ...specForm, val: e.target.value })}
                    placeholder="e.g. 13g"
                    className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white font-medium"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={saveSpecification}
                    className="flex-grow sm:flex-grow-0 px-6 py-2.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gold-600 transition-colors uppercase whitespace-nowrap h-[42px]"
                  >
                    {editingSpecId ? 'Update' : 'Add'}
                  </button>
                  {editingSpecId && (
                    <button
                      type="button"
                      onClick={() => { setEditingSpecId(null); setSpecForm({ key: '', val: '' }); }}
                      className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gray-300 transition-colors uppercase h-[42px]"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Table display */}
              {material.specification.length > 0 && (
                <div className="overflow-x-auto border border-gold-500/20 rounded-xl shadow-sm">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-sand-50/80 text-royal-blue-900 font-cinzel text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 border-b border-gold-500/20 font-bold w-1/3">Key</th>
                        <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Value</th>
                        <th className="px-4 py-3 border-b border-gold-500/20 text-right font-bold w-[120px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {material.specification.map((spec) => (
                        <tr key={spec.id || spec.key} className="hover:bg-sand-50/50 transition-colors">
                          <td className="px-4 py-3 border-b border-gray-100 font-medium text-gray-500">{spec.key}</td>
                          <td className="px-4 py-3 border-b border-gray-100 font-medium">{spec.val}</td>
                          <td className="px-4 py-3 border-b border-gray-100 text-right">
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={() => editSpecification(spec)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-royal-blue-600 hover:text-gold-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button type="button" onClick={() => deleteSpecification(spec.id)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-red-400 hover:text-red-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* SECTION: CARE & TERMS */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Care & Terms</h2>

            <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/20 space-y-4 mb-6">
              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Title</label>
                <input
                  type="text"
                  value={careForm.tittle}
                  onChange={(e) => setCareForm({ ...careForm, tittle: e.target.value })}
                  placeholder="e.g. Care Instructions"
                  className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">Description</label>
                <textarea
                  rows={2}
                  value={careForm.des}
                  onChange={(e) => setCareForm({ ...careForm, des: e.target.value })}
                  placeholder="e.g. Keep dry and store in our custom soft-padded box..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-white font-medium resize-y"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={saveCare}
                  className="px-6 py-2.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gold-600 transition-colors uppercase"
                >
                  {editingCareId ? 'Update Care Instruction' : 'Add Care Instruction'}
                </button>
                {editingCareId && (
                  <button
                    type="button"
                    onClick={() => { setEditingCareId(null); setCareForm({ tittle: '', des: '' }); }}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gray-300 transition-colors uppercase"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Table display */}
            {care.length > 0 && (
              <div className="overflow-x-auto border border-gold-500/20 rounded-xl shadow-sm">
                <table className="w-full text-left text-sm text-gray-700">
                  <thead className="bg-sand-50/80 text-royal-blue-900 font-cinzel text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-b border-gold-500/20 font-bold w-1/3">Title</th>
                      <th className="px-4 py-3 border-b border-gold-500/20 font-bold">Description</th>
                      <th className="px-4 py-3 border-b border-gold-500/20 text-right font-bold w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {care.map((item) => (
                      <tr key={item.id || item.tittle} className="hover:bg-sand-50/50 transition-colors">
                        <td className="px-4 py-3 border-b border-gray-100 font-medium text-royal-blue-900">{item.tittle}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-gray-600">{item.des}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-right">
                          <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => editCare(item)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-royal-blue-600 hover:text-gold-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button type="button" onClick={() => deleteCare(item.id)} className="p-1 bg-white rounded-md shadow-sm border border-gray-100 text-red-400 hover:text-red-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SECTION: PRODUCT IMAGES */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Product Images</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'front', label: 'Front Image' },
                { id: 'left', label: 'Left Side Image' },
                { id: 'right', label: 'Right Side Image' },
                { id: 'back', label: 'Backside Image' },
              ].map(side => (
                <CldImageUploader
                  key={side.id}
                  label={side.label}
                  value={images[side.id]}
                  onChange={(image) => {
                    setImages(prev => ({
                      ...prev,
                      [side.id]: image
                    }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/admin"
              className="px-8 py-4 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase inline-block text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-royal-blue-900 hover:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex-grow text-center flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEdit ? 'Updating Product...' : 'Saving Product...'}
                </>
              ) : (
                isEdit ? 'Update Product in Catalog' : 'Save Product to Catalog'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
