import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <Loader2
      className={`animate-spin text-muted-foreground ${className}`}
      size={size}
      strokeWidth={2.5}
    />
  );
};

export default LoadingSpinner;
