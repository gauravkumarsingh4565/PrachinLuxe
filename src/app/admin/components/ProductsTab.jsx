"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OnboarderProductList from './OnboarderProductList';

export default function ProductsTab() {
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

  return (
    <>
      {/* Toast Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-sans font-semibold transition-all transform translate-y-0 ${notification.type === 'success'
          ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
          : 'bg-rose-900 text-rose-100 border-rose-700'
          }`}>
          {notification.message}
        </div>
      )}

      {/* Header inside Box */}
      <div className="p-6 border-b border-gold-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-sand-50/50">
        <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider flex items-center gap-2">
          Jewelry Catalog ({filteredProducts.length})
        </h2>

        <div className="flex items-center gap-3">
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
      <div className="p-6 space-y-6">
        {/* Search Bar */}
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
          <OnboarderProductList products={filteredProducts} setDeleteModal={setDeleteModal} />
        )}
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
    </>
  );
}
