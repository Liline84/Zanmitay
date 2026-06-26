-- Global Contact Sync — schema.sql
-- A executer dans l'editeur SQL Supabase.
--
-- Choix d'architecture : on utilise auth.users (Supabase Auth) plutot qu'une
-- table "users" maison -> gestion des mots de passe/sessions deja securisee.
-- "profiles" etend auth.users avec les champs metier.
--
-- Le telephone n'est JAMAIS expose par une lecture directe cote client :
-- toutes les requetes de recherche/annuaire passent par des routes API
-- server-side (service role key), qui choisissent explicitement les colonnes
-- renvoyees. Le telephone n'est inclus que pour une connexion "accepted".

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nom text not null,
  telephone text not null,
  email text,
  langue text not null,
  pays text not null,
  secteur text,
  entreprise text,
  description text,
  premium boolean not null default false,
  google_connected boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_langue_pays on profiles (langue, pays);
create index if not exists idx_profiles_secteur on profiles (secteur);

-- Un seul jeu de tokens Google par profil (le profil connecte SON propre compte).
create table if not exists google_tokens (
  profile_id uuid primary key references profiles (id) on delete cascade,
  refresh_token text not null,
  access_token text,
  access_token_expiry timestamptz,
  google_email text,
  updated_at timestamptz not null default now()
);

-- Remplace "contacts" + "sync_queue" : un modele a consentement mutuel.
-- statut : pending | accepted | declined
create table if not exists connections (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references profiles (id) on delete cascade,
  recipient_id uuid not null references profiles (id) on delete cascade,
  statut text not null default 'pending',
  message text,
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  constraint no_self_connection check (requester_id <> recipient_id),
  constraint unique_pair unique (requester_id, recipient_id)
);

create index if not exists idx_connections_recipient on connections (recipient_id, statut);
create index if not exists idx_connections_requester on connections (requester_id, statut);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  plan text not null default 'gratuit', -- gratuit | premium
  statut text not null default 'active',
  created_at timestamptz not null default now()
);

create unique index if not exists idx_subscriptions_profile on subscriptions (profile_id);
