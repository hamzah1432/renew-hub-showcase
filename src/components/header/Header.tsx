import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenu } from "./MobileMenu";
import { courseCategories } from "@/data/navigationData";
import { useCourseCategories } from "@/hooks/useCourseCategories";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get course categories from CourseProvider
  const {
    allCourses,
    renewableEnergyCourses,
    electricalPowerCourses,
    loading
  } = useCourseCategories();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Create mobile course data same as Navigation component
  const selectedCourses = React.useMemo(() => {
    // Static categories (Webinars and Workshops) at the end
    const staticCategories = {
      'webinars': courseCategories["Webinars"],
      'workshops': courseCategories["workshops"]
    };

    if (loading || allCourses.length === 0) {
      // If still loading, return dynamic categories first, then static
      return {
        'renewable-energy': {
          name: 'Renewable Energy Courses',
          courses: courseCategories["Renewable Energy Courses"]?.courses || []
        },
        'electrical-power': {
          name: 'Electrical Power Courses', 
          courses: courseCategories["Electrical Power Courses"]?.courses || []
        },
        ...staticCategories
      };
    }

    // Dynamic categories first, then static categories at the end
    return {
      'renewable-energy': {
        name: 'Renewable Energy Courses',
        courses: renewableEnergyCourses.length > 0 
          ? renewableEnergyCourses.map(course => ({
              name: course.name,
              href: course.link || '#'
            }))
          : courseCategories["Renewable Energy Courses"]?.courses || []
      },
      'electrical-power': {
        name: 'Electrical Power Courses',
        courses: electricalPowerCourses.length > 0
          ? electricalPowerCourses.map(course => ({
              name: course.name,
              href: course.link || '#'
            }))
          : courseCategories["Electrical Power Courses"]?.courses || []
      },
      ...staticCategories
    };
  }, [loading, allCourses, renewableEnergyCourses, electricalPowerCourses]);


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
