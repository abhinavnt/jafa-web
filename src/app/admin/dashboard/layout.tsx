'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { LogOut } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F8F2EA] flex items-center justify-center">Loading...</div>;
  }

  // If we are on the login page, don't show the sidebar layout
  // (This layout is applied via layout.tsx, but we can structure it carefully)

  return (
    <div className="h-screen bg-[#F8F2EA] flex flex-col relative">
      {/* Top Navbar */}
      <div className="h-16 bg-[#1A110D] text-white px-6 flex justify-between items-center shrink-0 border-b border-white/10 relative z-10">
        <h1 className="font-lora text-xl tracking-wide">JAFA <span className="text-[#8C7A6B]">Admin</span></h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#DCD0C3] hidden md:inline-block">{user?.email}</span>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 bg-[#8B3A2B] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#6A2A1F] transition-colors"
          >
            <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </div>

      {/* Custom Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-sm w-full mx-4 border border-[#DCD0C3]">
            <h3 className="text-xl font-bold text-[#2A1A12] mb-2">Confirm Logout</h3>
            <p className="text-[#5C3D2E] text-sm mb-8">
              Are you sure you want to log out of the admin panel?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded text-sm font-bold tracking-wider text-[#2A1A12] bg-[#F8F2EA] hover:bg-[#EBE2D5] transition-colors"
              >
                CANCEL
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 rounded text-sm font-bold tracking-wider text-white bg-[#8B3A2B] hover:bg-[#6A2A1F] transition-colors"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
