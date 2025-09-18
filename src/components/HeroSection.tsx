import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroSolar from "@/assets/hero-solar.jpg";
import heroWind from "@/assets/hero-wind.jpg";
import heroLab from "@/assets/hero-lab.jpg";

const slides = [
  {
    id: 1,
    image: heroSolar,
    title: "Master Solar Energy Engineering",
    subtitle: "Comprehensive courses in photovoltaic systems and solar technology"
  },
  {
    id: 2,
    image: heroWind,
    title: "Wind Energy Solutions", 
    subtitle: "Advanced training in wind turbine design and implementation"
  },
  {
    id: 3,
    image: heroLab,
    title: "Green Technology Innovation",
    subtitle: "Hands-on experience with cutting-edge renewable energy systems"
  }
];

const featuredCourses = [
  {
    id: 1,
    title: "Solar Panel Installation & Maintenance",
    description: "Master photovoltaic systems and installation techniques",
    duration: "12 weeks",
    students: "150+",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Wind Turbine Engineering",
    description: "Advanced wind turbine design and grid integration",
    duration: "16 weeks", 
    students: "120+",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Energy Storage Systems",
    description: "Battery technologies and energy management systems",
    duration: "10 weeks",
    students: "90+", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/70" />
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Left Side - Main Content */}
                <div className="text-white animate-fade-up">
                  <div className="mb-4">
                    <Badge className="gradient-primary text-white mb-4">
                      Leading Renewable Energy Education
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Professional Institute
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <Button 
                    size="lg" 
                    className="gradient-primary text-white hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg font-semibold rounded-xl shadow-hero"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Explore All Courses
                  </Button>
                </div>

                {/* Right Side - Featured Courses */}
                <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Top Courses
                    </h2>
                    <p className="text-white/80">
                      Most popular renewable energy programs
                    </p>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {featuredCourses.map((course, courseIndex) => (
                      <Card 
                        key={course.id}
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        style={{ animationDelay: `${0.3 + courseIndex * 0.1}s` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div 
                              className="w-20 h-16 bg-cover bg-center rounded-lg flex-shrink-0"
                              style={{ backgroundImage: `url(${course.image})` }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-secondary mb-1 line-clamp-1">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {course.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {course.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {course.students}
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="gradient-primary text-white text-xs px-3 py-1 h-7"
                                >
                                  <BookOpen className="mr-1 h-3 w-3" />
                                  Enroll Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/80 backdrop-blur-md text-secondary hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/80 backdrop-blur-md text-secondary hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};