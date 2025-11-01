import { useState, useEffect } from "react";
import { useCourses } from "@/contexts/CourseContext";
import { Course, InternalCourse, CourseCategory } from "@/types/course";
import { FilterTabs } from "./FilterTabs";
import { CoursesGrid } from "./CoursesGrid";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

// Helper functions to reduce code duplication
const getLanguageFromCategories = (categories: CourseCategory[] = []): string => {
  return categories.some(cat => 
    cat.slug === 'english-courses' || cat.name.toLowerCase().includes('english')
  ) ? 'English' : 'Arabic';
};

const getPackageFromCategories = (categories: CourseCategory[] = []): string => {
  const packageNames = ["Bronze", "Silver", "Gold", "Diamond"];
  
  for (const pkg of packageNames) {
    if (categories.some(cat => 
      cat.slug.toLowerCase().includes(pkg.toLowerCase()) || 
      cat.name.toLowerCase().includes(pkg.toLowerCase())
    )) {
      return pkg;
    }
  }
  return "Standard";
};

const getCategoryMatch = (categories: CourseCategory[] = [], filter: string): boolean => {
  if (filter === "All") return true;
  
  const filterMap: Record<string, string[]> = {
    "Renewable Energy": ['renewable'],
    "Electrical Power": ['electrical']
  };
  
  const keywords = filterMap[filter];
  if (!keywords) return false;
  
  return categories.some(cat => 
    keywords.some(keyword => 
      cat.slug.includes(keyword) || cat.name.toLowerCase().includes(keyword)
    )
  );
};

// Extended course type for internal use with API categories
type ExtendedInternalCourse = InternalCourse & { categories: CourseCategory[] };

// Function to convert API Course to InternalCourse
const mapApiCourseToInternal = (apiCourse: Course): ExtendedInternalCourse => {
  const language = getLanguageFromCategories(apiCourse.categories);
  const packageType = getPackageFromCategories(apiCourse.categories);

  return {
    id: apiCourse.id,
    title: apiCourse.name,
    description: apiCourse.name,
    duration: apiCourse.duration || "Not specified",
    language,
    level: "All Levels",
    package: packageType,
    category: apiCourse.categories?.[0]?.name || "General",
    price: apiCourse.origin_price_rendered || apiCourse.price_rendered || "$0.00",
    discountPrice: apiCourse.on_sale ? apiCourse.sale_price_rendered : apiCourse.price_rendered,
    lectures: 1,
    capacity: 100,
    currentStudents: 0,
    instructor: {
      name: apiCourse.instructor?.name || "Unknown Instructor",
      avatar: apiCourse.instructor?.avatar || "/placeholder.svg",
    },
    image: apiCourse.image || "/placeholder.svg",
    onSale: apiCourse.on_sale,
    categories: apiCourse.categories || [],
  };
};

export const CoursesSection = () => {
  const { getHomePageCourses, loading, error } = useCourses();
  const [courses, setCourses] = useState<ExtendedInternalCourse[]>([]);
  const [languageFilter, setLanguageFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [displayedCoursesCount, setDisplayedCoursesCount] = useState(3);

  // Process courses from context when they're available
  useEffect(() => {
    if (!loading) {
      const homePageCourses = getHomePageCourses();
      const mappedCourses = homePageCourses.map(mapApiCourseToInternal);
      setCourses(mappedCourses);
    }
  }, [loading, getHomePageCourses]);

  // Reset displayed courses count when filters change
  useEffect(() => {
    setDisplayedCoursesCount(3);
  }, [languageFilter, packageFilter, categoryFilter]);

  const filteredCourses = courses.filter((course) => {
    const languageMatch = languageFilter === "All" || course.language === languageFilter;
    const packageMatch = packageFilter === "All" || course.package === packageFilter;
    const categoryMatch = getCategoryMatch(course.categories, categoryFilter);

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