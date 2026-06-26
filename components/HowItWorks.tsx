const STEPS = [
  { n: '01', title: 'Inscrivez-vous', text: 'Nom, telephone, langue et pays.' },
  { n: '02', title: 'Explorez l\'annuaire', text: 'Filtrez par pays, langue ou secteur.' },
  { n: '03', title: 'Demandez une mise en contact', text: 'Une invitation est envoyee a la personne choisie.' },
  { n: '04', title: 'Echangez en confiance', text: 'Le telephone n\'est partage qu\'apres acceptation mutuelle.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="container-page">
        <h2 className="font-display text-3xl font-bold text-ink">Comment ca marche</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="font-display text-3xl font-bold text-brand/30">{s.n}</span>
              <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
