import React from 'react';
import {
  Sun,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Waves,
  HeartHandshake,
  Compass
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onNavigateToConfigurator: () => void;
  onNavigateToCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToConfigurator,
  onNavigateToCatalog,
}) => {
  return (
    <section className="relative overflow-hidden bg-sand-texture pt-10 pb-20 md:py-24 border-b border-[#EADFCF]">
      {/* Radiant Sun Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FEE440]/30 via-[#E5A93C]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#E29578]/25 via-[#D96B43]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eco Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E5A93C]/50 shadow-sm text-xs font-semibold text-[#9A5B14]">
              <span className="flex h-2 w-2 rounded-full bg-[#E5A93C] animate-pulse" />
              <Sun className="w-3.5 h-3.5 text-[#D96B43]" />
              <span>Biojoias com Energia Solar & Prata 100% Reciclada</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl text-[#2C241E] leading-[1.08] tracking-tight">
                A Alma Solar da Praia <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D96B43] via-[#E5A93C] to-[#265B54]">
                  com Impacto Positivo
                </span>{' '}
                no Oceano.
              </h1>
              <p className="text-[#68584B] text-lg sm:text-xl font-normal leading-relaxed max-w-2xl font-serif-eco italic">
                Brincos, colares, pulseiras e anéis esculpidos com búzios éticos, ouro vegetal de capim dourado e polímeros retirados de recifes de corais. Cada compra tem pegada de carbono auditada e entrega ecológica rastreada ao vivo.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-configurator-btn"
                onClick={onNavigateToConfigurator}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#D96B43] to-[#E5A93C] text-white font-semibold text-base shadow-lg solar-glow hover:brightness-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-5 h-5 text-[#FFF275]" />
                <span>Monte seu Conjunto Interativo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-catalog-btn"
                onClick={onNavigateToCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#2C241E] font-medium text-base border border-[#DECDBB] shadow-sm hover:border-[#D96B43] transition-all"
              >
                <span>Explorar Coleção Solar</span>
                <Waves className="w-4 h-4 text-[#3E8E84]" />
              </button>
            </div>

            {/* Guarantees & Pillars */}
            <div className="pt-4 border-t border-[#E8DFC8]/80 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E5A93C]/15 flex items-center justify-center text-[#9A5B14] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#2C241E] uppercase tracking-wider">Auditado</h2>
                  <p className="text-[11px] text-[#7A6757] leading-tight">Pegada de CO₂ transparente por peça</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#3E8E84]/15 flex items-center justify-center text-[#265B54] shrink-0 mt-0.5">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#2C241E] uppercase tracking-wider">Oceano Limpo</h2>
                  <p className="text-[11px] text-[#7A6757] leading-tight">Plástico retirado de Fernando de Noronha</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D96B43]/15 flex items-center justify-center text-[#D96B43] shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#2C241E] uppercase tracking-wider">Comércio Justo</h2>
                  <p className="text-[11px] text-[#7A6757] leading-tight">Artesãs caiçaras e quilombolas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-[#EADFCF]">
                <div className="relative h-96 sm:h-[430px] rounded-2xl overflow-hidden group">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
                    alt="Acessórios praianos sustentáveis Maré Solar"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C241E]/80 via-transparent to-transparent" />

                  {/* Floating Eco Impact Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#E8DFC8] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3E8E84]/15 flex items-center justify-center text-[#265B54]">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#3E8E84]">
                        Impacto Coletivo
                      </p>
                      <p className="text-sm font-extrabold text-[#2C241E]">
                        -42.5 Toneladas de CO₂
                      </p>
                    </div>
                  </div>

                  {/* Interactive Set Prompt */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#EADFCF]">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D96B43]">
                          Novo Lançamento Solar
                        </span>
                        <h2 className="text-sm font-bold text-[#2C241E]">
                          Mix Brisa de Trancoso
                        </h2>
                        <p className="text-xs text-[#7A6757]">
                          Capim dourado, prata 925 circular e búzio solar
                        </p>
                      </div>
                      <button
                        id="hero-mix-preview-btn"
                        onClick={onNavigateToConfigurator}
                        className="px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#2C241E] text-[#2C241E] hover:text-white border border-[#DECDBB] text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <span>Personalizar</span>
                        <Sparkles className="w-3 h-3 text-[#E5A93C]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Orbiting Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FAF7F2] border border-[#EADFCF] rounded-2xl p-3 shadow-xl items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#E5A93C] text-white flex items-center justify-center font-bold">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C241E]">100% Frete Elétrico</p>
                  <p className="text-[10px] text-[#7A6757]">Rastreamento em mapa ao vivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainable Impact Counter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-2xl bg-white/90 border border-[#EADFCF] p-6 sm:p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#2C241E]">
              14.800 kg
            </span>
            <p className="text-xs font-medium text-[#7A6757]">
              Plástico retirado das praias brasileiras
            </p>
          </div>

          <div className="space-y-1 border-l border-[#EADFCF]/80">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#3E8E84]">
              -42,5 ton
            </span>
            <p className="text-xs font-medium text-[#7A6757]">
              CO₂ evitado vs. joias convencionais
            </p>
          </div>

          <div className="space-y-1 border-l-0 md:border-l border-[#EADFCF]/80">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#D96B43]">
              8.420
            </span>
            <p className="text-xs font-medium text-[#7A6757]">
              Mudas de manguezal e restinga plantadas
            </p>
          </div>

          <div className="space-y-1 border-l border-[#EADFCF]/80">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#E5A93C]">
              100%
            </span>
            <p className="text-xs font-medium text-[#7A6757]">
              Materiais circulares e comércio justo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
