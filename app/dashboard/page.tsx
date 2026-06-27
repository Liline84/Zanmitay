'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DirectorySearch from '@/components/DirectorySearch';
import { getBrowserSupabase } from '@/lib/supabase';

interface DashboardData {
  profile: {
    nom: string;
    pays: string;
    langue: string;
    entreprise: string | null;
    premium: boolean;
  };
  stats: { demandesRecues: number; connexionsAcceptees: number };
  pending: Array<{ id: string; requester: { nom: string; entreprise: string | null } }>;
  accepted: Array<{ id: string; nom: string; entreprise: string | null; telephone: string }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [autoSync, setAutoSync] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ───────────────────────────────
  // LOAD DATA
  // ───────────────────────────────
  useEffect(() => {
    (async () => {
      const supabase = getBrowserSupabase();
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) setData(await res.json());
      setLoading(false);
    })();
  }, [router]);

  // ───────────────────────────────
  // SYNC FUNCTION
  // ───────────────────────────────
  async function runSync() {
    const supabase = getBrowserSupabase();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const res = await fetch('/api/sync/google', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error('Sync error');
    }
  }

  // ───────────────────────────────
  // AUTO SYNC TOGGLE
  // ───────────────────────────────
  useEffect(() => {
    if (autoSync) {
      // run immédiat
      runSync();

      // puis toutes les 60 min
      intervalRef.current = setInterval(() => {
        runSync();
      }, 60 * 60 * 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoSync]);

  // ───────────────────────────────
  async function respond(connectionId: string, decision: 'accepted' | 'declined') {
    const supabase = getBrowserSupabase();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    await fetch('/api/connections/respond', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ connectionId, decision }),
    });

    setData((prev) =>
      prev && {
        ...prev,
        pending: prev.pending.filter((p) => p.id !== connectionId),
      }
    );
  }

  async function addToGoogle(connectionId: string) {
    const supabase = getBrowserSupabase();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const res = await fetch('/api/contacts/google-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ connectionId }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      alert(body.error || 'Erreur Google');
    }
  }

  // ───────────────────────────────
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container-page py-16 text-gray-500">Chargement...</main>
        <Footer />
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      <Navbar />

      <main className="container-page space-y-10 py-12">

        {/* ───── SYNC CONTROL ───── */}
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
          <div>
            <p className="font-semibold text-ink">Synchronisation automatique</p>
            <p className="text-sm text-gray-500">
              Lance une sync toutes les 60 minutes
            </p>
          </div>

          <button
            onClick={() => setAutoSync((v) => !v)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              autoSync ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {autoSync ? 'Activée' : 'Désactivée'}
          </button>
        </div>

        {/* ───── STATS ───── */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="card">
            <p className="text-xs font-semibold uppercase text-gray-400">Profil</p>
            <p className="mt-2 font-semibold text-ink">{data.profile.nom}</p>
            <p className="text-sm text-gray-500">{data.profile.entreprise}</p>
          </div>

          <div className="card">
            <p className="text-xs font-semibold uppercase text-gray-400">Demandes</p>
            <p className="mt-2 text-3xl font-bold text-ink">{data.stats.demandesRecues}</p>
          </div>

          <div className="card">
            <p className="text-xs font-semibold uppercase text-gray-400">Connexions</p>
            <p className="mt-2 text-3xl font-bold text-ink">{data.stats.connexionsAcceptees}</p>
          </div>
        </div>

        {/* ───── RESTE IDENTIQUE ───── */}
        {data.pending.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-ink">Demandes en attente</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.pending.map((p) => (
                <div key={p.id} className="card flex justify-between">
                  <div>
                    <p className="font-semibold text-ink">{p.requester.nom}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => respond(p.id, 'accepted')} className="btn-primary text-xs">
                      Accepter
                    </button>
                    <button onClick={() => respond(p.id, 'declined')} className="btn-secondary text-xs">
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.accepted.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-ink">Connexions</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.accepted.map((c) => (
                <div key={c.id} className="card flex justify-between">
                  <p className="font-semibold text-ink">{c.nom}</p>
                  <button onClick={() => addToGoogle(c.id)} className="btn-secondary text-xs">
                    Google
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display text-xl font-bold text-ink">Annuaire</h2>
          <DirectorySearch />
        </section>

      </main>

      <Footer />
    </>
  );
}
