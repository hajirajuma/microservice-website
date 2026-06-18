import * as React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export function Alert({ variant = "default", className = "", ...props }: AlertProps) {
  const base = "rounded-md p-3 border";
  const variants =
    variant === "destructive"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-muted/50 border-muted-200 text-muted-foreground";

  return <div className={`${base} ${variants} ${className}`} {...props} />;
}

export function AlertDescription({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Alert;
