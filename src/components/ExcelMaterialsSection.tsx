import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, FileSpreadsheet, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useCourses } from "@/contexts/CourseContext";
import { useState } from "react";

const MaterialCard = ({ material }: any) => {
    const price = (material.on_sale ? material.sale_price : material.price).toFixed(2);
    const description = material.description || 'Professional Excel Tool for renewable energy projects.';
    //   const description = material.instructor.description || 'Professional Excel template for renewable energy projects.';


    return (
        <Card className="border border-gray-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">

            <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 inline-flex p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors w-fit">
                    <FileSpreadsheet className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                    <Clock className="w-3 h-3" />
                    <span>Premium Material</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl md:text-2xl font-bold text-secondary">${price}</span>
                    <Button
                        size="sm"
                        className=" border border-primary border-[1px] text-primary hover:scale-105 hover:gradient-primary hover:text-white transition-transform "

                        onClick={() => window.location.href = material.link || '#'}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const ExcelMaterialsSection = () => {
    const { getCoursesByCategory, loading } = useCourses();
    const materials = getCoursesByCategory('excel');
    console.log('Excel Materials:', materials);
    // const materials = getCoursesByCategory('renewable-energy');

    const [startIndex, setStartIndex] = useState(0);


    const maxVisible = 3;
    const hasMore = materials.length > maxVisible;
    const visibleMaterials = materials.slice(startIndex, startIndex + maxVisible);

    const handlePrev = () => {
        if (startIndex > 0) setStartIndex(startIndex - 1);
    };

    const handleNext = () => {
        if (startIndex < materials.length - maxVisible) setStartIndex(startIndex + 1);
    };

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-12 lg:mb-16 animate-fade-up">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-4 lg:mb-6">
                        Premium Excel Sizing Tool
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                        Professional-grade Excel Tool designed for renewable energy projects, calculations, and management.
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {loading && <div className="col-span-full text-center py-8 text-muted-foreground">Loading materials...</div>}
                        {!loading && materials.length === 0 && <div className="col-span-full text-center py-8 text-muted-foreground">No materials available.</div>}
                        {!loading && visibleMaterials.map(material => <MaterialCard key={material.id} material={material} />)}
                    </div>

                    {hasMore && !loading && (
                        <div className="flex items-center justify-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrev}
                                disabled={startIndex === 0}
                                className="border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                {startIndex + 1} - {Math.min(startIndex + maxVisible, materials.length)} of {materials.length}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNext}
                                disabled={startIndex >= materials.length - maxVisible}
                                className="border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
