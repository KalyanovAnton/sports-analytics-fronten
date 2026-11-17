'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/services/api';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    weightKg: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

try {
      // Викликаємо наш сервіс та конвертуємо числові поля в number
      await registerUser({
        email: formData.email,
        password: formData.password,
        age: Number(formData.age),
        weightKg: Number(formData.weightKg),
      });

      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Помилка реєстрації. Перевірте введені дані.';
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
        
        {/* Логотип / Назва проєкту */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-xl">
            T
          </div>
          <span className="text-xl font-bold tracking-wider">Triathlon Analytics</span>
        </div>

        {/* Слоган та опис */}
        <div className="relative z-10 my-auto max-w-md">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full border border-emerald-500/20">
            Masters Thesis Project
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Шлях до повного <span className="text-emerald-400">IRONMAN</span> починається з даних.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Прогнозуйте тренувальний стрес, контролюйте індекси фітнесу та втоми за моделлю Баністера та виходьте на пік форми без перетренованості.
          </p>
        </div>

        {/* Футер лівої частини */}
        <div className="relative z-10 text-xs text-zinc-500">
          © 2026 Full-Stack Triathlon Analytics System.
        </div>
      </div>

      {/* Права сторона: Форма реєстрації */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-zinc-900 text-zinc-100">
        <div className="w-full max-w-md space-y-8 bg-zinc-950/60 p-8 rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-xl">
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Реєстрація акаунта</h2>
            <p className="text-sm text-zinc-400 mt-2">
              Введіть свої дані для персоналізованого розрахунку навантажень
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  Вік (років)
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  Вага (кг)
                </label>
                <input
                  type="number"
                  name="weightKg"
                  required
                  value={formData.weightKg}
                  onChange={handleChange}
                  placeholder="75"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/10 text-sm mt-2 disabled:opacity-50"
            >
              {loading ? 'Створення акаунта...' : 'Зареєструватися'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-6">
            Вже маєте акаунт?{' '}
            <Link href="/login" className="text-emerald-400 hover:underline font-medium">
              Увійти
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}