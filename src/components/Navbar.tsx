import React, { useState } from 'react';
import {
  Sun,
  Waves,
  ShoppingBag,
  Sparkles,
  MapPin,
  User,
  Heart,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  totalCo2SavedInCart: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  activeSection,
  onNavigate,
  totalCo2SavedInCart,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'catalogo', label: 'Coleção Solar' },
    { id: 'configurador', label: 'Monte seu Mix', icon: Sparkles, highlight: true },
    { id: 'depoimentos', label: 'Impacto & Depoimentos' },
    { id: 'rastreamento', label: 'Rastreio em Tempo Real', icon: MapPin },
    { id: 'perfil', label: 'Meu Perfil CO₂', icon: User },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EADFCF] transition-all">
      {/* Top Eco Announcement Bar */}
      <div className="bg-[#D96B43] text-[#FFF9F5] text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-[#FEE440]" />
          <span>100% dos pedidos com compensação auditada de CO₂ e embalagem zero plástico</span>
        </span>
        <span className="hidden md:inline-block opacity-60">•</span>
        <span className="hidden md:inline-block font-normal">Frete neutro em carbono para todo o Brasil</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E5A93C] via-[#D96B43] to-[#E29578] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-2xl tracking-tight text-[#2C241E]">
                  MARÉ SOLAR
                </span>
                <Waves className="w-4 h-4 text-[#3E8E84]" />
              </div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#88705C]">
                Biojoias • Sustentabilidade Costeira
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    link.highlight
                      ? 'bg-[#E5A93C]/15 text-[#9A5B14] hover:bg-[#E5A93C]/25 border border-[#E5A93C]/40'
                      : isActive
                      ? 'bg-[#2C241E] text-white'
                      : 'text-[#4A3E36] hover:text-[#D96B43] hover:bg-[#F3ECE2]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-[#D96B43]' : ''}`} />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Cart */}
          <div className="flex items-center gap-3">
            {/* Quick Profile Link for Small screens */}
            <button
              id="header-profile-btn"
              onClick={() => handleLinkClick('perfil')}
              title="Acessar Perfil de CO2"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EADFCF] bg-white/70 text-xs font-medium text-[#4A3E36] hover:border-[#D96B43] hover:text-[#D96B43] transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#3E8E84]" />
              <span>Marina Sol</span>
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2C241E] hover:bg-[#43362E] text-white text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FDE047]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D96B43] text-white text-[10px] font-bold flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Sacola</span>
              {totalCo2SavedInCart > 0 && (
                <span className="hidden xl:flex items-center gap-0.5 text-[11px] bg-[#3E8E84] text-white px-2 py-0.5 rounded-full font-semibold">
                  <Leaf className="w-2.5 h-2.5" />
                  -{totalCo2SavedInCart.toFixed(1)}kg CO₂
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#EADFCF] text-[#4A3E36] hover:bg-[#F3ECE2]"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EADFCF] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium text-[#2C241E] hover:bg-[#F3ECE2]"
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-[#D96B43]" />}
                  <span>{link.label}</span>
                </div>
                {link.highlight && (
                  <span className="text-[11px] bg-[#E5A93C]/20 text-[#9A5B14] px-2 py-0.5 rounded-full font-semibold">
                    Interativo
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
