import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventIntroSection from "@/components/EventIntroSection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <EventIntroSection />

      {/* Placeholder section so there's content to scroll to */}
      <section className="min-h-screen bg-[#FDF8EE] flex items-center justify-center relative">
        <div className="text-center px-8">
          <h2
            className="font-[family-name:var(--font-berkshire)] text-4xl md:text-6xl text-[#4A1235] mb-6"
          >
            The Adventure Continues&hellip;
          </h2>
          <p className="font-[family-name:var(--font-outfit)] text-lg md:text-xl text-[#1D120C]/70 max-w-2xl mx-auto">
            More wonders of the Grand Confectionery await below.
          </p>
        </div>
      </section>
    </main>
  );
}
