import { CoursesSection } from "@/components/CoursesSection/CoursesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TeamSection } from "@/components/TeamSection";
import { ClientsSection } from "@/components/ClientsSection";
import { FeedbackSection } from "@/components/FeedbackSection";
import { LastNewsSection } from "@/components/LastNewsSection";
import { ExcelMaterialsSection } from "@/components/ExcelMaterialsSection";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CourseProvider } from "@/contexts/CourseContext";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="react-home-page">

      <CourseProvider>
        <div className="min-h-screen">
          {/* <Header /> */}
          <main>
            <section id="home">
              <HeroSection />
            </section>

            <section id="courses">
              <CoursesSection />
            </section>

            <section id="excel-materials">
              <ExcelMaterialsSection />
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

          {/* <Footer /> */}
        </div>
      </CourseProvider>
    </div>

  );
};

export default App;
