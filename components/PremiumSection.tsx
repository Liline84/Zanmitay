import Link from 'next/link';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Gratuit',
    price: '0€',
    features: ['100 connexions maximum', 'Recherche basique dans l\'annuaire', 'Mise en contact a consentement mutuel'],
    cta: 'Commencer gratuitement',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 'Sur devis',
    features: [
      'Connexions illimitees',
      'Recherche avancee (multi-criteres)',
      'Visibilite prioritaire dans l\'annuaire',
      'Statistiques avancees',
      'Export CSV de vos connexions',
    ],
    cta: 'Decouvrir Premium',
    href: '/premium',
    highlight: true,
  },
];

export default function PremiumSection() {
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <h2 className="font-display text-3xl font-bold text-ink">Des plans simples</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card ${plan.highlight ? 'border-brand ring-1 ring-brand' : ''}`}
            >
              <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
              <p className="mt-1 text-2xl font-bold text-brand">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={plan.highlight ? 'btn-primary mt-8 w-full' : 'btn-secondary mt-8 w-full'}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
