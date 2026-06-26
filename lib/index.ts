export type Plan = 'gratuit' | 'premium';
export type ConnectionStatus = 'pending' | 'accepted' | 'declined';

export interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
  languages: string[];
}

export interface Language {
  code: string;
  label: string;
}

// Profil complet — usage interne / serveur uniquement.
export interface Profile {
  id: string;
  nom: string;
  telephone: string;
  email?: string | null;
  langue: string;
  pays: string;
  secteur?: string | null;
  entreprise?: string | null;
  description?: string | null;
  premium: boolean;
  google_connected: boolean;
  created_at: string;
}

// Vue publique d'un profil dans l'annuaire — JAMAIS de telephone ici.
export type DirectoryEntry = Pick<
  Profile,
  'id' | 'nom' | 'entreprise' | 'pays' | 'langue' | 'secteur' | 'premium'
>;

export interface ConnectionRequest {
  id: string;
  requester_id: string;
  recipient_id: string;
  statut: ConnectionStatus;
  message?: string | null;
  created_at: string;
  responded_at?: string | null;
}
