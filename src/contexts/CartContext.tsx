"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// تعريف أنواع البيانات
export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  dimensions?: string;
  material?: string;
  color?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

// إعدادات السلة الأولية
const initialState: CartState = {
  items: [],
  total: 0
};

// معالج الأحداث
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { items: updatedItems, total };
      } else {
        const newItems = [...state.items, { product: action.product, quantity: 1 }];
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { items: newItems, total };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.product.id !== action.productId);
      const total = filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      return { items: filteredItems, total };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const filteredItems = state.items.filter(item => item.product.id !== action.productId);
        const total = filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        return { items: filteredItems, total };
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      return { items: updatedItems, total };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
      
    default:
      return state;
  }
}

// Context
interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook لاستخدام Context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}