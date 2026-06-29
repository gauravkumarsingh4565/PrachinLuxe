"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Pre-registered mock database
const MOCK_USERS_DB = [
  {
    phone: '9876543210',
    name: 'Gaurav Kumar',
    email: 'gaurav@example.com',
    profilePic: 'https://i.pravatar.cc/150?img=11'
  }
];

// Pre-populated data for Gaurav Kumar
const INITIAL_MOCK_ORDERS = [
  {
    id: 'PL-2026-9874',
    date: 'June 15, 2026',
    total: 14500,
    status: 'Delivered',
    paymentMethod: 'UPI (GPay)',
    items: [
      {
        product: {
          id: 'temple-necklace-1',
          name: 'Temple Lakshmi Nakashi Choker',
          price: '14,500',
          img: '/src/assets/images/product_temple_necklace.png',
          category: 'Necklaces'
        },
        quantity: 1
      }
    ]
  },
  {
    id: 'PL-2026-8712',
    date: 'May 20, 2026',
    total: 8200,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    items: [
      {
        product: {
          id: 'earrings-chandbali-2',
          name: 'Kundan Royal Floral Chandbali',
          price: '8,200',
          img: '/src/assets/images/product_chandbali.png',
          category: 'Earrings'
        },
        quantity: 1
      }
    ]
  }
];

const INITIAL_MOCK_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Gaurav Kumar',
    phone: '+91 98765 43210',
    email: 'gaurav@example.com',
    street: '12, Heritage Residency, Palace Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    zip: '302001',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Gaurav Kumar (Office)',
    phone: '+91 98765 43210',
    email: 'gaurav@example.com',
    street: 'Plot 42, Sector 5, Mansarovar',
    city: 'Jaipur',
    state: 'Rajasthan',
    zip: '302020',
    isDefault: false
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user from localStorage only on client-side
  useEffect(() => {
    const storedUser = localStorage.getItem('prachin_luxe_user');
    const storedOrders = localStorage.getItem('prachin_luxe_orders');
    const storedAddresses = localStorage.getItem('prachin_luxe_addresses');
    
    let currentUser = null;
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
        setUser(currentUser);
      } catch (e) {
        console.error("Failed to parse user details from localStorage", e);
      }
    }

    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Failed to parse orders list", e);
      }
    } else if (currentUser && currentUser.phone === '9876543210') {
      setOrders(INITIAL_MOCK_ORDERS);
      localStorage.setItem('prachin_luxe_orders', JSON.stringify(INITIAL_MOCK_ORDERS));
    }

    if (storedAddresses) {
      try {
        setAddresses(JSON.parse(storedAddresses));
      } catch (e) {
        console.error("Failed to parse addresses list", e);
      }
    } else if (currentUser && currentUser.phone === '9876543210') {
      setAddresses(INITIAL_MOCK_ADDRESSES);
      localStorage.setItem('prachin_luxe_addresses', JSON.stringify(INITIAL_MOCK_ADDRESSES));
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes (only after loading is complete)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('prachin_luxe_orders', JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('prachin_luxe_addresses', JSON.stringify(addresses));
    }
  }, [addresses, isLoaded]);

  const loginWithPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const foundUser = MOCK_USERS_DB.find(u => u.phone === cleanPhone);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('prachin_luxe_user', JSON.stringify(foundUser));
      
      // Load mock items for Gaurav Kumar if no stored items exist
      const storedOrders = localStorage.getItem('prachin_luxe_orders');
      const storedAddresses = localStorage.getItem('prachin_luxe_addresses');
      
      if (!storedOrders) {
        setOrders(INITIAL_MOCK_ORDERS);
      }
      if (!storedAddresses) {
        setAddresses(INITIAL_MOCK_ADDRESSES);
      }

      return { success: true, user: foundUser };
    }
    
    return { success: false, reason: 'unregistered' };
  };

  const signupUser = (userDetails) => {
    const newUser = {
      phone: userDetails.phone.replace(/\D/g, ''),
      name: userDetails.name,
      email: userDetails.email,
      profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userDetails.name)}`
    };
    
    setUser(newUser);
    localStorage.setItem('prachin_luxe_user', JSON.stringify(newUser));
    
    // Clear list of old cached data for new signups
    setOrders([]);
    setAddresses([]);
    localStorage.removeItem('prachin_luxe_orders');
    localStorage.removeItem('prachin_luxe_addresses');

    return newUser;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setAddresses([]);
    localStorage.removeItem('prachin_luxe_user');
    localStorage.removeItem('prachin_luxe_orders');
    localStorage.removeItem('prachin_luxe_addresses');
  };

  const updateProfile = (updatedDetails) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      name: updatedDetails.name,
      email: updatedDetails.email,
      phone: updatedDetails.phone.replace(/\D/g, ''),
      // update initials avatar if name changes and it was an initials seed
      profilePic: user.profilePic.includes('api.dicebear.com') 
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(updatedDetails.name)}`
        : user.profilePic
    };
    
    setUser(updatedUser);
    localStorage.setItem('prachin_luxe_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const addAddress = (address) => {
    const newAddr = {
      ...address,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : address.isDefault || false
    };

    setAddresses((prev) => {
      // If setting this one to default, remove default from others
      if (newAddr.isDefault) {
        return prev.map(a => ({ ...a, isDefault: false })).concat(newAddr);
      }
      return [...prev, newAddr];
    });
  };

  const removeAddress = (addressId) => {
    setAddresses((prev) => {
      const filtered = prev.filter(a => a.id !== addressId);
      // If we deleted the default address, set default to the first remaining one
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const updateAddress = (updatedAddress) => {
    setAddresses((prev) => {
      let list = prev.map(a => a.id === updatedAddress.id ? updatedAddress : a);
      if (updatedAddress.isDefault) {
        list = list.map(a => a.id === updatedAddress.id ? a : { ...a, isDefault: false });
      }
      return list;
    });
  };

  const setDefaultAddress = (addressId) => {
    setAddresses((prev) => {
      return prev.map(a => ({
        ...a,
        isDefault: a.id === addressId
      }));
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      addresses,
      isLoaded,
      loginWithPhone,
      signupUser,
      logout,
      updateProfile,
      addOrder,
      addAddress,
      removeAddress,
      updateAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
