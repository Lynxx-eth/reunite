import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SearchBrowse from "@/components/SearchBrowse";
import ExploreSection from "@/components/ExploreSection";
import HowItWorks from "@/components/HowItWorks";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="relative">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SearchBrowse />
        <ExploreSection />
        <HowItWorks />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
