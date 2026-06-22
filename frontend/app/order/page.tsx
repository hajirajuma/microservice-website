'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '../cart/Cartcontext';

type Step = 'details' | 'review' | 'confirmed';

interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  payment: 'cash' | 'mobile';
}

const EMPTY_DETAILS: DeliveryDetails = {
  fullName: '', phone: '', address: '', city: '', notes: '', payment: 'cash',
};

export default function OrderPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<Step>('details');
  const [details, setDetails] = useState<DeliveryDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});
  const [placing, setPlacing] = useState(false);
  const [orderRef] = useState(() => 'JQS-' + Math.random().toString(36).substr(2, 7).toUpperCase());
  const router = useRouter();

  const delivery = totalPrice > 0 ? 1500 : 0;
  const grandTotal = totalPrice + delivery;

  const validate = () => {
    const e: Partial<DeliveryDetails> = {};
    if (!details.fullName.trim()) e.fullName = 'Full name is required.';
    if (!details.phone.trim()) e.phone = 'Phone number is required.';
    if (!details.address.trim()) e.address = 'Delivery address is required.';
    if (!details.city.trim()) e.city = 'City / area is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: 1,

      customer: details.fullName,

      phone: details.phone,

      address: details.address,

      city: details.city,

      notes: details.notes,

      payment: details.payment,

      totalAmount: grandTotal,

      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    }),
  }
); // simulate API call
    clearCart();
    setStep('confirmed');
    setPlacing(false);
  };

  const set = (field: keyof DeliveryDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDetails((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof DeliveryDetails) =>
    `w-full border rounded-lg px-4 py-3 text-[#1B3A2D] placeholder-[#B0A888] text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-300'
        : 'border-[#D6C9A8] bg-[#FDFAF5] focus:ring-[#C17A2B]'
    }`;

  //CONFIRMED
  if (step === 'confirmed') {
    return (
      <main className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-[#D6C9A8] rounded-2xl px-8 py-12 shadow-sm">
            <div className="w-20 h-20 bg-[#D6E8DC] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ✅
            </div>
            <h1 className="text-[#1B3A2D] text-2xl font-extrabold font-serif mb-2">
              Order Placed!
            </h1>
            <p className="text-[#6B7E76] text-sm mb-6">
              Thank you, <strong className="text-[#1B3A2D]">{details.fullName}</strong>! Your order
              is confirmed and will be delivered to {details.address}, {details.city}.
            </p>

            <div className="bg-[#F7F3EC] border border-[#D6C9A8] rounded-xl px-5 py-4 text-left mb-8">
              <p className="text-xs text-[#6B7E76] uppercase tracking-widest mb-1">Order reference</p>
              <p className="text-[#1B3A2D] font-extrabold text-xl tracking-wider">{orderRef}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/products"
                className="block w-full bg-[#1B3A2D] text-white py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#C17A2B] transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="block w-full border-2 border-[#D6C9A8] text-[#4A5E55] py-3 rounded-xl font-semibold uppercase tracking-widest text-sm hover:border-[#C17A2B] hover:text-[#C17A2B] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // EMPTY CART 
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-[#1B3A2D] font-bold text-lg mb-2">Nothing to order</p>
          <p className="text-[#6B7E76] text-sm mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block bg-[#1B3A2D] text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:bg-[#C17A2B] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#D6C9A8] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#1B3A2D] font-bold uppercase tracking-wide text-sm hidden sm:block">
            Jeerah&apos;s Quality Stables
          </span>
        </Link>

        {/* Progress steps */}
        <nav className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
          {(['details', 'review'] as Step[]).filter(s => s !== 'confirmed').map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#D6C9A8]">›</span>}
              <span className={step === s ? 'text-[#1B3A2D] font-bold' : 'text-[#B0A888]'}>
                {s === 'details' ? 'Delivery Details' : 'Review & Pay'}
              </span>
            </span>
          ))}
        </nav>

        <Link
          href="/cart"
          className="text-sm text-[#4A5E55] hover:text-[#C17A2B] font-medium transition-colors uppercase tracking-widest"
        >
          ← Cart
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-[#C17A2B] text-xs uppercase tracking-[0.25em] font-semibold mb-1">
            {step === 'details' ? 'Step 1 of 2' : 'Step 2 of 2'}
          </p>
          <h1 className="text-[#1B3A2D] text-3xl font-extrabold font-serif">
            {step === 'details' ? 'Delivery Details' : 'Review & Place Order'}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — form or review */}
          <div className="flex-1">

            {/* ── STEP 1: DETAILS ── */}
            {step === 'details' && (
              <div className="bg-white border border-[#D6C9A8] rounded-2xl p-7 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Banda"
                      value={details.fullName}
                      onChange={set('fullName')}
                      className={inputClass('fullName')}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+265 999 000 000"
                      value={details.phone}
                      onChange={set('phone')}
                      className={inputClass('phone')}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    placeholder="House no., Street, Area"
                    value={details.address}
                    onChange={set('address')}
                    className={inputClass('address')}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-2">
                    City 
                  </label>
                  <input
                    type="text"
                    placeholder="Blantyre, Lilongwe…"
                    value={details.city}
                    onChange={set('city')}
                    className={inputClass('city')}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-2">
                    Delivery Notes <span className="text-[#B0A888] normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Landmark, gate colour, preferred time…"
                    value={details.notes}
                    onChange={set('notes')}
                    rows={3}
                    className="w-full border border-[#D6C9A8] bg-[#FDFAF5] rounded-lg px-4 py-3 text-[#1B3A2D] placeholder-[#B0A888] text-sm focus:outline-none focus:ring-2 focus:ring-[#C17A2B] focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Payment method */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#4A5E55] mb-3">
                    Payment Method
                  </label>
                  <div className="flex gap-3">
                    {([
                      { value: 'cash', label: 'Cash on Delivery' },
                      { value: 'mobile', label: 'Mobile Money' },
                    ] as const).map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDetails((p) => ({ ...p, payment: value }))}
                        className={`flex-1 border-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                          details.payment === value
                            ? 'border-[#1B3A2D] bg-[#1B3A2D] text-white'
                            : 'border-[#D6C9A8] text-[#4A5E55] hover:border-[#C17A2B]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { if (validate()) setStep('review'); }}
                  className="w-full bg-[#1B3A2D] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#C17A2B] transition-colors mt-1"
                >
                  Review Order →
                </button>
              </div>
            )}

            {/* ── STEP 2: REVIEW ── */}
            {step === 'review' && (
              <div className="flex flex-col gap-5">
                {/* Delivery summary */}
                <div className="bg-white border border-[#D6C9A8] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[#1B3A2D] font-bold text-sm uppercase tracking-widest">
                      Delivery Details
                    </h2>
                    <button
                      onClick={() => setStep('details')}
                      className="text-xs text-[#C17A2B] font-semibold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-[#4A5E55] flex flex-col gap-1.5">
                    <p><strong className="text-[#1B3A2D]">{details.fullName}</strong></p>
                    <p>{details.phone}</p>
                    <p>{details.address}, {details.city}</p>
                    {details.notes && <p className="italic text-[#6B7E76]">"{details.notes}"</p>}
                    <p className="mt-1 font-semibold text-[#1B3A2D]">
                      {details.payment === 'cash' ? 'Cash on Delivery' : 'Mobile Money'}
                    </p>
                  </div>
                </div>

                {/* Items in order */}
                <div className="bg-white border border-[#D6C9A8] rounded-2xl p-6">
                  <h2 className="text-[#1B3A2D] font-bold text-sm uppercase tracking-widest mb-4">
                    Items ({totalItems})
                  </h2>
                  <div className="flex flex-col divide-y divide-[#EAE4D6]">
                    {items.map((item: CartItem) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#D6E8DC] to-[#A8C5B0] flex items-center justify-center text-lg shrink-0 overflow-hidden">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : '🛍️'}
                          </div>
                          <div>
                            <p className="text-[#1B3A2D] font-semibold text-sm">{item.name}</p>
                            <p className="text-[#6B7E76] text-xs">× {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-[#1B3A2D] font-bold text-sm shrink-0">
                          MK {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full bg-[#C17A2B] text-white py-4 rounded-xl font-extrabold uppercase tracking-widest text-sm hover:bg-[#1B3A2D] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Placing order…
                    </span>
                  ) : (
                    `Place Order — MK ${grandTotal.toLocaleString()}`
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right — order summary (both steps) */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white border border-[#D6C9A8] rounded-2xl p-6 sticky top-24">
              <h2 className="text-[#1B3A2D] font-extrabold text-base mb-4 font-serif">
                Order Summary
              </h2>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-[#4A5E55]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1B3A2D]">MK {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#4A5E55]">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#1B3A2D]">MK {delivery.toLocaleString()}</span>
                </div>
                <div className="border-t border-[#D6C9A8] pt-3 mt-1 flex justify-between">
                  <span className="text-[#1B3A2D] font-extrabold">Total</span>
                  <span className="text-[#C17A2B] font-extrabold">MK {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[#D6C9A8] flex flex-col gap-2 text-xs text-[#6B7E76]">
                <div className="flex items-center gap-2">🚚 <span>Delivery within 24 hours</span></div>
                <div className="flex items-center gap-2">🔒 <span>Secure & private</span></div>
                <div className="flex items-center gap-2">✅ <span>Quality guaranteed</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}