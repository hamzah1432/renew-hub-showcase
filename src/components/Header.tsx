import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, GraduationCap, Phone, Mail, ChevronDown } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Courses", href: "#courses", hasDropdown: true },
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

const courseCategories = {
  "Renewable Energy Courses": [
    "Mastering Solar PV Off-Grid System Design Course – MSPOD",
    "Advanced Introduction to Solar PV System Course – AISPV",
    "Certified Solar PV Electrical Drawing Design Course – CSPED",
    "Mastering Solar PV Structure Design Course – MSPSD",
    "Mastering Solar PV Sales & Marketing Course – MSPSM",
    "Certified Solar PV Testing & Commissioning Course – CSPTC",
    "Mastering Solar PV System Installation Course – MSPSI",
    "Mastering SketchUP & PVsyst Solar PV Design Course – MSPVD",
    "Mastering Solar PV Project Management Course – MSPPM",
  ],
  "Electrical Power Course": [
    "Mastering Electrical System Construction Course – MESC",
  ],
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src="PREI_logo.png"
                alt="Professional Institute Renewable Energy Engineering"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-secondary">
                Professional Institute
              </div>
              <div className="text-xs text-muted-foreground">
                Renewable Energy Engineering
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.hasDropdown && item.name === "Courses") {
                return (
                  <div key={item.name} className="relative group">
                    <button className="flex items-center text-foreground hover:text-primary transition-colors font-medium relative group">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </button>

                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-6">
                        {Object.entries(courseCategories).map(
                          ([category, courses], categoryIndex) => (
                            <div
                              key={category}
                              className={categoryIndex > 0 ? "mt-6" : ""}
                            >
                              <div className="flex items-center mb-3">
                                <GraduationCap className="h-5 w-5 text-primary mr-2" />
                                <h3 className="text-lg font-bold text-primary border-b-2 border-primary/20 pb-1">
                                  {category}
                                </h3>
                              </div>
                              <div className="space-y-2 ml-7">
                                {courses.map((course) => (
                                  <div
                                    key={course}
                                    className="cursor-pointer p-2 rounded-md hover:bg-primary/5 transition-colors group/item"
                                  >
                                    <div className="text-sm font-medium text-gray-800 group-hover/item:text-primary transition-colors">
                                      {course.split("–")[0].trim()}
                                    </div>
                                    {course.includes("–") && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {course.split("–")[1].trim()}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}

                        {/* View All Courses Button */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => scrollToSection("#courses")}
                            className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                          >
                            View All Courses
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Desktop Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>info@professionalinstitute.com</span>
              </div>
            </div>
            <Button className="gradient-primary text-white hover:scale-105 transition-transform">
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fade-up">
          <nav className="px-4 py-4 space-y-4">
            {navigation.map((item) => {
              if (item.hasDropdown && item.name === "Courses") {
                return (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() =>
                        setIsMobileCoursesOpen(!isMobileCoursesOpen)
                      }
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
                          ([category, courses]) => (
                            <div key={category} className="space-y-2">
                              <div className="flex items-center">
                                <GraduationCap className="h-4 w-4 text-primary mr-2" />
                                <h4 className="text-sm font-semibold text-primary">
                                  {category}
                                </h4>
                              </div>
                              <div className="space-y-1 ml-6">
                                {courses.map((course) => (
                                  <div
                                    key={course}
                                    className="text-xs text-muted-foreground p-1"
                                  >
                                    <div className="font-medium text-gray-700">
                                      {course.split("–")[0].trim()}
                                    </div>
                                    {course.includes("–") && (
                                      <div className="text-gray-500">
                                        {course.split("–")[1].trim()}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                        <button
                          onClick={() => {
                            scrollToSection("#courses");
                            setIsMobileCoursesOpen(false);
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
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@professionalinstitute.com</span>
                </div>
              </div>
              <Button className="w-full gradient-primary text-white">
                Enroll Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
