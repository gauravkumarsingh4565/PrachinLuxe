import { createSlice } from '@reduxjs/toolkit';

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

const initialState = {
  user: null,
  orders: [],
  addresses: [],
  isLoaded: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadAuthFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('prachin_luxe_user');
        const storedOrders = localStorage.getItem('prachin_luxe_orders');
        const storedAddresses = localStorage.getItem('prachin_luxe_addresses');
        
        if (storedUser) {
          try {
            state.user = JSON.parse(storedUser);
          } catch (e) {
            console.error("Failed to parse user details from localStorage", e);
          }
        }

        if (storedOrders) {
          try {
            state.orders = JSON.parse(storedOrders);
          } catch (e) {
            console.error("Failed to parse orders list", e);
          }
        } else if (state.user && state.user.phone === '9876543210') {
          state.orders = INITIAL_MOCK_ORDERS;
        }

        if (storedAddresses) {
          try {
            state.addresses = JSON.parse(storedAddresses);
          } catch (e) {
            console.error("Failed to parse addresses list", e);
          }
        } else if (state.user && state.user.phone === '9876543210') {
          state.addresses = INITIAL_MOCK_ADDRESSES;
        }
      }
      state.isLoaded = true;
    },
    loginWithPhone: (state, action) => {
      const phone = action.payload;
      let cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length === 10) {
        cleanPhone = '+91' + cleanPhone;
      } else if (cleanPhone.length > 10 && cleanPhone.startsWith('91')) {
        cleanPhone = '+' + cleanPhone;
      }
      
      // In a real app we'd fetch this from a DB, using mock logic for now
      // Since MOCK_USERS_DB was defined externally, we'll create a simple mock user if it matches the mock phone
      if (cleanPhone === '+919876543210' || cleanPhone.includes('9876543210')) {
        const foundUser = {
          name: "Gaurav Kumar",
          phone: cleanPhone,
          email: "gaurav@example.com",
          role: "NORMALUSER",
          profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=Gaurav Kumar`
        };
        
        state.user = foundUser;
        if (state.orders.length === 0) state.orders = INITIAL_MOCK_ORDERS;
        if (state.addresses.length === 0) state.addresses = INITIAL_MOCK_ADDRESSES;
      } else {
         // Create a generic user for any other phone number for this mock
         const foundUser = {
           name: "Test User",
           phone: cleanPhone,
           email: "test@example.com",
           role: "NORMALUSER",
           profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=Test User`
         };
         state.user = foundUser;
      }
    },
    signupUser: (state, action) => {
      const userDetails = action.payload;
      let cleanPhone = userDetails.phone.replace(/\D/g, '');
      if (cleanPhone.length === 10) {
        cleanPhone = '+91' + cleanPhone;
      } else if (cleanPhone.length > 10 && cleanPhone.startsWith('91')) {
        cleanPhone = '+' + cleanPhone;
      }
      
      state.user = {
        phone: cleanPhone,
        name: userDetails.name,
        email: userDetails.email,
        profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userDetails.name)}`,
        role: 'NORMALUSER'
      };
      state.orders = [];
      state.addresses = [];
    },
    logout: (state) => {
      state.user = null;
      state.orders = [];
      state.addresses = [];
    },
    updateProfile: (state, action) => {
      const updatedDetails = action.payload;
      if (!state.user) return;
      
      let cleanPhone = updatedDetails.phone.replace(/\D/g, '');
      if (cleanPhone.length === 10) {
        cleanPhone = '+91' + cleanPhone;
      } else if (cleanPhone.length > 10 && cleanPhone.startsWith('91')) {
        cleanPhone = '+' + cleanPhone;
      }
      
      state.user = {
        ...state.user,
        name: updatedDetails.name,
        email: updatedDetails.email,
        phone: cleanPhone,
        profilePic: state.user.profilePic.includes('api.dicebear.com') 
          ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(updatedDetails.name)}`
          : state.user.profilePic
      };
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    addAddress: (state, action) => {
      const address = action.payload;
      const newAddr = {
        ...address,
        id: `addr-${Date.now()}`,
        isDefault: state.addresses.length === 0 ? true : address.isDefault || false
      };

      if (newAddr.isDefault) {
        state.addresses.forEach(a => a.isDefault = false);
      }
      state.addresses.push(newAddr);
    },
    removeAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses = state.addresses.filter(a => a.id !== addressId);
      
      if (state.addresses.length > 0 && !state.addresses.some(a => a.isDefault)) {
        state.addresses[0].isDefault = true;
      }
    },
    updateAddress: (state, action) => {
      const updatedAddress = action.payload;
      if (updatedAddress.isDefault) {
        state.addresses.forEach(a => a.isDefault = false);
      }
      
      const index = state.addresses.findIndex(a => a.id === updatedAddress.id);
      if (index !== -1) {
        state.addresses[index] = updatedAddress;
      }
    },
    setDefaultAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses.forEach(a => {
        a.isDefault = (a.id === addressId);
      });
    }
  }
});

export const { 
  loadAuthFromStorage, 
  loginWithPhone, 
  signupUser, 
  logout, 
  updateProfile, 
  addOrder, 
  addAddress, 
  removeAddress, 
  updateAddress, 
  setDefaultAddress 
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectOrders = (state) => state.auth.orders;
export const selectAddresses = (state) => state.auth.addresses;
export const selectIsAuthLoaded = (state) => state.auth.isLoaded;

export default authSlice.reducer;
