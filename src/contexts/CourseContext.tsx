import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/types/course';
import { coursesApi } from '@/services/api';

interface CourseContextType {
  allCourses: Course[];
  loading: boolean;
  error: string | null;
  // Helper functions for filtered course data
  getHomePageCourses: () => Course[];
  getFirstBannerCourses: () => Course[];
  getSecondBannerCourses: () => Course[];
  getCoursesByCategory: (categorySlug: string) => Course[];
  getCoursesByDiscount: (discountPercentage: number) => Course[];
  refetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const courses = await coursesApi.getCourses();
      setAllCourses(courses);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      setAllCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Helper function to get courses by category slug
  const getCoursesByCategory = (categorySlug: string) => {
    return allCourses.filter(course =>
      course.categories?.some(category => category.slug === categorySlug)
    );
  };

  // Specific helper functions using the generic one
  const getHomePageCourses = () => getCoursesByCategory('home-page-courses');
  const getFirstBannerCourses = () => getCoursesByCategory('first-banner');
  const getSecondBannerCourses = () => getCoursesByCategory('second-banner');

  // Helper function to calculate discount percentage and filter courses
  const getCoursesByDiscount = (discountPercentage: number) => {
    return allCourses.filter(course => {
      // Only consider courses that are on sale
      if (!course.on_sale) return false;

      // Parse origin price and sale price
      const originPrice = parseFloat(course.origin_price);
      const salePrice = course.sale_price;

      // Validate prices
      if (isNaN(originPrice) || originPrice <= 0 || salePrice <= 0) return false;

      // Calculate actual discount percentage
      const actualDiscount = ((originPrice - salePrice) / originPrice) * 100;

      // Check if actual discount is within ±1% of target discount
      return Math.abs(actualDiscount - discountPercentage) <= 1;
    });
  };

  const refetchCourses = async () => {
    await fetchCourses();
  };

  const value: CourseContextType = {
    allCourses,
    loading,
    error,
    getHomePageCourses,
    getFirstBannerCourses,
    getSecondBannerCourses,
    getCoursesByCategory,
    getCoursesByDiscount,
    refetchCourses,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};