"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AddressesList() {
  const { addresses, addAddress, removeAddress, updateAddress, setDefaultAddress } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setStreet('');
    setCity('');
    setState('');
    setZip('');
    setIsDefault(false);
    setError('');
    setShowForm(false);
    setEditingId(null);
  };

  const handleEditClick = (address) => {
    setEditingId(address.id);
    setName(address.name);
    setPhone(address.phone);
    setEmail(address.email);
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setZip(address.zip);
    setIsDefault(address.isDefault);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !zip.trim()) {
      setError('Please fill in all required address fields.');
      return;
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit contact phone number.');
      return;
    }

    const payload = {
      name,
      phone,
      email,
      street,
      city,
      state,
      zip,
      isDefault
    };

    try {
      if (editingId) {
        updateAddress({ ...payload, id: editingId });
      } else {
        addAddress(payload);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save address coordinates.');
    }
  };

  return (
    <div className="w-full space-y-6 font-cormorant">
      
      {/* Header section with add button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">Addresses</h2>
          <p className="text-xs text-gray-500 font-sans">Manage your delivery destinations.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2.5 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-[10px] font-bold tracking-widest transition-all duration-300 uppercase"
          >
            Add Address
          </button>
        )}
      </div>

      <div className="h-px bg-gold-200/50 w-full" />

      {/* Address Form block */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gold-500/10 shadow-sm p-6 md:p-8 space-y-5 animate-fade-in font-sans text-sm">
          <div>
            <h3 className="font-cinzel text-sm font-bold text-royal-blue-950 tracking-wider uppercase mb-1">
              {editingId ? 'Edit Address Coordinates' : 'New Address Details'}
            </h3>
            <p className="text-[11px] text-gray-400">All fields are essential for express luxury delivery.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Recipient Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Contact Phone</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Email Address (for notifications)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Street Address</label>
              <input 
                type="text" 
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">City</label>
              <input 
                type="text" 
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">State</label>
              <input 
                type="text" 
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Zip Code</label>
              <input 
                type="text" 
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
              />
            </div>
            
            <div className="flex items-center gap-2 md:col-span-2 pt-2">
              <input 
                type="checkbox" 
                id="defaultAddr" 
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 rounded border-gold-500/30 text-royal-blue-900 focus:ring-royal-blue-900"
              />
              <label htmlFor="defaultAddr" className="text-xs text-gray-500 font-bold uppercase tracking-wide cursor-pointer font-cinzel">Set as default delivery address</label>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={resetForm}
              className="px-6 py-3 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase"
            >
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div 
            key={address.id} 
            className={`bg-white rounded-2xl p-5 border flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
              address.isDefault 
                ? 'border-gold-500 ring-1 ring-gold-500/20' 
                : 'border-gold-500/10'
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-cinzel text-sm font-bold text-royal-blue-950 uppercase tracking-wider">{address.name}</h4>
                {address.isDefault && (
                  <span className="bg-gold-500 text-royal-blue-950 text-[9px] font-bold px-2 py-0.5 rounded font-cinzel uppercase tracking-wide">
                    Default
                  </span>
                )}
              </div>
              
              <div className="h-px bg-gold-500/10 w-full" />
              
              <div className="font-sans text-[13px] text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{address.street}</p>
                <p>{address.city}, {address.state} — {address.zip}</p>
                <p className="pt-2 font-medium">📞 Phone: <span className="text-royal-blue-900">{address.phone}</span></p>
                <p className="font-medium">✉️ Email: {address.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 border-t border-gray-100 pt-4 mt-5 font-sans text-xs">
              {!address.isDefault && (
                <button 
                  onClick={() => setDefaultAddress(address.id)}
                  className="text-royal-blue-800 hover:text-gold-700 font-bold uppercase tracking-wider font-cinzel text-[10px]"
                >
                  Set Default
                </button>
              )}
              <button 
                onClick={() => handleEditClick(address)}
                className="text-gray-500 hover:text-gold-600 font-bold uppercase tracking-wider font-cinzel text-[10px]"
              >
                Edit
              </button>
              <button 
                onClick={() => removeAddress(address.id)}
                className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider font-cinzel text-[10px] ml-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
