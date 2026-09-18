import React, { useState } from 'react';
import {
  Sun,
  Waves,
  Leaf,
  ShieldCheck,
  Heart,
  ArrowUp,
  Send,
  Check
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C241E] text-[#FAF7F2] pt-16 pb-12 border-t border-[#43362E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#43362E]">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E5A93C] via-[#D96B43] to-[#E29578] flex items-center justify-center text-white shadow-md">
                <Sun className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                MARÉ SOLAR
              </span>
            </div>

            <p className="text-xs text-[#DCCEC0] leading-relaxed max-w-sm">
              Biojoias e acessórios praianos sustentáveis nascidos da alquimia entre o calor do sol e o respeito aos oceanos. Criamos peças circulares com prata 925 reciclada, capim dourado e plástico recolhido das praias brasileiras.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#D96B43] font-bold">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#3E8E84]" />
                <span>100% Carbon Neutral</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-[#3E8E84]" />
                <span>Zero Plástico</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              Coleções & Ferramentas
            </h4>
            <ul className="space-y-2 text-xs text-[#DCCEC0]">
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Coleção Solar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('configurador')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Monte seu Mix</span>
                  <span className="text-[9px] bg-[#E5A93C] text-[#2C241E] px-1.5 py-0.2 rounded font-extrabold">
                    Novo
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('depoimentos')}
                  className="hover:text-white transition-colors"
                >
                  Impacto & Depoimentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rastreamento')}
                  className="hover:text-white transition-colors"
                >
                  Rastreamento ao Vivo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perfil')}
                  className="hover:text-white transition-colors"
                >
                  Meu Perfil de CO₂
                </button>
              </li>
            </ul>
          </div>

          {/* Sustainable Materials Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              Materiais Sustentáveis
            </h4>
            <ul className="space-y-2 text-xs text-[#DCCEC0]">
              <li>Prata 925 Reciclada de Descarte Eletrônico</li>
              <li>Capim Dourado Certificado do Jalapão</li>
              <li>Redes de Pesca Fantasmas de Noronha</li>
              <li>Búzios Descartados por Marisqueiras</li>
              <li>Biocerâmica de Conchas de Ostras</li>
              <li>Algodão Agroecológico Tingido Naturalmente</li>
            </ul>
          </div>

          {/* Newsletter / Club Solar */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
              Clube Maré Solar
            </h4>
            <p className="text-xs text-[#DCCEC0] leading-relaxed">
              Cadastre-se para receber novidades sobre coletas nas praias e ganhe 10% de desconto na primeira compra com pegada neutra.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex bg-[#3B2F27] rounded-xl p-1 border border-[#524237]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail..."
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-[#A38E7E] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="px-3 py-2 rounded-lg bg-[#D96B43] hover:bg-[#E5A93C] text-white text-xs font-bold transition-colors flex items-center justify-center shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#3E8E84] font-semibold">
                  🌿 Bem-vinda ao Clube Solar! Código enviado com sucesso.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#88705C]">
          <p>© 2026 Maré Solar Biojoias Ltda. Todos os direitos reservados. CNPJ 44.128.940/0001-82.</p>

          <div className="flex items-center gap-4">
            <span>Ateliês em Trancoso/BA & Ilhabela/SP</span>
            <button
              onClick={scrollToTop}
              id="footer-scroll-top-btn"
              className="p-2 rounded-full bg-[#3B2F27] hover:bg-[#524237] text-white transition-colors"
              title="Voltar ao Topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
