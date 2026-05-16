'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { showToast } = useToast();

  // Validation logic
  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    if (isRegister && !/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
    if (isRegister && !/[0-9]/.test(value)) return 'Include at least one number';
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    return !newErrors.email && !newErrors.password;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    if (field === 'password') setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const endpoint = isRegister ? 'http://localhost:4001/api/auth/register' : 'http://localhost:4001/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(isRegister ? { name: email.split('@')[0], email, password } : { email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!isRegister) {
          showToast('Welcome back!', 'success');
          router.push('/');
        } else {
          setIsRegister(false);
          setEmail('');
          setPassword('');
          setErrors({});
          setTouched({});
          showToast('Account created! Please log in.', 'success');
        }
      } else {
        showToast(data.error || 'Something went wrong', 'error');
      }
    } catch {
      showToast('Network error — is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505] selection:bg-white selection:text-black px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
          alt="Login Background"
          fill
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-blue-600/30 blur-[100px] md:blur-[120px] rounded-full z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-[-10%] left-[-10%] w-72 md:w-[500px] h-72 md:h-[500px] bg-purple-600/20 blur-[120px] md:blur-[150px] rounded-full z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md py-8 md:py-12"
      >
        {/* Card */}
        <div className="bg-slate-950/95 backdrop-blur-3xl border border-white/20 p-7 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl ring-1 ring-white/10">
          <div className="text-center mb-8 sm:mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white/10 border border-white/20 mb-5 sm:mb-6"
            >
              <Sparkles className="text-white w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter mb-2">
              {isRegister ? 'Join ShopX' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400 font-medium text-xs sm:text-sm">
              {isRegister ? 'Create an account to start shopping.' : 'Sign in to continue your journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
            <div className="space-y-3 sm:space-y-4">
              {/* Email Input */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within:text-white text-gray-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    className={`w-full bg-slate-900/90 border border-white/20 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:bg-slate-800/80 transition-all text-sm font-medium ${
                      touched.email && errors.email
                        ? 'border-red-500/50 focus:ring-red-500/30'
                        : 'border-white/20 focus:ring-white/30'
                    }`}
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                    }}
                    onBlur={() => handleBlur('email')}
                  />
                </div>
                {touched.email && errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-2 ml-1 text-red-400 text-xs font-medium"
                  >
                    <AlertCircle size={12} />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none group-focus-within:text-white text-gray-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`w-full bg-slate-900/90 border border-white/20 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-12 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:bg-slate-800/80 transition-all text-sm font-medium ${
                      touched.password && errors.password
                        ? 'border-red-500/50 focus:ring-red-500/30'
                        : 'border-white/20 focus:ring-white/30'
                    }`}
                    placeholder={isRegister ? 'Create Password (min 6 chars)' : 'Password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                    }}
                    onBlur={() => handleBlur('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-2 ml-1 text-red-400 text-xs font-medium"
                  >
                    <AlertCircle size={12} />
                    {errors.password}
                  </motion.p>
                )}

                {/* Password Strength Indicator (Registration only) */}
                {isRegister && password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((level) => {
                        const strength =
                          (password.length >= 6 ? 1 : 0) +
                          (/[A-Z]/.test(password) ? 1 : 0) +
                          (/[0-9]/.test(password) ? 1 : 0) +
                          (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
                        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
                        return (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              level <= strength ? colors[strength - 1] : 'bg-white/10'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Use 6+ chars, uppercase, numbers & symbols for a strong password
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative bg-white text-black py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl border border-black/5 disabled:opacity-50 disabled:hover:scale-100"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    {isRegister ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>

            <div className="text-center pt-3 sm:pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrors({});
                  setTouched({});
                  setPassword('');
                }}
                className="text-gray-400 hover:text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors"
              >
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 sm:mt-8 flex justify-center gap-6 sm:gap-8 text-[9px] sm:text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </motion.div>
    </div>
  );
}