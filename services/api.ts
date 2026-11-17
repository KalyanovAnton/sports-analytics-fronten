import { AnalyticsResponse } from '../types/analytics';

const API_BASE_URL = 'http://localhost:5000';

export interface WorkoutInput {
  date: string;
  durationSeconds: number;
  avgHeartRate: number;
  maxHeartRate: number;
}

export interface UserProfileInput {
  age: number;
  weightKg: number;
}

export interface CalculateRequestDto {
  workouts: WorkoutInput[];
  userProfile: UserProfileInput;
}

export interface RegisterDto {
  email: string;
  password: string;
  age: number;
  weightKg: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export async function calculateAnalytics(payload: CalculateRequestDto): Promise<AnalyticsResponse> {
  const res = await fetch(`${API_BASE_URL}/analytics/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Помилка при розрахунку аналітики на бекенді');
  }

  const jsonResponse = await res.json();
  
  return {
    readiness: jsonResponse.readinessAssessment,
    metrics: jsonResponse.data,
  };
}


export async function registerUser(data: RegisterDto) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error(jsonResponse.message || 'Помилка при реєстрації');
  }

  return jsonResponse;
}

export async function loginUser(data: LoginDto) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error(jsonResponse.message || 'Невірний email або пароль');
  }

  return jsonResponse;
}