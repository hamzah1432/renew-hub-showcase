import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ChevronDown } from "lucide-react";
import { navigation, courseCategories, aboutUsMenuItems, contactInfo } from "../data/navigationData";

interface MobileMenuProps {
  isMenuOpen: boolean;
  scrollToSection: (href: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const MobileMenu = ({ isMenuOpen, scrollToSection, setIsMenuOpen }: MobileMenuProps) => {
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [mobileSubmenus, setMobileSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleMobileSubmenu = (category: string) => {
    setMobileSubmenus(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white border-t shadow-lg animate-fade-up">
      <nav className="px-4 py-4 space-y-4">
        {navigation.map((item) => {
          if (item.hasDropdown && item.name === "Courses") {
            return (
              <div key={item.name} className="space-y-2">
                <button
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                  className="flex items-center justify-between w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.name}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileCoursesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Courses Dropdown */}
                {isMobileCoursesOpen && (
                  <div className="pl-4 space-y-3 border-l-2 border-primary/20">
                    {Object.entries(courseCategories).map(
                      ([categoryKey, categoryData]) => (
                        <div key={categoryKey} className="space-y-2">
                          <button
                            onClick={() => toggleMobileSubmenu(categoryKey)}
                            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded"
                          >
                            <h4 className="text-sm font-medium text-gray-700">
                              {categoryData.name}
                            </h4>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-400 transition-transform ${
                                mobileSubmenus[categoryKey] ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Mobile Submenu */}
                          {mobileSubmenus[categoryKey] && (
                            <div className="space-y-1 ml-4 pl-3 border-l border-gray-200">
                              {categoryData.courses.map((course, courseIndex) => (
                                <a
                                  key={course.href}
                                  href={course.href}
                                  className="text-xs p-2 hover:bg-gray-50 rounded cursor-pointer block"
                                >
                                  <div className="font-medium text-gray-700">
                                    {courseIndex + 1}. {course.name.split("–")[0].trim()}
                                  </div>
                                  {course.name.includes("–") && (
                                    <div className="text-gray-500 mt-1">
                                      {course.name.split("–")[1].trim()}
                                    </div>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                    <button
                      onClick={() => {
                        scrollToSection("#courses");
                        setIsMobileCoursesOpen(false);
                        setMobileSubmenus({});
                      }}
                      className="w-full mt-3 bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      View All Courses
                    </button>
                  </div>
                )}
              </div>
            );
          }

          if (item.hasDropdown && item.name === "Get to know us") {
            return (
              <div key={item.name} className="space-y-2">
                <button
                  onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  className="flex items-center justify-between w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.name}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isMobileAboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile About Us Dropdown */}
                {isMobileAboutOpen && (
                  <div className="pl-4 space-y-2 border-l-2 border-primary/20">
                    {aboutUsMenuItems.map((menuItem) => (
                      <button
                        key={menuItem.name}
                        onClick={() => {
                          scrollToSection(menuItem.href);
                          setIsMobileAboutOpen(false);
                        }}
                        className="block w-full text-left p-2 hover:bg-gray-50 rounded text-sm text-gray-700 hover:text-primary transition-colors"
                      >
                        {menuItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              {item.name}
            </button>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>{contactInfo.email}</span>
            </div>
          </div>
          <Button className="w-full gradient-primary text-white">
            Enroll Now
          </Button>
        </div>
      </nav>
    </div>
  );
};
