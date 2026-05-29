import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProviders } from '@/data/mockData';

export function FeaturedProviders() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const featuredProviders = mockProviders.filter(p => p.isFeatured);

  return (
    <section className="py-20 lg:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-8 transition-all duration-600 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Proveedores destacados
            </h2>
            <p className="text-lg text-gray-600">
              Los mejor valorados por nuestra comunidad
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full border-gray-300 hover:bg-white hover:border-purple-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full border-gray-300 hover:bg-white hover:border-purple-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredProviders.map((provider, index) => (
            <Card 
              key={provider.id}
              className="flex-shrink-0 w-[320px] snap-start bg-white/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={provider.portfolio[0] || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop'}
                  alt={provider.businessName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Verified Badge */}
                {provider.isVerified && (
                  <Badge className="absolute top-3 right-3 bg-blue-500 text-white border-0">
                    Verificado
                  </Badge>
                )}

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">{provider.rating}</span>
                  </div>
                  <span className="text-sm text-white/80">({provider.reviewCount})</span>
                </div>
              </div>

              <CardContent className="p-5">
                {/* Provider Info */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-purple-100">
                    <AvatarImage src={provider.portfolio[0]} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      {provider.businessName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                      {provider.businessName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{provider.location}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.categories.slice(0, 2).map((cat) => (
                    <Badge 
                      key={cat} 
                      variant="secondary"
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                    >
                      {cat}
                    </Badge>
                  ))}
                  {provider.categories.length > 2 && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      +{provider.categories.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Desde</p>
                    <p className="font-semibold text-gray-900">
                      ${provider.services[0]?.price?.toLocaleString() || '0'} MXN
                    </p>
                  </div>
                  <Link to={`/proveedor/${provider.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Ver perfil
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
