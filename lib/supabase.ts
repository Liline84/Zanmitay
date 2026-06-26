import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Client cote NAVIGATEUR : cle anon uniquement, jamais la service role key.
export function getBrowserSupabase(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Client cote SERVEUR (routes /api uniquement) : service role key, contourne
// la RLS. Ne JAMAIS importer ce fichier depuis un composant client.
let serverClient: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (serverClient) return serverClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Variables Supabase manquantes (URL ou SERVICE_ROLE_KEY).');
  }

  serverClient = createClient(url, key, { auth: { persistSession: false } });
  return serverClient;
}
