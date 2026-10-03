import type { Metadata } from "next";
import GsapInitializer from "@/components/GsapInitializer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventIntroSection from "@/components/EventIntroSection";
import InventingRoomsSection from "@/components/InventingRoomsSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import FactoryFooter from "@/components/FactoryFooter";

export const metadata: Metadata = {
  title: "Mega Event | Secure Your Golden Ticket",
  description: "Enter the factory, explore the inventing rooms, and secure your golden ticket to the Mega Event.",
};

export default function Home() {
  return (
    <>
      {/* Handles global GSAP plugin registration and smooth scrolling */}
      <GsapInitializer />

      {/* 
        Master Orchestrator Wrapper 
        - overflow-x-hidden: Prevents 3D tilt and GSAP pipe animations from causing horizontal scroll bugs
        - bg-[#FDF8EE]: Global parchment base color
      */}
      <main className="relative w-full overflow-x-hidden bg-[#FDF8EE]">
        
        {/* Z-Index Management: Navbar must sit above all gates and content */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Section 1: Hero & Gates */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 2: 3D Ticket & Manifesto */}
        <div id="ticket">
          <EventIntroSection />
        </div>

        {/* Section 3: The Pipe Network & Event Chambers */}
        <div id="events">
          <InventingRoomsSection />
        </div>

        {/* Section 4: The Enrollment Machine */}
        <div id="register">
          <EnrollmentSection />
        </div>

        {/* Section 5: The Candy-Meter Leaderboard & Factory Footer */}
        <div id="leaderboard">
          <LeaderboardSection />
        </div>

        <FactoryFooter />
      </main>
    </>
  );
}
