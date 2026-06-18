'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F2EA] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#DCD0C3]">
        <div className="bg-[#2A1A12] py-6 px-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-[#F8F2EA] rounded-full flex items-center justify-center mb-3">
            <Lock size={20} className="text-[#8B3A2B]" />
          </div>
          <h2 className="text-white text-2xl font-lora">JAFA Admin Login</h2>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-6 border border-red-100">
              {error}
            </div>
          )}
          
          <div className="mb-5">
            <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] text-[#2A1A12]"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-[#5C3D2E] text-xs font-bold uppercase tracking-wider mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F2EA] border border-[#DCD0C3] rounded focus:outline-none focus:border-[#8B3A2B] text-[#2A1A12]"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#8B3A2B] text-white font-bold py-4 rounded uppercase tracking-widest text-sm hover:bg-[#6A2A1F] transition-colors disabled:opacity-70"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
