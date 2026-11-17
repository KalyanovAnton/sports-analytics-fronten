'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnalyticsResponse } from '@/types/analytics';
import { calculateAnalytics, CalculateRequestDto } from '@/services/api';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Перевірка наявності токена при завантаженні сторінки
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const testPayload: CalculateRequestDto = {
      userProfile: {
        age: 30,
        weightKg: 75,
      },
      workouts: [
        {
          date: '2026-10-01',
          durationSeconds: 7200,
          avgHeartRate: 155,
          maxHeartRate: 175,
        },
        {
          date: '2026-10-02',
          durationSeconds: 5400,
          avgHeartRate: 150,
          maxHeartRate: 170,
        },
        {
          date: '2026-10-03',
          durationSeconds: 10800,
          avgHeartRate: 160,
          maxHeartRate: 180,
        },
        {
          date: '2026-10-04',
          durationSeconds: 7200,
          avgHeartRate: 155,
          maxHeartRate: 178,
        },
        {
          date: '2026-10-05',
          durationSeconds: 14400,
          avgHeartRate: 165,
          maxHeartRate: 185,
        },
        {
          date: '2026-10-06',
          durationSeconds: 7200,
          avgHeartRate: 155,
          maxHeartRate: 175,
        },
        {
          date: '2026-10-07',
          durationSeconds: 5400,
          avgHeartRate: 150,
          maxHeartRate: 170,
        },
        {
          date: '2026-10-08',
          durationSeconds: 10800,
          avgHeartRate: 160,
          maxHeartRate: 180,
        },
        {
          date: '2026-10-09',
          durationSeconds: 7200,
          avgHeartRate: 155,
          maxHeartRate: 178,
        },
        {
          date: '2026-10-10',
          durationSeconds: 14400,
          avgHeartRate: 165,
          maxHeartRate: 185,
        },
      ],
    };

    calculateAnalytics(testPayload)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div className="p-10 text-white bg-slate-950 min-h-screen">Завантаження даних з бекенду (NestJS)...</div>;
  if (error) return <div className="p-10 text-red-400 bg-slate-950 min-h-screen">Помилка звязку з бекендом: {error}. Переконайся, що NestJS запущено на порту 5000.</div>;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-400">
              Triathlon Readiness Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Звязок Next.js та NestJS успішно працює!</p>
          </div>
          
          {/* Кнопка виходу з акаунта */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.replace('/login');
            }}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-xl text-sm font-medium transition-colors"
          >
            Вийти
          </button>
        </header>

        {data && data.readiness && (
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-200">Результат аналізу готовності</h2>
            
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <span className="text-sm text-slate-400">Статус</span>
                <p className="text-xl font-semibold text-indigo-300 mt-1">{data.readiness.status}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <span className="text-sm text-slate-400">Рівень готовності</span>
                <p className="text-xl font-semibold text-green-400 mt-1">{data.readiness.readinessPercentage}%</p>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl">
              <span className="text-sm text-slate-400">Рекомендація</span>
              <p className="text-slate-200 mt-1">{data.readiness.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}