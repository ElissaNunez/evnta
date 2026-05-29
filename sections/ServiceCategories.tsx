import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategoryGroups } from '@/data/mockData';
import {
  Lightbulb, Wine, Palette, Camera, Sparkles, Baby,
  Truck, Church, Building2, Crown, ChevronDown, X, ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Lightbulb, Wine, Palette, Camera, Sparkles, Baby,
  Truck, Church, Building2, Crown,
};

export function ServiceCategories() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeCategory = serviceCategoryGroups.find(g => g.id === activeGroup);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node) &&
          sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveGroup(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeGroup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeGroup]);

  return (
    <section id="categorias" ref={sectionRef} className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Todo para tu evento, <span className="text-purple-600">en un solo lugar</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Más de 90 tipos de servicios organizados en 10 categorías. 
            Selecciona una para explorar sus opciones.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {serviceCategoryGroups.map((group) => {
            const Icon = iconMap[group.icon] || Sparkles;
            const isActive = activeGroup === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(isActive ? null : group.id)}
                className={`relative group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/70 backdrop-blur-sm border-white/60 text-gray-700 hover:bg-white hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isActive ? 'bg-white/20' : 'bg-purple-50 group-hover:bg-purple-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                </div>
                <span className="text-sm font-semibold leading-tight">{group.name}</span>
                <ChevronDown className={`w-4 h-4 mt-2 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Drawer - Subcategories */}
      {activeGroup && activeCategory && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setActiveGroup(null)}
          />
          
          {/* Drawer */}
          <div 
            ref={drawerRef}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-gray-200 max-h-[60vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="px-4 sm:px-6 pb-8 max-w-5xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = iconMap[activeCategory.icon] || Sparkles;
                    return (
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{activeCategory.name}</h3>
                    <p className="text-sm text-gray-500">{activeCategory.subcategories.length} servicios disponibles</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveGroup(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {activeCategory.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/explorar?categoria=${sub.id}`}
                    onClick={() => setActiveGroup(null)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 transition-all group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                    <span className="text-sm text-gray-700 group-hover:text-purple-700 font-medium truncate">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
