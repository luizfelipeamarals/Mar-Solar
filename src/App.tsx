import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomSetBuilder } from './components/CustomSetBuilder';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LiveTrackingSection } from './components/LiveTrackingSection';
import { UserProfileSection } from './components/UserProfileSection';
import { CartAndCheckoutModal } from './components/CartAndCheckoutModal';
import { Footer } from './components/Footer';

import {
  SUSTAINABLE_PRODUCTS,
  TESTIMONIALS,
  INITIAL_TRACKING_DATA,
  INITIAL_USER_PROFILE,
} from './data/mockData';
import { CartItem, CustomSetConfiguration, Product, UserEcoProfile } from './types';
import { Sparkles, Check, Leaf } from 'lucide-react';

export default function App() {
  // Navigation active section
  const [activeSection, setActiveSection] = useState<string>('catalogo');

  // Cart State (Initialized with 1 solar product to show the experience right away)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-cart-item',
      product: SUSTAINABLE_PRODUCTS[0],
      quantity: 1,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active tracking order code
  const [activeTrackingCode, setActiveTrackingCode] = useState<string>(INITIAL_TRACKING_DATA.orderCode);

  // User Profile State (updates with new purchases)
  const [userProfile, setUserProfile] = useState<UserEcoProfile>(INITIAL_USER_PROFILE);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.isCustomSet);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: `cart-item-${Date.now()}`, product, quantity: 1 }];
    });
    showToast(`"${product.name}" adicionado à sacola com neutralização de CO₂ inclusa!`);
  };

  const handleAddCustomSetToCart = (customProduct: Product, setDetails: CustomSetConfiguration) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `custom-set-cart-${Date.now()}`,
        product: customProduct,
        quantity: 1,
        isCustomSet: true,
        customSetDetails: setDetails,
      }
    ]);
    showToast(`Conjunto Personalizado adicionado com 15% OFF de Mix Sustentável!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // When order is completed at checkout:
  const handleOrderCompleted = (orderCode: string) => {
    setActiveTrackingCode(orderCode);

    // Calculate CO2 and plastic from order
    const totalOrderCo2 = cartItems.reduce(
      (sum, item) => sum + item.product.carbonFootprint.savedVsTraditionalKg * item.quantity,
      0
    );
    const totalOrderPlastic = cartItems.reduce(
      (sum, item) => sum + item.product.carbonFootprint.plasticRemovedGrams * item.quantity,
      0
    );

    // Update User Profile with new savings!
    setUserProfile((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalCO2SavedKg: Number((prev.totalCO2SavedKg + totalOrderCo2).toFixed(2)),
      totalPlasticCollectedGrams: prev.totalPlasticCollectedGrams + totalOrderPlastic,
      mangrovesFunded: prev.mangrovesFunded + 1,
      monthlyImpact: prev.monthlyImpact.map((m, idx) =>
        idx === prev.monthlyImpact.length - 1
          ? {
              ...m,
              co2Kg: Number((m.co2Kg + totalOrderCo2).toFixed(2)),
              plasticGrams: m.plasticGrams + totalOrderPlastic,
            }
          : m
      ),
    }));

    // Clear cart
    handleClearCart();
  };

  // Navigation smoothly scroll to target section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Total CO2 saved in current cart
  const totalCo2SavedInCart = cartItems.reduce(
    (sum, item) => sum + item.product.carbonFootprint.savedVsTraditionalKg * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#E29578]/30 selection:text-[#883617]">
      {/* Sticky Header Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        totalCo2SavedInCart={totalCo2SavedInCart}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#3E8E84] flex items-center justify-center text-white shrink-0">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigateToConfigurator={() => handleNavigate('configurador')}
          onNavigateToCatalog={() => handleNavigate('catalogo')}
        />

        {/* 2. Interactive Set Builder ("Monte seu Conjunto") */}
        <CustomSetBuilder onAddCustomSetToCart={handleAddCustomSetToCart} />

        {/* 3. Sustainable Products Catalog (Brincos, Pulseiras, Anéis, Colares, Tornozeleiras) */}
        <ProductCatalog
          products={SUSTAINABLE_PRODUCTS}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Testimonials with Positive Environmental Impact */}
        <TestimonialsSection testimonials={TESTIMONIALS} />

        {/* 5. Real-Time Delivery Tracking with Interactive Coastal Map */}
        <LiveTrackingSection
          trackingData={INITIAL_TRACKING_DATA}
          activeOrderCode={activeTrackingCode}
        />

        {/* 6. User Profile Detailing CO2 Emission Savings */}
        <UserProfileSection userProfile={userProfile} />
      </main>

      {/* Cart & Checkout Modal with Detailed Carbon Footprint per Piece */}
      <CartAndCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
