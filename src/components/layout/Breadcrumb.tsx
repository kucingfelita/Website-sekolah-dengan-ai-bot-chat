import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <li>
          <button
            onClick={() => onNavigate('#/')}
            className="flex items-center hover:text-institution-700 transition-colors text-slate-600"
          >
            <Home className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>Beranda</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              <li>
                {isLast || !item.path ? (
                  <span className="font-semibold text-institution-950 truncate max-w-[200px] sm:max-w-xs block">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate(item.path!)}
                    className="hover:text-institution-700 transition-colors text-slate-600 truncate max-w-[150px] block"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
