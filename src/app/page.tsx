'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlashlightIntro from '@/components/FlashlightIntro';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BriefingGrid from '@/components/BriefingGrid';
import TrapLinks from '@/components/TrapLinks';
import TrapModal from '@/components/TrapModal';
import EvasiveButton from '@/components/EvasiveButton';
import OperationProtocol from '@/components/OperationProtocol';
import RulesOfEngagement from '@/components/RulesOfEngagement';
import FieldOperatives from '@/components/FieldOperatives';
import Footer from '@/components/Footer';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [trapModalOpen, setTrapModalOpen] = useState(false);
  const [mainDegaussFinished, setMainDegaussFinished] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => {
      setMainDegaussFinished(true);
    }, 1000);
  };

  return (
    <>
      {/* ── Flashlight Intro Overlay ──────────────────────── */}
      <AnimatePresence>
        {!introComplete && (
          <FlashlightIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className={!introComplete ? 'opacity-0 pointer-events-none' : mainDegaussFinished ? 'opacity-100' : 'degauss'}>
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <Hero />

          {/* Lore teaser */}
          <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto text-center mt-10">
            <p className="font-mono text-sm md:text-base text-[#00FF41] opacity-80 leading-loose">
              &gt; INTEL_BRIEF: This operation was designed by the Crypt Syndicate to test your instincts and critical thinking. No prior computer science knowledge is required. Your only weapon is attention to detail.
            </p>
          </section>

          {/* Trap links scattered */}
          <section className="py-8 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <TrapLinks onTrapClick={() => setTrapModalOpen(true)} />
            </div>
          </section>

          {/* Evasive button */}
          <section className="py-8 px-4 md:px-8 max-w-2xl mx-auto">
            <EvasiveButton />
          </section>

          {/* Mission Dossier / Briefing Grid */}
          <BriefingGrid />

          {/* Operation Protocol */}
          <OperationProtocol />

          {/* Rules */}
          <RulesOfEngagement />
          
          {/* Field Operatives / POCs */}
          <FieldOperatives />
        </main>

        <Footer />
      </div>

      {/* ── Modals ────────────────────────────────────────── */}
      <AnimatePresence>
        {trapModalOpen && (
          <TrapModal isOpen={trapModalOpen} onClose={() => setTrapModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
