import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Solar Engineer at SunTech Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b27c?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    feedback: "The solar energy course at Professional Institute completely transformed my career. The hands-on training with real equipment gave me the confidence to lead solar installation projects at my company."
  },
  {
    id: 2,
    name: "Ahmed Al-Mahmoud",
    role: "Renewable Energy Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    feedback: "الدورات باللغة العربية كانت ممتازة ومفصلة. لقد تعلمت تقنيات حديثة في مجال الطاقة المتجددة وحصلت على فرصة عمل رائعة في شركة طاقة رائدة."
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Energy Systems Analyst",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    feedback: "Outstanding curriculum and world-class instructors. The wind energy program provided deep technical knowledge and practical skills that I use daily in my engineering work."
  },
  {
    id: 4,
    name: "David Chen",
    role: "Grid Integration Specialist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    feedback: "The smart grid technology course was incredibly comprehensive. The combination of theory and practical labs prepared me perfectly for my current role in grid modernization projects."
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    role: "Sustainability Engineer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    feedback: "معهد محترف حقاً يستحق الاسم. التعليم عالي الجودة والمدربون خبراء في مجالهم. أنصح بشدة لكل من يريد التخصص في مجال الطاقة المتجددة."
  }
];

export const FeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleTestimonials(1);
      } else if (window.innerWidth < 1024) {
        setVisibleTestimonials(2);
      } else {
        setVisibleTestimonials(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      (prev + visibleTestimonials >= testimonials.length) ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      (prev === 0) ? testimonials.length - visibleTestimonials : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleTestimonials; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our graduates who are now making a positive impact in the renewable energy
            industry worldwide.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${currentIndex}`}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-primary" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.feedback}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-secondary group-hover:text-primary transition-colors">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-card shadow-card hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-card shadow-card hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: Math.ceil(testimonials.length / visibleTestimonials) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleTestimonials)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / visibleTestimonials) === index 
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};