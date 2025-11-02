import { useState, useEffect } from "react";
import { useCourses } from "@/contexts/CourseContext";
import { Course } from "@/types/course";
import heroSolar from "@/assets/hero-solar.jpg";
import heroWind from "@/assets/hero-wind.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import { HeroSlide } from "./HeroSlide";
import { HeroContent } from "./HeroContent";
import { FeaturedCourses } from "./FeaturedCourses";
import { HeroNavigation } from "./HeroNavigation";
import { SpecialFeatures } from "./SpecialFeatures";

const slides = [
  {
    id: 1,
    image: heroWind,
    title: "Discount Courses",
    subtitle: "Explore top courses currently available at 80% discount",
    categorySlug: "first-banner",
    discount: 80,
  },
  {
    id: 2,
    image: heroSolar,
    title: "Master Solar Energy Engineering",
    subtitle:
      "Comprehensive courses in photovoltaic systems at 60% discount",
    categorySlug: "second-banner",
    discount: 60,
  },
  {
    id: 3,
    image: heroLab,
    title: "Green Technology Innovation",
    subtitle: "Hands-on experience with cutting-edge renewable energy systems",
    categorySlug: "special-features",
  },
];

export const HeroSection = () => {
  const { getCoursesByDiscount, getCoursesByCategory, loading } = useCourses();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstBannerCourses, setFirstBannerCourses] = useState<Course[]>([]);
  const [secondBannerCourses, setSecondBannerCourses] = useState<Course[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coursesLoaded, setCoursesLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 80000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Process courses from context when they're available
  useEffect(() => {
    if (!loading) {
      // Try to get courses with 80% discount, fallback to category
      let firstBanner = getCoursesByDiscount(80);
      if (firstBanner.length === 0) {
        firstBanner = getCoursesByCategory('first-banner');
      }
      
      // Try to get courses with 60% discount, fallback to category
      let secondBanner = getCoursesByDiscount(60);
      if (secondBanner.length === 0) {
        secondBanner = getCoursesByCategory('second-banner');
      }
      
      setFirstBannerCourses(firstBanner);
      setSecondBannerCourses(secondBanner);
      
      // Delay to show smooth animation
      setTimeout(() => setCoursesLoaded(true), 300);
    }
  }, [loading, getCoursesByDiscount, getCoursesByCategory]);

  // Get courses for current slide
  const getCoursesForCurrentSlide = () => {
    switch (currentSlide) {
      case 0:
        return firstBannerCourses;
      case 1:
        return secondBannerCourses;
      default:
        return [];
    }
  };

  // Helper function to handle slide changes with animation
  const changeSlide = (newIndex: number) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index: number) => changeSlide(index);

  return (
    <section className="relative min-h-screen h-auto lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={isActive}
            index={index}
            currentSlide={currentSlide}
          >
            <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center w-full">
              {/* Left Side - Main Content */}
              <HeroContent slide={slide} isActive={isActive} />

              {/* Right Side - Content based on slide */}
              {slide.categorySlug === "special-features" ? (
                <SpecialFeatures
                  isActive={isActive}
                  currentSlide={currentSlide}
                />
              ) : (
                <FeaturedCourses
                  courses={getCoursesForCurrentSlide()}
                  currentSlide={currentSlide}
                  loading={loading}
                  isActive={isActive}
                  coursesLoaded={coursesLoaded}
                  slideCategory={slide.categorySlug}
                  discount={slide.discount}
                />
              )}
            </div>
          </HeroSlide>
        );
      })}

      {/* Enhanced Dots Indicator */}
      <HeroNavigation
        slides={slides}
        currentSlide={currentSlide}
        isAnimating={isAnimating}
        goToSlide={goToSlide}
      />
    </section>
  );
};
