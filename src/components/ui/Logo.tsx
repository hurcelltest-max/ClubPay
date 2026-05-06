import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-md",
        variant === 'dark' ? "bg-primary-600 text-white" : "bg-white text-primary-600"
      )}>
        CP
      </div>
      <span className={cn(
        "text-xl font-extrabold tracking-tight",
        variant === 'dark' ? "text-slate-900" : "text-white"
      )}>
        ClubPay
      </span>
    </div>
  );
}
