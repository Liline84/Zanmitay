const FAQS = [
  {
    q: 'Mon numero est-il visible par tout le monde ?',
    a: 'Non. L\'annuaire affiche votre nom, votre entreprise, votre pays et votre secteur. Votre telephone n\'est jamais visible publiquement et n\'est partage qu\'apres acceptation mutuelle d\'une demande de mise en contact.',
  },
  {
    q: 'Que se passe-t-il quand je connecte mon compte Google ?',
    a: 'Rien ne se passe automatiquement. La connexion vous permet seulement, plus tard, d\'ajouter une connexion deja acceptee a vos contacts Google en un clic.',
  },
  {
    q: 'Puis-je supprimer mon compte ?',
    a: 'Oui, a tout moment depuis votre tableau de bord. Vos donnees sont supprimees definitivement.',
  },
  {
    q: 'Quelle est la difference entre le plan Gratuit et Premium ?',
    a: 'Le plan Gratuit limite le nombre de connexions actives et la recherche. Premium debloque les connexions illimitees, la recherche avancee et les statistiques.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-muted py-24">
      <div className="container-page max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-ink">Questions frequentes</h2>
        <div className="mt-8 divide-y divide-gray-200">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-semibold text-ink">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
