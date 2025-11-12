import React from "react";
import { navigation, courseCategories } from "../../data/navigationData";
import { AboutDropdown } from "./AboutDropdown";
import { CourseDropdown } from "./CourseDropdown";
import { useCourseCategories } from "../../hooks/useCourseCategories";

interface NavigationProps {
  isScrolled: boolean;
  scrollToSection: (href: string) => void;
  selectedCourses?: {
    [key: string]: {
      name: string;
      courses: Array<{ name: string; href: string }>;
    };
  };
}

export const Navigation = ({ isScrolled, scrollToSection, selectedCourses }: NavigationProps) => {
  // Get course categories from CourseProvider
  const {
    allCourses,
    renewableEnergyCourses,
    electricalPowerCourses,
    stats,
    loading
  } = useCourseCategories();

  // Create dropdown course data merging static data with dynamic CourseProvider data
  const courseDropdownData = React.useMemo(() => {
    // Static categories (Webinars and Workshops) will be added at the end
    const staticCategories = {
      'webinars': courseCategories["Webinars"],
      'workshops': courseCategories["workshops"]
    };

    if (loading || allCourses.length === 0) {
      // If still loading or no courses, return dynamic categories first, then static
      return {
        'renewable-energy': {
          name: 'Renewable Energy Courses',
          courses: courseCategories["Renewable Energy Courses"]?.courses || []
        },
        'electrical-power': {
          name: 'Electrical Power Courses', 
          courses: courseCategories["Electrical Power Courses"]?.courses || []
        },
        ...staticCategories
      };
    }

    // Dynamic categories first, then static categories at the end
    return {
      'renewable-energy': {
        name: 'Renewable Energy Courses',
        courses: renewableEnergyCourses.length > 0 
          ? renewableEnergyCourses.map(course => ({
              name: course.name,
              href: course.link || '#'
            }))
          : courseCategories["Renewable Energy Courses"]?.courses || []
      },
      'electrical-power': {
        name: 'Electrical Power Courses',
        courses: electricalPowerCourses.length > 0
          ? electricalPowerCourses.map(course => ({
              name: course.name,
              href: course.link || '#'
            }))
          : courseCategories["Electrical Power Courses"]?.courses || []
      },
      ...staticCategories
    };
  }, [loading, allCourses, renewableEnergyCourses, electricalPowerCourses]);
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => {
        if (item.hasDropdown && item.name === "Courses") {
          return (
            <CourseDropdown 
              key={item.key} 
              isScrolled={isScrolled}
              selectedCourses={courseDropdownData}
              loading={loading}
            />
          );
        }

        if (item.hasDropdown && item.name === "Get to know us") {
          return (
            <AboutDropdown
              key={item.key}
              isScrolled={isScrolled}
              scrollToSection={scrollToSection}
            />
          );
        }

        return (
          <a key={item.key} href={item.href}>
            <button
              className={`hover:text-primary transition-colors font-medium relative group ${isScrolled ? "text-foreground" : "text-white"
                }`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          </a>
        );
      })}
    </nav>
  );
};
