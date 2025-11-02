import { ChevronDown } from "lucide-react";

interface CourseDropdownProps {
  isScrolled: boolean;
  selectedCourses?: {
    [key: string]: {
      name: string;
      courses: Array<{ name: string; href: string }>;
    };
  };
}

export const CourseDropdown = ({ isScrolled, selectedCourses }: CourseDropdownProps) => {
  // If no courses provided, don't render anything
  if (!selectedCourses) {
    return null;
  }
  return (
    <div className="relative group">
      <button
        className={`flex items-center hover:text-primary transition-colors font-medium relative group ${
          isScrolled ? "text-foreground" : "text-white"
        }`}
      >
        Courses
        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Hover Dropdown */}
      <div className="absolute top-full left-0 mt-1 w-[280px] bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {Object.entries(selectedCourses).map(([categoryKey, categoryData], categoryIndex) => (
            <div
              key={categoryKey}
              className={`relative group/submenu ${categoryIndex > 0 ? "mt-1" : ""}`}
            >
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {categoryData.name}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 -rotate-90" />
              </div>

              {/* Submenu */}
              <div className="absolute left-full top-0 ml-1 w-[350px] bg-white rounded-md shadow-lg border opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50 max-h-[500px] flex flex-col">
                <div className="p-3 flex-shrink-0">
                  <div className="mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 pb-2 border-b">
                      {categoryData.name}
                    </h3>
                  </div>
                </div>
                <div className="px-3 pb-3 overflow-y-auto flex-1 space-y-1">
                  {categoryData.courses.map((course, courseIndex) => (
                    <a
                      key={course.href}
                      href={course.href}
                      className="cursor-pointer p-2 rounded hover:bg-gray-50 block"
                    >
                      <div className="text-sm text-gray-700">
                        {courseIndex + 1}. {course.name.split("–")[0].trim()}
                      </div>
                      {course.name.includes("–") && (
                        <div className="text-xs text-gray-500 ml-3">
                          {course.name.split("–")[1].trim()}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
