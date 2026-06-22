'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  console.log("URL: ", process.env.NEXT_PUBLIC_API_URL)
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
       
      });
       console.log("you have login succefully")
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);

        // determine role from response or token payload
        const getRoleFromResponse = (resp: { user: { role: any; }; role: any; roles: string | string[]; }) => {
          if (!resp) return undefined;
          if (resp.user && resp.user.role) return resp.user.role;
          if (resp.role) return resp.role;
          if (Array.isArray(resp.roles) && resp.roles.includes('admin')) return 'admin';
          return undefined;
        };

        const parseJwt = (token: string) => {
          try {
            const parts = token.split('.');
            if (parts.length < 2) return null;
            const payload = parts[1];
            const json = decodeURIComponent(
              atob(payload)
                .split('')
                .map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
            );
            return JSON.parse(json);
          } catch {
            return null;
          }
        };

        let role = getRoleFromResponse(data);
        if (!role && data.access_token) {
          const payload = parseJwt(data.access_token);
          if (payload) {
            if (payload.role) role = payload.role;
            if (!role && payload.user && payload.user.role) role = payload.user.role;
          }
        }

        if (role && String(role).toLowerCase() === 'admin') {
          router.push('/admin');
        } else {
          router.push('/products');
        }
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex min-h-135px">
        {/* Left panel — brand */}
        <div className="hidden md:flex md:w-2/5 bg-[#1A2E1F] flex-col justify-between p-10">
          <Link href="/" className="text-[#C9A84C] font-serif text-xl font-bold tracking-wide">
            JQS
          </Link>
          <div>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Welcome back
            </p>
            <h2 className="font-serif text-3xl text-white font-bold leading-snug mb-4">
              Your everyday essentials await.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Sign in to browse fresh produce, household staples, and everything you count on.
            </p>
          </div>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Jeerah&apos;s Quality Stables
          </p>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-10">
          {/* Mobile logo */}
          <Link href="/" className="md:hidden text-[#1A2E1F] font-serif text-xl font-bold mb-8 block">
            JQS
          </Link>

          <h1 className="font-serif text-3xl font-bold text-[#1A2E1F] mb-1">Sign in</h1>
          <p className="text-[#8A8578] text-sm mb-8">
            New here?{' '}
            <Link href="/register" className="text-[#C9A84C] hover:underline font-medium">
              Create an account
            </Link>
          </p>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[#1A2E1F] text-xs font-semibold tracking-wide uppercase mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                className="w-full border border-[#1A2E1F]/20 rounded-lg px-4 py-3 text-[#1A2E1F] placeholder-[#8A8578]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition text-sm bg-[#F7F3EC]/50"
              />
            </div>

            <div>
              <label className="block text-[#1A2E1F] text-xs font-semibold tracking-wide uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && login()}
                  className="w-full border border-[#1A2E1F]/20 rounded-lg px-4 py-3 pr-11 text-[#1A2E1F] placeholder-[#8A8578]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition text-sm bg-[#F7F3EC]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8578] hover:text-[#1A2E1F] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="mt-7 w-full bg-[#1A2E1F] text-[#F7F3EC] py-3.5 rounded-lg font-semibold text-sm hover:bg-[#C9A84C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}