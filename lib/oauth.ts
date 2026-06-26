import { google } from 'googleapis';

export function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

// Scope volontairement limite : on n'a besoin d'ECRIRE un contact a la fois
// (ajout manuel d'une connexion deja acceptee), jamais de lecture/ecriture en masse.
export const GOOGLE_CONTACTS_SCOPE = 'https://www.googleapis.com/auth/contacts';

export function buildGoogleAuthUrl(state: string) {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [GOOGLE_CONTACTS_SCOPE],
    state,
  });
}
