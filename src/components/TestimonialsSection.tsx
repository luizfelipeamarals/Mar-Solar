import React, { useState } from 'react';
import {
  Star,
  Quote,
  Leaf,
  Waves,
  TreePine,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sun
} from 'lucide-react';
import { Testimonial } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="depoimentos" className="py-20 bg-[#FAF7F2] border-b border-[#EADFCF] relative overflow-hidden">
      {/* Background Decorative Solar Waves */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-[#E29578]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E8E84]/15 border border-[#3E8E84]/30 text-[#265B54] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#D96B43]" />
            <span>Comunidade Solar & Oceano Vivo</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C241E] tracking-tight">
            Depoimentos com Impacto Ambiental Real
          </h2>
          <p className="text-[#68584B] text-base sm:text-lg font-serif-eco italic">
            Veja o que nossas clientes dizem sobre a energia solar das biojoias e confira os resultados ambientais tangíveis gerados por cada pedido individual.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              className="bg-white rounded-3xl border border-[#EADFCF] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#D96B43]/50 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* User info & rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#EADFCF]"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#2C241E]">
                        {testimonial.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6757]">{testimonial.location}</p>
                    </div>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < testimonial.rating
                          ? 'fill-[#D96B43] text-[#D96B43]'
                          : 'text-[#DECDBB]'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-[#88705C] font-semibold ml-1">
                    {testimonial.date}
                  </span>
                </div>

                {/* Product badge */}
                <div className="inline-block bg-[#FAF7F2] border border-[#EADFCF] rounded-lg px-2.5 py-1 text-[10px] font-bold text-[#5C4E43]">
                  {testimonial.productPurchased}
                </div>

                {/* Quote */}
                <p className="text-xs text-[#5C4E43] italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* INDIVIDUAL POSITIVE ENVIRONMENTAL IMPACT BADGE (Prompt requirement) */}
              <div className="mt-6 pt-4 border-t border-[#F3ECE2] space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3E8E84] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E8E84]" />
                  <span>Impacto Desta Compra:</span>
                </span>

                <div className="bg-[#3E8E84]/10 rounded-2xl p-3 border border-[#3E8E84]/25 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#265B54]">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Leaf className="w-3 h-3 text-[#3E8E84]" />
                      CO₂ Poupado:
                    </span>
                    <span className="font-extrabold">
                      -{testimonial.environmentalImpact.co2SavedKg} kg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#265B54]">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Waves className="w-3 h-3 text-[#3E8E84]" />
                      Plástico Recolhido:
                    </span>
                    <span className="font-extrabold text-[#D96B43]">
                      -{testimonial.environmentalImpact.plasticRemovedGrams} g
                    </span>
                  </div>

                  {testimonial.environmentalImpact.treesPlanted && (
                    <div className="flex items-center justify-between text-[#265B54]">
                      <span className="flex items-center gap-1 text-[11px]">
                        <TreePine className="w-3 h-3 text-[#3E8E84]" />
                        Mudas Financiadas:
                      </span>
                      <span className="font-extrabold text-[#3E8E84]">
                        {testimonial.environmentalImpact.treesPlanted} mudas
                      </span>
                    </div>
                  )}

                  <div className="text-[9px] text-[#5C4E43] pt-1 border-t border-[#3E8E84]/20 truncate">
                    🌱 {testimonial.environmentalImpact.initiative}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Environmental Audit Guarantee Box */}
        <div className="mt-14 rounded-3xl bg-white border border-[#EADFCF] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#D96B43]/15 flex items-center justify-center text-[#D96B43] shrink-0">
              <Sun className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-[#2C241E]">
                Auditoria de Impacto em Blockchain Aberto & Relatórios Públicos
              </h4>
              <p className="text-xs text-[#7A6757] max-w-2xl leading-relaxed">
                Todas as compensações de carbono e quilos de plástico retirados do mar são validados em parceria com cooperativas de marisqueiras, catadores certificados e ONGs de conservação marinha.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-bold text-[#3E8E84] px-4 py-2 rounded-full bg-[#3E8E84]/15 border border-[#3E8E84]/30">
              Selo Ouro Carbon Neutral 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
