'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Перевіряємо localStorage
  const [isAuthorized] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.replace('/');
        return true;
      }
    }
    return false;
  });

  if (isAuthorized) {
    return null;
  }

  return <>{children}</>;
}