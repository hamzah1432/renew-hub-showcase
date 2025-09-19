import { useState } from "react";
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
    students: "50+",
    language: "English",
    level: "All Levels",
    package: "Bronze",
    category: "Renewable Energy",
    price: 400,
    discountPrice: 80,
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
    students: "25",
    language: "English",
    level: "All Levels",
    package: "Diamond",
    category: "Renewable Energy",
    price: 120,
    discountPrice: 24,
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
    students: "29",
    language: "English",
    level: "All Levels",
    package: "Gold",
    category: "Renewable Energy",
    price: 60,
    discountPrice: 12,
    lectures: 1,
    capacity: 150,
    currentStudents: 20,
    instructor: {
      name: "Dr. Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1497436072909-f5e4be1713d2?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "Energy Storage Systems",
    description:
      "Comprehensive training on battery technologies, grid storage, and energy management systems.",
    duration: "10 weeks",
    students: "90+",
    language: "English",
    level: "Intermediate",
    package: "Silver",
    category: "Renewable Energy",
    price: 399,
    discountPrice: 299,
    lectures: 38,
    capacity: 120,
    currentStudents: 90,
    instructor: {
      name: "Dr. James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Solar Panel Technology",
    description:
      "Learn design, installation and maintenance of solar energy systems for residential and commercial projects.",
    duration: "8 weeks",
    students: "180+",
    language: "English",
    level: "Beginner",
    package: "Bronze",
    category: "Renewable Energy",
    price: 249,
    discountPrice: 149,
    lectures: 32,
    capacity: 200,
    currentStudents: 180,
    instructor: {
      name: "Sarah Thompson",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Smart Grid Technology",
    description:
      "Learn about intelligent power grids, IoT integration, and automated energy distribution.",
    duration: "12 weeks",
    students: "110+",
    language: "English",
    level: "Advanced",
    package: "Gold",
    category: "Electrical Power",
    price: 549,
    discountPrice: 399,
    lectures: 48,
    capacity: 130,
    currentStudents: 110,
    instructor: {
      name: "Dr. Robert Kim",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
  },
];

export const CoursesSection = () => {
  const [languageFilter, setLanguageFilter] = useState("All");
  const [packageFilter, setPackageFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const languageMatch =
      languageFilter === "All" || course.language === languageFilter;
    const packageMatch =
      packageFilter === "All" || course.package === packageFilter;
    const categoryMatch =
      categoryFilter === "All" || course.category === categoryFilter;
    return languageMatch && packageMatch && categoryMatch;
  });

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
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mb-12 animate-fade-up">
          {/* Category Filter */}
          <div className="flex bg-card rounded-xl p-1 shadow-card">
            <span className="text-sm font-medium text-muted-foreground px-3 py-2">
              Category:
            </span>
            {["All", "Renewable Energy", "Electrical Power"].map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "ghost"}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  categoryFilter === category
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Language Filter */}
          <div className="flex bg-card rounded-xl p-1 shadow-card">
            <span className="text-sm font-medium text-muted-foreground px-3 py-2">
              Language:
            </span>
            {["All", "English", "Arabic"].map((lang) => (
              <Button
                key={lang}
                variant={languageFilter === lang ? "default" : "ghost"}
                onClick={() => setLanguageFilter(lang)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  languageFilter === lang
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Globe className="mr-2 h-4 w-4" />
                {lang}
              </Button>
            ))}
          </div>

          {/* Package Filter */}
          <div className="flex bg-card rounded-xl p-1 shadow-card">
            <span className="text-sm font-medium text-muted-foreground px-3 py-2">
              Package:
            </span>
            {["All", "Bronze", "Silver", "Gold", "Diamond"].map((pkg) => (
              <Button
                key={pkg}
                variant={packageFilter === pkg ? "default" : "ghost"}
                onClick={() => setPackageFilter(pkg)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  packageFilter === pkg
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {pkg}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0 shadow-card"
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
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
