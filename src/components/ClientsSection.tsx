import { useEffect, useRef } from "react";

const clients = [
  {
    name: "Tesla Energy",
    logo: "https://logo.clearbit.com/tesla.com"
  },
  {
    name: "Siemens",
    logo: "https://logo.clearbit.com/siemens.com"
  },
  {
    name: "General Electric",
    logo: "https://logo.clearbit.com/ge.com"
  },
  {
    name: "Vestas",
    logo: "https://logo.clearbit.com/vestas.com"
  },
  {
    name: "First Solar",
    logo: "https://logo.clearbit.com/firstsolar.com"
  },
  {
    name: "Orsted",
    logo: "https://logo.clearbit.com/orsted.com"
  },
  {
    name: "Enel Green Power",
    logo: "https://logo.clearbit.com/enel.com"
  },
  {
    name: "Schneider Electric",
    logo: "https://logo.clearbit.com/schneider-electric.com"
  }
];

export const ClientsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Our Clients & Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading renewable energy companies and organizations worldwide
            for professional development and training programs.
          </p>
        </div>

        {/* Logos Carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex space-x-12 overflow-hidden whitespace-nowrap animate-slide-in"
            style={{ width: 'calc(200% + 3rem)' }}
          >
            {/* First set of logos */}
            {clients.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter brightness-0"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-sm font-semibold text-muted-foreground text-center px-4">${client.name}</div>`;
                    }
                  }}
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter brightness-0"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-sm font-semibold text-muted-foreground text-center px-4">${client.name}</div>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "500+", label: "Corporate Partners" },
            { number: "50+", label: "Countries Served" },
            { number: "10,000+", label: "Professionals Trained" },
            { number: "95%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};