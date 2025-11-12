import { useMemo } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { Course } from '@/types/course';

/**
 * Custom hook that provides easy access to all courses and specific category filters
 * for Renewable Energy and Electrical Power courses
 */
export const useCourseCategories = () => {
  const { 
    allCourses, 
    loading, 
    error, 
    getCoursesByCategory,
    refetchCourses 
  } = useCourses();

  // Get Renewable Energy Courses
  const renewableEnergyCourses = useMemo(() => {
    // Try common slug patterns for renewable energy courses
    const possibleSlugs = [
      'renewable-energy-courses',
      'renewable-energy',
      'renewable-courses',
      'green-energy',
      'sustainable-energy',
      'solar-energy',
      'wind-energy'
    ];
    
    // First try to find by exact category slug
    for (const slug of possibleSlugs) {
      const courses = getCoursesByCategory(slug);
      if (courses.length > 0) {
      
        return courses;
      }
    }
    
    // If no specific slug found, search by category name containing keywords
    const filteredCourses = allCourses.filter(course =>
      course.categories?.some(category => {
        const categoryName = category.name.toLowerCase();
        return (
          categoryName.includes('renewable') ||
          categoryName.includes('green energy') ||
          categoryName.includes('sustainable') ||
          categoryName.includes('solar') ||
          categoryName.includes('wind energy') ||
          categoryName.includes('clean energy')
        );
      })
    );
    
    return filteredCourses;
  }, [allCourses, getCoursesByCategory]);

  // Get Electrical Power Courses
  const electricalPowerCourses = useMemo(() => {
    // Try common slug patterns for electrical power courses
    const possibleSlugs = [
      'electrical-power-courses',
      'electrical-power',
      'power-systems',
      'electrical-engineering',
      'power-engineering',
      'electrical-systems',
      'power-generation'
    ];
    
    // First try to find by exact category slug
    for (const slug of possibleSlugs) {
      const courses = getCoursesByCategory(slug);
      if (courses.length > 0) {
        return courses;
      }
    }
    
    // If no specific slug found, search by category name containing keywords
    const filteredCourses = allCourses.filter(course =>
      course.categories?.some(category => {
        const categoryName = category.name.toLowerCase();
        return (
          categoryName.includes('electrical') ||
          categoryName.includes('power') ||
          categoryName.includes('electric') ||
          categoryName.includes('engineering') ||
          categoryName.includes('systems') ||
          categoryName.includes('generation')
        );
      })
    );
    
    return filteredCourses;
  }, [allCourses, getCoursesByCategory]);

  // Get all available categories for debugging/reference
  const allCategories = useMemo(() => {
    const categoryMap = new Map();
    allCourses.forEach(course => {
      course.categories?.forEach(category => {
        if (!categoryMap.has(category.slug)) {
          categoryMap.set(category.slug, {
            id: category.id,
            name: category.name,
            slug: category.slug,
            count: 0
          });
        }
        categoryMap.get(category.slug).count++;
      });
    });
    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  }, [allCourses]);

  // Helper function to get courses by any category
  const getCoursesByAnyCategory = (categorySearchTerms: string[]) => {
    return allCourses.filter(course =>
      course.categories?.some(category =>
        categorySearchTerms.some(term =>
          category.name.toLowerCase().includes(term.toLowerCase()) ||
          category.slug.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  };

  // Helper function to search courses by name
  const searchCoursesByName = (searchTerm: string) => {
    return allCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    // Core course data
    allCourses,
    loading,
    error,
    refetchCourses,
    
    // Specific category filters
    renewableEnergyCourses,
    electricalPowerCourses,
    
    // All available categories
    allCategories,
    
    // Helper functions
    getCoursesByCategory,
    getCoursesByAnyCategory,
    searchCoursesByName,
    
    // Statistics
    stats: {
      totalCourses: allCourses.length,
      renewableEnergyCount: renewableEnergyCourses.length,
      electricalPowerCount: electricalPowerCourses.length,
      totalCategories: allCategories.length
    }
  };
};

/**
 * Helper function to log all available categories (useful for debugging)
 */
export const logAllCategories = (courses: Course[]) => {
  const categories = new Set<string>();
  courses.forEach(course => {
    course.categories?.forEach(category => {
      categories.add(`${category.name} (${category.slug})`);
    });
  });
  
  Array.from(categories).sort().forEach(category => {
  });
  
  return Array.from(categories);
};

export default useCourseCategories;