import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = { title: 'Politique de confidentialite' };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container-page max-w-2xl py-16">
        <h1 className="font-display text-3xl font-bold text-ink">Politique de confidentialite</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-600">
          <p>
            En creant un profil sur Global Contact Sync, vous acceptez ce qui suit :
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              Nous stockons les donnees necessaires au fonctionnement du
              service (nom, telephone, langue, pays, et les champs
              professionnels optionnels que vous renseignez).
            </li>
            <li>
              Votre telephone n&apos;apparait jamais dans les resultats de
              recherche de l&apos;annuaire. Il n&apos;est partage avec un
              autre utilisateur qu&apos;apres une demande de mise en contact
              que vous avez explicitement acceptee — jamais automatiquement,
              jamais par lot.
            </li>
            <li>
              Si vous connectez votre compte Google, cet acces sert
              uniquement a ajouter, a votre initiative et un par un, des
              connexions deja acceptees a vos contacts Google. Nous ne lisons
              ni ne modifions vos contacts existants.
            </li>
            <li>Vous pouvez supprimer definitivement votre compte a tout moment depuis le tableau de bord.</li>
            <li>Vous pouvez demander la suppression de vos donnees a tout moment en nous contactant.</li>
          </ul>
          <p>
            Pour toute question relative a vos donnees personnelles,
            contactez-nous a l&apos;adresse indiquee dans les conditions
            d&apos;utilisation.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
