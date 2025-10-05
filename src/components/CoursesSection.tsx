import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { coursesApi } from "@/services/api";
import { Course, InternalCourse, CourseCategory } from "@/types/course";
import {
  BookOpen,
  Globe,
  Loader2,
} from "lucide-react";

// Extended course type for internal use with API categories
type ExtendedInternalCourse = InternalCourse & { apiCategories: CourseCategory[] };

// Function to convert API Course to InternalCourse
const mapApiCourseToInternal = (apiCourse: Course): ExtendedInternalCourse => {
  // Determine language based on English Courses category
  const hasEnglishCategory = apiCourse.categories?.some(cat => 
    cat.slug === 'english-courses' || cat.name.toLowerCase().includes('english')
  );
  const language = hasEnglishCategory ? 'English' : 'Arabic';

  // Determine package based on category names containing package words
  const packageNames = ["Bronze", "Silver", "Gold", "Diamond"];
  let packageType = "Standard"; // Default package
  
  for (const pkg of packageNames) {
    if (apiCourse.categories?.some(cat => 
      cat.slug.toLowerCase().includes(pkg.toLowerCase()) || 
      cat.name.toLowerCase().includes(pkg.toLowerCase())
    )) {
      packageType = pkg;
      break;
    }
  }

  return {
    id: apiCourse.id,
    title: apiCourse.name,
    description: apiCourse.name, // API doesn't provide description, using name as fallback
    duration: apiCourse.duration || "Not specified",
    language: language,
    level: "All Levels", // Default since API doesn't provide this
    package: packageType,
    category: apiCourse.categories?.[0]?.name || "General", // Use first category name or default
    price: apiCourse.origin_price_rendered || apiCourse.price_rendered || "$0.00",
    discountPrice: apiCourse.on_sale ? apiCourse.sale_price_rendered : apiCourse.price_rendered,
    lectures: 1, // Default since API doesn't provide this
    capacity: 100, // Default since API doesn't provide this
    currentStudents: 0, // Default since API doesn't provide this
    instructor: {
      name: apiCourse.instructor?.name || "Unknown Instructor",
      avatar: apiCourse.instructor?.avatar || "/placeholder.svg",
    },
    image: apiCourse.image || "/placeholder.svg",
    onSale: apiCourse.on_sale,
    apiCategories: apiCourse.categories, // Preserve original categories for filtering
  };
};

export const CoursesSection = () => {
  const [courses, setCourses] = useState<ExtendedInternalCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [displayedCoursesCount, setDisplayedCoursesCount] = useState(3);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        
        setLoading(true);
        const fetchedCourses = await coursesApi.getCourses();
        // Filter courses to only include those with "home-page-courses" category
        const homePageCourses = fetchedCourses.filter(course => 
          course.categories && course.categories.some(category => 
            category.slug === 'home-page-courses'
          )
        );
        const mappedCourses = homePageCourses.map(mapApiCourseToInternal);
        setCourses(mappedCourses);
        setError(null);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }

    };

    fetchCourses();
  }, []);

  // Reset displayed courses count when filters change
  useEffect(() => {
    setDisplayedCoursesCount(3);
  }, [languageFilter, packageFilter, categoryFilter]);

  const filteredCourses = courses.filter((course) => {
    // Language filtering - if not "English Courses" category, it's Arabic
    const hasEnglishCategory = course.apiCategories?.some(cat => 
      cat.slug === 'english-courses' || cat.name.toLowerCase().includes('english')
    );
    const courseLanguage = hasEnglishCategory ? 'English' : 'Arabic';
    const languageMatch = languageFilter === "All" || courseLanguage === languageFilter;

    // Package filtering - based on package names in categories
    const packageNames = ["Bronze", "Silver", "Gold", "Diamond"];
    let coursePackage = "Standard"; // Default
    
    for (const pkg of packageNames) {
      if (course.apiCategories?.some(cat => 
        cat.slug.toLowerCase().includes(pkg.toLowerCase()) || 
        cat.name.toLowerCase().includes(pkg.toLowerCase())
      )) {
        coursePackage = pkg;
        break;
      }
    }
    
    const packageMatch = packageFilter === "All" || coursePackage === packageFilter;

    // Category filtering - based on actual API categories
    let categoryMatch = categoryFilter === "All";
    if (!categoryMatch) {
      if (categoryFilter === "Renewable Energy") {
        categoryMatch = course.apiCategories?.some(cat => 
          cat.slug.includes('renewable') || cat.name.toLowerCase().includes('renewable')
        ) || false;
      } else if (categoryFilter === "Electrical Power") {
        categoryMatch = course.apiCategories?.some(cat => 
          cat.slug.includes('electrical') || cat.name.toLowerCase().includes('electrical')
        ) || false;
      }
    }

    return languageMatch && packageMatch && categoryMatch;
  });

  const displayedCourses = filteredCourses.slice(0, displayedCoursesCount);
  const hasMoreCourses = filteredCourses.length > displayedCoursesCount;

  const handleViewMore = () => {
    setDisplayedCoursesCount((prev) => prev + 3);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Our Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive renewable energy engineering programs designed by
            industry experts to prepare you for a sustainable future career.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading courses...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Courses Content */}
        {!loading && !error && courses.length > 0 && (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 mb-8 lg:mb-12 animate-fade-up">
          {/* Category Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Category:
            </span>
            {["All", "Renewable Energy", "Electrical Power"].map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "ghost"}
                onClick={() => setCategoryFilter(category)}
                className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${
                  categoryFilter === category
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                {category === "Renewable Energy"
                  ? "Renewable"
                  : category === "Electrical Power"
                  ? "Electrical"
                  : category}
              </Button>
            ))}
          </div>

          {/* Language Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Language:
            </span>
            {["All", "English", "Arabic"].map((lang) => (
              <Button
                key={lang}
                variant={languageFilter === lang ? "default" : "ghost"}
                onClick={() => setLanguageFilter(lang)}
                className={`px-3 lg:px-6 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm ${
                  languageFilter === lang
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                <Globe className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                {lang}
              </Button>
            ))}
          </div>

          {/* Package Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Package:
            </span>
            {["All", "Bronze", "Silver", "Gold", "Diamond"].map((pkg) => (
              <Button
                key={pkg}
                variant={packageFilter === pkg ? "default" : "ghost"}
                onClick={() => setPackageFilter(pkg)}
                className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${
                  packageFilter === pkg
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                {pkg}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
          {displayedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View More Button */}
        {hasMoreCourses && (
          <div className="text-center mt-12 animate-fade-up">
            <Button
              onClick={handleViewMore}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              View More Courses
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
        </>
        )}

        {/* Empty State */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};