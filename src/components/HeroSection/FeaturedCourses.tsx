import { BookOpen, Clock, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/course";

interface FeaturedCoursesProps {
  courses: Course[];
  currentSlide: number;
  loading: boolean;
  isActive: boolean;
  coursesLoaded: boolean;
}

export const FeaturedCourses = ({
  courses,
  currentSlide,
  loading,
  isActive,
  coursesLoaded,
}: FeaturedCoursesProps) => {
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

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: isActive ? "300ms" : "0ms" }}
    >
      <div
        className={`mb-4 md:mb-6 transition-all duration-1000 ease-out ${
          isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "500ms" : "0ms" }}
      >
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
          Top Courses
          <span className="text-sm md:text-base font-normal text-white/70 ml-2">
            ({currentSlide + 1}/3)
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
          {/* Desktop: Show 2 courses */}
          {getCoursesForSlide(currentSlide, 2).map((course, courseIndex) => (
            <Card
              key={`${course.id}-${currentSlide}`}
              className={`overflow-x-hidden bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] md:block hidden group ${
                coursesLoaded && isActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isActive ? `${700 + courseIndex * 150}ms` : "0ms",
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
                          <span className="hidden md:inline">Enroll Now</span>
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
                className={`overflow-x-hidden bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group ${
                  coursesLoaded && isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isActive ? "700ms" : "0ms",
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
  );
};
