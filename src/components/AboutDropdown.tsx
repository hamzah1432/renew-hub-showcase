import { ChevronDown } from "lucide-react";
import { aboutUsMenuItems } from "../data/navigationData";

interface AboutDropdownProps {
  isScrolled: boolean;
  scrollToSection: (href: string) => void;
}

export const AboutDropdown = ({ isScrolled, scrollToSection }: AboutDropdownProps) => {
  return (
    <div className="relative group">
      <button
        className={`flex items-center hover:text-primary transition-colors font-medium relative group ${
          isScrolled ? "text-foreground" : "text-white"
        }`}
      >
        Get to know us
        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
      </button>

      {/* About Us Dropdown */}
      <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {aboutUsMenuItems.map((menuItem) => (
            <button
              key={menuItem.name}
              onClick={() => scrollToSection(menuItem.href)}
              className="w-full text-left p-2 rounded hover:bg-gray-50 text-sm text-gray-700 hover:text-primary transition-colors"
            >
              {menuItem.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
