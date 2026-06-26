'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validation';
import LanguageSelector from './LanguageSelector';
import CountrySelector from './CountrySelector';
import countries from '@/data/countries.json';

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { langue: '', pays: '' },
  });

  const langue = watch('langue');

  async function onSubmit(values: RegisterInput) {
    setServerError(null);
    try {
      const country = countries.find((c) => c.code === values.pays);
      const telephone = country
        ? `${country.dial}${values.telephone.replace(/\D/g, '')}`
        : values.telephone;

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, telephone }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Erreur lors de l\'inscription.');
      }

      setSuccess(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erreur inattendue.');
    }
  }

  if (success) {
    return (
      <div className="card text-center">
        <h2 className="font-display text-xl font-bold text-ink">Bienvenue !</h2>
        <p className="mt-2 text-sm text-gray-600">
          Votre profil a ete cree. Vous pouvez maintenant explorer l&apos;annuaire
          et, si vous le souhaitez, connecter votre compte Google.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
      <div>
        <label htmlFor="nom" className="mb-1 block text-sm font-medium text-ink">
          Nom complet
        </label>
        <input
          id="nom"
          {...register('nom')}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        {errors.nom && <p className="mt-1 text-xs text-red-600">{errors.nom.message}</p>}
      </div>

      <Controller
        control={control}
        name="langue"
        render={({ field }) => (
          <LanguageSelector
            value={field.value}
            onChange={(v) => {
              field.onChange(v);
              setValue('pays', '');
            }}
          />
        )}
      />
      {errors.langue && <p className="text-xs text-red-600">{errors.langue.message}</p>}

      <Controller
        control={control}
        name="pays"
        render={({ field }) => (
          <CountrySelector langue={langue} value={field.value} onChange={field.onChange} />
        )}
      />
      {errors.pays && <p className="text-xs text-red-600">{errors.pays.message}</p>}

      <div>
        <label htmlFor="telephone" className="mb-1 block text-sm font-medium text-ink">
          Telephone
        </label>
        <input
          id="telephone"
          type="tel"
          inputMode="numeric"
          placeholder="6 12 34 56 78"
          {...register('telephone')}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        {errors.telephone && <p className="mt-1 text-xs text-red-600">{errors.telephone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email (optionnel)
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="secteur" className="mb-1 block text-sm font-medium text-ink">
            Secteur d&apos;activite
          </label>
          <input
            id="secteur"
            {...register('secteur')}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <div>
          <label htmlFor="entreprise" className="mb-1 block text-sm font-medium text-ink">
            Entreprise
          </label>
          <input
            id="entreprise"
            {...register('entreprise')}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div className="space-y-2 pt-2">
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" {...register('acceptConditions')} className="mt-0.5" />
          J&apos;accepte les <a href="/terms" className="text-brand underline">conditions d&apos;utilisation</a>
        </label>
        {errors.acceptConditions && (
          <p className="text-xs text-red-600">{errors.acceptConditions.message}</p>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" {...register('acceptConfidentialite')} className="mt-0.5" />
          J&apos;accepte la <a href="/privacy" className="text-brand underline">politique de confidentialite</a>
        </label>
        {errors.acceptConfidentialite && (
          <p className="text-xs text-red-600">{errors.acceptConfidentialite.message}</p>
        )}
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? 'Inscription...' : 'Creer mon profil'}
      </button>
    </form>
  );
}
