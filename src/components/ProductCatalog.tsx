import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Leaf,
  Waves,
  Star,
  Eye,
  X,
  Check,
  Info,
  SlidersHorizontal,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [selectedSort, setSelectedSort] = useState<'eco' | 'price-asc' | 'price-desc' | 'rating'>('eco');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'todos', label: 'Todos os Acessórios' },
    { id: 'brincos', label: 'Brincos Solares' },
    { id: 'pulseiras', label: 'Pulseiras do Mar' },
    { id: 'aneis', label: 'Anéis Orgânicos' },
    { id: 'colares', label: 'Colares & Chokers' },
    { id: 'tornozeleiras', label: 'Tornozeleiras' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  }).sort((a, b) => {
    if (selectedSort === 'eco') {
      return b.carbonFootprint.savedVsTraditionalKg - a.carbonFootprint.savedVsTraditionalKg;
    }
    if (selectedSort === 'price-asc') {
      return a.price - b.price;
    }
    if (selectedSort === 'price-desc') {
      return b.price - a.price;
    }
    if (selectedSort === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleAddToCartClick = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1600);
  };

  return (
    <section id="catalogo" className="py-20 bg-[#FAF7F2] border-b border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3E8E84]/15 text-[#265B54] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            <span>Coleção Solar & Circular</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C241E] tracking-tight">
            Biojoias Nascidas na Costa Brasileira
          </h2>
          <p className="text-[#68584B] text-base sm:text-lg font-serif-eco italic">
            Cada acessório detalha a quantidade exata de CO₂ economizado e plástico marinho retirado. Feitas para durar verões inteiros sem agredir as águas.
          </p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EADFCF]/70">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`catalog-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2C241E] text-white shadow-sm'
                    : 'bg-white/80 text-[#5C4E43] hover:bg-[#F3ECE2] border border-[#EADFCF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#88705C]" />
            <span className="text-xs font-semibold text-[#88705C] uppercase tracking-wider">
              Ordenar:
            </span>
            <select
              id="catalog-sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="text-xs sm:text-sm font-medium bg-white border border-[#DECDBB] rounded-xl px-3 py-1.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
            >
              <option value="eco">🌱 Maior Economia de CO₂</option>
              <option value="price-asc">Preço: Menor para Maior</option>
              <option value="price-desc">Preço: Maior para Menor</option>
              <option value="rating">Melhor Avaliados ★</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group bg-white rounded-3xl border border-[#EADFCF] overflow-hidden flex flex-col hover:shadow-xl hover:border-[#D96B43]/50 transition-all duration-300"
              >
                {/* Product Image Area */}
                <div className="relative h-64 overflow-hidden bg-[#F3ECE2]">
                  <ImageWithFallback
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-[#D96B43] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2C241E] text-[10px] font-semibold border border-[#DECDBB] shadow-sm">
                      📍 {product.artisanOrigin}
                    </span>
                  </div>

                  {/* Quick Eco X-Ray button */}
                  <button
                    id={`quick-xray-${product.id}`}
                    onClick={() => setActiveModalProduct(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#2C241E] shadow-sm hover:scale-110 transition-transform"
                    title="Ver Raio-X Ecológico e Detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Carbon Footprint Highlight Ribbon */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8DFC8] flex items-center justify-between text-[11px]">
                    <span className="text-[#3E8E84] font-bold flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      -{product.carbonFootprint.savedVsTraditionalKg}kg CO₂
                    </span>
                    <span className="text-[#2C241E] font-medium flex items-center gap-1">
                      <Waves className="w-3 h-3 text-[#3E8E84]" />
                      -{product.carbonFootprint.plasticRemovedGrams}g plástico
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#7A6757]">
                      <span className="capitalize">{product.category}</span>
                      <div className="flex items-center gap-1 font-semibold text-[#D96B43]">
                        <Star className="w-3.5 h-3.5 fill-[#D96B43]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#A38E7E]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-base text-[#2C241E] group-hover:text-[#D96B43] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#68584B] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Materials tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.materials.slice(0, 2).map((mat, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#EADFCF] text-[#63554B]"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-[#F3ECE2] flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#2C241E]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-[#A38E7E]">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#3E8E84] font-semibold block">
                        Compensação Inclusa
                      </span>
                    </div>

                    <button
                      id={`add-to-cart-btn-${product.id}`}
                      onClick={() => handleAddToCartClick(product)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-[#3E8E84] text-white shadow-md'
                          : 'bg-[#2C241E] hover:bg-[#D96B43] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 animate-bounce" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#FEE440]" />
                          <span>Comprar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Eco X-Ray Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-[#2C241E]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EADFCF] shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#EADFCF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3E8E84]/15 flex items-center justify-center text-[#265B54]">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#2C241E]">
                    Raio-X Ecológico & Transparência
                  </h3>
                  <p className="text-xs text-[#7A6757]">
                    Auditoria de pegada de carbono e ciclo de vida do produto
                  </p>
                </div>
              </div>
              <button
                id="close-xray-modal-btn"
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-full hover:bg-[#F3ECE2] text-[#5C4E43]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <ImageWithFallback
                  src={activeModalProduct.imageUrl}
                  alt={activeModalProduct.name}
                  className="w-32 h-32 rounded-2xl object-cover border border-[#EADFCF]"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D96B43]">
                    {activeModalProduct.category} • {activeModalProduct.artisanOrigin}
                  </span>
                  <h4 className="font-display font-bold text-xl text-[#2C241E]">
                    {activeModalProduct.name}
                  </h4>
                  <p className="text-xs text-[#68584B]">
                    {activeModalProduct.shortStory}
                  </p>
                  <p className="text-base font-extrabold text-[#2C241E] pt-1">
                    R$ {activeModalProduct.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>

              {/* Carbon Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADFCF] text-center">
                  <span className="text-xs font-semibold text-[#7A6757] block">
                    CO₂ Emitido na Produção
                  </span>
                  <span className="font-display font-extrabold text-xl text-[#B8502B]">
                    {activeModalProduct.carbonFootprint.emittedKg} kg
                  </span>
                  <span className="text-[10px] text-[#A38E7E] block mt-0.5">
                    (96% menor que mineração tradicional)
                  </span>
                </div>

                <div className="bg-[#3E8E84]/10 p-4 rounded-2xl border border-[#3E8E84]/30 text-center">
                  <span className="text-xs font-semibold text-[#265B54] block">
                    CO₂ Poupado Total
                  </span>
                  <span className="font-display font-extrabold text-xl text-[#3E8E84]">
                    -{activeModalProduct.carbonFootprint.savedVsTraditionalKg} kg
                  </span>
                  <span className="text-[10px] text-[#265B54] block mt-0.5">
                    Equivale a absorção de {activeModalProduct.carbonFootprint.treesEquivalent} árvores
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADFCF] text-center">
                  <span className="text-xs font-semibold text-[#7A6757] block">
                    Plástico Oceânico Retirado
                  </span>
                  <span className="font-display font-extrabold text-xl text-[#D96B43]">
                    {activeModalProduct.carbonFootprint.plasticRemovedGrams} g
                  </span>
                  <span className="text-[10px] text-[#A38E7E] block mt-0.5">
                    Coleta costeira certificada
                  </span>
                </div>
              </div>

              {/* Sustainable Materials Details */}
              <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADFCF]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C241E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3E8E84]" />
                  <span>Composição Sustentável & Rastreabilidade</span>
                </h5>
                <ul className="space-y-2 text-xs text-[#5C4E43]">
                  {activeModalProduct.materials.map((mat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D96B43]" />
                      <span className="font-medium text-[#2C241E]">{mat}</span>
                      <span className="text-[#88705C]">— Certificação de ciclo circular</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#EADFCF] bg-[#FAF7F2] flex items-center justify-between">
              <button
                id="close-xray-secondary-btn"
                onClick={() => setActiveModalProduct(null)}
                className="px-5 py-2.5 rounded-full border border-[#DECDBB] text-xs font-semibold text-[#5C4E43] hover:bg-white"
              >
                Voltar
              </button>
              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  handleAddToCartClick(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#2C241E] hover:bg-[#D96B43] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#FEE440]" />
                <span>Adicionar à Sacola por R$ {activeModalProduct.price.toFixed(2).replace('.', ',')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
