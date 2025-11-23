import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  isScrolled: boolean;
  onToggle: () => void;
}

export const MobileMenuButton = ({ isMenuOpen, isScrolled, onToggle }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`md:hidden p-2 hover:text-primary transition-colors ${
        isScrolled ? "text-foreground" : "text-white"
      }`}
    >
      {isMenuOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );
};