import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface FilterTabsProps {
    languageFilter: string;
    packageFilter: string;
    categoryFilter: string;
    setLanguageFilter: (language: string) => void;
    setPackageFilter: (packageType: string) => void;
    setCategoryFilter: (category: string) => void;
}

export const FilterTabs = ({
    languageFilter,
    packageFilter,
    categoryFilter,
    setLanguageFilter,
    setPackageFilter,
    setCategoryFilter,
}: FilterTabsProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 mb-8 lg:mb-12 animate-fade-up">
            {/* Category Filter */}
            <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
                <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
                    Category:
                </span>
                {["All", "Renewable Energy", "Electrical Power"].map((category) => (
                    <Button
                        key={category}
                        variant={categoryFilter === category ? "default" : "ghost"}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${categoryFilter === category
                                ? "gradient-primary text-white shadow-md"
                                : "text-muted-foreground hover:gradient-primary hover:text-white"
                            }`}
                    >
                        {category === "Renewable Energy"
                            ? "Renewable Energy"
                            : category === "Electrical Power"
                                ? "Electrical Power"
                                : category}
                    </Button>
                ))}
            </div>

            {/* Language Filter */}
            <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto">
                <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
                    Language:
                </span>
                {["All", "English", "Arabic"].map((lang) => (
                    <Button
                        key={lang}
                        variant={languageFilter === lang ? "default" : "ghost"}
                        onClick={() => setLanguageFilter(lang)}
                        className={`px-3 lg:px-6 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm ${languageFilter === lang
                                ? "gradient-primary text-white shadow-md"
                                : "text-muted-foreground hover:gradient-primary hover:text-white"
                            }`}
                    >
                        <Globe className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                        {lang}
                    </Button>
                ))}
            </div>

            {/* Package Filter */}
            <div className="flex items-center justify-evenly bg-card rounded-lg lg:rounded-xl p-1 shadow-card w-full lg:w-auto overflow-x-auto">
                <span className="text-xs lg:text-sm font-medium text-muted-foreground px-2 lg:px-3 py-1 lg:py-2 whitespace-nowrap">
                    Package:
                </span>
                {["All", "Silver", "Bronze", "Gold"].map((pkg) => (
                    <Button
                        key={pkg}
                        variant={packageFilter === pkg ? "default" : "ghost"}
                        onClick={() => setPackageFilter(pkg)}
                        className={`px-2 lg:px-4 py-1 lg:py-2 rounded-md lg:rounded-lg transition-all text-xs lg:text-sm whitespace-nowrap ${packageFilter === pkg
                                ? "gradient-primary text-white shadow-md"
                                : "text-muted-foreground hover:gradient-primary hover:text-white"
                            }`}
                    >
                        {pkg}
                    </Button>
                ))}
            </div>
        </div>
    );
};