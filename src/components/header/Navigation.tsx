import { navigation, courseCategories } from "../../data/navigationData";
import { AboutDropdown } from "./AboutDropdown";
import { CourseDropdown } from "./CourseDropdown";

interface NavigationProps {
  isScrolled: boolean;
  scrollToSection: (href: string) => void;
}

export const Navigation = ({ isScrolled, scrollToSection }: NavigationProps) => {
  // New variable for category
  const category = "renewable-energy/";
  
  // Log all courses with renewable energy category
  const renewableEnergyCourses = courseCategories["Renewable Energy Courses"];
  if (renewableEnergyCourses) {
    console.log(`Courses in category "${category}":`, renewableEnergyCourses.courses);
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => {
        if (item.hasDropdown && item.name === "Courses") {
          return (
            <CourseDropdown key={item.key} isScrolled={isScrolled} />
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
