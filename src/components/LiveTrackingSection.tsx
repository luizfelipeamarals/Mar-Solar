import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Truck,
  Bike,
  Sun,
  Leaf,
  Clock,
  CheckCircle2,
  Navigation,
  Sparkles,
  Search,
  RotateCw,
  Compass,
  AlertCircle
} from 'lucide-react';
import { DeliveryTrackingData } from '../types';

interface LiveTrackingSectionProps {
  trackingData: DeliveryTrackingData;
  activeOrderCode?: string;
}

export const LiveTrackingSection: React.FC<LiveTrackingSectionProps> = ({
  trackingData,
  activeOrderCode,
}) => {
  const [searchInput, setSearchInput] = useState(activeOrderCode || trackingData.orderCode);
  const [currentCode, setCurrentCode] = useState(activeOrderCode || trackingData.orderCode);
  const [liveSimulationStep, setLiveSimulationStep] = useState(3); // 0 to 4
  const [isSimulating, setIsSimulating] = useState(false);

  // Keep searchInput synced if activeOrderCode changes
  useEffect(() => {
    if (activeOrderCode) {
      setSearchInput(activeOrderCode);
      setCurrentCode(activeOrderCode);
    }
  }, [activeOrderCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentCode(searchInput.trim().toUpperCase());
    }
  };

  const handleSimulateAdvance = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setLiveSimulationStep((prev) => (prev < 4 ? prev + 1 : 1));
      setIsSimulating(false);
    }, 600);
  };

  // Coordinates along simulated path in percentages (X, Y)
  const waypoints = [
    { x: 22, y: 32, label: 'Ateliê Trancoso/BA', type: 'origin' },
    { x: 42, y: 48, label: 'Hub Multimodal Verde', type: 'transit' },
    { x: 62, y: 64, label: 'Terminal Solar SP', type: 'transit' },
    { x: 74, y: 72, label: 'Bike Cargo Solar (Ao Vivo)', type: 'courier' },
    { x: 86, y: 80, label: 'Destinatário (Pinheiros)', type: 'destination' },
  ];

  const currentPin = waypoints[liveSimulationStep] || waypoints[3];

  return (
    <section id="rastreamento" className="py-20 bg-sand-texture border-b border-[#EADFCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E8E84]/15 border border-[#3E8E84]/30 text-[#265B54] text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-[#3E8E84]" />
            <span>Rastreamento Ecológico ao Vivo</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2C241E] tracking-tight">
            Acompanhe sua Entrega via Mapa Solar
          </h2>
          <p className="text-[#68584B] text-base sm:text-lg font-serif-eco italic">
            Veja a rota de frete carbono neutro em tempo real: desde a confecção manual no ateliê costeiro até a entrega final por bicicleta solar.
          </p>
        </div>

        {/* Search Code Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2 bg-white p-2 rounded-2xl border border-[#EADFCF] shadow-md">
            <div className="flex-1 flex items-center gap-2.5 px-3">
              <Search className="w-4 h-4 text-[#88705C]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                placeholder="Insira o código (ex: MARE-ECO-8842)"
                className="w-full text-xs sm:text-sm font-bold tracking-wider text-[#2C241E] focus:outline-none placeholder:text-[#A38E7E]"
              />
            </div>
            <button
              type="submit"
              id="search-tracking-code-btn"
              className="px-5 py-2.5 rounded-xl bg-[#2C241E] hover:bg-[#D96B43] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Buscar</span>
            </button>
          </form>
        </div>

        {/* Live Tracking Cockpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map View */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-[#EADFCF] shadow-xl overflow-hidden">
              {/* Map Header Status Bar */}
              <div className="p-4 sm:p-5 border-b border-[#EADFCF] bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3E8E84] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3E8E84]"></span>
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-[#3E8E84] tracking-wider block">
                      GPS Ativo • Conexão Satélite Solar
                    </span>
                    <h3 className="font-display font-bold text-sm text-[#2C241E]">
                      Código: {currentCode}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="simulate-tracking-step-btn"
                    onClick={handleSimulateAdvance}
                    disabled={isSimulating}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#DECDBB] text-xs font-semibold text-[#5C4E43] hover:text-[#D96B43] hover:border-[#D96B43] transition-colors flex items-center gap-1.5 shadow-sm"
                    title="Simular movimento do entregador no mapa"
                  >
                    <RotateCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                    <span>Simular Rota</span>
                  </button>
                </div>
              </div>

              {/* Styled Vector Coastal Delivery Map */}
              <div className="relative h-80 sm:h-96 bg-gradient-to-br from-[#EBF4F6] via-[#F5EFE6] to-[#FAF7F2] overflow-hidden p-6 select-none">
                {/* Visual Coastal Contours (SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3E8E84" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#265B54" stopOpacity="0.05" />
                    </linearGradient>
                    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DCCEC0" strokeWidth="0.75" strokeDasharray="2,4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gridPattern)" />
                  {/* Ocean coastline shape */}
                  <path
                    d="M0,0 Q180,60 260,180 T400,280 T600,320 T900,350 L900,0 Z"
                    fill="url(#oceanGrad)"
                  />
                </svg>

                {/* Simulated Delivery Path Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 110,80 Q 220,130 320,180 T 450,240 T 540,270"
                    fill="none"
                    stroke="#D96B43"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    className="animate-[pulse_3s_ease-in-out_infinite]"
                  />
                </svg>

                {/* Waypoints rendered on Map */}
                {/* 1. Ateliê Origin */}
                <div className="absolute top-[20%] left-[12%] transform -translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#E5A93C] text-[#9A5B14] shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div className="absolute top-11 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#EADFCF] shadow-sm whitespace-nowrap text-[10px] font-bold text-[#2C241E]">
                    Ateliê Trancoso/BA
                  </div>
                </div>

                {/* 2. Intermediate Green Hub */}
                <div className="absolute top-[48%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-7 h-7 rounded-xl bg-white border border-[#DECDBB] text-[#3E8E84] shadow-sm flex items-center justify-center">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. LIVE POSITION BEACON (Moving Bike Cargo Courier) */}
                <div
                  className="absolute transition-all duration-700 ease-out z-20"
                  style={{
                    top: `${currentPin.y}%`,
                    left: `${currentPin.x}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative">
                    {/* Pulsing Radar Ring */}
                    <span className="animate-ping absolute -inset-2 rounded-full bg-[#3E8E84] opacity-40"></span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3E8E84] to-[#265B54] text-white shadow-xl flex items-center justify-center border-2 border-white">
                      {liveSimulationStep >= 3 ? (
                        <Bike className="w-6 h-6 animate-bounce" />
                      ) : (
                        <Truck className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Live Status Tag */}
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-[#2C241E] text-white px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#FEE440] animate-pulse" />
                    <span>{currentPin.label}</span>
                  </div>
                </div>

                {/* 4. Client Destination */}
                <div className="absolute top-[80%] left-[86%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#2C241E] text-[#2C241E] shadow-md flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#D96B43]" />
                  </div>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-[#EADFCF] shadow-sm whitespace-nowrap text-[10px] font-bold text-[#2C241E]">
                    Seu Endereço
                  </div>
                </div>

                {/* Map Floating Telemetry Card */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#EADFCF] shadow-lg max-w-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#3E8E84] text-[10px] font-bold uppercase tracking-wider">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Emissão Zero nesta Viagem</span>
                  </div>
                  <p className="text-xs font-bold text-[#2C241E]">
                    {trackingData.currentLocation.description}
                  </p>
                </div>
              </div>

              {/* Telemetry Strip below Map */}
              <div className="p-4 sm:p-5 bg-white grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-[#F3ECE2]">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#88705C] uppercase font-bold block">Previsão</span>
                  <span className="font-display font-extrabold text-sm text-[#2C241E]">
                    {trackingData.estimatedArrival.split(' ')[0]}
                  </span>
                </div>

                <div className="space-y-0.5 border-l border-[#F3ECE2]">
                  <span className="text-[10px] text-[#88705C] uppercase font-bold block">Modal Verde</span>
                  <span className="font-display font-bold text-xs text-[#3E8E84]">
                    Bike Cargo Solar
                  </span>
                </div>

                <div className="space-y-0.5 border-l border-[#F3ECE2]">
                  <span className="text-[10px] text-[#88705C] uppercase font-bold block">CO₂ Poupado</span>
                  <span className="font-display font-extrabold text-sm text-[#3E8E84]">
                    -{trackingData.totalCo2SavedThisDeliveryKg} kg
                  </span>
                </div>

                <div className="space-y-0.5 border-l border-[#F3ECE2]">
                  <span className="text-[10px] text-[#88705C] uppercase font-bold block">Km Elétricos</span>
                  <span className="font-display font-extrabold text-sm text-[#D96B43]">
                    {trackingData.kmTraveledGreen} km
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Ecological Checkpoints */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-[#EADFCF] p-6 shadow-xl space-y-6">
              <div className="border-b border-[#F3ECE2] pb-4">
                <span className="text-[10px] uppercase font-extrabold text-[#D96B43] tracking-widest block">
                  Cadeia de Custódia Rastreável
                </span>
                <h3 className="font-display font-bold text-lg text-[#2C241E]">
                  Etapas do Frete Consciente
                </h3>
                <p className="text-xs text-[#7A6757]">
                  {trackingData.itemsSummary}
                </p>
              </div>

              {/* Vertical Timeline Steps */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#EADFCF]">
                {trackingData.timeline.map((event, index) => {
                  const isDone = index < liveSimulationStep;
                  const isCurrent = index === liveSimulationStep;

                  return (
                    <div key={event.id} className="relative flex items-start gap-4">
                      {/* Step Dot / Icon */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-[#3E8E84] text-white'
                            : isCurrent
                            ? 'bg-[#D96B43] text-white ring-4 ring-[#D96B43]/25'
                            : 'bg-white border-2 border-[#DECDBB] text-[#A38E7E]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isCurrent ? (
                          <Bike className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#D96B43]' : 'text-[#2C241E]'}`}>
                            {event.title}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#D96B43]/15 text-[#D96B43] text-[9px] font-extrabold uppercase">
                              Ao Vivo
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#68584B] leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] text-[#88705C] pt-0.5">
                          <span>⏱ {event.timestamp}</span>
                          <span>•</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Eco Assurance Note */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] flex items-center gap-2.5 text-xs text-[#68584B]">
                <Leaf className="w-4 h-4 text-[#3E8E84] shrink-0" />
                <span>
                  Sua embalagem foi feita de papel semente de margarida. Quando sua encomenda chegar, você pode plantá-la em um vasinho!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
