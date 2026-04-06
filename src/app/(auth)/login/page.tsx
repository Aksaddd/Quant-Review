'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
      /* Guest / demo mode — skip auth */
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
    <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center p-4">
      {/* Glow */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none
          bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06)_0%,transparent_60%)]"
      />

      <div className="w-full max-w-md relative animate-fade-up">
        {/* Card */}
        <div className="
          bg-[var(--surface-2)] border border-[var(--surface-border-strong)]
          rounded-2xl px-6 pt-8 pb-7 shadow-[var(--shadow-lg)]
        ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 w-fit">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-500/10 border border-brand-500/20">
              <Sparkles size={16} className="text-brand-400" />
            </div>
            <span className="font-bold text-sm text-[var(--text-primary)]">Quant Review</span>
          </Link>

          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h1>
          <p className="text-sm text-[var(--text-muted)] mb-7">
            Sign in to sync your progress across devices.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full pl-9 pr-4 py-2.5 text-sm rounded-xl
                    bg-[var(--surface-3)] border border-[var(--surface-border-strong)]
                    text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30
                    transition-colors
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Password</label>
                <Link href="/auth/reset" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="
                    w-full pl-9 pr-10 py-2.5 text-sm rounded-xl
                    bg-[var(--surface-3)] border border-[var(--surface-border-strong)]
                    text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30
                    transition-colors
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
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
            <span className="flex-1 h-px bg-[var(--surface-border)]" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <span className="flex-1 h-px bg-[var(--surface-border)]" />
          </div>

          <button
            onClick={continueAsGuest}
            className="
              w-full py-2.5 rounded-xl text-sm font-medium
              border border-[var(--surface-border-strong)]
              text-[var(--text-secondary)] hover:text-[var(--text-primary)]
              hover:bg-white/4 transition-all
            "
          >
            Continue as Guest
          </button>

          <p className="text-center text-xs text-[var(--text-muted)] mt-5">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
