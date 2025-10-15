import { useState, useEffect } from "react";
import { coursesApi } from "@/services/api";
import { Course } from "@/types/course";
import heroSolar from "@/assets/hero-solar.jpg";
import heroWind from "@/assets/hero-wind.jpg";
import heroLab from "@/assets/hero-lab.jpg";
import { HeroSlide } from "./HeroSlide";
import { HeroContent } from "./HeroContent";
import { FeaturedCourses } from "./FeaturedCourses";
import { HeroNavigation } from "./HeroNavigation";

const slides = [
  {
    id: 1,
    image: heroSolar,
    title: "Master Solar Energy Engineering",
    subtitle:
      "Comprehensive courses in photovoltaic systems and solar technology",
  },
  {
    id: 2,
    image: heroWind,
    title: "Wind Energy Solutions",
    subtitle: "Advanced training in wind turbine design and implementation",
  },
  {
    id: 3,
    image: heroLab,
    title: "Green Technology Innovation",
    subtitle: "Hands-on experience with cutting-edge renewable energy systems",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [coursesLoaded, setCoursesLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await coursesApi.getCourses();
        // Filter courses to only include those with "home-page-courses" category for featured display
        const homePageCourses = fetchedCourses.filter(course =>
          course.categories && course.categories.some(category =>
            category.slug === 'home-page-courses'
          )
        );
        setCourses(homePageCourses.slice(0, 6)); // Limit to 6 courses for hero section
        // Delay to show smooth animation
        setTimeout(() => setCoursesLoaded(true), 300);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setCourses([]); // Set empty array on error
        setCoursesLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <section className=" relative h-screen overflow-hidden">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Side - Main Content */}
              <HeroContent slide={slide} isActive={isActive} />

              {/* Right Side - Featured Courses */}
              <FeaturedCourses
                courses={courses}
                currentSlide={currentSlide}
                loading={loading}
                isActive={isActive}
                coursesLoaded={coursesLoaded}
              />
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
