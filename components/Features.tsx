import { Languages, ShieldCheck, Users, Search } from 'lucide-react';

const FEATURES = [
  {
    icon: Languages,
    title: 'Filtre par langue et pays',
    description:
      'Affinez votre reseau : tous les pays parlant votre langue, ou uniquement le votre.',
  },
  {
    icon: Search,
    title: 'Annuaire professionnel',
    description: 'Recherchez par pays, langue ou secteur d\'activite en quelques clics.',
  },
  {
    icon: ShieldCheck,
    title: 'Consentement mutuel',
    description:
      'Aucune coordonnee n\'est partagee sans l\'accord explicite des deux personnes concernees.',
  },
  {
    icon: Users,
    title: 'Communautes & associations',
    description: 'Pense pour les groupes linguistiques, la diaspora et les reseaux communautaires.',
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="bg-muted py-24">
      <div className="container-page">
        <h2 className="font-display text-3xl font-bold text-ink">Fonctionnalites</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
