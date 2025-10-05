import { CourseDropdown } from "./CourseDropdown";
import { AboutDropdown } from "./AboutDropdown";
import { navigation } from "../data/navigationData";

interface NavigationProps {
  isScrolled: boolean;
  scrollToSection: (href: string) => void;
}

export const Navigation = ({ isScrolled, scrollToSection }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => {
        if (item.hasDropdown && item.name === "Courses") {
          return (
            <CourseDropdown key={item.name} isScrolled={isScrolled} />
          );
        }

        if (item.hasDropdown && item.name === "Get to know us") {
          return (
            <AboutDropdown
              key={item.name}
              isScrolled={isScrolled}
              scrollToSection={scrollToSection}
            />
          );
        }

        return (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            className={`hover:text-primary transition-colors font-medium relative group ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
        );
      })}
    </nav>
  );
};
