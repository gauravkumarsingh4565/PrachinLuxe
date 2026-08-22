import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  isLoaded: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('prachin_luxe_cart');
        if (storedCart) {
          try {
            state.cartItems = JSON.parse(storedCart);
          } catch (e) {
            console.error("Failed to parse cart items from localStorage", e);
          }
        }
      }
      state.isLoaded = true;
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, action: qtyAction } = action.payload;
      const item = state.cartItems.find(item => item.product.id === productId);
      
      if (item) {
        const newQty = qtyAction === 'inc' ? item.quantity + 1 : item.quantity - 1;
        item.quantity = Math.max(1, newQty);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { loadCartFromStorage, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectIsCartLoaded = (state) => state.cart.isLoaded;
export const selectCartCount = (state) => 
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => 
  state.cart.cartItems.reduce((total, item) => {
    const priceNum = typeof item.product.price === 'number' 
      ? item.product.price 
      : parseFloat(String(item.product.price || 0).replace(/,/g, ''));
    return total + (priceNum * item.quantity);
  }, 0);

export default cartSlice.reducer;
