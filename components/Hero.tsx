import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 80% -10%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-12 py-24 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            Reseau professionnel international
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Connectez-vous avec des professionnels du monde entier.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Trouvez des contacts qui partagent votre langue ou votre pays, et
            mettez-vous en relation en toute confiance — chaque echange de
            coordonnees se fait avec l&apos;accord explicite des deux parties.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="btn-primary">
              Commencer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="#google-sync" className="btn-secondary">
              Connexion Google
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="card flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Apercu de l&apos;annuaire
            </p>
            {[
              { nom: 'M. Dorisme', entreprise: 'Atelier Creole Design', pays: '🇭🇹 Haiti', secteur: 'Design' },
              { nom: 'C. Laurent', entreprise: 'Nordique Conseil', pays: '🇨🇦 Canada', secteur: 'Conseil' },
              { nom: 'A. Fontaine', entreprise: 'Lumiere Marketing', pays: '🇫🇷 France', secteur: 'Marketing' },
            ].map((p) => (
              <div key={p.nom} className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div>
                  <p className="font-semibold text-ink">{p.nom}</p>
                  <p className="text-sm text-gray-500">{p.entreprise} · {p.secteur}</p>
                </div>
                <span className="text-sm text-gray-500">{p.pays}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
