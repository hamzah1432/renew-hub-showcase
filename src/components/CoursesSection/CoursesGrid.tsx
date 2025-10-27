import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { BookOpen } from "lucide-react";
import { InternalCourse, CourseCategory } from "@/types/course";

// Extended course type for internal use with API categories
type ExtendedInternalCourse = InternalCourse & { apiCategories: CourseCategory[] };

interface CoursesGridProps {
  displayedCourses: ExtendedInternalCourse[];
  hasMoreCourses: boolean;
  onViewMore: () => void;
}

export const CoursesGrid = ({
  displayedCourses,
  hasMoreCourses,
  onViewMore,
}: CoursesGridProps) => {
  return (
    <>
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
            onClick={onViewMore}
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
  );
};