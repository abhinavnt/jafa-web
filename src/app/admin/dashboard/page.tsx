'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { shopProducts, giftProducts, eventsData } from '@/lib/mockData';
import { Database, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleMigrateData = async () => {
    if (!confirm('This will insert all mock data into the Supabase database. Continue?')) return;
    
    setMigrating(true);
    setMigrationStatus('Migrating Products...');

    try {
      const allProducts = [...shopProducts.map(p => ({...p, type: 'dates_nuts'})), ...giftProducts.map(p => ({...p, type: 'gifts'}))];
      
      // Migrate Products
      for (const product of allProducts) {
        const { error } = await supabase.from('products').insert({
          title: product.title,
          category: product.category,
          description: product.description || null,
          price: product.price || null,
          original_price: product.originalPrice || null,
          image: product.image,
          hover_image: product.hoverImage || null,
          is_new: product.isNew || false,
          status: product.status || 'In Stock',
          type: product.type
        });
        
        if (error) {
          console.error("Error migrating product:", error);
          throw error;
        }
      }

      setMigrationStatus('Migrating Events...');

      // Migrate Events
      for (const event of eventsData) {
        const { error } = await supabase.from('events').insert({
          title: event.title,
          category: event.category,
          image: event.image
        });

        if (error) {
          console.error("Error migrating event:", error);
          throw error;
        }
      }

      setMigrationStatus('Migration Complete! All mock data is now in Supabase.');
    } catch (err: any) {
      setMigrationStatus(`Error during migration: ${err.message}`);
    } finally {
      setMigrating(false);
    }
  };

  if (loading) return null; // Handled by layout

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#2A1A12] mb-8">Dashboard Overview</h2>

      {/* Temporary Data Migration Card */}
      <div className="bg-white p-6 rounded-xl border border-[#DCD0C3] shadow-sm max-w-lg">
        <div className="flex items-center gap-3 text-[#8B3A2B] mb-4">
          <Database size={24} />
          <h3 className="text-lg font-bold text-[#2A1A12]">Database Setup</h3>
        </div>
        <p className="text-[#5C3D2E] text-sm mb-6">
          Push all your existing mock data (Products, Gifts, Events) into your new Supabase live database. You only need to do this once!
        </p>
        
        <button 
          onClick={handleMigrateData}
          disabled={migrating || migrationStatus?.includes('Complete')}
          className="w-full bg-[#2A1A12] text-white py-3 rounded font-bold uppercase tracking-widest text-sm hover:bg-[#4A2C11] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {migrating ? 'Migrating Data...' : migrationStatus?.includes('Complete') ? <><CheckCircle size={16} /> Data Migrated</> : 'Migrate Mock Data to Supabase'}
        </button>

        {migrationStatus && (
          <div className={`mt-4 p-3 rounded text-sm ${migrationStatus.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
            {migrationStatus}
          </div>
        )}
      </div>

    </div>
  );
}
