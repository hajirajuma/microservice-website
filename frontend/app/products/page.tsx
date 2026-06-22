'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../cart/Cartcontext';

interface Product {
  id: string | number;
  name: string;
  price: number;
  category?: string;
  description?: string;
  imageUrl?: string;
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      category: product.category,
    });
    router.push('/cart');
  };

  return (
    <div className="group bg-white rounded-xl border border-[#1A2E1F]/10 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="bg-[#F7F3EC] h-44 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          // show uploaded image
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          // fallback placeholder
          <span className="text-5xl opacity-40">🛒</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {product.category && (
          <span className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
            {product.category}
          </span>
        )}
        <h3 className="font-serif text-[#1A2E1F] font-semibold text-base leading-snug mb-1 group-hover:text-[#1A2E1F]">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-[#8A8578] text-sm leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#1A2E1F]/8">
          <span className="font-serif text-[#1A2E1F] font-bold text-xl">
            Mk{Number(product.price).toFixed(2)}
          </span>
          <button onClick={handleAdd} className="bg-[#1A2E1F] text-[#F7F3EC] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#C9A84C] transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#1A2E1F]/10 overflow-hidden animate-pulse">
      <div className="bg-[#F7F3EC] h-44" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#F7F3EC] rounded w-1/3" />
        <div className="h-4 bg-[#F7F3EC] rounded w-3/4" />
        <div className="h-3 bg-[#F7F3EC] rounded w-full" />
        <div className="h-3 bg-[#F7F3EC] rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-[#F7F3EC] rounded w-16" />
          <div className="h-8 bg-[#F7F3EC] rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError('Failed to load products. Please check your connection.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [router]);

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-[#1A2E1F]/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-[#1A2E1F] text-lg font-bold tracking-wide">
            JQS
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[#8A8578] text-sm hidden sm:block">
              {products.length} products
            </span>
            <button
              onClick={handleLogout}
              className="text-sm border border-[#1A2E1F]/20 text-[#1A2E1F] px-4 py-2 rounded-full hover:border-red-300 hover:text-red-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
          <div>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-1">
              Catalogue
            </p>
            <h1 className="font-serif text-4xl font-bold text-[#1A2E1F]">Products</h1>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8578]"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#1A2E1F]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition bg-white text-[#1A2E1F] placeholder-[#8A8578]/60"
            />
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
            {error}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4 opacity-30">🛒</span>
            <h3 className="font-serif text-xl font-bold text-[#1A2E1F] mb-2">
              {search ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-[#8A8578] text-sm">
              {search
                ? `No results for "${search}". Try a different search term.`
                : 'Products will appear here once they are added.'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-sm text-[#C9A84C] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-[#8A8578] text-sm mb-5">
              Showing {filtered.length} of {products.length} products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}