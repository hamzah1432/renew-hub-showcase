import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="text-center py-20">
      <p className="text-lg text-red-600 mb-4">{error}</p>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white"
      >
        Try Again
      </Button>
    </div>
  );
};