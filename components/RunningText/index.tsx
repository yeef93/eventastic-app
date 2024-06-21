import React from "react";
import { ReactNode } from "react";

interface RunningTextProps {
    className?: string;
    children: ReactNode;
}

function RunningText({ children, className }: RunningTextProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-block animate-scroll px-full">{children}</div>
    </div>
  );
}

export default RunningText;
