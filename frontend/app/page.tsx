import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F3EC]/90 backdrop-blur-sm border-b border-[#C9A84C]/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-[#1A2E1F] text-lg font-bold tracking-wide">
            JQS
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm text-[#1A2E1F]/70 hover:text-[#1A2E1F] transition-colors font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-[#1A2E1F] text-[#F7F3EC] px-4 py-2 rounded-full hover:bg-[#C9A84C] transition-colors font-medium"
            >
              Register
            </Link>
            <Link
              href="/products"
              className="text-sm text-[#8A8578] hover:text-[#1A2E1F] transition-colors"
            >
              Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Est. in Quality
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#1A2E1F] leading-[1.1] mb-6">
              Jeerah&apos;s{' '}
              <span className="relative inline-block">
                Quality
                <span className="absolute bottom-1 left-0 right-0 h-0.75px bg-[#C9A84C]" />
              </span>{' '}
              Stables
            </h1>
            <p className="text-[#8A8578] text-lg leading-relaxed mb-10 max-w-md">
              Quality staples you can count on, every day. Fresh produce, trusted
              brands, and essentials delivered from our shelves to yours.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#1A2E1F] text-[#F7F3EC] px-7 py-3.5 rounded-full font-medium hover:bg-[#C9A84C] transition-colors text-sm"
              >
                Browse products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border border-[#1A2E1F]/30 text-[#1A2E1F] px-7 py-3.5 rounded-full font-medium hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors text-sm"
              >
                Create account
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-14 flex gap-10">
              {[
                { value: '500+', label: 'Products' },
                { value: 'Daily', label: 'Fresh stock' },
                { value: '100%', label: 'Quality assured' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl font-bold text-[#1A2E1F]">{s.value}</p>
                  <p className="text-xs text-[#8A8578] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#C9A84C]/10 rounded-3xl" />
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl">
              <img
                src="/grocery.jpg"
                alt="Fresh groceries at Jeerah's Quality Stables"
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[#1A2E1F] font-serif font-bold text-sm">Fresh today</p>
                <p className="text-[#8A8578] text-xs">Restocked every morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="bg-[#1A2E1F] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-8 text-center">
            What we carry
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: '🥬', label: 'Fresh Produce' },
              { icon: '🧴', label: 'Household' },
              { icon: '🥩', label: 'Proteins' },
              { icon: '🍞', label: 'Bakery' },
            ].map((cat) => (
              <div
                key={cat.label}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/10 hover:border-[#C9A84C]/50 hover:bg-white/5 transition-all cursor-pointer"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[#F7F3EC]/80 text-sm font-medium group-hover:text-[#C9A84C] transition-colors">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-[#1A2E1F]/10">
        <p className="text-[#8A8578] text-sm">
          © {new Date().getFullYear()} Jeerah&apos;s Quality Stables · All rights reserved
        </p>
      </footer>
    </main>
  );
}