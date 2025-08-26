import { Card, CardContent } from "@/components/ui/card";
import { LinkedinIcon, Mail, Award } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Lead Solar Energy Engineer",
    specialization: "Photovoltaic Systems & Grid Integration",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "sarah@professionalinstitute.com"
  },
  {
    id: 2,
    name: "Prof. Ahmed Hassan",
    role: "Wind Energy Systems Expert",
    specialization: "Aerodynamics & Turbine Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "ahmed@professionalinstitute.com"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    role: "Energy Storage Specialist",
    specialization: "Battery Technology & Smart Grids",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "elena@professionalinstitute.com"
  },
  {
    id: 4,
    name: "Eng. Omar Al-Rashid",
    role: "Sustainable Design Engineer",
    specialization: "Green Building & Energy Efficiency",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "omar@professionalinstitute.com"
  },
  {
    id: 5,
    name: "Dr. Maria Santos",
    role: "Research Director",
    specialization: "Innovation & Future Technologies",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "maria@professionalinstitute.com"
  },
  {
    id: 6,
    name: "Prof. David Chen",
    role: "Industry Relations Manager",
    specialization: "Corporate Partnerships & Consulting",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    linkedin: "#",
    email: "david@professionalinstitute.com"
  }
];

export const TeamSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our world-class instructors bring decades of industry experience and academic excellence
            to deliver the highest quality renewable energy education.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Profile Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links - Appear on Hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <LinkedinIcon className="h-4 w-4 text-primary" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                      <Mail className="h-4 w-4 text-primary" />
                    </button>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <Award className="h-4 w-4 text-muted-foreground mr-2" />
                    <p className="text-sm text-muted-foreground">
                      {member.specialization}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};