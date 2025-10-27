import { Header } from "@/components/Header";
import { CoursesSection } from "@/components/CoursesSection/CoursesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TeamSection } from "@/components/TeamSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { LastNewsSection } from "@/components/LastNewsSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="courses">
          <CoursesSection />
        </section>
        
        <section id="about">
          <FeaturesSection />
        </section>
        
        <section id="team">
          <TeamSection />
        </section>
        
        <ClientsSection />
        
        <section id="news">
          <LastNewsSection />
        </section>
        
        <FeedbackSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
