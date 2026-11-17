'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/api';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Невірний email або пароль.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Ліва сторона: Брендинг / Спортивна атмосфера */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 relative flex-col justify-between p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-zinc-950 to-emerald-950/20 z-0" />

        {/* Логотип */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-xl">
            T
          </div>
          <span className="text-xl font-bold tracking-wider">Triathlon Analytics</span>
        </div>

        {/* Слоган */}
        <div className="relative z-10 my-auto max-w-md">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Master&apos;s Thesis Project
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
            З поверненням до <span className="text-emerald-400">тренувального процесу</span>.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Авторизуйтесь, щоб переглянути актуальний індекс форми, графіки CTL/ATL та свіжі рекомендації до наступного старту.
          </p>
        </div>
      </div>

      {/* Права сторона: Форма входу */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-900 text-zinc-100">
        <div className="w-full max-w-md space-y-8 bg-zinc-950/60 p-8 rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-xl">

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Вхід у систему</h2>
            <p className="text-sm text-zinc-400 mt-2">
              Введіть дані вашого облікового запису
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="athlete@example.com"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/10 text-sm mt-2 disabled:opacity-50"
            >
              {loading ? 'Авторизація...' : 'Увійти'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-6">
            Ще не маєте акаунта?{' '}
            <Link href="/register" className="text-emerald-400 hover:underline font-medium">
              Зареєструватися
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}