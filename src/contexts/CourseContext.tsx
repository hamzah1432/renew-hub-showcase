import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '@/types/course';
import { coursesApi } from '@/services/api';

interface CourseContextType {
  allCourses: Course[];
  loading: boolean;
  error: string | null;
  // Helper functions for filtered course data
  getHomePageCourses: () => Course[];
  getCoursesByCategory: (categorySlug: string) => Course[];
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
      course.categories?.some(category => category.slug == categorySlug)
    );
  };

  // Specific helper functions using the generic one
  const getHomePageCourses = () => getCoursesByCategory('home-page-courses');


  const refetchCourses = async () => {
    await fetchCourses();
  };

  const value: CourseContextType = {
    allCourses,
    loading,
    error,
    getHomePageCourses,
    getCoursesByCategory,
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