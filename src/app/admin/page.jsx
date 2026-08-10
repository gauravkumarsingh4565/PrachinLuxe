"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    product: null,
    isDeleting: false
  });

  // Notification toast state
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Fetch products from database
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Helper to extract image URL
  const getProductImageUrl = (product) => {
    if (!product?.images) return null;
    if (typeof product.images === 'string') return product.images;
    if (typeof product.images.front === 'string' && product.images.front) return product.images.front;
    if (product.images.front?.url) return product.images.front.url;
    if (product.images.left?.url) return product.images.left.url;
    if (product.images.right?.url) return product.images.right.url;
    if (product.images.back?.url) return product.images.back.url;
    return null;
  };

  // Handle Product Delete
  const handleDeleteConfirm = async () => {
    if (!deleteModal.product) return;
    try {
      setDeleteModal(prev => ({ ...prev, isDeleting: true }));
      const res = await fetch(`/api/products/${deleteModal.product._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.success) {
        setProducts(prev => prev.filter(p => p._id !== deleteModal.product._id));
        showToast(`"${deleteModal.product.name}" deleted successfully`, 'success');
      } else {
        throw new Error(data.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showToast(err.message || 'Failed to delete product', 'error');
    } finally {
      setDeleteModal({ isOpen: false, product: null, isDeleting: false });
    }
  };

  // Filter products by search query only (No category/price filters)
  const filteredProducts = products.filter(product => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (product.name && product.name.toLowerCase().includes(q)) ||
      (product.category && product.category.toLowerCase().includes(q)) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q))
    );
  });

  const stats = [
    { label: 'Total Revenue', value: '₹ 4,52,000', change: '+12.5%' },
    { label: 'Active Orders', value: '34', change: '+5.2%' },
    { label: 'Total Customers', value: '1,205', change: '+18.1%' },
    { label: 'Products', value: loadingProducts ? '...' : products.length.toString(), change: '0%' },
  ];

  return (
    <div className="min-h-screen bg-sand-100 font-cormorant pb-12">
      {/* Toast Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-sans font-semibold transition-all transform translate-y-0 ${notification.type === 'success'
            ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
            : 'bg-rose-900 text-rose-100 border-rose-700'
          }`}>
          {notification.message}
        </div>
      )}

      {/* Top Banner / Breadcrumb */}
      <div className="bg-royal-blue-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-xs text-gold-400 font-semibold tracking-wide uppercase mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white">ADMIN PANEL</span>
          </nav>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider uppercase">Royal Administration</h1>
          <p className="text-sand-200/80 mt-2 font-sans text-sm max-w-xl">
            Manage your boutique's inventory, orders, and elite clientele from this central command center.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-gold border border-gold-500/20 p-4 flex flex-col gap-2 h-fit">
            {[
              { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
              { id: 'orders', label: 'Order Management', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
              { id: 'products', label: 'Jewelry Catalog', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
              { id: 'customers', label: 'Elite Clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'settings', label: 'Boutique Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-cinzel text-sm font-bold tracking-wide uppercase ${activeTab === tab.id
                    ? 'bg-royal-blue-900 text-gold-400 shadow-md'
                    : 'text-royal-blue-900 hover:bg-sand-50'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gold-500/20 shadow-sm p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold-100 to-transparent opacity-50 rounded-bl-full" />
                  <p className="text-gray-500 font-sans text-xs uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-cinzel text-2xl font-black text-royal-blue-950">{stat.value}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden">

              {/* Header inside Box */}
              <div className="p-6 border-b border-gold-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-sand-50/50">
                <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider flex items-center gap-2">
                  {activeTab === 'overview' && 'Recent Transactions'}
                  {activeTab === 'products' && `Jewelry Catalog (${filteredProducts.length})`}
                  {activeTab === 'orders' && 'Order Management'}
                  {activeTab === 'customers' && 'Elite Clients'}
                  {activeTab === 'settings' && 'Boutique Settings'}
                </h2>

                <div className="flex items-center gap-3">
                  {activeTab !== 'products' && (
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold font-sans text-gold-600 hover:text-gold-700 uppercase tracking-wider bg-gold-50 px-3 py-1.5 rounded-lg border border-gold-300/40 hover:bg-gold-100 transition-colors"
                    >
                      View All Products
                    </button>
                  )}
                  <Link
                    href="/admin/products/new"
                    className="px-4 py-2 bg-royal-blue-900 text-gold-400 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-950 transition-colors uppercase shadow-sm flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </Link>
                </div>
              </div>

              {/* Body Content */}
              {activeTab === 'products' ? (
                <div className="p-6 space-y-6">

                  {/* Search Bar - No filters added, just search as requested */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products by name, category, or subcategory..."
                      className="w-full pl-10 pr-10 py-3 bg-sand-50/60 border border-gold-500/30 rounded-xl font-sans text-sm focus:outline-none focus:border-gold-500 transition-colors placeholder:text-gray-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Vertical List of Products */}
                  {loadingProducts ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="font-cinzel text-royal-blue-900 font-bold">Loading Catalog...</p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center border border-dashed border-gold-300/60 rounded-xl bg-sand-50/30">
                      <svg className="w-12 h-12 text-gold-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="font-cinzel text-lg text-royal-blue-900 mb-1 font-bold">No Products Found</p>
                      <p className="font-sans text-xs text-gray-500 max-w-sm">
                        {searchQuery ? `No items matched "${searchQuery}". Try a different search term.` : 'Your catalog is currently empty. Click above to add a product.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProducts.map((product) => {
                        const imgUrl = getProductImageUrl(product);
                        return (
                          <div
                            key={product._id}
                            className="bg-white rounded-xl border border-gold-500/20 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                          >
                            {/* Product Info & Thumbnail */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-gold-200 overflow-hidden bg-sand-100 shrink-0 flex items-center justify-center relative">
                                {imgUrl ? (
                                  <img
                                    src={imgUrl}
                                    alt={product.name || 'Product'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                ) : (
                                  <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                  </svg>
                                )}
                              </div>

                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-royal-blue-950 truncate">
                                    {product.name}
                                  </h3>
                                  <span className={`text-[10px] font-bold font-sans px-2 py-0.5 rounded-full ${product.inStock !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                    }`}>
                                    {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-sans text-gray-500 flex-wrap">
                                  {product.category && (
                                    <span className="px-2 py-0.5 rounded bg-sand-100 text-royal-blue-900 font-semibold uppercase text-[10px]">
                                      {product.category}
                                    </span>
                                  )}
                                  {product.subcategory && (
                                    <span className="text-gold-700 font-medium">
                                      • {product.subcategory}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-baseline gap-2 pt-1">
                                  <span className="font-cinzel text-base font-black text-royal-blue-900">
                                    ₹ {product.price ? Number(product.price).toLocaleString('en-IN') : 0}
                                  </span>
                                  {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                                    <span className="font-sans text-xs text-gray-400 line-through">
                                      ₹ {Number(product.originalPrice).toLocaleString('en-IN')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons: Edit & Delete */}
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-sand-200">
                              <Link
                                href={`/admin/products/${product._id}/edit`}
                                className="px-3.5 py-2 rounded-lg border border-royal-blue-900/30 text-royal-blue-900 hover:bg-royal-blue-900 hover:text-white transition-all text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-2xs"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </Link>

                              <button
                                onClick={() => setDeleteModal({ isOpen: true, product, isDeleting: false })}
                                className="px-3.5 py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-2xs"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* Non-product Overview / Modules UI */
                <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
                  <svg className="w-12 h-12 text-gold-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="font-cinzel text-lg text-royal-blue-900 mb-2 font-bold">
                    {activeTab === 'overview' ? 'Overview Dashboard' : `${activeTab} Module`}
                  </p>
                  <p className="font-sans text-sm max-w-md mx-auto mb-6">
                    {activeTab === 'overview'
                      ? 'Click on "View All Products" or "Jewelry Catalog" in the left navigation to view and manage your full product list.'
                      : `The ${activeTab} module is currently under development.`}
                  </p>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-6 py-3 bg-royal-blue-900 text-gold-400 rounded-xl font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-950 transition-colors uppercase shadow-md"
                  >
                    View All Products
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && deleteModal.product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-royal-blue-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-gold-500/30 max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-royal-blue-950">Delete Product</h3>
            </div>

            <p className="font-sans text-sm text-gray-600">
              Are you sure you want to delete <span className="font-bold text-royal-blue-900">"{deleteModal.product.name}"</span>? This action cannot be undone and will permanently remove it from your boutique catalog.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                disabled={deleteModal.isDeleting}
                onClick={() => setDeleteModal({ isOpen: false, product: null, isDeleting: false })}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-cinzel text-xs font-bold uppercase hover:bg-sand-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={deleteModal.isDeleting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-cinzel text-xs font-bold uppercase hover:bg-rose-700 transition-colors disabled:opacity-50 shadow-md"
              >
                {deleteModal.isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
