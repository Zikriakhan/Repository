import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, MapPin, CheckCircle, ArrowLeft, MessageCircle, Phone, Sparkles, ExternalLink, Send, ChevronDown, Flame } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { BAKE_LEVELS } from './MenuItemDetail';

const RESTAURANT_WHATSAPP_NUMBER = "971502985578";
const RESTAURANT_PHONE_DISPLAY = "+971 50 298 5578";

export default function Order() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart, updateItemVariation, updateItemBakeLevel } = useCart();
  const { addOrder } = useAdminData();
  const [orderMethod, setOrderMethod] = useState('delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [placedOrderSummary, setPlacedOrderSummary] = useState(null);

  const subtotal = getCartTotal();
  const total = subtotal; // Taxes & Fees and Delivery Fee removed per request

  const buildWhatsAppMessage = ({ customerName, customerPhone, deliveryAddress, specialNotes }) => {
    let msg = `🍕 *NEW ORDER - ITALIAN PIZZA KAWKAB* 🍕\n`;
    msg += `_Serving Sharjah Since 1999_\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `👤 *Customer Name:* ${customerName}\n`;
    if (customerPhone) {
      msg += `📞 *Phone / WhatsApp:* ${customerPhone}\n`;
    }
    msg += `🚚 *Fulfillment:* ${orderMethod === 'delivery' ? 'Delivery' : 'Pickup at Restaurant'}\n`;
    if (orderMethod === 'delivery' && deliveryAddress) {
      msg += `📍 *Delivery Address:* ${deliveryAddress}\n`;
    }
    if (specialNotes) {
      msg += `📝 *Order Notes:* ${specialNotes}\n`;
    }
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *ORDER ITEMS (${cartItems.length}):*\n\n`;

    cartItems.forEach((item, index) => {
      const itemNum = index + 1;
      const itemPrice = item.numPrice || parseFloat(String(item.price).replace(/[^0-9.-]/g, '') || '0');
      const lineTotal = (itemPrice * item.quantity).toFixed(2);

      msg += `${itemNum}️⃣ *${item.name}*\n`;
      msg += `   • Quantity: ${item.quantity}x\n`;
      if (item.variationName) {
        msg += `   • Size: ${item.variationName}\n`;
      }
      const currentBake = item.bakeLevel || '2. THE CLASSIC';
      msg += `   • CRUST BAKE LEVEL: ${currentBake}${item.bakeLevelSub ? ` (${item.bakeLevelSub})` : ''}\n`;
      if (item.specialInstructions && !item.specialInstructions.startsWith('Bake Level:')) {
        msg += `   • Notes: ${item.specialInstructions}\n`;
      }
      msg += `   • Price: AED ${lineTotal} (AED ${itemPrice.toFixed(2)} each)\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *ORDER TOTAL:*\n`;
    msg += `• Subtotal: AED ${subtotal.toFixed(2)}\n`;
    msg += `💵 *TOTAL: AED ${total.toFixed(2)}*\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🙏 *Thank you for ordering with Italian Pizza Kawkab!*`;

    return msg;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const form = e.target;
    const nameInput = form.querySelector('input[name="guestName"]') || form.querySelector('input[placeholder="Full Name"]');
    const phoneInput = form.querySelector('input[name="guestPhone"]');
    const addressInput = form.querySelector('input[name="deliveryAddress"]');
    const notesInput = form.querySelector('textarea[name="orderNotes"]');

    const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Guest';
    const customerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '';
    const deliveryAddress = addressInput && addressInput.value.trim() ? addressInput.value.trim() : '';
    const specialNotes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : '';

    // Generate WhatsApp text
    const messageText = buildWhatsAppMessage({
      customerName,
      customerPhone,
      deliveryAddress,
      specialNotes
    });

    const waLink = `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setWhatsappUrl(waLink);

    // Add order to admin dashboard
    addOrder({
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        numPrice: item.numPrice || parseFloat(String(item.price).replace(/[^0-9.-]/g, '') || '0'),
        variationName: item.variationName,
        bakeLevel: item.bakeLevel,
        lineTotal: (item.numPrice || parseFloat(String(item.price).replace(/[^0-9.-]/g, '') || '0')) * item.quantity,
        img: item.img,
        image: item.img || item.image
      })),
      total: total,
      subtotal: subtotal,
      tax: 0,
      deliveryFee: 0,
      method: orderMethod,
      customer: customerName,
      phone: customerPhone,
      address: deliveryAddress
    });

    setPlacedOrderSummary({
      customerName,
      customerPhone,
      deliveryAddress,
      orderMethod,
      items: [...cartItems],
      total,
      messageText
    });

    // Auto-open WhatsApp
    window.open(waLink, '_blank');

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  if (orderPlaced && placedOrderSummary) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1F2937] pt-28 pb-24 flex items-center justify-center px-4">
        <div className="bg-white p-8 md:p-12 max-w-2xl w-full rounded-2xl shadow-2xl border border-gray-100 text-center animate-fade-up">

          {/* WhatsApp Success Badge */}
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <MessageCircle size={44} strokeWidth={2} />
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            Order Sent to WhatsApp ({RESTAURANT_PHONE_DISPLAY})
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a0a10] mt-4 mb-3">
            Thank You, {placedOrderSummary.customerName}!
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            Your order details with sizes and bake levels have been prepared for Italian Pizza Kawkab's official WhatsApp hotline: <strong className="text-emerald-700 font-mono">{RESTAURANT_PHONE_DISPLAY}</strong>.
          </p>

          {/* Primary Action Button: Open WhatsApp */}
          <div className="space-y-3 mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 px-6 rounded-xl font-bold tracking-wider uppercase text-sm shadow-xl flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
              <MessageCircle size={20} />
              <span>Open in WhatsApp Now ({RESTAURANT_PHONE_DISPLAY})</span>
              <ExternalLink size={16} />
            </a>

            <p className="text-xs text-gray-500">
              *If WhatsApp did not open automatically, click the button above to send your message.
            </p>
          </div>

          {/* Order Details Preview Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-8 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1a0a10] border-b border-gray-200 pb-2 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-emerald-700 font-bold">AED{placedOrderSummary.total.toFixed(2)}</span>
            </h4>

            <div className="divide-y divide-gray-200/70 text-xs">
              {placedOrderSummary.items.map((item, idx) => (
                <div key={idx} className="py-2.5">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{item.quantity}x {item.name}</span>
                    <span>AED{((item.numPrice || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                  {item.variationName && (
                    <div className="text-amber-800 font-semibold mt-0.5">
                      • Size: {item.variationName}
                    </div>
                  )}
                  {item.bakeLevel && (
                    <div className="text-red-700 font-semibold mt-0.5">
                      • Bake Level: {item.bakeLevel} {item.bakeLevelSub ? `(${item.bakeLevelSub})` : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 px-6 font-bold tracking-wider uppercase text-xs rounded-xl transition-colors text-center"
            >
              Return to Home
            </a>
            <a
              href="/BrowseMenu"
              className="flex-1 bg-[var(--theme-accent,#c69214)] hover:bg-amber-500 text-black py-3.5 px-6 font-bold tracking-wider uppercase text-xs rounded-xl transition-colors text-center"
            >
              Order More Items
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1F2937] pt-24 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-[#92141f] font-bold uppercase tracking-[0.15em] text-xs transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Continue Browsing Menu
          </a>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#3a1e26] mb-4">Your Order Selection</h1>
          <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xs">Review your legendary dishes &amp; cheesecakes</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-16 text-center shadow-sm rounded-sm border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-gray-400 mb-6">Your order bag is currently empty.</h3>
            <a href="/BrowseMenu" className="bg-[#92141f] hover:bg-[#92141f] text-white px-10 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs rounded-sm shadow-md inline-block">
              Explore Our Menu
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Cart Items */}
            <div className="w-full lg:w-3/5">
              <div className="bg-white p-8 md:p-10 shadow-xl rounded-sm border border-gray-100 mb-8">
                <h2 className="font-serif text-2xl font-bold mb-8 border-b border-gray-100 pb-4 text-[#3a1e26]">Order Details</h2>

                <div className="space-y-8">
                  {cartItems.map((item, index) => {
                    const categoryName = item.category || (item.name.toLowerCase().includes('calzone') || item.name.toLowerCase().includes('pizza') ? 'Pizzas' : 'Specialty Dish');
                    const caloriesText = item.calories || (item.name.toLowerCase().includes('calzone') ? '580 Cal.' : '650 Cal.');
                    const descriptionText = item.desc || item.description || 'Pizza Sandwich - The king of sandwiches! Contains tomato, mozzarella, Salami, Chicken, Mushroom and capsicum / ساندوتش بيتزا - ملك السندويشات! يحتوي على طماطم وجبن موزاربلا، سلامي، دجاج، مشروم وفلفل';
                    const ingredientsText = item.ingredients || 'Prepared fresh in our scratch kitchen using premium ingredients, signature spices, and fresh herbs.';
                    const allergensText = item.allergens || 'Wheat, Milk, Eggs';

                    return (
                      <div key={index} className="pb-8 border-b border-gray-100 last:border-b-0">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {/* Image with Calorie Badge */}
                          <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 shadow-md relative bg-gray-50">
                            <img src={item.img || item.image || 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              🔥 {caloriesText}
                            </span>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 w-full">
                            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                              <div>
                                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#c69214] uppercase block mb-1">
                                  {categoryName}
                                </span>
                                <h4 className="font-serif text-2xl font-bold text-[#3a1e26]">{item.name}</h4>
                                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                  {item.variationName && (
                                    <div className="inline-flex items-center gap-1.5 bg-[#92141f]/10 text-[#92141f] border border-[#92141f]/20 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                      <span>✨ Size: {item.variationName}</span>
                                    </div>
                                  )}
                                  {item.bakeLevel && (
                                    <div className="inline-flex items-center gap-1.5 bg-[#0c182a] text-amber-300 border border-[#d4af37]/40 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                      <span>🔥 Crust: {item.bakeLevel}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-serif text-2xl font-extrabold text-[#92141f]">
                                  AED{(item.numPrice * item.quantity).toFixed(2)}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="block text-xs text-gray-500 font-medium">
                                    (AED{item.numPrice.toFixed(2)} each)
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Full Description */}
                            <p className="text-gray-700 text-sm mb-4 leading-relaxed font-normal bg-gray-50/60 p-3 rounded-lg border border-gray-100">
                              {descriptionText}
                            </p>

                            {/* Choose Your Size Options */}
                            <div className="mb-4 bg-gradient-to-r from-red-50/80 to-amber-50/50 p-3.5 rounded-xl border border-red-200/60 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-extrabold tracking-wider text-[#92141f] uppercase flex items-center gap-1.5">
                                  <span>✨ Choose Your Size Options:</span>
                                </span>
                                {item.variationName && (
                                  <span className="text-[11px] font-bold text-[#3a1e26] bg-white px-2.5 py-0.5 rounded-full border border-gray-200 shadow-2xs">
                                    Selected: <strong className="text-[#92141f]">{item.variationName}</strong>
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-2.5">
                                {[
                                  { name: 'Small', numPrice: 17.00 },
                                  { name: 'Medium', numPrice: 19.00 },
                                  { name: 'Regular', numPrice: 22.00 }
                                ].map(size => {
                                  const isSelected = item.variationName === size.name;
                                  return (
                                    <button
                                      key={size.name}
                                      type="button"
                                      onClick={() => updateItemVariation(item.name, item.variationName, size)}
                                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border flex items-center gap-2 ${isSelected
                                        ? 'bg-[#92141f] text-white border-[#92141f] shadow-md scale-105 ring-2 ring-[#92141f]/30'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#92141f] hover:bg-gray-50 cursor-pointer'
                                        }`}
                                    >
                                      <span>{size.name}</span>
                                      <span className={isSelected ? 'text-white/90 font-bold' : 'text-[#92141f] font-semibold'}>
                                        AED{size.numPrice.toFixed(2)}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* CRUST BAKE LEVEL Dropdown */}
                            <div className="mb-4 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 p-3.5 md:p-4 rounded-xl border border-amber-300/80 shadow-sm">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <label
                                  htmlFor={`crust-bake-level-${index}`}
                                  className="text-xs font-extrabold text-[#3a1e26] uppercase tracking-wider flex items-center gap-1.5"
                                >
                                  <Flame size={15} className="text-[#92141f]" />
                                  <span>CRUST BAKE LEVEL:</span>
                                </label>
                                <span className="text-[11px] font-bold text-[#92141f] bg-white px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#92141f] inline-block animate-pulse"></span>
                                  <span>{item.bakeLevel || '2. THE CLASSIC'}</span>
                                </span>
                              </div>

                              <div className="relative">
                                <select
                                  id={`crust-bake-level-${index}`}
                                  value={item.bakeLevel || '2. THE CLASSIC'}
                                  onChange={(e) => {
                                    const selectedTitle = e.target.value;
                                    const foundLevel = BAKE_LEVELS.find(lvl => lvl.title === selectedTitle) || {
                                      title: selectedTitle,
                                      subtitle: ''
                                    };
                                    updateItemBakeLevel(item.name, item.variationName, foundLevel);
                                  }}
                                  className="w-full appearance-none bg-white border-2 border-amber-300 hover:border-[#92141f] focus:border-[#92141f] text-gray-900 font-bold text-xs md:text-sm rounded-xl py-2.5 pl-3.5 pr-10 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#92141f]/20 cursor-pointer transition-all"
                                >
                                  {BAKE_LEVELS.map((lvl) => (
                                    <option key={lvl.id} value={lvl.title} className="text-gray-900 py-1 font-medium">
                                      {lvl.title} {lvl.hasFlame ? '🔥' : ''} — {lvl.subtitle}
                                    </option>
                                  ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#92141f]">
                                  <ChevronDown size={18} strokeWidth={2.5} />
                                </div>
                              </div>

                              <div className="mt-2 text-[11px] text-gray-600 flex items-center justify-between">
                                <span className="italic">
                                  {BAKE_LEVELS.find(lvl => lvl.title === (item.bakeLevel || '2. THE CLASSIC'))?.description || 'Authentic stone oven baking preference'}
                                </span>
                                <span className="font-semibold text-amber-900 uppercase text-[10px] tracking-wider hidden sm:inline">
                                  {BAKE_LEVELS.find(lvl => lvl.title === (item.bakeLevel || '2. THE CLASSIC'))?.badge || 'Golden Bake'}
                                </span>
                              </div>
                            </div>

                            {/* Ingredients & Allergens */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs bg-neutral-50 p-3 rounded-lg border border-gray-200">
                              <div>
                                <strong className="text-gray-800 uppercase tracking-wider block mb-0.5">Ingredients:</strong>
                                <span className="text-gray-600 leading-normal block">{ingredientsText}</span>
                              </div>
                              <div>
                                <strong className="text-[#92141f] uppercase tracking-wider block mb-0.5">Allergens:</strong>
                                <span className="text-gray-700 font-medium leading-normal block">{allergensText}</span>
                              </div>
                            </div>

                            {/* Special Instructions Note */}
                            {item.specialInstructions && (
                              <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 rounded-lg flex items-start gap-2">
                                <span className="font-bold uppercase tracking-wider shrink-0">📝 Special Instructions:</span>
                                <span className="italic">{item.specialInstructions}</span>
                              </div>
                            )}

                            {/* Quantity Controls & Remove Action */}
                            <div className="flex justify-between items-center pt-2">
                              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.name, item.variationName, item.quantity - 1)}
                                  className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-[#92141f] transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="px-4 py-1.5 font-bold text-sm min-w-[2.5rem] text-center text-[#3a1e26]">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.name, item.variationName, item.quantity + 1)}
                                  className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-100 hover:text-[#3a1e26] transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.name, item.variationName)}
                                className="text-gray-400 hover:text-[#92141f] transition-colors flex items-center text-xs uppercase tracking-widest font-bold"
                              >
                                <Trash2 size={15} className="mr-1.5" />
                                Remove Item
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="w-full lg:w-2/5">
              <form onSubmit={handlePlaceOrder} className="bg-white p-8 md:p-10 shadow-xl rounded-sm border border-gray-100 sticky top-28">

                {/* Fulfillment Method */}
                <div className="mb-8">
                  <h3 className="font-serif text-xl font-bold mb-4 text-[#3a1e26]">Fulfillment</h3>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex flex-col items-center p-4 border rounded-sm cursor-pointer transition-colors ${orderMethod === 'delivery' ? 'border-[#3a1e26] bg-[#3a1e26]/5 text-[#3a1e26]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="method"
                        value="delivery"
                        checked={orderMethod === 'delivery'}
                        onChange={() => setOrderMethod('delivery')}
                        className="sr-only"
                      />
                      <MapPin size={24} className="mb-2 text-[#92141f]" />
                      <span className="font-bold text-xs uppercase tracking-[0.1em]">Delivery</span>
                    </label>
                    <label className={`flex-1 flex flex-col items-center p-4 border rounded-sm cursor-pointer transition-colors ${orderMethod === 'pickup' ? 'border-[#3a1e26] bg-[#3a1e26]/5 text-[#3a1e26]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="method"
                        value="pickup"
                        checked={orderMethod === 'pickup'}
                        onChange={() => setOrderMethod('pickup')}
                        className="sr-only"
                      />
                      <CreditCard size={24} className="mb-2 text-[#92141f]" />
                      <span className="font-bold text-xs uppercase tracking-[0.1em]">Pickup</span>
                    </label>
                  </div>
                </div>

                {/* Fields */}
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Guest Name *</label>
                    <input type="text" name="guestName" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-lg p-3 focus:outline-none focus:border-[#3a1e26] focus:ring-[#3a1e26] transition-colors" placeholder="Full Name" />
                  </div>

                  {/* <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2 flex items-center justify-between">
                      <span>Phone / WhatsApp Number *</span>
                      <span className="text-[10px] text-emerald-600 font-bold lowercase">for order updates</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input type="tel" name="guestPhone" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-lg p-3 pl-10 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors font-mono" placeholder="+971 50 XXX XXXX" />
                    </div>
                  </div> */}

                  {orderMethod === 'delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Delivery Address (Sharjah) *</label>
                      <input type="text" name="deliveryAddress" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-lg p-3 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors" placeholder="Street Address, Building, Apartment, Sharjah" />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Special Order Notes (Optional)</label>
                    <textarea name="orderNotes" rows={2} className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-lg p-3 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors" placeholder="Any extra instructions for the chef or driver..." />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Payment Method</label>
                    <div className="p-3 bg-[#F9FAFB] border border-gray-200 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2">
                      <CreditCard size={16} className="text-emerald-600" />
                      <span>Cash or Card upon Delivery / Pickup</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-gray-100 pt-6 mb-8 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>AED{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-2xl font-bold text-[#1a0a10] pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>AED{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* WhatsApp Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 px-6 rounded-xl font-black tracking-[0.12em] uppercase text-xs md:text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transform active:scale-95"
                >
                  <MessageCircle size={20} />
                  <span>Place Order Now via WhatsApp</span>
                </button>

                <p className="text-[11px] text-gray-500 text-center mt-3 font-medium leading-normal">
                  📲 All items with your chosen <strong className="text-gray-700">Sizes</strong> &amp; <strong className="text-red-700">CRUST BAKE LEVEL</strong> will be sent to WhatsApp <strong className="text-emerald-700 font-mono">+971 50 298 5578</strong>.
                </p>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
