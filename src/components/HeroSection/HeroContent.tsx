import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroContentProps {
  slide: {
    subtitle: string;
    discount?: number;
    categorySlug?: string;
  };
  isActive: boolean;
}

export const HeroContent = ({ slide, isActive }: HeroContentProps) => {
  return (
    <div
      className={`text-white transition-all duration-1000 ease-out ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        className={`mb-4 transition-all duration-1000 ease-out ${
          isActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
      >

      </div>
      <h1
        className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-5 lg:mb-6 leading-tight transition-all duration-1000 ease-out ${
          isActive ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "400ms" : "0ms" }}
      >
        Professional Institute
      </h1>
      <p
        className={`text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-7 lg:mb-8 opacity-90 leading-relaxed transition-all duration-1000 ease-out ${
          isActive ? "translate-x-0 opacity-90" : "-translate-x-8 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "600ms" : "0ms" }}
      >
        {slide.subtitle}
      </p>
      <div
        className={`transition-all duration-1000 ease-out ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "800ms" : "0ms" }}
      >
        <Button
          size="lg"
          className="gradient-primary text-white hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 px-6 md:px-7 lg:px-8 py-3 md:py-4 lg:py-5 xl:py-6 text-sm md:text-base lg:text-lg font-semibold rounded-xl shadow-hero group"
          onClick={() => {
            if (slide.discount) {
              // Navigate to courses page with discount filter
              window.location.href = `/#courses?discount=${slide.discount}`;
            } else {
              // Navigate to all courses
              window.location.href = '/#courses';
            }
          }}
        >
          <ArrowRight className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
          {slide.discount ? `View ${slide.discount}% Off Courses` : 'Explore All Courses'}
        </Button>
      </div>
    </div>
  );
};
