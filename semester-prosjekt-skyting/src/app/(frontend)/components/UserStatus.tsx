'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
};

export default function UserStatus() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/users/me', {
        credentials: 'include',
        cache: 'no-store',
      });

      const data = await res.json();

      setUser(data.user || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    window.addEventListener('focus', fetchUser);

    return () => {
      window.removeEventListener('focus', fetchUser);
    };
  }, []);

  const handleLogout = async () => {
    await fetch('/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setUser(null);
  };

  if (!user) {
    return <p>Ikke innlogget</p>;
  }

  return (
    <div>
      <p>Innlogget som: {user.email}</p>

      <button onClick={handleLogout}>
        Logg ut
      </button>
    </div>
  );
}