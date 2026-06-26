-- policies.sql
-- L'essentiel des acces sensibles passe par les routes /api (service role,
-- qui contourne RLS) avec une selection de colonnes explicite cote serveur.
-- Ces policies couvrent l'usage direct du client Supabase (cote navigateur)
-- avec la cle anon, en filet de securite.

alter table profiles enable row level security;
alter table google_tokens enable row level security;
alter table connections enable row level security;
alter table subscriptions enable row level security;

-- Un utilisateur peut lire/modifier uniquement SON propre profil via le client anon.
-- (La recherche dans l'annuaire ne passe PAS par ce chemin : elle passe par
-- /api/directory/search, en service role, qui ne renvoie jamais le telephone.)
create policy "profiles_self_select" on profiles
  for select using (auth.uid() = id);

create policy "profiles_self_update" on profiles
  for update using (auth.uid() = id);

create policy "profiles_self_insert" on profiles
  for insert with check (auth.uid() = id);

-- google_tokens : jamais accessible depuis le client anon.
create policy "google_tokens_no_anon_access" on google_tokens
  for all using (false);

-- connections : un utilisateur voit les demandes ou il est implique.
create policy "connections_involved_select" on connections
  for select using (auth.uid() = requester_id or auth.uid() = recipient_id);

create policy "connections_requester_insert" on connections
  for insert with check (auth.uid() = requester_id);

create policy "connections_recipient_update" on connections
  for update using (auth.uid() = recipient_id);

create policy "subscriptions_self_select" on subscriptions
  for select using (auth.uid() = profile_id);
