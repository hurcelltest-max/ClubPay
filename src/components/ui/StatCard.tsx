import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'orange' | 'green' | 'purple' | 'slate';
  className?: string;
}

const colorMap = {
  primary: 'bg-primary-50 text-primary-600',
  orange: 'bg-orange-50 text-orange-600',
  green: 'bg-emerald-50 text-emerald-600',
  purple: 'bg-purple-50 text-purple-600',
  slate: 'bg-slate-100 text-slate-600'
};

export function StatCard({ title, value, icon: Icon, trend, trendDirection = 'up', color = 'primary', className }: StatCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-card border border-slate-100 hover:shadow-float transition-all duration-300", className)}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorMap[color])}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
      </div>
      {trend && (
        <div className={cn(
          "text-sm font-medium flex items-center gap-1",
          trendDirection === 'up' ? "text-emerald-600" : trendDirection === 'down' ? "text-orange-600" : "text-slate-500"
        )}>
          {trend}
        </div>
      )}
    </div>
  );
}
