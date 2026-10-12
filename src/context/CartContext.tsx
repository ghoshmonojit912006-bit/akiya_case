import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, OrderCustomerInfo } from '../types';
import { BRAND_SETTINGS, IPHONE_MODELS } from '../data/settings';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, model?: string, color?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  updateModel: (itemId: string, newModel: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  bundleApplied: boolean;
  bundleSavings: number;
  shippingFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppUrl: (customerInfo?: Partial<OrderCustomerInfo>) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'akiya_cases_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    model: string = IPHONE_MODELS[0],
    color?: string,
    quantity: number = 1
  ) => {
    const selectedColor = color || product.colorName;
    const itemId = `${product.id}-${model}-${selectedColor}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedModel: model,
          selectedColor,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const updateModel = (itemId: string, newModel: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newId = `${item.productId}-${newModel}-${item.selectedColor}`;
          return {
            ...item,
            id: newId,
            selectedModel: newModel,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  // Standard regular subtotal
  const rawSubtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  // Promotional bundle calculation
  // E.g., Buy 2 cases for ₹1,199
  const { bundleApplied, bundleSavings, subtotal, discount } = useMemo(() => {
    const bundle = BRAND_SETTINGS.bundleOffer;
    if (bundle.enabled && totalItems >= bundle.requiredQty) {
      // Calculate how many bundles apply
      const numBundles = Math.floor(totalItems / bundle.requiredQty);
      const remainingItems = totalItems % bundle.requiredQty;

      // Find average price of remaining items or calculate precise discount
      const bundledRegularTotal = items
        .flatMap((item) => Array(item.quantity).fill(item.product.price))
        .sort((a, b) => b - a); // take highest priced items for bundling advantage

      const bundledSubsetRegular = bundledRegularTotal
        .slice(0, numBundles * bundle.requiredQty)
        .reduce((acc, curr) => acc + curr, 0);

      const bundleOfferTotal = numBundles * bundle.bundlePrice;
      const savings = Math.max(0, bundledSubsetRegular - bundleOfferTotal);

      return {
        bundleApplied: true,
        bundleSavings: savings,
        subtotal: rawSubtotal,
        discount: savings,
      };
    }

    return {
      bundleApplied: false,
      bundleSavings: 0,
      subtotal: rawSubtotal,
      discount: 0,
    };
  }, [items, totalItems, rawSubtotal]);

  const effectiveSubtotal = subtotal - discount;

  // Free shipping if subtotal >= threshold or if bundle is active
  const shippingFee = useMemo(() => {
    if (totalItems === 0) return 0;
    if (bundleApplied || effectiveSubtotal >= BRAND_SETTINGS.freeShippingThreshold) {
      return 0; // Free shipping
    }
    return BRAND_SETTINGS.standardShippingFee;
  }, [totalItems, bundleApplied, effectiveSubtotal]);

  const total = effectiveSubtotal + shippingFee;

  // WhatsApp Order message generator
  const generateWhatsAppUrl = (customerInfo?: Partial<OrderCustomerInfo>) => {
    const lines: string[] = [];

    lines.push(`✨ *NEW ORDER REQUEST — ${BRAND_SETTINGS.brandName}* ✨\n`);
    lines.push(`Hello AKIYA CASES Team! I'd love to place an order from your website:\n`);

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.product.name}*` +
        `\n   • Model: ${item.selectedModel}` +
        `\n   • Color: ${item.selectedColor}` +
        `\n   • Qty: ${item.quantity}` +
        `\n   • Price: ₹${item.product.price * item.quantity}`
      );
    });

    lines.push('');
    lines.push(`---------------------------`);
    lines.push(`🛍️ *Total Items:* ${totalItems}`);
    lines.push(`💰 *Item Subtotal:* ₹${subtotal}`);

    if (bundleApplied && bundleSavings > 0) {
      lines.push(`🎉 *${BRAND_SETTINGS.bundleOffer.name}:* -₹${bundleSavings}`);
    }

    lines.push(`🚚 *Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}`);
    lines.push(`🏷️ *Final Total:* ₹${total}`);
    lines.push(`---------------------------`);

    if (customerInfo && customerInfo.fullName) {
      lines.push('\n📍 *Customer Details:*');
      lines.push(`Name: ${customerInfo.fullName}`);
      if (customerInfo.phone) lines.push(`Phone: ${customerInfo.phone}`);
      if (customerInfo.email) lines.push(`Email: ${customerInfo.email}`);
      if (customerInfo.address) {
        lines.push(
          `Address: ${customerInfo.address}, ${customerInfo.city || ''}, ${customerInfo.state || ''} - ${customerInfo.pincode || ''}`
        );
      }
      if (customerInfo.paymentMethod) {
        lines.push(`Preferred Payment: ${customerInfo.paymentMethod.toUpperCase()}`);
      }
    }

    lines.push('\nPlease confirm product availability and delivery timeline! Thank you ♡');

    const messageText = lines.join('\n');
    const cleanNumber = BRAND_SETTINGS.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateModel,
        clearCart,
        totalItems,
        subtotal,
        discount,
        bundleApplied,
        bundleSavings,
        shippingFee,
        total,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
