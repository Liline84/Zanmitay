import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-10 text-sm text-gray-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Global Contact Sync. Tous droits reserves.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-ink">Confidentialite</Link>
          <Link href="/terms" className="hover:text-ink">Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
