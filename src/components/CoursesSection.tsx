import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Globe } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Solar Panel Installation & Maintenance",
    description: "Master the fundamentals of photovoltaic systems, installation techniques, and maintenance procedures.",
    duration: "12 weeks",
    students: "150+",
    language: "English",
    level: "Beginner",
    package: "Bronze",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Wind Turbine Engineering",
    description: "Advanced course covering wind turbine design, aerodynamics, and grid integration systems.",
    duration: "16 weeks",
    students: "120+",
    language: "English",
    level: "Advanced",
    package: "Diamond",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Renewable Energy Engineering",
    description: "Comprehensive course on renewable energy technologies and their industrial applications.",
    duration: "14 weeks",
    students: "200+",
    language: "English",
    level: "Intermediate",
    package: "Gold",
    image: "https://images.unsplash.com/photo-1497436072909-f5e4be1713d2?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Energy Storage Systems",
    description: "Comprehensive training on battery technologies, grid storage, and energy management systems.",
    duration: "10 weeks",
    students: "90+",
    language: "English",
    level: "Intermediate",
    package: "Silver",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    title: "Solar Panel Technology",
    description: "Learn design, installation and maintenance of solar energy systems for residential and commercial projects.",
    duration: "8 weeks",
    students: "180+",
    language: "English",
    level: "Beginner",
    package: "Bronze",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    title: "Smart Grid Technology",
    description: "Learn about intelligent power grids, IoT integration, and automated energy distribution.",
    duration: "12 weeks",
    students: "110+",
    language: "English",
    level: "Advanced",
    package: "Gold",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop"
  }
];

export const CoursesSection = () => {
  const [filter, setFilter] = useState("All");

  const filteredCourses = filter === "All" 
    ? courses 
    : courses.filter(course => course.language === filter);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Our Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive renewable energy engineering programs designed by industry experts
            to prepare you for a sustainable future career.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 animate-fade-up">
          <div className="flex bg-card rounded-xl p-1 shadow-card">
            {["All", "English", "Arabic"].map((lang) => (
              <Button
                key={lang}
                variant={filter === lang ? "default" : "ghost"}
                onClick={() => setFilter(lang)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  filter === lang 
                    ? "gradient-primary text-white shadow-md" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Globe className="mr-2 h-4 w-4" />
                {lang}
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
                    className="absolute top-4 right-4 gradient-primary text-white"
                  >
                    {course.language}
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className="absolute top-4 left-4 bg-white/90 text-secondary"
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
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
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