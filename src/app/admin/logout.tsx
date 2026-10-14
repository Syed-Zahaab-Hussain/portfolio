"use client";
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
const button = 'rounded bg-violet-600 px-4 py-2 font-semibold text-white';
export function Logout() {
  const router = useRouter();
  return (
    <button
      className={button}
      onClick={async () => {
        await authClient.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
