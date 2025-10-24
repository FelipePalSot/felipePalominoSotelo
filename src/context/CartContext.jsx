import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const CART_KEY = "limpiezaProCart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.quantity, 0),
    [cart]
  );

  const shipping = cart.length > 0 ? 9.9 : 0;
  const total = subtotal + shipping;

  const PEN = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    subtotal,
    shipping,
    total,
    PEN,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
