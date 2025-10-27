import { useState, useEffect } from "react";
import { coursesApi } from "@/services/api";
import { Course, InternalCourse, CourseCategory } from "@/types/course";
import { FilterTabs } from "./FilterTabs";
import { CoursesGrid } from "./CoursesGrid";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

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
    <>
      {/* Full Screen Loading State */}
      {loading && <LoadingState />}

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          {!loading && (
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                Our Courses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive renewable energy engineering programs designed by
                industry experts to prepare you for a sustainable future career.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && <ErrorState error={error} />}

          {/* Courses Content */}
          {!loading && !error && courses.length > 0 && (
            <>
              {/* Filter Tabs */}
              <FilterTabs
                languageFilter={languageFilter}
                packageFilter={packageFilter}
                categoryFilter={categoryFilter}
                setLanguageFilter={setLanguageFilter}
                setPackageFilter={setPackageFilter}
                setCategoryFilter={setCategoryFilter}
              />

              {/* Courses Grid */}
              <CoursesGrid
                displayedCourses={displayedCourses}
                hasMoreCourses={hasMoreCourses}
                onViewMore={handleViewMore}
              />
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
    </>
  );
};