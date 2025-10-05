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
                ${discountPriceNum}
              </span>
              <span className="text-lg text-muted-foreground line-through ml-2">
                ${priceNum}
              </span>
            </div>
            <Badge variant="destructive" className="text-xs">
              {Math.round(
                ((priceNum - discountPriceNum) / priceNum) * 100
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
  );
};