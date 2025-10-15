interface HeroNavigationProps {
  slides: any[];
  currentSlide: number;
  isAnimating: boolean;
  goToSlide: (index: number) => void;
}

export const HeroNavigation = ({
  slides,
  currentSlide,
  isAnimating,
  goToSlide,
}: HeroNavigationProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          disabled={isAnimating}
          className={`relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 group disabled:cursor-not-allowed ${
            index === currentSlide
              ? "w-8 h-3 bg-white"
              : "w-3 h-3 bg-white/50 hover:bg-white/70"
          }`}
        >
          {index === currentSlide && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          )}
          <span className="sr-only">Go to slide {index + 1}</span>
        </button>
      ))}
    </div>
  );
};
