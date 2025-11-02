import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { InternalCourse } from "@/types/course";
import {
  BookOpen,
  Clock,
  PlayCircle,
  UserCheck,
  DollarSign,
} from "lucide-react";

interface CourseCardProps {
  course: InternalCourse;
  index?: number;
}

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
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

  // Convert price to number for calculation
  const priceNum = typeof course.price === "string" ? parseFloat(course.price.replace(/[$,]/g, '')) : course.price;
  const discountPriceNum = typeof course.discountPrice === "string" ? parseFloat(course.discountPrice.replace(/[$,]/g, '')) : course.discountPrice;

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-0 shadow-card flex flex-col h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="p-0">
        <div
          className="h-40 sm:h-44 md:h-48 bg-cover bg-center rounded-t-lg relative overflow-hidden"
          style={{ backgroundImage: `url(${course.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
          <Badge
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 text-xs ${getPackageStyle(
              course.package
            )}`}
          >
            {course.package}
          </Badge>
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 gradient-primary text-white text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
            {course.language}
          </Badge>
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 bg-white/90 text-secondary text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
          >
            {course.level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        <CardTitle className="text-base sm:text-lg md:text-xl mb-2 sm:mb-2.5 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </CardTitle>

        <div className="mt-auto">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-3.5 md:mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-3.5 md:mb-4 flex-wrap">
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                ${discountPriceNum}
              </span>
              <span className="text-sm sm:text-base md:text-lg text-muted-foreground line-through ml-1.5 sm:ml-2">
                ${priceNum}
              </span>
            </div>
            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
              {Math.round(
                ((priceNum - discountPriceNum) / priceNum) * 100
              )}
              % OFF
            </Badge>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-3.5 md:mb-4">
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="truncate">{course.duration}</span>
            </div>
            <div className="flex items-center">
              <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="truncate">{course.lectures} lectures</span>
            </div>
            <div className="flex items-center">
              <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="truncate">{course.currentStudents}/{course.capacity}</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3 sm:mb-3.5 md:mb-4 p-1.5 sm:p-2 bg-muted/50 rounded-lg">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
              <AvatarImage
                src={course.instructor.avatar}
                alt={course.instructor.name}
              />
              <AvatarFallback className="text-xs">
                {course.instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">Instructor</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                {course.instructor.name}
              </p>
            </div>
          </div>
          <Button 
            className="w-full gradient-primary text-white hover:scale-105 transition-transform text-xs sm:text-sm md:text-base py-2 sm:py-2.5"
            onClick={() => window.location.href = course.link}
          >
            <BookOpen className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};