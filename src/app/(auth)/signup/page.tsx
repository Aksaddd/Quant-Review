'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const PERKS = [
  'Sync progress across all devices',
  'Never lose your study streak',
  'Personal performance analytics',
];

const INPUT_STYLE: React.CSSProperties = {
  borderRadius: 12,
  background: '#ffffff',
  border: '0.5px solid rgba(0,0,0,0.12)',
  color: '#1d1d1f',
  outline: 'none',
  transitionTimingFunction: 'var(--ease-standard)',
};

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
      toast.success('Check your email to confirm your account');
      router.push('/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="eureka-active min-h-screen flex items-center justify-center p-4"
      style={{ background: '#ffffff' }}
    >
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, var(--eureka-accent-tint-strong) 0%, transparent 60%)',
        }}
      />

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center relative animate-fade-up">
        {/* Left — perks */}
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center gap-2 mb-10">
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

          <h1
            className="font-semibold tracking-[-0.025em] text-[#1d1d1f] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.08 }}
          >
            Start your quant
            <br />
            <span style={{ color: 'var(--eureka-accent)' }}>interview prep today.</span>
          </h1>
          <p className="text-[#6e6e73] mb-8 text-[15px] leading-relaxed">
            Everything from Zhou&apos;s guide, rebuilt as a focused learning system.
            Sign up to track your progress and sync across devices.
          </p>

          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[13px] text-[#424245]">
                <span
                  className="w-5 h-5 flex items-center justify-center shrink-0"
                  style={{
                    borderRadius: 9999,
                    background: 'rgba(48,209,88,0.14)',
                  }}
                >
                  <Check size={11} style={{ color: '#30d158' }} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
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
          <div className="lg:hidden flex items-center justify-between gap-2 mb-6">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-7 h-7 flex items-center justify-center"
                style={{ borderRadius: 9, background: 'var(--eureka-accent)' }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-semibold text-[14px] text-[#1d1d1f] tracking-tight">Quant Review</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-2 py-2 -mr-2 min-h-[40px] text-[12px] font-semibold tracking-tight text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              <ArrowLeft size={13} /> Home
            </Link>
          </div>

          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-1 leading-tight">
            Create your account
          </h2>
          <p className="text-[13px] text-[#6e6e73] mb-7">Free forever. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1.5 tracking-tight">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-[13px] transition-colors duration-200"
                  style={INPUT_STYLE}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1.5 tracking-tight">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-[13px] transition-colors duration-200"
                  style={INPUT_STYLE}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-medium text-[#6e6e73] mb-1.5 tracking-tight">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-[13px] transition-colors duration-200"
                  style={INPUT_STYLE}
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-[11px] text-[#86868b] mt-5">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold hover:underline transition-colors duration-200"
              style={{ color: 'var(--eureka-accent)' }}
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-[10px] text-[#a1a1a6] mt-3 tracking-tight">
            If running locally, accounts cannot be created. Your progress is saved in the browser.
          </p>
        </div>
      </div>
    </div>
  );
}
