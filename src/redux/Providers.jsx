"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect, useState } from "react";
import { loadAuthFromStorage } from "./slices/authSlice";
import { loadCartFromStorage } from "./slices/cartSlice";

export default function ReduxProvider({ children }) {
  // We need to delay rendering children until after we load the localStorage
  // Or at least hydrate the store from local storage first to prevent hydration errors.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dispatch initial load from localStorage
    store.dispatch(loadAuthFromStorage());
    store.dispatch(loadCartFromStorage());
    
    // Subscribe to store changes to save to localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      
      if (state.cart.isLoaded) {
        localStorage.setItem('prachin_luxe_cart', JSON.stringify(state.cart.cartItems));
      }
      
      if (state.auth.isLoaded) {
        // If we want to persist user, we can, but the original logic only persisted orders and addresses
        // Actually the original AuthContext did persist user!
        if (state.auth.user) {
          localStorage.setItem('prachin_luxe_user', JSON.stringify(state.auth.user));
        } else {
          localStorage.removeItem('prachin_luxe_user');
        }
        localStorage.setItem('prachin_luxe_orders', JSON.stringify(state.auth.orders));
        localStorage.setItem('prachin_luxe_addresses', JSON.stringify(state.auth.addresses));
      }
    });

    setMounted(true);

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
