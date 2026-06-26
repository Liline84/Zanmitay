import { ShieldCheck, MousePointerClick, Lock } from 'lucide-react';

const POINTS = [
  {
    icon: MousePointerClick,
    title: 'Pourquoi connecter Google ?',
    text:
      'Pour ajouter, en un clic, une connexion que vous avez deja acceptee directement dans vos contacts Google personnels — sans ressaisir le numero.',
  },
  {
    icon: ShieldCheck,
    title: 'Quels contacts sont concernes ?',
    text:
      'Uniquement ceux que vous choisissez, un par un, parmi vos connexions acceptees. Aucun ajout automatique ou groupe.',
  },
  {
    icon: Lock,
    title: 'Autorisations demandees',
    text:
      'Le scope "contacts" de Google, utilise uniquement au moment ou vous cliquez sur "Ajouter a mes contacts Google". Vos identifiants sont chiffres et jamais partages.',
  },
];

export default function GoogleSection() {
  return (
    <section id="google-sync" className="bg-muted py-24">
      <div className="container-page">
        <h2 className="font-display text-3xl font-bold text-ink">Synchronisation Google</h2>
        <p className="mt-3 max-w-2xl text-gray-600">
          Global Contact Sync ne pousse jamais de numero dans vos contacts sans
          votre action directe. Voici precisement ce qui se passe.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card">
              <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        <a href="/api/auth/google" className="btn-primary mt-10 inline-flex">
          Connecter mon compte Google
        </a>
      </div>
    </section>
  );
}
