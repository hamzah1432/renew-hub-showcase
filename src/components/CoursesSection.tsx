import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BookOpen,
  Clock,
  Users,
  Globe,
  PlayCircle,
  UserCheck,
  DollarSign,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Mastering Energy Storage Systems Course (MESS) – English Version",
    description:
      "The “Mastering Energy Storage Systems Course” is a comprehensive program designed to equip participants with the knowledge and skills necessary to understand the fundamental principles and practical applications of energy storage systems. This course covers the technical and economic aspects of various energy storage technologies, including batteries, pumped hydro, thermal storage, and emerging innovations. Participants will explore infrastructure considerations, integration with renewable energy sources, and the potential applications of energy storage in different sectors.",
    duration: "6 hours",
    language: "English",
    level: "All Levels",
    package: "Bronze",
    category: "Renewable Energy",
    price: "400.00",
    discountPrice: "80.00",
    lectures: 8,
    capacity: 100,
    currentStudents: 59,
    instructor: {
      name: "Tarek MERHBI",
      avatar: "public/Tarek_MERHBI.png",
    },
    image: "public/MESS_Course.png",
  },
  {
    id: 2,
    title:
      "Advanced Solar Water Pumping Design and Installation Course (ASPDI) – English Version",
    description:
      "The Advanced Solar Water Pumping Design and Installation Course (ASPDI) – English Version provides participants with in-depth, hands-on training in designing, installing, and maintaining solar water pumping systems. Trainees will develop practical skills to assess site conditions, select appropriate components, design efficient solar pumping solutions, and execute installations with confidence. Through guided exercises, real-life case studies, and step-by-step instruction, participants will gain the expertise to implement reliable solar water pumping systems in diverse settings.",
    duration: "2 hours",
    language: "English",
    level: "All Levels",
    package: "Diamond",
    category: "Renewable Energy",
    price: "120.00",
    discountPrice: "24.00",
    lectures: 1,
    capacity: 80,
    currentStudents: 25,
    instructor: {
      name: "Awangum",
      avatar: "public/Awangum.png",
    },
    image: "public/ASPDI_Course.png",
  },
  {
    id: 3,
    title:
      "Hands-on Training course in Battery and Inverter Repairs Course (HTBIR) – English Version",
    description:
      "The Hands-on Training Course in Battery and Inverter Repairs equips participants with practical expertise to understand inverter and battery systems, diagnose common faults, troubleshoot problems step-by-step, and perform reliable maintenance and repair. Through real-life case studies and guided exercises, trainees gain the confidence and technical skills needed to repair and maintain power systems effectively.",
    duration: "1 hour",
    language: "English",
    level: "All Levels",
    package: "Gold",
    category: "Renewable Energy",
    price: "60.00",
    discountPrice: "12.00",
    lectures: 1,
    capacity: 150,
    currentStudents: 20,
    instructor: {
      name: "Charles Ekpima",
      avatar: "public/Charles_Ekpima.png",
    },
    image: "public/HTBIR_Course.png",
  },
  {
    id: 4,
    title:
      "3D Modeling Integration In Solar System Course (DMISS) – English Version",
    description:
      "The “3D Modeling Integration in Solar System (DMISS) Course” helps solar professionals transform standard 2D drawings into realistic, high-impact 3D visuals that win clients faster. In today’s market, showing clients exactly how their solar system will look on their property builds instant trust and sets you apart from competitors still relying on flat blueprints. This course equips you with the tools and techniques to create stunning, accurate, and professional 3D presentations that sell.",
    duration: "7 hours",
    language: "English",
    level: "All Levels",
    package: "Silver",
    category: "Renewable Energy",
    price: "325.00",
    discountPrice: "65.00",
    lectures: 22,
    capacity: 100,
    currentStudents: 25,
    instructor: {
      name: "Abdulrahman Al-Mashti",
      avatar: "public/Abdulrahman_Almashti.png",
    },
    image: "public/DMISS_Course.png",
  },
  {
    id: 5,
    title:
      "Professional Course in SCADA-Based Monitoring & Control for Solar Microgrid Systems (SMGCS) – English Version",
    description:
      "The “Professional Course in SCADA-Based Monitoring & Control for Solar Microgrid Systems (SMGCS)” provides participants with in-depth technical knowledge and practical skills in the design, setup, and operation of SCADA systems for solar microgrids. This course covers SCADA architecture, sensors and communication protocols, real-time performance monitoring, operational control strategies, and data analytics to ensure reliable, efficient, and safe management of solar microgrid assets.",
    duration: "3 hours",
    language: "English",
    level: "All Levels",
    package: "Bronze",
    category: "Renewable Energy",
    price: 200.0,
    discountPrice: 40.0,
    lectures: 3,
    capacity: 100,
    currentStudents: 36,
    instructor: {
      name: "Salem Al Khawaja",
      avatar: "public/Salem_Al_Khawaja.jpeg",
    },
    image: "public/SMGCS_Course.png",
  },
  {
    id: 6,
    title:
      "Mastering Solar String Inverter Sizing Course (MSSIS) – English Version",
    description:
      "The “Mastering Solar String Inverter Sizing” course is designed to equip participants with the essential knowledge and practical skills needed to accurately size and select string inverters for solar photovoltaic (PV) systems. The course covers inverter fundamentals, key sizing criteria, design calculations, and real-world application examples to ensure optimal system performance and compliance with industry standards.",
    duration: "3 hours",
    language: "English",
    level: "All Levels",
    package: "Gold",
    category: "Electrical Power",
    price: 140.0,
    discountPrice: 55.0,
    lectures: 9,
    capacity: 150,
    currentStudents: 87,
    instructor: {
      name: "Abdulrahman Smadi",
      avatar: "public/Abdulrahman_Smadi.jpeg",
    },
    image: "public/MSSIC_Course.png",
  },
];

export const CoursesSection = () => {
  const [languageFilter, setLanguageFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [displayedCoursesCount, setDisplayedCoursesCount] = useState(3);

  // Reset displayed courses count when filters change
  useEffect(() => {
    setDisplayedCoursesCount(3);
  }, [languageFilter, packageFilter, categoryFilter]);

  const filteredCourses = courses.filter((course) => {
    const languageMatch =
      languageFilter === "All" || course.language === languageFilter;
    const packageMatch =
      packageFilter === "All" || course.package === packageFilter;
    const categoryMatch =
      categoryFilter === "All" || course.category === categoryFilter;
    return languageMatch && packageMatch && categoryMatch;
  });

  const displayedCourses = filteredCourses.slice(0, displayedCoursesCount);
  const hasMoreCourses = filteredCourses.length > displayedCoursesCount;

  const handleViewMore = () => {
    setDisplayedCoursesCount((prev) => prev + 3);
  };

  const getPackageStyle = (packageName: string) => {
    switch (packageName) {
      case "Bronze":
        return "bg-amber-600 text-white";
      case "Silver":
        return "bg-slate-400 text-white";
      case "Gold":
        return "bg-yellow-500 text-white";
      case "Diamond":
        return "bg-blue-600 text-white";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Our Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive renewable energy engineering programs designed by
            industry experts to prepare you for a sustainable future career.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 mb-8 lg:mb-12 animate-fade-up">
          {/* Category Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Category:
            </span>
            {["All", "Renewable Energy", "Electrical Power"].map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "ghost"}
                onClick={() => setCategoryFilter(category)}
                className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${
                  categoryFilter === category
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                {category === "Renewable Energy"
                  ? "Renewable"
                  : category === "Electrical Power"
                  ? "Electrical"
                  : category}
              </Button>
            ))}
          </div>

          {/* Language Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Language:
            </span>
            {["All", "English", "Arabic"].map((lang) => (
              <Button
                key={lang}
                variant={languageFilter === lang ? "default" : "ghost"}
                onClick={() => setLanguageFilter(lang)}
                className={`px-3 lg:px-6 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm ${
                  languageFilter === lang
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                <Globe className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                {lang}
              </Button>
            ))}
          </div>

          {/* Package Filter */}
          <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
              Package:
            </span>
            {["All", "Bronze", "Silver", "Gold", "Diamond"].map((pkg) => (
              <Button
                key={pkg}
                variant={packageFilter === pkg ? "default" : "ghost"}
                onClick={() => setPackageFilter(pkg)}
                className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${
                  packageFilter === pkg
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:gradient-primary hover:text-white"
                }`}
              >
                {pkg}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
          {displayedCourses.map((course, index) => (
            <Card
              key={course.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0 shadow-card flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div
                  className="h-48 bg-cover bg-center rounded-t-lg relative overflow-hidden"
                  style={{ backgroundImage: `url(${course.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                  <Badge
                    className={`absolute top-4 right-4 font-bold px-3 py-1 ${getPackageStyle(
                      course.package
                    )}`}
                  >
                    {course.package}
                  </Badge>
                  <Badge className="absolute top-4 left-4 gradient-primary text-white">
                    {course.language}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="absolute bottom-4 left-4 bg-white/90 text-secondary"
                  >
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-1">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>

                <div className="mt-auto">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-2xl font-bold text-primary">
                        ${course.discountPrice}
                      </span>
                      <span className="text-lg text-muted-foreground line-through ml-2">
                        ${course.price}
                      </span>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(
                        ((course.price - course.discountPrice) / course.price) *
                          100
                      )}
                      % OFF
                    </Badge>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <PlayCircle className="h-4 w-4 mr-1" />
                      {course.lectures} lectures
                    </div>
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-1" />
                      {course.currentStudents}/{course.capacity}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                      />
                      <AvatarFallback>
                        {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium">Instructor</p>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor.name}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full gradient-primary text-white hover:scale-105 transition-transform">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {hasMoreCourses && (
          <div className="text-center mt-12 animate-fade-up">
            <Button
              // onClick={handleViewMore}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              View More Courses
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
