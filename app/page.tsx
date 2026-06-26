import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import GoogleSection from '@/components/GoogleSection';
import PremiumSection from '@/components/PremiumSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <GoogleSection />
        <PremiumSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
