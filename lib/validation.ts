import { z } from 'zod';

// Format E.164 : + suivi de 8 a 15 chiffres.
const E164_REGEX = /^\+[1-9]\d{7,14}$/;

export const registerSchema = z.object({
  nom: z.string().trim().min(2, 'Nom trop court').max(120),
  telephone: z
    .string()
    .trim()
    .regex(E164_REGEX, 'Numero invalide (format attendu : +indicatif puis numero)'),
  email: z.string().trim().email('Email invalide').optional().or(z.literal('')),
  langue: z.string().min(2),
  pays: z.string().min(2),
  secteur: z.string().trim().max(120).optional().or(z.literal('')),
  entreprise: z.string().trim().max(120).optional().or(z.literal('')),
  description: z.string().trim().max(500).optional().or(z.literal('')),
  acceptConditions: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions.' }),
  }),
  acceptConfidentialite: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialite.' }),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const directorySearchSchema = z.object({
  pays: z.string().optional(),
  langue: z.string().optional(),
  secteur: z.string().optional(),
  page: z.number().int().min(1).default(1),
});

export const connectionRequestSchema = z.object({
  recipientId: z.string().uuid(),
  message: z.string().trim().max(300).optional(),
});

export const connectionRespondSchema = z.object({
  connectionId: z.string().uuid(),
  decision: z.enum(['accepted', 'declined']),
});
