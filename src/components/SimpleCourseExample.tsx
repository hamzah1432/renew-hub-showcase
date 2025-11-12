/**
 * Simple test/example showing how to use the CourseProvider to get all courses
 * and filter by "Renewable Energy Courses" and "Electrical Power Courses"
 */

import React from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { 
  getRenewableEnergyCourses, 
  getElectricalPowerCourses,
  getCourseStats,
  getAllCategories
} from '@/utils/courseFilters';

export const SimpleCourseExample: React.FC = () => {
  // Get all courses from CourseProvider
  const { allCourses, loading, error } = useCourses();

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  // Use utility functions to filter courses
  const renewableEnergyCourses = getRenewableEnergyCourses(allCourses);
  const electricalPowerCourses = getElectricalPowerCourses(allCourses);
  const stats = getCourseStats(allCourses);
  const allCategories = getAllCategories(allCourses);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Provider Example</h1>
      
      {/* Statistics */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-3 rounded">
          <h3 className="font-bold">Total Courses</h3>
          <p className="text-xl">{stats.totalCourses}</p>
        </div>
        <div className="bg-green-100 p-3 rounded">
          <h3 className="font-bold">Renewable Energy</h3>
          <p className="text-xl">{stats.renewableEnergyCount}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded">
          <h3 className="font-bold">Electrical Power</h3>
          <p className="text-xl">{stats.electricalPowerCount}</p>
        </div>
        <div className="bg-purple-100 p-3 rounded">
          <h3 className="font-bold">Categories</h3>
          <p className="text-xl">{stats.totalCategories}</p>
        </div>
      </div>

      {/* Renewable Energy Courses */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Renewable Energy Courses</h2>
        {renewableEnergyCourses.length > 0 ? (
          <ul className="list-disc pl-5">
            {renewableEnergyCourses.slice(0, 5).map(course => (
              <li key={course.id}>{course.name}</li>
            ))}
            {renewableEnergyCourses.length > 5 && (
              <li>... and {renewableEnergyCourses.length - 5} more</li>
            )}
          </ul>
        ) : (
          <p>No renewable energy courses found</p>
        )}
      </div>

      {/* Electrical Power Courses */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Electrical Power Courses</h2>
        {electricalPowerCourses.length > 0 ? (
          <ul className="list-disc pl-5">
            {electricalPowerCourses.slice(0, 5).map(course => (
              <li key={course.id}>{course.name}</li>
            ))}
            {electricalPowerCourses.length > 5 && (
              <li>... and {electricalPowerCourses.length - 5} more</li>
            )}
          </ul>
        ) : (
          <p>No electrical power courses found</p>
        )}
      </div>

      {/* All Categories (first 10) */}
      <div>
        <h2 className="text-xl font-bold mb-2">Available Categories (Top 10)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {allCategories.slice(0, 10).map((category, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded text-sm">
              <strong>{category.name}</strong> ({category.count} courses)
              <br />
              <span className="text-gray-600">Slug: {category.slug}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleCourseExample;