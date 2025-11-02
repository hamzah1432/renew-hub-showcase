import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenu } from "./MobileMenu";
import { courseCategories } from "@/data/navigationData";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const category = "renewable-energy/";


  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const renewableEnergyCourses = courseCategories["Renewable Energy Courses"];
  const electricalPowerCourses = courseCategories["Electrical Power Courses"];
  const webinars = courseCategories["Webinars"];
  const workshops = courseCategories["workshops"];
  
  const selectedCourses = {
    "Renewable Energy Courses": renewableEnergyCourses,
    "Electrical Power Courses": electricalPowerCourses,
    "Webinars": webinars,
    "Workshops": workshops,
  };


  return (
    <header
      className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-card'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <Navigation 
            isScrolled={isScrolled} 
            scrollToSection={scrollToSection}
            selectedCourses={selectedCourses}
          />

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <Button className="gradient-primary text-white hover:scale-105 transition-transform">
              Login
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            isScrolled={isScrolled}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
        selectedCourses={selectedCourses}
      />
    </header>
  );
};
