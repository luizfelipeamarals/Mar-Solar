import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  RotateCcw,
  ShoppingBag,
  Leaf,
  Waves,
  Heart,
  ChevronRight,
  Sun,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  SET_BASES,
  SET_PENDANTS,
  SET_EARRINGS,
  SET_RINGS
} from '../data/mockData';
import { CustomSetComponentItem, CustomSetConfiguration, Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CustomSetBuilderProps {
  onAddCustomSetToCart: (customProduct: Product, setDetails: CustomSetConfiguration) => void;
}

export const CustomSetBuilder: React.FC<CustomSetBuilderProps> = ({
  onAddCustomSetToCart,
}) => {
  // Current step / active tab
  const [activeTab, setActiveTab] = useState<'base' | 'pendant' | 'earring' | 'ring'>('base');

  // Selected items in the set
  const [selectedBase, setSelectedBase] = useState<CustomSetComponentItem | null>(SET_BASES[0]);
  const [selectedPendant, setSelectedPendant] = useState<CustomSetComponentItem | null>(SET_PENDANTS[0]);
  const [selectedEarring, setSelectedEarring] = useState<CustomSetComponentItem | null>(SET_EARRINGS[0]);
  const [selectedRing, setSelectedRing] = useState<CustomSetComponentItem | null>(SET_RINGS[0]);
  const [customEngraving, setCustomEngraving] = useState<string>('SOL & MAR');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Totals calculation
  const selectedItems = [selectedBase, selectedPendant, selectedEarring, selectedRing].filter(
    (item): item is CustomSetComponentItem => item !== null
  );

  const rawTotalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  // 15% discount for complete set of 4 pieces, 10% for 3 pieces
  const discountRate = selectedItems.length === 4 ? 0.15 : selectedItems.length >= 2 ? 0.10 : 0;
  const finalPrice = rawTotalPrice * (1 - discountRate);

  const totalCo2Saved = selectedItems.reduce((sum, item) => sum + item.co2SavedKg, 0);
  const totalPlasticRemoved = selectedItems.reduce((sum, item) => sum + item.plasticRemovedGrams, 0);

  const handleReset = () => {
    setSelectedBase(SET_BASES[0]);
    setSelectedPendant(null);
    setSelectedEarring(null);
    setSelectedRing(null);
    setCustomEngraving('');
  };

  const handleApplyPreset = (type: 'sereia' | 'dourado' | 'onda') => {
    if (type === 'sereia') {
      setSelectedBase(SET_BASES[1]);
      setSelectedPendant(SET_PENDANTS[3]);
      setSelectedEarring(SET_EARRINGS[1]);
      setSelectedRing(SET_RINGS[1]);
      setCustomEngraving('SEREIA');
    } else if (type === 'dourado') {
      setSelectedBase(SET_BASES[0]);
      setSelectedPendant(SET_PENDANTS[2]);
      setSelectedEarring(SET_EARRINGS[0]);
      setSelectedRing(SET_RINGS[0]);
      setCustomEngraving('SOLSTÍCIO');
    } else {
      setSelectedBase(SET_BASES[2]);
      setSelectedPendant(SET_PENDANTS[1]);
      setSelectedEarring(SET_EARRINGS[2]);
      setSelectedRing(SET_RINGS[0]);
      setCustomEngraving('MARÉ ALTA');
    }
  };

  const handleAddToCart = () => {
    if (!selectedBase) return;

    const setConfig: CustomSetConfiguration = {
      id: `custom-set-${Date.now()}`,
      title: `Mix Solar Exclusivo (${selectedBase.name})`,
      base: selectedBase,
      pendant: selectedPendant,
      earring: selectedEarring,
      ring: selectedRing,
      engravingText: customEngraving.trim() || undefined,
    };

    const combinedMaterials = Array.from(
      new Set(selectedItems.map((item) => item.material))
    );

    const customProduct: Product = {
      id: setConfig.id,
      name: `Mix Solar Personalizado: ${selectedBase.name.split(' ')[0]} + ${selectedItems.length} Peças`,
      category: 'colares',
      price: Math.round(finalPrice),
      originalPrice: discountRate > 0 ? Math.round(rawTotalPrice) : undefined,
      description: `Conjunto harmonizado exclusivo montado no Configurador Solar com gravação "${customEngraving || 'Maré Solar'}".`,
      shortStory: 'Composto por peças sustentáveis selecionadas artesanalmente em ateliês costeiros.',
      materials: combinedMaterials,
      carbonFootprint: {
        emittedKg: 0.35,
        savedVsTraditionalKg: Number(totalCo2Saved.toFixed(2)),
        plasticRemovedGrams: totalPlasticRemoved,
        treesEquivalent: Number((totalCo2Saved * 0.7).toFixed(1)),
      },
      imageUrl: selectedBase.imageUrl,
      rating: 5.0,
      reviewsCount: 1,
      artisanOrigin: 'Ateliê Costeiro Maré Solar (Trancoso & Noronha)',
      badge: 'Conjunto Personalizado',
    };

    onAddCustomSetToCart(customProduct, setConfig);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  return (
    <section id="configurador" className="py-20 bg-sand-texture border-b border-[#EADFCF] relative overflow-hidden">
      {/* Background Solar Accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#E5A93C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#9A5B14] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D96B43]" />
            <span>Configurador Interativo</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C241E] tracking-tight">
            Monte seu Próprio Conjunto Praiano
          </h2>
          <p className="text-[#68584B] text-base sm:text-lg font-serif-eco italic">
            Combine colares, pingentes de concha, brincos solares e anéis fluídos. Ao montar o mix completo você ganha até 15% OFF e maximiza o impacto ecológico positivo.
          </p>

          {/* Quick Presets Inspiration */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-semibold text-[#88705C]">Sugestões de Harmonia:</span>
            <button
              id="preset-dourado-btn"
              onClick={() => handleApplyPreset('dourado')}
              className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#D96B43] border border-[#DECDBB] hover:border-[#D96B43] transition-colors"
            >
              ✨ Solstício Tropical
            </button>
            <button
              id="preset-sereia-btn"
              onClick={() => handleApplyPreset('sereia')}
              className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#3E8E84] border border-[#DECDBB] hover:border-[#3E8E84] transition-colors"
            >
              🐚 Canto da Sereia
            </button>
            <button
              id="preset-onda-btn"
              onClick={() => handleApplyPreset('onda')}
              className="px-3 py-1 rounded-full bg-white text-xs font-medium text-[#265B54] border border-[#DECDBB] hover:border-[#265B54] transition-colors"
            >
              🌊 Maré Azul Circular
            </button>
          </div>
        </div>

        {/* Builder Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Top: Interactive Visual Tray (Bandeja Solar) */}
          <div className="lg:col-span-6 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-xl relative overflow-hidden">
              {/* Linen & Sand Texture Plate */}
              <div className="flex items-center justify-between mb-4 border-b border-[#F3ECE2] pb-3">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#E5A93C]" />
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-[#2C241E]">
                    Bandeja de Curadoria Solar
                  </span>
                </div>
                <button
                  id="reset-set-builder-btn"
                  onClick={handleReset}
                  className="text-xs text-[#88705C] hover:text-[#D96B43] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar Mix</span>
                </button>
              </div>

              {/* Visual Composition Tray */}
              <div className="relative min-h-[380px] bg-[#FAF7F2] rounded-2xl border-2 border-dashed border-[#E5D7C5] p-5 flex flex-col justify-between overflow-hidden">
                {/* Decorative Sun Watermark */}
                <Sun className="absolute -top-10 -right-10 w-48 h-48 text-[#F6EDE0] pointer-events-none" />

                {/* 4 Slots Preview in Linen Arrangement */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                  {/* Slot 1: Base */}
                  <div
                    onClick={() => setActiveTab('base')}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center gap-3 ${
                      selectedBase
                        ? 'bg-white border-[#EADFCF] shadow-sm hover:border-[#D96B43]'
                        : 'bg-white/50 border-dashed border-[#DECDBB] hover:bg-white'
                    }`}
                  >
                    {selectedBase ? (
                      <>
                        <ImageWithFallback
                          src={selectedBase.imageUrl}
                          alt={selectedBase.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-bold text-[#D96B43] block">
                            1. Base
                          </span>
                          <p className="text-xs font-bold text-[#2C241E] truncate">
                            {selectedBase.name}
                          </p>
                          <p className="text-[11px] font-semibold text-[#88705C]">
                            R$ {selectedBase.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#A38E7E] p-2">
                        <Plus className="w-4 h-4" />
                        <span>Escolher Base</span>
                      </div>
                    )}
                  </div>

                  {/* Slot 2: Pendant */}
                  <div
                    onClick={() => setActiveTab('pendant')}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center gap-3 ${
                      selectedPendant
                        ? 'bg-white border-[#EADFCF] shadow-sm hover:border-[#D96B43]'
                        : 'bg-white/50 border-dashed border-[#DECDBB] hover:bg-white'
                    }`}
                  >
                    {selectedPendant ? (
                      <>
                        <ImageWithFallback
                          src={selectedPendant.imageUrl}
                          alt={selectedPendant.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-bold text-[#D96B43] block">
                            2. Amuleto
                          </span>
                          <p className="text-xs font-bold text-[#2C241E] truncate">
                            {selectedPendant.name}
                          </p>
                          <p className="text-[11px] font-semibold text-[#88705C]">
                            R$ {selectedPendant.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#A38E7E] p-2">
                        <Plus className="w-4 h-4" />
                        <span>Adicionar Amuleto</span>
                      </div>
                    )}
                  </div>

                  {/* Slot 3: Earrings */}
                  <div
                    onClick={() => setActiveTab('earring')}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center gap-3 ${
                      selectedEarring
                        ? 'bg-white border-[#EADFCF] shadow-sm hover:border-[#D96B43]'
                        : 'bg-white/50 border-dashed border-[#DECDBB] hover:bg-white'
                    }`}
                  >
                    {selectedEarring ? (
                      <>
                        <ImageWithFallback
                          src={selectedEarring.imageUrl}
                          alt={selectedEarring.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-bold text-[#D96B43] block">
                            3. Brinco
                          </span>
                          <p className="text-xs font-bold text-[#2C241E] truncate">
                            {selectedEarring.name}
                          </p>
                          <p className="text-[11px] font-semibold text-[#88705C]">
                            R$ {selectedEarring.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#A38E7E] p-2">
                        <Plus className="w-4 h-4" />
                        <span>Adicionar Brinco</span>
                      </div>
                    )}
                  </div>

                  {/* Slot 4: Ring */}
                  <div
                    onClick={() => setActiveTab('ring')}
                    className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center gap-3 ${
                      selectedRing
                        ? 'bg-white border-[#EADFCF] shadow-sm hover:border-[#D96B43]'
                        : 'bg-white/50 border-dashed border-[#DECDBB] hover:bg-white'
                    }`}
                  >
                    {selectedRing ? (
                      <>
                        <ImageWithFallback
                          src={selectedRing.imageUrl}
                          alt={selectedRing.name}
                          className="w-14 h-14 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] uppercase font-bold text-[#D96B43] block">
                            4. Anel
                          </span>
                          <p className="text-xs font-bold text-[#2C241E] truncate">
                            {selectedRing.name}
                          </p>
                          <p className="text-[11px] font-semibold text-[#88705C]">
                            R$ {selectedRing.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#A38E7E] p-2">
                        <Plus className="w-4 h-4" />
                        <span>Adicionar Anel</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional Custom Engraving Input */}
                <div className="mt-4 pt-3 border-t border-[#EADFCF] flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-[11px] font-semibold text-[#7A6757] block mb-1">
                      Gravação Artesanal na Plaquinha Eco (Grátis):
                    </label>
                    <input
                      type="text"
                      maxLength={14}
                      value={customEngraving}
                      onChange={(e) => setCustomEngraving(e.target.value.toUpperCase())}
                      placeholder="Ex: SOL & MAR, YEMANJÁ, NOME"
                      className="w-full bg-white border border-[#DECDBB] rounded-xl px-3 py-1.5 text-xs text-[#2C241E] uppercase font-bold tracking-widest focus:outline-none focus:border-[#D96B43]"
                    />
                  </div>
                </div>
              </div>

              {/* Eco Impact Meter of Current Set */}
              <div className="mt-5 p-4 rounded-2xl bg-[#3E8E84]/10 border border-[#3E8E84]/25 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#265B54]">
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-4 h-4" />
                    Impacto do seu Conjunto:
                  </span>
                  <span>{selectedItems.length} de 4 peças escolhidas</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/80 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-[#7A6757] block">CO₂ Poupado</span>
                    <span className="font-extrabold text-[#3E8E84] text-sm">
                      -{totalCo2Saved.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl text-center">
                    <span className="text-[10px] text-[#7A6757] block">Plástico Retirado</span>
                    <span className="font-extrabold text-[#D96B43] text-sm">
                      -{totalPlasticRemoved} g
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Add to Cart Button */}
              <div className="mt-5 pt-4 border-t border-[#F3ECE2] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-2xl text-[#2C241E]">
                      R$ {finalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    {discountRate > 0 && (
                      <span className="text-sm line-through text-[#A38E7E]">
                        R$ {rawTotalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  {discountRate > 0 ? (
                    <span className="text-xs text-[#3E8E84] font-bold">
                      Desconto de {discountRate * 100}% de Mix Ativado!
                    </span>
                  ) : (
                    <span className="text-xs text-[#88705C]">
                      Adicione 3+ peças para ganhar até 15% OFF
                    </span>
                  )}
                </div>

                <button
                  id="builder-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedBase}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    isAddedSuccess
                      ? 'bg-[#3E8E84] text-white'
                      : 'bg-gradient-to-r from-[#D96B43] to-[#E5A93C] hover:brightness-105 text-white active:scale-95'
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Mix Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#FFF275]" />
                      <span>Garantir Meu Mix Solar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Selection Slots & Components */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#EADFCF] shadow-sm overflow-x-auto scrollbar-none">
              <button
                id="tab-base-btn"
                onClick={() => setActiveTab('base')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'base'
                    ? 'bg-[#2C241E] text-white shadow-sm'
                    : 'text-[#5C4E43] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>1. Base</span>
                {selectedBase && <Check className="w-3 h-3 text-[#3E8E84]" />}
              </button>

              <button
                id="tab-pendant-btn"
                onClick={() => setActiveTab('pendant')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pendant'
                    ? 'bg-[#2C241E] text-white shadow-sm'
                    : 'text-[#5C4E43] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>2. Amuleto</span>
                {selectedPendant && <Check className="w-3 h-3 text-[#3E8E84]" />}
              </button>

              <button
                id="tab-earring-btn"
                onClick={() => setActiveTab('earring')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'earring'
                    ? 'bg-[#2C241E] text-white shadow-sm'
                    : 'text-[#5C4E43] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>3. Brincos</span>
                {selectedEarring && <Check className="w-3 h-3 text-[#3E8E84]" />}
              </button>

              <button
                id="tab-ring-btn"
                onClick={() => setActiveTab('ring')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ring'
                    ? 'bg-[#2C241E] text-white shadow-sm'
                    : 'text-[#5C4E43] hover:bg-[#FAF7F2]'
                }`}
              >
                <span>4. Anel</span>
                {selectedRing && <Check className="w-3 h-3 text-[#3E8E84]" />}
              </button>
            </div>

            {/* Component Cards Grid according to Active Tab */}
            <div className="space-y-4">
              {activeTab === 'base' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2C241E] uppercase tracking-wider">
                      Escolha a Base Principal do Mix
                    </h3>
                    <span className="text-xs text-[#88705C]">Passo 1 de 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SET_BASES.map((item) => {
                      const isSelected = selectedBase?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          id={`base-option-${item.id}`}
                          onClick={() => {
                            setSelectedBase(item);
                            setActiveTab('pendant');
                          }}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#D96B43] ring-2 ring-[#D96B43]/30 shadow-md'
                              : 'bg-white hover:bg-[#F3ECE2] border-[#EADFCF]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                            />
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#2C241E]">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-[#68584B] leading-tight">
                                {item.description}
                              </p>
                              <span className="inline-block text-[10px] text-[#3E8E84] font-semibold">
                                🌱 -{item.co2SavedKg}kg CO₂
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#2C241E]">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-[#D96B43] text-white'
                                  : 'bg-[#FAF7F2] text-[#68584B]'
                              }`}
                            >
                              {isSelected ? 'Selecionado' : 'Escolher'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'pendant' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2C241E] uppercase tracking-wider">
                      Escolha o Amuleto ou Pingente Solar
                    </h3>
                    <span className="text-xs text-[#88705C]">Passo 2 de 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SET_PENDANTS.map((item) => {
                      const isSelected = selectedPendant?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          id={`pendant-option-${item.id}`}
                          onClick={() => {
                            setSelectedPendant(isSelected ? null : item);
                            if (!isSelected) setActiveTab('earring');
                          }}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#D96B43] ring-2 ring-[#D96B43]/30 shadow-md'
                              : 'bg-white hover:bg-[#F3ECE2] border-[#EADFCF]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                            />
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#2C241E]">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-[#68584B] leading-tight">
                                {item.description}
                              </p>
                              <span className="inline-block text-[10px] text-[#3E8E84] font-semibold">
                                🌊 {item.plasticRemovedGrams}g plástico limpo
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#2C241E]">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-[#D96B43] text-white'
                                  : 'bg-[#FAF7F2] text-[#68584B]'
                              }`}
                            >
                              {isSelected ? 'Selecionado' : 'Adicionar'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'earring' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2C241E] uppercase tracking-wider">
                      Adicione Brincos para Harmonizar
                    </h3>
                    <span className="text-xs text-[#88705C]">Passo 3 de 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SET_EARRINGS.map((item) => {
                      const isSelected = selectedEarring?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          id={`earring-option-${item.id}`}
                          onClick={() => {
                            setSelectedEarring(isSelected ? null : item);
                            if (!isSelected) setActiveTab('ring');
                          }}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#D96B43] ring-2 ring-[#D96B43]/30 shadow-md'
                              : 'bg-white hover:bg-[#F3ECE2] border-[#EADFCF]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                            />
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#2C241E]">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-[#68584B] leading-tight">
                                {item.description}
                              </p>
                              <span className="inline-block text-[10px] text-[#3E8E84] font-semibold">
                                🌱 -{item.co2SavedKg}kg CO₂
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#2C241E]">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-[#D96B43] text-white'
                                  : 'bg-[#FAF7F2] text-[#68584B]'
                              }`}
                            >
                              {isSelected ? 'Selecionado' : 'Adicionar'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'ring' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2C241E] uppercase tracking-wider">
                      Complete com um Anel Orgânico
                    </h3>
                    <span className="text-xs text-[#88705C]">Passo 4 de 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SET_RINGS.map((item) => {
                      const isSelected = selectedRing?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          id={`ring-option-${item.id}`}
                          onClick={() => setSelectedRing(isSelected ? null : item)}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#D96B43] ring-2 ring-[#D96B43]/30 shadow-md'
                              : 'bg-white hover:bg-[#F3ECE2] border-[#EADFCF]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#EADFCF] shrink-0"
                            />
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#2C241E]">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-[#68584B] leading-tight">
                                {item.description}
                              </p>
                              <span className="inline-block text-[10px] text-[#3E8E84] font-semibold">
                                🌊 {item.plasticRemovedGrams}g plástico limpo
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#2C241E]">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-[#D96B43] text-white'
                                  : 'bg-[#FAF7F2] text-[#68584B]'
                              }`}
                            >
                              {isSelected ? 'Selecionado' : 'Adicionar'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
