"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductOnboarding() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    inStock: true,
    description: '',
    craftsmanship: ''
  });

  const [materials, setMaterials] = useState(['']);
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);

  const [images, setImages] = useState({
    front: null,
    left: null,
    right: null,
    back: null
  });

  const handleImageUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages(prev => ({ ...prev, [side]: imageUrl }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Materials Handlers
  const handleMaterialChange = (index, value) => {
    const newMaterials = [...materials];
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const addMaterial = () => setMaterials([...materials, '']);
  const removeMaterial = (index) => setMaterials(materials.filter((_, i) => i !== index));

  // Specifications Handlers
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => setSpecifications([...specifications, { key: '', value: '' }]);
  const removeSpecification = (index) => setSpecifications(specifications.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      materials: materials.filter(m => m.trim() !== ''),
      specifications: specifications.filter(s => s.key.trim() !== '' && s.value.trim() !== ''),
      images
    });
    alert('Form submitted! Check console for payload.');
  };

  return (
    <div className="w-full min-h-screen bg-sand-100 py-12 px-4 sm:px-6 lg:px-8 font-cormorant">
      <div className="max-w-[1000px] mx-auto space-y-8">

        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
          <Link href="/admin" className="hover:text-gold-600 transition-colors">ADMIN DASHBOARD</Link>
          <span className="mx-2 text-gold-400">/</span>
          <span className="text-royal-blue-900 font-bold">ADD NEW PRODUCT</span>
        </nav>

        {/* Page Title */}
        <div className="text-center sm:text-left">
          <h1 className="font-cinzel text-3xl font-bold text-royal-blue-950 tracking-wider uppercase mb-1">Product Onboarding</h1>
          <p className="text-gold-700 font-cinzel text-[10px] tracking-widest uppercase">Expand your royal collection</p>
          <div className="h-0.5 bg-gold-500/20 w-32 mt-3 mx-auto sm:mx-0" />
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in text-sm">

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
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Sets">Sets</option>
                  <option value="Najarbattu">Najarbattu</option>
                  <option value="Hairpin">Hairpin</option>
                </select>
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

          {/* SECTION: TEXT DETAILS */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Product Details</h2>
            <div className="space-y-6">
            </div>
          </div>

          {/* SECTION: MATERIALS & SPECIFICATIONS */}
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden p-6 sm:p-8">
            <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-6 border-b border-gray-100 pb-3">Materials & Specifications</h2>

            {/* Materials List */}
            <div className="mb-8">
              <label className="block font-bold text-royal-blue-900 uppercase text-[12px] tracking-widest font-cinzel mb-3">Materials Used</label>
              <div className="space-y-3">
                {materials.map((mat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={mat}
                      onChange={(e) => handleMaterialChange(idx, e.target.value)}
                      placeholder="e.g. 22k Gold Plated Brass"
                      className="flex-grow px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeMaterial(idx)}
                      disabled={materials.length === 1}
                      className="p-2.5 text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMaterial}
                className="mt-3 text-[10px] font-bold tracking-widest uppercase font-cinzel text-royal-blue-800 hover:text-gold-600 transition-colors flex items-center gap-1"
              >
                + Add Material
              </button>
            </div>

            {/* Specifications Key-Value */}
            <div>
              <label className="block font-bold text-royal-blue-900 uppercase text-[12px] tracking-widest font-cinzel mb-3">Specifications</label>
              <div className="space-y-3">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                      placeholder="Key (e.g. Weight)"
                      className="w-1/3 px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      placeholder="Value (e.g. 18.4 grams)"
                      className="flex-grow px-4 py-2.5 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(idx)}
                      disabled={specifications.length === 1}
                      className="p-2.5 text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSpecification}
                className="mt-3 text-[10px] font-bold tracking-widest uppercase font-cinzel text-royal-blue-800 hover:text-gold-600 transition-colors flex items-center gap-1"
              >
                + Add Specification
              </button>
            </div>
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
                <div key={side.id} className="space-y-3">
                  <label className="block font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel mb-2">
                    {side.label}
                  </label>
                  <div className="bg-sand-50/50 border border-gold-500/20 rounded-xl p-3 flex flex-col items-center justify-center gap-3 shadow-sm">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, side.id)}
                      className="w-full text-[11px] text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:font-semibold file:bg-sand-100 file:text-royal-blue-900 hover:file:bg-sand-200 cursor-pointer"
                    />
                    {images[side.id] ? (
                      <div className="w-full aspect-square rounded-lg overflow-hidden border border-gold-500/30 relative group shadow-sm bg-white">
                        <img 
                          src={images[side.id]} 
                          alt={`${side.label} Preview`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-lg border-2 border-dashed border-gold-500/20 bg-white flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Preview</span>
                      </div>
                    )}
                  </div>
                </div>
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
              className="px-10 py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex-grow text-center"
            >
              Save Product to Catalog
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
