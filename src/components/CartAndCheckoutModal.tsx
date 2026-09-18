import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Leaf,
  Waves,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  CheckCircle2,
  TreePine,
  MapPin,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CartAndCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (orderCode: string) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [includeExtraMangrove, setIncludeExtraMangrove] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [generatedOrderCode, setGeneratedOrderCode] = useState<string>('');

  // Shipping Form State
  const [formData, setFormData] = useState({
    name: 'Marina Solange',
    email: 'marina.sol@oceanomare.com.br',
    phone: '(11) 98765-4321',
    zip: '05422-001',
    street: 'Rua dos Pinheiros',
    number: '482',
    complement: 'Apto 62',
    city: 'São Paulo',
    state: 'SP',
  });

  if (!isOpen) return null;

  // Financial Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const mangroveCost = includeExtraMangrove ? 4.90 : 0;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const totalAmount = Math.max(0, subtotal + mangroveCost - pixDiscount);

  // Carbon & Eco Calculations
  const totalCo2Saved = cartItems.reduce(
    (sum, item) => sum + item.product.carbonFootprint.savedVsTraditionalKg * item.quantity,
    0
  );
  const totalCo2Emitted = cartItems.reduce(
    (sum, item) => sum + item.product.carbonFootprint.emittedKg * item.quantity,
    0
  );
  const totalPlasticGrams = cartItems.reduce(
    (sum, item) => sum + item.product.carbonFootprint.plasticRemovedGrams * item.quantity,
    0
  );
  const extraMangroveCo2 = includeExtraMangrove ? 2.5 : 0;
  const netPositiveCo2 = totalCo2Saved + extraMangroveCo2 - totalCo2Emitted;

  const handleFinishPayment = () => {
    const newCode = `MARE-ECO-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderCode(newCode);
    setCheckoutStep('success');
    onOrderCompleted(newCode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C241E]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-[#EADFCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EADFCF] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#2C241E] flex items-center justify-center text-[#FEE440]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#2C241E]">
                {checkoutStep === 'cart' && 'Sua Sacola Solar & Pegada Ecológica'}
                {checkoutStep === 'shipping' && 'Endereço de Entrega Verde'}
                {checkoutStep === 'payment' && 'Pagamento Consciente'}
                {checkoutStep === 'success' && 'Pedido Confirmado & Carbono Neutro!'}
              </h3>
              <p className="text-xs text-[#7A6757]">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} • Compensação auditada
              </p>
            </div>
          </div>

          <button
            id="cart-close-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EADFCF]/60 text-[#5C4E43] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* STEP 1: CART REVIEW & CARBON FOOTPRINT PER PIECE */}
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Waves className="w-12 h-12 text-[#DECDBB] mx-auto" />
                  <p className="font-display font-bold text-base text-[#2C241E]">
                    Sua sacola solar está vazia
                  </p>
                  <p className="text-xs text-[#7A6757] max-w-sm mx-auto">
                    Explore nossas biojoias praianas ou use o configurador para montar seu mix personalizado.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Banner: Transparent Carbon Footprint per Piece Notice */}
                  <div className="p-3.5 rounded-2xl bg-[#3E8E84]/10 border border-[#3E8E84]/30 flex items-center gap-3 text-xs text-[#265B54]">
                    <Leaf className="w-4 h-4 text-[#3E8E84] shrink-0" />
                    <span>
                      <strong>Transparência Climática:</strong> Exibimos a pegada de CO₂ de cada peça para que você saiba exatamente o impacto regenerativo de sua escolha.
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-[#F3ECE2]">
                    {cartItems.map((item) => {
                      const { product, quantity, customSetDetails } = item;
                      const { carbonFootprint } = product;

                      return (
                        <div key={item.id} className="py-4 space-y-3">
                          <div className="flex gap-3.5 items-start justify-between">
                            <ImageWithFallback
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-16 h-16 rounded-2xl object-cover border border-[#EADFCF] shrink-0"
                            />

                            <div className="flex-1 space-y-1">
                              <div className="flex items-start justify-between">
                                <h4 className="text-sm font-bold text-[#2C241E]">
                                  {product.name}
                                </h4>
                                <span className="font-extrabold text-sm text-[#2C241E]">
                                  R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                                </span>
                              </div>

                              {customSetDetails && (
                                <span className="text-[11px] text-[#D96B43] font-semibold block">
                                  Mix montado no configurador • Gravação: "{customSetDetails.engravingText || 'Maré Solar'}"
                                </span>
                              )}

                              <p className="text-[11px] text-[#88705C]">
                                {product.artisanOrigin}
                              </p>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-3 pt-1">
                                <div className="flex items-center border border-[#DECDBB] rounded-full bg-white px-2 py-0.5 text-xs">
                                  <button
                                    id={`decrement-qty-${item.id}`}
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="p-1 hover:text-[#D96B43]"
                                    aria-label="Diminuir"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2 font-bold">{quantity}</span>
                                  <button
                                    id={`increment-qty-${item.id}`}
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="p-1 hover:text-[#D96B43]"
                                    aria-label="Aumentar"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  id={`remove-item-${item.id}`}
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-xs text-[#A38E7E] hover:text-[#B8502B] flex items-center gap-1 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Remover</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Carbon Footprint Card for THIS specific piece */}
                          <div className="bg-[#FAF7F2] rounded-xl p-2.5 border border-[#EADFCF] grid grid-cols-3 gap-2 text-[11px]">
                            <div className="text-center">
                              <span className="text-[#88705C] block text-[10px]">Emissão Solar</span>
                              <span className="font-bold text-[#B8502B]">
                                {(carbonFootprint.emittedKg * quantity).toFixed(2)} kg CO₂
                              </span>
                            </div>

                            <div className="text-center border-x border-[#EADFCF]">
                              <span className="text-[#88705C] block text-[10px]">CO₂ Poupado</span>
                              <span className="font-extrabold text-[#3E8E84]">
                                -{(carbonFootprint.savedVsTraditionalKg * quantity).toFixed(2)} kg
                              </span>
                            </div>

                            <div className="text-center">
                              <span className="text-[#88705C] block text-[10px]">Plástico Mar</span>
                              <span className="font-bold text-[#D96B43]">
                                -{carbonFootprint.plasticRemovedGrams * quantity} g
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Extra Mangrove Offset Option */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#DECDBB] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3E8E84]/15 flex items-center justify-center text-[#265B54]">
                        <TreePine className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#2C241E]">
                          Plantio de 1 Muda de Manguezal (+R$ 4,90)
                        </p>
                        <p className="text-[11px] text-[#7A6757]">
                          Restaura estuários e absorve +2.5kg de CO₂ ao longo da vida.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      id="mangrove-checkbox"
                      checked={includeExtraMangrove}
                      onChange={(e) => setIncludeExtraMangrove(e.target.checked)}
                      className="w-5 h-5 accent-[#3E8E84] cursor-pointer"
                    />
                  </div>

                  {/* Total Carbon Footprint Balance of this Cart */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#265B54] to-[#1D443E] text-white p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-[#FEE440]" />
                        Balanço Ecológico Total da Compra:
                      </span>
                      <span className="text-[#FEE440]">Saldo Líquido Positivo</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="bg-white/10 rounded-xl p-2">
                        <span className="text-[10px] text-white/70 block">CO₂ Poupado Líquido</span>
                        <span className="font-display font-extrabold text-sm sm:text-base text-[#FEE440]">
                          -{netPositiveCo2.toFixed(2)} kg
                        </span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2">
                        <span className="text-[10px] text-white/70 block">Plástico do Oceano</span>
                        <span className="font-display font-extrabold text-sm sm:text-base text-white">
                          -{totalPlasticGrams} g
                        </span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2">
                        <span className="text-[10px] text-white/70 block">Mudas Apoiadas</span>
                        <span className="font-display font-extrabold text-sm sm:text-base text-white">
                          {includeExtraMangrove ? '1 muda' : 'Proteção'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center gap-2.5 text-xs text-[#9A5B14]">
                <MapPin className="w-4 h-4 text-[#D96B43] shrink-0" />
                <span>
                  <strong>Entrega Carbono Zero:</strong> A rota final será executada por veículo 100% elétrico ou bike cargo com rastreamento ao vivo no mapa.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">E-mail para Certificado</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">CEP</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-[#5C4E43] block mb-1">Rua / Logradouro</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">Número</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#5C4E43] block mb-1">Cidade / Estado</label>
                  <input
                    type="text"
                    value={`${formData.city} - ${formData.state}`}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E] focus:outline-none focus:border-[#D96B43]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#5C4E43] uppercase tracking-wider block">
                  Escolha o Método de Pagamento Consciente
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="pay-method-pix"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-[#3E8E84] bg-[#3E8E84]/10 ring-2 ring-[#3E8E84]/30'
                        : 'border-[#EADFCF] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <QrCode className="w-5 h-5 text-[#3E8E84]" />
                      <span className="text-[10px] font-extrabold bg-[#3E8E84] text-white px-2 py-0.5 rounded-full">
                        5% OFF
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-bold text-xs text-[#2C241E] block">PIX Sustentável</span>
                      <span className="text-[10px] text-[#7A6757]">Aprovação imediata sem plástico de cartão</span>
                    </div>
                  </button>

                  <button
                    id="pay-method-credit"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-[#D96B43] bg-[#D96B43]/10 ring-2 ring-[#D96B43]/30'
                        : 'border-[#EADFCF] bg-[#FAF7F2]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#D96B43]" />
                    <div className="mt-2">
                      <span className="font-bold text-xs text-[#2C241E] block">Cartão Verde</span>
                      <span className="text-[10px] text-[#7A6757]">Até 6x sem juros ecológico</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* PIX preview */}
              {paymentMethod === 'pix' ? (
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] text-center space-y-2">
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-[#DECDBB] flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-[#2C241E] via-[#3E8E84] to-[#2C241E] rounded-lg flex items-center justify-center text-white">
                      <QrCode className="w-20 h-20" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#2C241E]">
                    Código Copia e Cola Seguro Gerado
                  </p>
                  <p className="text-[11px] text-[#7A6757]">
                    00020126580014br.gov.bcb.pix0136mare-solar-eco-biojoias-202652040000
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="font-semibold text-[#5C4E43] block mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4289"
                      className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-[#5C4E43] block mb-1">Validade</label>
                      <input
                        type="text"
                        placeholder="08/29"
                        className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#5C4E43] block mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="382"
                        className="w-full bg-[#FAF7F2] border border-[#DECDBB] rounded-xl p-2.5 text-[#2C241E]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {checkoutStep === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#3E8E84]/15 text-[#3E8E84] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3E8E84]">
                  Compra Regenerativa Concluída!
                </span>
                <h4 className="font-display font-extrabold text-2xl text-[#2C241E]">
                  Obrigado por Vestir o Sol e Salvar o Mar
                </h4>
                <p className="text-xs text-[#7A6757] max-w-md mx-auto">
                  Seu pedido foi registrado em nossa cadeia de custódia sustentável. O certificado de neutralização de CO₂ já está disponível no seu perfil!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] max-w-sm mx-auto space-y-1">
                <span className="text-[11px] text-[#88705C] block">Código de Rastreio ao Vivo:</span>
                <span className="font-display font-black text-xl text-[#D96B43] tracking-wider block">
                  {generatedOrderCode}
                </span>
                <span className="text-[10px] text-[#3E8E84] font-semibold block">
                  Veículo Elétrico em preparação no Ateliê de Trancoso/BA
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Action */}
        <div className="p-5 sm:p-6 border-t border-[#EADFCF] bg-[#FAF7F2] space-y-4">
          {checkoutStep !== 'success' && (
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7A6757]">
                <span>Subtotal ({cartItems.length} itens)</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {includeExtraMangrove && (
                <div className="flex justify-between text-[#3E8E84]">
                  <span>Muda de Manguezal Regenerativo</span>
                  <span>+ R$ 4,90</span>
                </div>
              )}
              {pixDiscount > 0 && (
                <div className="flex justify-between text-[#3E8E84] font-semibold">
                  <span>Desconto PIX Sustentável (5%)</span>
                  <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A6757]">
                <span>Frete Ecológico Carbono Zero</span>
                <span className="font-bold text-[#3E8E84]">GRÁTIS</span>
              </div>
              <div className="pt-2 border-t border-[#DECDBB] flex justify-between text-base font-extrabold text-[#2C241E]">
                <span>Total a Pagar</span>
                <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3">
            {checkoutStep === 'cart' && (
              <>
                <button
                  id="checkout-back-btn"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#DECDBB] text-xs font-semibold text-[#5C4E43] hover:bg-white"
                >
                  Continuar Comprando
                </button>
                <button
                  id="checkout-proceed-shipping-btn"
                  disabled={cartItems.length === 0}
                  onClick={() => setCheckoutStep('shipping')}
                  className="px-6 py-3 rounded-full bg-[#2C241E] hover:bg-[#D96B43] disabled:opacity-50 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
                >
                  <span>Avançar para Endereço</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {checkoutStep === 'shipping' && (
              <>
                <button
                  id="shipping-back-to-cart-btn"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-5 py-2.5 rounded-full border border-[#DECDBB] text-xs font-semibold text-[#5C4E43] hover:bg-white"
                >
                  Voltar para Sacola
                </button>
                <button
                  id="shipping-proceed-payment-btn"
                  onClick={() => setCheckoutStep('payment')}
                  className="px-6 py-3 rounded-full bg-[#2C241E] hover:bg-[#D96B43] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
                >
                  <span>Ir para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {checkoutStep === 'payment' && (
              <>
                <button
                  id="payment-back-to-shipping-btn"
                  onClick={() => setCheckoutStep('shipping')}
                  className="px-5 py-2.5 rounded-full border border-[#DECDBB] text-xs font-semibold text-[#5C4E43] hover:bg-white"
                >
                  Voltar
                </button>
                <button
                  id="finish-payment-btn"
                  onClick={handleFinishPayment}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#3E8E84] to-[#265B54] text-white text-xs font-bold shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FEE440]" />
                  <span>Confirmar Pedido Consciente</span>
                </button>
              </>
            )}

            {checkoutStep === 'success' && (
              <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="success-track-live-btn"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('rastreamento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:flex-1 py-3 rounded-full bg-gradient-to-r from-[#D96B43] to-[#E5A93C] text-white text-xs font-bold shadow-md hover:brightness-105 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Rastrear Entrega no Mapa ao Vivo</span>
                </button>

                <button
                  id="success-view-profile-btn"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('perfil');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#DECDBB] bg-white text-xs font-bold text-[#2C241E] hover:bg-[#FAF7F2]"
                >
                  Ver Meu Perfil de Carbono
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
