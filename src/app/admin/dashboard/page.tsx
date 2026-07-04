'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first actual admin page since overview is removed
    router.replace('/admin/dashboard/categories');
  }, [router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-[#5C3D2E]">Loading...</p>
    </div>
  );
}
