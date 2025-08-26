import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CoursesSection } from "@/components/CoursesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TeamSection } from "@/components/TeamSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Footer } from "@/components/Footer";

const Index = () => {
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
        
        <FeedbackSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
