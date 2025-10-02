import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isProcessing: boolean;
  orderComplete: boolean;
  justAdded: string | null;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  isOpen: boolean;
  isProcessing: boolean;
  orderComplete: boolean;
  justAdded: string | null;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  processOrder: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    isOpen: false,
    isProcessing: false,
    orderComplete: false,
    justAdded: null
  });

  const addItem = useCallback((product: Product, quantity = 1) => {
    setCartState(prevState => {
      const existingItem = prevState.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...prevState,
          items: prevState.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      return {
        ...prevState,
        items: [...prevState.items, { product, quantity }],
        justAdded: product.name
      };
    });

    // Limpiar el estado de "recién agregado" después de 2 segundos
    setTimeout(() => {
      setCartState(prevState => ({
        ...prevState,
        justAdded: null
      }));
    }, 2000);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartState(prevState => ({
      ...prevState,
      items: prevState.items.filter(item => item.product.id !== productId)
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setCartState(prevState => ({
      ...prevState,
      items: prevState.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCartState(prevState => ({
      ...prevState,
      items: [],
      orderComplete: false
    }));
  }, []);

  const setIsOpen = useCallback((isOpen: boolean) => {
    setCartState(prevState => ({
      ...prevState,
      isOpen
    }));
  }, []);

  const processOrder = useCallback(async () => {
    setCartState(prevState => ({
      ...prevState,
      isProcessing: true
    }));

    // Simular procesamiento de orden
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCartState(prevState => ({
      ...prevState,
      isProcessing: false,
      orderComplete: true,
      justAdded: null
    }));

    // Auto-cerrar después de mostrar confirmación
    setTimeout(() => {
      setCartState(prevState => ({
        ...prevState,
        items: [],
        orderComplete: false,
        isOpen: false
      }));
    }, 3000);
  }, []);

  const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartState.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const subtotal = totalPrice;
  const shipping = totalPrice > 500 ? 0 : 25;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  const value: CartContextType = {
    items: cartState.items,
    totalItems,
    totalPrice,
    subtotal,
    shipping,
    tax,
    finalTotal,
    isOpen: cartState.isOpen,
    isProcessing: cartState.isProcessing,
    orderComplete: cartState.orderComplete,
    justAdded: cartState.justAdded,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    processOrder
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}