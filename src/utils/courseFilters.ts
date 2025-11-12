import { Course } from '@/types/course';

/**
 * Utility functions for course filtering and categorization
 */

/**
 * Get all courses from the CourseProvider context
 * Usage: const allCourses = getAllCourses(coursesFromContext);
 */
export const getAllCourses = (courses: Course[]): Course[] => {
  return courses || [];
};

/**
 * Filter courses by Renewable Energy category
 * Searches both category slugs and names for renewable energy related terms
 */
export const getRenewableEnergyCourses = (courses: Course[]): Course[] => {
  if (!courses || courses.length === 0) return [];

  return courses.filter(course =>
    course.categories?.some(category => {
      const categoryName = category.name.toLowerCase();
      const categorySlug = category.slug.toLowerCase();
      
      // Check for renewable energy keywords
      const renewableKeywords = [
        'renewable',
        'solar',
        'wind',
        'green energy',
        'sustainable',
        'clean energy',
        'photovoltaic',
        'solar panel',
        'wind turbine',
        'geothermal',
        'hydroelectric',
        'biomass'
      ];
      
      return renewableKeywords.some(keyword =>
        categoryName.includes(keyword) || categorySlug.includes(keyword.replace(' ', '-'))
      );
    })
  );
};

/**
 * Filter courses by Electrical Power category
 * Searches both category slugs and names for electrical power related terms
 */
export const getElectricalPowerCourses = (courses: Course[]): Course[] => {
  if (!courses || courses.length === 0) return [];

  return courses.filter(course =>
    course.categories?.some(category => {
      const categoryName = category.name.toLowerCase();
      const categorySlug = category.slug.toLowerCase();
      
      // Check for electrical power keywords
      const powerKeywords = [
        'electrical',
        'power',
        'electric',
        'engineering',
        'systems',
        'generation',
        'distribution',
        'transmission',
        'grid',
        'circuit',
        'motor',
        'generator',
        'transformer',
        'automation'
      ];
      
      return powerKeywords.some(keyword =>
        categoryName.includes(keyword) || categorySlug.includes(keyword.replace(' ', '-'))
      );
    })
  );
};

/**
 * Get courses by custom category search terms
 * @param courses - Array of courses to filter
 * @param searchTerms - Array of terms to search for in category names and slugs
 */
export const getCoursesByCustomCategory = (courses: Course[], searchTerms: string[]): Course[] => {
  if (!courses || courses.length === 0 || !searchTerms || searchTerms.length === 0) return [];

  return courses.filter(course =>
    course.categories?.some(category => {
      const categoryName = category.name.toLowerCase();
      const categorySlug = category.slug.toLowerCase();
      
      return searchTerms.some(term =>
        categoryName.includes(term.toLowerCase()) || 
        categorySlug.includes(term.toLowerCase().replace(' ', '-'))
      );
    })
  );
};

/**
 * Get all unique categories from courses
 */
export const getAllCategories = (courses: Course[]) => {
  if (!courses || courses.length === 0) return [];

  const categoryMap = new Map();
  
  courses.forEach(course => {
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
};

/**
 * Search courses by name or description
 */
export const searchCoursesByName = (courses: Course[], searchTerm: string): Course[] => {
  if (!courses || courses.length === 0 || !searchTerm) return [];

  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return courses.filter(course =>
    course.name.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Get course statistics
 */
export const getCourseStats = (courses: Course[]) => {
  const renewableEnergy = getRenewableEnergyCourses(courses);
  const electricalPower = getElectricalPowerCourses(courses);
  const categories = getAllCategories(courses);

  return {
    totalCourses: courses.length,
    renewableEnergyCount: renewableEnergy.length,
    electricalPowerCount: electricalPower.length,
    totalCategories: categories.length,
    onSaleCourses: courses.filter(course => course.on_sale).length,
    freeCourses: courses.filter(course => course.price === 0).length
  };
};

/**
 * Example usage with CourseProvider:
 * 
 * import { useCourses } from '@/contexts/CourseContext';
 * import { 
 *   getAllCourses, 
 *   getRenewableEnergyCourses, 
 *   getElectricalPowerCourses 
 * } from '@/utils/courseFilters';
 * 
 * function MyComponent() {
 *   const { allCourses } = useCourses();
 *   
 *   const allCoursesData = getAllCourses(allCourses);
 *   const renewableCourses = getRenewableEnergyCourses(allCourses);
 *   const electricalCourses = getElectricalPowerCourses(allCourses);
 *   
 *   return (
 *     <div>
 *       <h1>Total: {allCoursesData.length}</h1>
 *       <h2>Renewable: {renewableCourses.length}</h2>
 *       <h2>Electrical: {electricalCourses.length}</h2>
 *     </div>
 *   );
 * }
 */