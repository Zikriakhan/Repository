import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function Order() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { addOrder } = useAdminData();
  const [orderMethod, setOrderMethod] = useState('delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.0825; // 8.25% tax
  const deliveryFee = orderMethod === 'delivery' ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Add order to admin dashboard
    addOrder({
      items: cartItems,
      total: total,
      method: orderMethod,
      customer: e.target.elements[1]?.value || 'Guest'
    });

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1F2937] pt-32 pb-24 flex items-center justify-center">
        <div className="bg-white p-12 max-w-lg w-full mx-4 rounded-sm shadow-2xl text-center border border-gray-100 animate-fade-up">
          <CheckCircle className="mx-auto text-[#92141f] mb-6" size={64} strokeWidth={1.5} />
          <h2 className="font-serif text-3xl font-bold text-[#3a1e26] mb-4">Order Confirmed</h2>
          <p className="text-gray-600 mb-8 font-medium">
            Thank you for your order! Your delicious Cheesecake Factory meal is being prepared freshly from scratch with the utmost care.
          </p>
          <a href="/" className="bg-[#3a1e26] hover:bg-[#522a36] text-white px-8 py-4 font-bold tracking-[0.15em] transition-all uppercase text-xs rounded-sm inline-block shadow-lg">
            Return to Home
          </a>
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
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 pb-6 border-b border-gray-50">
                      <div className="w-24 h-24 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-serif text-xl font-bold text-[#3a1e26]">{item.name}</h4>
                          <span className="font-bold text-[#92141f] ml-4">${(item.numPrice * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-1">{item.desc}</p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-200 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity - 1)}
                              className="px-3 py-1 text-gray-500 hover:text-[#92141f] transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 font-bold text-sm min-w-[2.5rem] text-center text-[#3a1e26]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity + 1)}
                              className="px-3 py-1 text-gray-500 hover:text-[#3a1e26] transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-gray-400 hover:text-[#92141f] transition-colors flex items-center text-xs uppercase tracking-widest font-bold"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Guest Name</label>
                    <input type="text" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm p-3 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors" placeholder="Full Name" />
                  </div>
                  {orderMethod === 'delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Delivery Address</label>
                      <input type="text" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm p-3 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors" placeholder="Street Address, City, State" />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Payment Details</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" required className="w-full bg-[#F9FAFB] border border-gray-200 text-[#1F2937] text-sm rounded-sm p-3 pl-10 focus:outline-none focus:border-[#3a1e26] focus:ring-1 focus:ring-[#3a1e26] transition-colors" placeholder="Card Number (Mock)" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-gray-100 pt-6 mb-8 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxes &amp; Fees</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {orderMethod === 'delivery' && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-2xl font-bold text-[#3a1e26] pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#92141f] hover:bg-[#92141f] text-white py-5 rounded-sm font-bold tracking-[0.15em] uppercase text-xs transition-colors shadow-lg">
                  Place Order Now
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
