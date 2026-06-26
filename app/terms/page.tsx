import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = { title: 'Conditions d\'utilisation' };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="container-page max-w-2xl py-16">
        <h1 className="font-display text-3xl font-bold text-ink">Conditions d&apos;utilisation</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
          <p>En utilisant Global Contact Sync, vous vous engagez a :</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fournir des informations exactes.</li>
            <li>Ne pas utiliser la plateforme pour envoyer du spam ou des messages non sollicites.</li>
            <li>Respecter les lois de votre pays.</li>
            <li>Ne pas exploiter les donnees des autres utilisateurs a des fins commerciales non autorisees, ni les reexporter ou les revendre.</li>
            <li>N&apos;envoyer une demande de mise en contact que dans une intention legitime.</li>
          </ul>

          <p>L&apos;editeur se reserve le droit de :</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Suspendre un compte en cas d&apos;usage abusif (spam, harcelement, demandes de mise en contact massives ou automatisees).</li>
            <li>Limiter le nombre de demandes envoyees par periode.</li>
            <li>Modifier les fonctionnalites du plan Premium.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
