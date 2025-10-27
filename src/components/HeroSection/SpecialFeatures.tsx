import { Award, Users, Clock, Globe, BookOpen, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SpecialFeaturesProps {
  isActive: boolean;
  currentSlide: number;
}

const specialFeatures = [
  {
    id: 1,
    icon: Award,
    title: "Industry Certified",
    description: "Accredited programs recognized by leading renewable energy organizations",
    badge: "Certified",
    color: "text-blue-500"
  },
  {
    id: 2,
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience",
    badge: "Expert Led",
    color: "text-green-500"
  },
  {
    id: 3,
    icon: Clock,
    title: "Flexible Learning",
    description: "Self-paced courses that fit your schedule and lifestyle",
    badge: "24/7 Access",
    color: "text-purple-500"
  },
  {
    id: 4,
    icon: Globe,
    title: "Global Community",
    description: "Join a worldwide network of renewable energy professionals",
    badge: "Worldwide",
    color: "text-orange-500"
  }
];

export const SpecialFeatures = ({ isActive, currentSlide }: SpecialFeaturesProps) => {
  return (
    <div
      className={`overflow-x-hidden transition-all duration-1000 ease-out ${
        isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: isActive ? "300ms" : "0ms", scrollbarWidth: 'none' }}
    >
      <div
        className={`mb-4 md:mb-6 transition-all duration-1000 ease-out ${
          isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
        style={{ transitionDelay: isActive ? "500ms" : "0ms" }}
      >
        <h2 className="text-xl md:text-3xl font-bold text-white mb-2">
          What Makes Us Special?
          <span className="text-sm md:text-base font-normal text-white/70 ml-2">
            ({currentSlide + 1}/3)
          </span>
        </h2>
        <p className="text-sm md:text-base text-white/80">
          Discover why we're the leading choice for renewable energy education
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-h-80 md:max-h-96 overflow-y-auto pr-2">
        {specialFeatures.map((feature, featureIndex) => {
          const IconComponent = feature.icon;
          
          return (
            <Card
              key={feature.id}
              className={`overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-hero hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isActive ? `${700 + featureIndex * 150}ms` : "0ms",
              }}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start gap-3">
                  <div className={`${feature.color} bg-white rounded-lg p-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-secondary text-sm md:text-base">
                        {feature.title}
                      </h3>
                      <Badge 
                        className="bg-primary/10 text-primary text-xs px-2 py-0.5 ml-2 hover:bg-primary/20 transition-colors duration-200"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-primary">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      <span>Premium Feature</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
