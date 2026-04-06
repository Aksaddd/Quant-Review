'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const PERKS = [
  'Sync progress across all devices',
  'Never lose your study streak',
  'Personal performance analytics',
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();

    if (!supabase) {
      toast.success('Account created (guest mode — Supabase not configured)');
      router.push('/dashboard');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      toast.success('Check your email to confirm your account!');
      router.push('/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center p-4">
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none
          bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06)_0%,transparent_60%)]"
      />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center relative animate-fade-up">
        {/* Left — perks */}
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-500/10 border border-brand-500/20">
              <Sparkles size={16} className="text-brand-400" />
            </div>
            <span className="font-bold text-sm text-[var(--text-primary)]">Quant Review</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight mb-4">
            Start your quant
            <br />
            <span className="text-gradient">interview prep today.</span>
          </h1>
          <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
            Everything from Zhou's guide, rebuilt as a focused learning system.
            Sign up to track your progress and sync across devices.
          </p>

          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-5 h-5 rounded-full bg-[var(--success-bg)] border border-[var(--success)]/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-[var(--success)]" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="
          bg-[var(--surface-2)] border border-[var(--surface-border-strong)]
          rounded-2xl px-6 pt-8 pb-7 shadow-[var(--shadow-lg)]
        ">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-brand-500/10 border border-brand-500/20">
              <Sparkles size={14} className="text-brand-400" />
            </div>
            <span className="font-bold text-sm text-[var(--text-primary)]">Quant Review</span>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Create your account</h2>
          <p className="text-sm text-[var(--text-muted)] mb-7">Free forever. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
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

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
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
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-[var(--text-muted)] mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
