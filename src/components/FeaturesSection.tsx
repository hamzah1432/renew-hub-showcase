import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Globe2, Briefcase, Lightbulb, BookOpen } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience in renewable energy engineering and real-world project implementation."
  },
  {
    icon: Lightbulb,
    title: "Hands-on Training",
    description: "Practical workshops and lab sessions with real renewable energy equipment and cutting-edge simulation software."
  },
  {
    icon: Globe2,
    title: "Bilingual Courses",
    description: "Choose from courses taught in both English and Arabic to learn in your preferred language with native-speaking instructors."
  },
  {
    icon: Briefcase,
    title: "Industry-Oriented Content",
    description: "Curriculum designed in collaboration with leading energy companies to meet current market demands and industry standards."
  },
  {
    icon: Award,
    title: "Certified Programs",
    description: "Receive internationally recognized certifications that boost your career prospects in the renewable energy sector."
  },
  {
    icon: BookOpen,
    title: "Flexible Learning",
    description: "Online and hybrid learning options that fit your schedule, with 24/7 access to course materials and resources."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-4 lg:mb-6">
            What Makes Us Special?
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Discover why thousands of students choose Professional Institute for their
            renewable energy engineering education and career advancement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-secondary mb-3 md:mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};