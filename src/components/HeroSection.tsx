import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { coursesApi } from "@/services/api";
import { Course } from "@/types/course";
import heroSolar from "@/assets/hero-solar.jpg";
import heroWind from "@/assets/hero-wind.jpg";
import heroLab from "@/assets/hero-lab.jpg";

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

  // Helper function to get courses for current slide
  const getCoursesForSlide = (slideIndex: number, count: number = 2) => {
    if (courses.length === 0) return [];

    const startIndex = (slideIndex * count) % courses.length;
    const coursesForSlide: Course[] = [];

    for (let i = 0; i < count; i++) {
      const courseIndex = (startIndex + i) % courses.length;
      coursesForSlide.push(courses[courseIndex]);
    }

    return coursesForSlide;
  };

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
          <div
            key={slide.id}
            className={`no-scrollbar absolute inset-0 transition-all duration-1000 ease-out ${isActive
              ? "translate-x-0 opacity-100 scale-100 z-10"
              : index < currentSlide
                ? "-translate-x-full opacity-100 scale-105 z-0"
                : "translate-x-full opacity-100 scale-105 z-0"
              }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center relative transition-transform duration-[1500ms] ease-out ${isActive ? "scale-100" : "scale-110"
                }`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Enhanced Overlay with animated gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/70 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-80"
                }`} />

              {/* Animated particles overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }} />
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }} />
                <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  {/* Left Side - Main Content */}
                  <div className={`text-white transition-all duration-1000 ease-out ${isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                    }`}>
                    <div className={`mb-4 transition-all duration-1000 ease-out ${isActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                      }`} style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                      <Badge className="gradient-primary text-white mb-4 hover:scale-110 transition-transform duration-300 shadow-lg">
                        Leading Renewable Energy Education
                      </Badge>
                    </div>
                    <h1 className={`text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight transition-all duration-1000 ease-out ${isActive ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                      }`} style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                      Professional Institute
                    </h1>
                    <p className={`text-lg md:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed transition-all duration-1000 ease-out ${isActive ? "translate-x-0 opacity-90" : "-translate-x-8 opacity-0"
                      }`} style={{ transitionDelay: isActive ? '600ms' : '0ms' }}>
                      {slide.subtitle}
                    </p>
                    <div className={`transition-all duration-1000 ease-out ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`} style={{ transitionDelay: isActive ? '800ms' : '0ms' }}>
                      <Button
                        size="lg"
                        className="gradient-primary text-white hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold rounded-xl shadow-hero group"
                      >
                        <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        Explore All Courses
                      </Button>
                    </div>
                  </div>

                  {/* Right Side - Featured Courses */}
                  <div className={`transition-all duration-1000 ease-out ${isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                    }`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                    <div className={`mb-4 md:mb-6 transition-all duration-1000 ease-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                      }`} style={{ transitionDelay: isActive ? '500ms' : '0ms' }}>
                      <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
                        Top Courses
                        <span className="text-sm md:text-base font-normal text-white/70 ml-2">
                          ({currentSlide + 1}/{slides.length})
                        </span>
                      </h2>
                      <p className="text-sm md:text-base text-white/80">
                        Most popular renewable energy programs
                      </p>
                    </div>

                    {loading ? (
                      <div className="flex items-center justify-center p-8">
                        <div className="relative">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                          <div className="absolute inset-0 h-8 w-8 border-2 border-white/20 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-hidden space-y-3 md:space-y-4 max-h-80 md:max-h-96 overflow-y-auto pr-2">
                        {/* Show different courses for each slide */}
                        {getCoursesForSlide(currentSlide, 2).map((course, courseIndex) => (
                          <Card
                            key={`${course.id}-${currentSlide}`}
                            className={`overflow-x-hidden bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] md:block hidden group ${coursesLoaded && isActive
                              ? "translate-x-0 opacity-100"
                              : "translate-x-8 opacity-0"
                              }`}
                            style={{
                              transitionDelay: isActive ? `${700 + courseIndex * 150}ms` : '0ms',
                            }}
                          >
                            <CardContent className="overflow-x-hidden p-3 md:p-4">
                              <div className="flex gap-3 md:gap-4">
                                <div
                                  className="w-16 md:w-20 h-12 md:h-16 bg-cover bg-center rounded-lg flex-shrink-0 overflow-hidden group-hover:scale-110 transition-transform duration-500"
                                  style={{
                                    backgroundImage: `url(${course.image || "/placeholder.svg"})`,
                                  }}
                                >
                                  <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-1">
                                    <h3 className="font-semibold text-secondary line-clamp-1 text-sm md:text-base">
                                      {course.name}
                                    </h3>
                                    {course.on_sale && (
                                      <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 ml-2 animate-pulse">
                                        Sale
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {course.categories?.slice(0, 2).map((category, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs px-1 py-0 text-primary border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                      >
                                        {category.name}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground">
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {course.duration || "Flexible"}
                                      </div>
                                      <div className="hidden md:flex items-center">
                                        <Users className="h-3 w-3 mr-1" />
                                        Online
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      {course.on_sale && course.sale_price_rendered ? (
                                        <div className="text-right">
                                          <span className="text-xs text-green-600 font-semibold">
                                            {course.sale_price_rendered}
                                          </span>
                                          <span className="text-xs text-muted-foreground line-through ml-1">
                                            {course.price_rendered}
                                          </span>
                                        </div>
                                      ) : (
                                        <span className="text-xs text-muted-foreground">
                                          {course.price_rendered || "Free"}
                                        </span>
                                      )}
                                      <Button
                                        size="sm"
                                        className="gradient-primary text-white text-xs px-2 md:px-3 py-1 h-6 md:h-7 mt-1 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group/btn"
                                      >
                                        <BookOpen className="mr-1 h-3 w-3 group-hover/btn:rotate-12 transition-transform duration-300" />
                                        <span className="hidden md:inline">
                                          Enroll Now
                                        </span>
                                        <span className="md:hidden">Enroll</span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Mobile: Show only 1 simplified card */}
                        <div className="md:hidden space-y-3">
                          {getCoursesForSlide(currentSlide, 1).map((course, courseIndex) => (
                            <Card
                              key={`mobile-${course.id}-${currentSlide}`}
                              className={`overflow-x-hidden bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group ${coursesLoaded && isActive
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                                }`}
                              style={{
                                transitionDelay: isActive ? '700ms' : '0ms',
                              }}
                            >
                              <CardContent className="overflow-x-hidden p-3">
                                <div className="flex gap-3">
                                  <div
                                    className="w-14 h-10 bg-cover bg-center rounded-lg flex-shrink-0 overflow-hidden group-hover:scale-110 transition-transform duration-500"
                                    style={{
                                      backgroundImage: `url(${course.image || "/placeholder.svg"})`,
                                    }}
                                  >
                                    <div className="w-full h-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-1">
                                      <h3 className="font-semibold text-secondary line-clamp-1 text-sm">
                                        {course.name}
                                      </h3>
                                      {course.on_sale && (
                                        <Badge className="bg-red-500 text-white text-xs px-1 py-0.5 ml-1 animate-pulse">
                                          Sale
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {course.categories?.slice(0, 1).map((category, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="outline"
                                          className="text-xs px-1 py-0 text-primary border-primary/30 hover:bg-primary/10 transition-all duration-200"
                                        >
                                          {category.name}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {course.duration || "Flexible"}
                                      </div>
                                      <div className="flex flex-col items-end">
                                        {course.on_sale && course.sale_price_rendered ? (
                                          <span className="text-xs text-green-600 font-semibold">
                                            {course.sale_price_rendered}
                                          </span>
                                        ) : (
                                          <span className="text-xs text-muted-foreground">
                                            {course.price_rendered || "Free"}
                                          </span>
                                        )}
                                        <Button
                                          size="sm"
                                          className="gradient-primary text-white text-xs px-2 py-1 h-6 mt-1 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                        >
                                          Enroll
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}



      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 group disabled:cursor-not-allowed ${index === currentSlide
              ? "w-8 h-3 bg-white"
              : "w-3 h-3 bg-white/50 hover:bg-white/70"
              }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            )}
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
};