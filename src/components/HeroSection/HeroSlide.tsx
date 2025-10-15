interface HeroSlideProps {
  slide: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
  };
  isActive: boolean;
  index: number;
  currentSlide: number;
  children: React.ReactNode;
}

export const HeroSlide = ({ slide, isActive, index, currentSlide, children }: HeroSlideProps) => {
  return (
    <div
      className={`no-scrollbar absolute inset-0 transition-all duration-1000 ease-out ${
        isActive
          ? "translate-x-0 opacity-100 scale-100 z-10"
          : index < currentSlide
          ? "-translate-x-full opacity-100 scale-105 z-0"
          : "translate-x-full opacity-100 scale-105 z-0"
      }`}
    >
      <div
        className={`w-full h-full bg-cover bg-center relative transition-transform duration-[1500ms] ease-out ${
          isActive ? "scale-100" : "scale-110"
        }`}
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      >
        {/* Enhanced Overlay with animated gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/70 transition-opacity duration-1000 ${
            isActive ? "opacity-100" : "opacity-80"
          }`}
        />

        {/* Animated particles overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-1 h-1 bg-white/80 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "2s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
