'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './Cartcontext';


export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const router = useRouter();

  const delivery = totalPrice > 0 ? 1500 : 0;
  const grandTotal = totalPrice + delivery;

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      {/* Header */}
      <header className="bg-white border-b border-[#D6C9A8] px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span className="text-[#1B3A2D] font-bold uppercase tracking-wide text-sm hidden sm:block">
            Jeerah&apos;s Quality Stables
          </span>
        </Link>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-2 text-xs text-[#6B7E76] uppercase tracking-widest font-medium">
          <Link href="/products" className="hover:text-[#C17A2B] transition-colors">Products</Link>
          <span className="text-[#D6C9A8]">›</span>
          <span className="text-[#1B3A2D] font-bold">Cart</span>
          <span className="text-[#D6C9A8]">›</span>
          <span>Order</span>
        </nav>

        <Link
          href="/products"
          className="text-sm text-[#4A5E55] hover:text-[#C17A2B] font-medium transition-colors uppercase tracking-widest"
        >
          ← Products
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-[#C17A2B] text-xs uppercase tracking-[0.25em] font-semibold mb-1">
            Review your selection
          </p>
          <h1 className="text-[#1B3A2D] text-3xl font-extrabold font-serif">Your Cart</h1>
        </div>

        {/* Empty cart */}
        {items.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-5">🛒</div>
            <p className="text-[#1B3A2D] font-bold text-xl mb-2">Your cart is empty</p>
            <p className="text-[#6B7E76] text-sm mb-8">Add some products to get started.</p>
            <Link
              href="/products"
              className="inline-block bg-[#1B3A2D] text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:bg-[#C17A2B] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Items list */}
            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#D6C9A8] rounded-2xl p-5 flex gap-5 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-linear-to-br from-[#D6E8DC] to-[#A8C5B0] flex items-center justify-center text-3xl shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      '🛍️'
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1B3A2D] font-bold text-sm truncate">{item.name}</h3>
                    {item.category && (
                      <p className="text-[#6B7E76] text-xs uppercase tracking-wide mt-0.5">{item.category}</p>
                    )}
                    <p className="text-[#C17A2B] font-extrabold text-base mt-1">
                      MK {Number(item.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-[#D6C9A8] text-[#1B3A2D] font-bold text-lg flex items-center justify-center hover:border-[#C17A2B] hover:text-[#C17A2B] transition-colors leading-none"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-[#1B3A2D] font-bold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-[#D6C9A8] text-[#1B3A2D] font-bold text-lg flex items-center justify-center hover:border-[#C17A2B] hover:text-[#C17A2B] transition-colors leading-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right shrink-0 w-28 hidden sm:block">
                    <p className="text-[#1B3A2D] font-bold text-sm">
                      MK {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#B0A888] hover:text-red-400 transition-colors shrink-0 ml-1"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Continue shopping */}
              <Link
                href="/products"
                className="self-start text-sm text-[#4A5E55] hover:text-[#C17A2B] transition-colors font-medium mt-2 flex items-center gap-1"
              >
                ← Continue shopping
              </Link>
            </div>

            {/* Order summary sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-white border border-[#D6C9A8] rounded-2xl p-6 sticky top-24">
                <h2 className="text-[#1B3A2D] font-extrabold text-lg mb-5 font-serif">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-[#4A5E55]">
                    <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span className="font-semibold text-[#1B3A2D]">
                      MK {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#4A5E55]">
                    <span>Delivery fee</span>
                    <span className="font-semibold text-[#1B3A2D]">
                      MK {delivery.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-[#D6C9A8] pt-3 mt-1 flex justify-between">
                    <span className="text-[#1B3A2D] font-extrabold text-base">Total</span>
                    <span className="text-[#C17A2B] font-extrabold text-base">
                      MK {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mt-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 border border-[#D6C9A8] bg-[#FDFAF5] rounded-lg px-3 py-2 text-[#1B3A2D] placeholder-[#B0A888] text-xs focus:outline-none focus:ring-2 focus:ring-[#C17A2B] focus:border-transparent transition"
                    />
                    <button className="bg-[#EAE4D6] text-[#1B3A2D] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#D6C9A8] transition-colors uppercase tracking-wider">
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/order')}
                  className="w-full mt-6 bg-[#1B3A2D] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#C17A2B] transition-colors"
                >
                  Proceed to Order →
                </button>

                {/* Trust note */}
                <div className="flex items-center justify-center gap-2 mt-4 text-[#6B7E76] text-xs">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}