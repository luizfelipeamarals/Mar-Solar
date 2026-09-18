import React, { useState } from 'react';
import {
  User,
  Sun,
  Leaf,
  Waves,
  TreePine,
  Award,
  Calendar,
  Download,
  Share2,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  X,
  ShieldCheck
} from 'lucide-react';
import { UserEcoProfile } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface UserProfileSectionProps {
  userProfile: UserEcoProfile;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  userProfile,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Agosto');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeMonthData = userProfile.monthlyImpact.find((m) => m.month === selectedMonth) || userProfile.monthlyImpact[userProfile.monthlyImpact.length - 1];

  const handleDownloadCert = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <section id="perfil" className="py-20 bg-[#FAF7F2] border-b border-[#EADFCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#9A5B14] text-xs font-bold uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-[#D96B43]" />
            <span>Perfil & Impacto Regenerativo</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C241E] tracking-tight">
            Seu Histórico de Economia de CO₂
          </h2>
          <p className="text-[#68584B] text-base sm:text-lg font-serif-eco italic">
            Acompanhe o impacto direto das suas escolhas. Cada biojoia adicionada à sua coleção reverte danos ambientais e financia a conservação marinha.
          </p>
        </div>

        {/* Profile Identity Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <ImageWithFallback
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                fallbackSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                className="w-20 h-20 rounded-full object-cover border-4 border-[#FAF7F2] shadow-md ring-2 ring-[#E5A93C]"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D96B43] text-white flex items-center justify-center text-xs shadow-sm">
                <Sun className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-display font-bold text-2xl text-[#2C241E]">
                  {userProfile.name}
                </h3>
                <span className="px-3 py-0.5 rounded-full bg-[#3E8E84]/15 text-[#265B54] text-xs font-bold border border-[#3E8E84]/30">
                  {userProfile.tierTitle}
                </span>
              </div>
              <p className="text-xs text-[#7A6757]">
                {userProfile.email} • {userProfile.city} • Membro desde {userProfile.joinDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="open-cert-modal-btn"
              onClick={() => setIsCertModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#2C241E] hover:bg-[#D96B43] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-[#FEE440]" />
              <span>Ver Certificado de Neutralidade</span>
            </button>
          </div>
        </div>

        {/* Big Eco Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1: Total CO2 Saved */}
          <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6757]">
                CO₂ Evitado Total
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#3E8E84]/15 text-[#265B54] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#3E8E84]">
                -{userProfile.totalCO2SavedKg.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-[#265B54] ml-1">kg CO₂</span>
              <p className="text-xs text-[#7A6757] mt-1 leading-tight">
                Equivale a <strong>93 km não rodados</strong> de carro movido a gasolina.
              </p>
            </div>

            <div className="pt-2 border-t border-[#F3ECE2] text-[11px] text-[#3E8E84] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4.45 kg adicionados no último mês</span>
            </div>
          </div>

          {/* Card 2: Ocean Plastic Removed */}
          <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6757]">
                Plástico do Mar Retirado
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#D96B43]/15 text-[#D96B43] flex items-center justify-center">
                <Waves className="w-5 h-5" />
              </div>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#D96B43]">
                {userProfile.totalPlasticCollectedGrams}
              </span>
              <span className="text-sm font-bold text-[#D96B43] ml-1">gramas</span>
              <p className="text-xs text-[#7A6757] mt-1 leading-tight">
                Equivalente a <strong>56 garrafas PET</strong> descartadas recolhidas das praias.
              </p>
            </div>

            <div className="pt-2 border-t border-[#F3ECE2] text-[11px] text-[#88705C] font-semibold">
              Recifes de Fernando de Noronha protegidos
            </div>
          </div>

          {/* Card 3: Mangroves Funded */}
          <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6757]">
                Mudas de Manguezal
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#265B54]/15 text-[#265B54] flex items-center justify-center">
                <TreePine className="w-5 h-5" />
              </div>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#265B54]">
                {userProfile.mangrovesFunded}
              </span>
              <span className="text-sm font-bold text-[#265B54] ml-1">mudas vivas</span>
              <p className="text-xs text-[#7A6757] mt-1 leading-tight">
                Em recuperação ativa no estuário do Rio Caraíva e Delta do Parnaíba.
              </p>
            </div>

            <div className="pt-2 border-t border-[#F3ECE2] text-[11px] text-[#3E8E84] font-semibold">
              Absorverão 150kg de CO₂ em 10 anos
            </div>
          </div>

          {/* Card 4: Orders & Tier */}
          <div className="bg-white rounded-3xl p-6 border border-[#EADFCF] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6757]">
                Pedidos Conscientes
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E5A93C]/20 text-[#9A5B14] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl text-[#2C241E]">
                {userProfile.totalOrders}
              </span>
              <span className="text-sm font-bold text-[#7A6757] ml-1">compras</span>
              <p className="text-xs text-[#7A6757] mt-1 leading-tight">
                100% dos pacotes despachados com frete carbono zero.
              </p>
            </div>

            <div className="pt-2 border-t border-[#F3ECE2] text-[11px] text-[#D96B43] font-semibold">
              Falta 1 pedido para o Nível Guardiã Diamante
            </div>
          </div>
        </div>

        {/* Two-Column Section: Monthly Impact Chart + Unlocked Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Monthly Savings Breakdown */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#F3ECE2] pb-4">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#3E8E84] tracking-wider block">
                  Evolução Mensal Auditada
                </span>
                <h4 className="font-display font-bold text-lg text-[#2C241E]">
                  Histórico de Emissões Evitadas
                </h4>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {userProfile.monthlyImpact.map((item) => (
                  <button
                    key={item.month}
                    onClick={() => setSelectedMonth(item.month)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      selectedMonth === item.month
                        ? 'bg-[#2C241E] text-white'
                        : 'bg-[#FAF7F2] text-[#68584B] hover:bg-[#F3ECE2]'
                    }`}
                  >
                    {item.month}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG / Bar Chart */}
            <div className="space-y-4">
              <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
                {userProfile.monthlyImpact.map((item) => {
                  const maxCo2 = 5.0;
                  const heightPercent = Math.round((item.co2Kg / maxCo2) * 100);
                  const isSelected = selectedMonth === item.month;

                  return (
                    <div
                      key={item.month}
                      onClick={() => setSelectedMonth(item.month)}
                      className="flex-1 flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <span className="text-[10px] font-extrabold text-[#3E8E84] opacity-80 group-hover:opacity-100">
                        {item.co2Kg}kg
                      </span>
                      <div className="w-full max-w-[48px] bg-[#FAF7F2] rounded-2xl h-40 flex items-end p-1 border border-[#EADFCF]">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-xl transition-all duration-500 ${
                            isSelected
                              ? 'bg-gradient-to-t from-[#D96B43] to-[#E5A93C] shadow-md'
                              : 'bg-gradient-to-t from-[#3E8E84] to-[#5FB4A9] group-hover:brightness-110'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? 'text-[#D96B43]' : 'text-[#7A6757]'
                        }`}
                      >
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Focus Details for Selected Month */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] flex items-center justify-between text-xs">
                <span className="text-[#68584B]">
                  Em <strong>{activeMonthData.month}</strong> você evitou <strong>{activeMonthData.co2Kg} kg</strong> de CO₂ e recolheu <strong>{activeMonthData.plasticGrams}g</strong> de plásticos do oceano.
                </span>
                <span className="text-[10px] font-bold text-[#3E8E84] bg-white px-2.5 py-1 rounded-full border border-[#DECDBB] shrink-0">
                  Auditado
                </span>
              </div>
            </div>
          </div>

          {/* Eco Badges Collection */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-sm space-y-6">
            <div className="border-b border-[#F3ECE2] pb-4">
              <span className="text-[10px] uppercase font-extrabold text-[#D96B43] tracking-wider block">
                Galeria de Conquistas
              </span>
              <h4 className="font-display font-bold text-lg text-[#2C241E]">
                Selos e Insígnias Verdes
              </h4>
              <p className="text-xs text-[#7A6757]">
                Desbloqueie novos marcos conforme expande sua curadoria solar.
              </p>
            </div>

            <div className="space-y-3">
              {userProfile.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                    badge.unlocked
                      ? 'bg-[#FAF7F2] border-[#EADFCF]'
                      : 'bg-gray-50/50 border-dashed border-gray-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      badge.unlocked
                        ? 'bg-gradient-to-tr from-[#E5A93C] to-[#D96B43] text-white shadow-sm'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-[#2C241E]">
                        {badge.name}
                      </h5>
                      {badge.unlocked ? (
                        <span className="text-[10px] font-bold text-[#3E8E84] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Desbloqueado</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#A38E7E]">Em progresso</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#68584B] leading-tight">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C241E]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#EADFCF] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E5A93C]/20 flex items-center justify-center text-[#9A5B14]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-base text-[#2C241E]">
                  Certificado Oficial de Neutralização
                </h4>
              </div>
              <button
                id="close-cert-modal-btn"
                onClick={() => setIsCertModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#FAF7F2] text-[#5C4E43]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Decorative Sheet */}
            <div className="bg-[#FCFAF7] rounded-2xl border-2 border-[#D96B43]/30 p-6 sm:p-8 text-center space-y-4 relative overflow-hidden shadow-inner">
              <Sun className="w-12 h-12 text-[#E5A93C] mx-auto animate-[spin_30s_linear_infinite]" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D96B43]">
                  Maré Solar • Certificação de Impacto Positivo
                </span>
                <h5 className="font-display font-extrabold text-xl sm:text-2xl text-[#2C241E]">
                  Certificado de Neutralidade Climática
                </h5>
                <p className="text-xs text-[#7A6757]">
                  Emitido para <strong>{userProfile.name}</strong>
                </p>
              </div>

              <div className="py-4 border-y border-[#EADFCF] space-y-2">
                <p className="text-xs text-[#5C4E43] leading-relaxed font-serif-eco italic text-base">
                  "Certificamos que através da aquisição de biojoias praianas e apoio à conservação marinha, foram evitadas e neutralizadas <strong>{userProfile.totalCO2SavedKg.toFixed(2)} kg de emissões de dióxido de carbono</strong> e recolhidos <strong>{userProfile.totalPlasticCollectedGrams}g de polímeros oceânicos</strong> das costas brasileiras."
                </p>
                <div className="pt-2 text-[10px] text-[#88705C] font-mono">
                  Código Hash: MS-2026-CO2-0941 • Protocolo Verde BR-Noronha
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7A6757] pt-2">
                <span>Data: {userProfile.certificates[0]?.date || 'Agosto de 2026'}</span>
                <span>Auditoria: EcoChain Brasil</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="download-cert-btn"
                onClick={handleDownloadCert}
                className="px-6 py-2.5 rounded-full bg-[#2C241E] hover:bg-[#D96B43] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-[#FEE440]" />
                <span>{downloadSuccess ? 'Certificado Baixado!' : 'Baixar Certificado em PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
