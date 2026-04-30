'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();

    if (!supabase) {
      toast.success('Continuing as guest');
      router.push('/dashboard');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function continueAsGuest() {
    toast.success('Continuing as guest — progress saved locally');
    router.push('/dashboard');
  }

  return (
    <div
      className="eureka-active min-h-screen flex items-center justify-center p-4"
      style={{ background: '#ffffff' }}
    >
      {/* Accent halo */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, var(--eureka-accent-tint-strong) 0%, transparent 60%)',
        }}
      />

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Back-to-home link — sits above the card so it doesn't push the
            form down on phones */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mb-3 px-2 py-2 -ml-2 min-h-[40px] text-[12px] font-semibold tracking-tight text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div
          className="px-6 pt-8 pb-7"
          style={{
            background: 'var(--material-regular-light)',
            backdropFilter: 'var(--material-blur-strong)',
            WebkitBackdropFilter: 'var(--material-blur-strong)',
            border: '0.5px solid rgba(0,0,0,0.06)',
            borderRadius: 22,
            boxShadow: 'var(--shadow-hud)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 w-fit">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                borderRadius: 10,
                background: 'var(--eureka-accent)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              }}
            >
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold text-[14px] text-[#1d1d1f] tracking-tight">Quant Review</span>
          </Link>

          <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-1 leading-tight">
            Welcome back
          </h1>
          <p className="text-[13px] text-[#6e6e73] mb-7">
            Sign in to sync your progress across devices.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1.5 tracking-tight">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-[13px] transition-colors duration-200"
                  style={{
                    borderRadius: 12,
                    background: '#ffffff',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    outline: 'none',
                    transitionTimingFunction: 'var(--ease-standard)',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-medium text-[#6e6e73] tracking-tight">Password</label>
                <Link
                  href="/auth/reset"
                  className="text-[11px] hover:underline transition-colors duration-200"
                  style={{ color: 'var(--eureka-accent)' }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-[13px] transition-colors duration-200"
                  style={{
                    borderRadius: 12,
                    background: '#ffffff',
                    border: '0.5px solid rgba(0,0,0,0.12)',
                    color: '#1d1d1f',
                    outline: 'none',
                    transitionTimingFunction: 'var(--ease-standard)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#424245] transition-colors duration-200"
                  style={{ transitionTimingFunction: 'var(--ease-standard)' }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              size="md"
              iconRight={<ArrowRight size={16} />}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <span className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <span className="text-[11px] text-[#86868b] tracking-tight">or</span>
            <span className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
          </div>

          <button
            onClick={continueAsGuest}
            className="w-full py-2.5 text-[13px] font-medium tracking-tight transition-all duration-200 active:scale-[0.99]"
            style={{
              borderRadius: 12,
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.1)',
              color: '#424245',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
          >
            Continue as Guest
          </button>

          <p className="text-center text-[11px] text-[#86868b] mt-5">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold hover:underline transition-colors duration-200"
              style={{ color: 'var(--eureka-accent)' }}
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
