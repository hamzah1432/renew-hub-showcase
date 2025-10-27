import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary mb-4" />
        <p className="text-xl text-muted-foreground font-medium">Loading courses...</p>
        <p className="text-sm text-muted-foreground/70 mt-2">Please wait while we fetch the latest content</p>
      </div>
    </div>
  );
};