import React, { useMemo } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { Course } from '@/types/course';

/**
 * Component demonstrating how to get all courses from CourseProvider
 * and filter by specific categories like "Renewable Energy Courses" and "Electrical Power Courses"
 */
export const CourseCategoryFilter: React.FC = () => {
  const { 
    allCourses, 
    loading, 
    error, 
    getCoursesByCategory 
  } = useCourses();

  // Get courses by specific category slugs
  const renewableEnergyCourses = useMemo(() => {
    // Try different possible slug formats for renewable energy courses
    const possibleSlugs = [
      'renewable-energy-courses',
      'renewable-energy',
      'renewable-courses',
      'green-energy',
      'sustainable-energy'
    ];
    
    for (const slug of possibleSlugs) {
      const courses = getCoursesByCategory(slug);
      if (courses.length > 0) {
        return courses;
      }
    }
    
    // If no specific category slug found, search by category name
    return allCourses.filter(course =>
      course.categories?.some(category =>
        category.name.toLowerCase().includes('renewable') ||
        category.name.toLowerCase().includes('green energy') ||
        category.name.toLowerCase().includes('sustainable')
      )
    );
  }, [allCourses, getCoursesByCategory]);

  const electricalPowerCourses = useMemo(() => {
    // Try different possible slug formats for electrical power courses
    const possibleSlugs = [
      'electrical-power-courses',
      'electrical-power',
      'power-systems',
      'electrical-engineering',
      'power-engineering'
    ];
    
    for (const slug of possibleSlugs) {
      const courses = getCoursesByCategory(slug);
      if (courses.length > 0) {
        return courses;
      }
    }
    
    // If no specific category slug found, search by category name
    return allCourses.filter(course =>
      course.categories?.some(category =>
        category.name.toLowerCase().includes('electrical') ||
        category.name.toLowerCase().includes('power') ||
        category.name.toLowerCase().includes('electric')
      )
    );
  }, [allCourses, getCoursesByCategory]);

  // Get all unique categories from all courses
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    allCourses.forEach(course => {
      course.categories?.forEach(category => {
        categories.add(`${category.name} (${category.slug})`);
      });
    });
    return Array.from(categories).sort();
  }, [allCourses]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Loading Courses...</h2>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Courses</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Course Category Filter Example</h1>
      
      {/* Total Courses Count */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">All Courses from CourseProvider</h2>
        <p className="text-gray-700">
          Total Courses: <span className="font-bold text-blue-600">{allCourses.length}</span>
        </p>
      </div>

      {/* Renewable Energy Courses */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          Renewable Energy Courses ({renewableEnergyCourses.length})
        </h2>
        {renewableEnergyCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {renewableEnergyCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No renewable energy courses found.</p>
        )}
      </div>

      {/* Electrical Power Courses */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">
          Electrical Power Courses ({electricalPowerCourses.length})
        </h2>
        {electricalPowerCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {electricalPowerCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No electrical power courses found.</p>
        )}
      </div>

      {/* All Available Categories */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">All Available Categories</h2>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {allCategories.map((category, index) => (
            <div key={index} className="text-sm bg-white p-2 rounded border">
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Simple course card component for displaying course information
 */
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <img 
        src={course.image} 
        alt={course.name}
        className="w-full h-32 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.name}</h3>
      <p className="text-xs text-gray-600 mb-2">
        Duration: {course.duration}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-primary">
          {course.sale_price_rendered || course.price_rendered}
        </span>
        {course.on_sale && (
          <span className="text-xs line-through text-gray-500">
            {course.origin_price_rendered}
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {course.categories?.map((category) => (
          <span 
            key={category.id} 
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CourseCategoryFilter;