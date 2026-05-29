import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Search, MapPin, Star, Filter,
  Sofa, UtensilsCrossed, Cake, Palette, Music, Camera
} from 'lucide-react';
import { mockProviders, serviceCategories } from '@/data/mockData';

const serviceIcons: Record<string, React.ElementType> = {
  mobiliario: Sofa,
  banquete: UtensilsCrossed,
  reposteria: Cake,
  decoracion: Palette,
  musica: Music,
  fotografia: Camera,
  locacion: MapPin,
  entretenimiento: Star,
};

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Filter providers
  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.categories.includes(selectedCategory as any);
    const matchesPrice = provider.services.some(s => s.price >= priceRange[0] && s.price <= priceRange[1]);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortBy === 'price_low') {
      const aMin = Math.min(...a.services.map(s => s.price));
      const bMin = Math.min(...b.services.map(s => s.price));
      return aMin - bMin;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar proveedores</h1>
          <p className="text-gray-600">Encuentra los mejores proveedores para tu evento</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categorías</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Todas las categorías
                </button>
                {serviceCategories.map((cat) => {
                  const Icon = serviceIcons[cat.id] || Star;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory === cat.id ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Rango de precio</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                step={5000}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Valoración</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <button
                    key={rating}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">o más</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar proveedores..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                    <SelectItem value="reviews">Más reseñas</SelectItem>
                    <SelectItem value="price_low">Precio: menor a mayor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-500 mb-4">
              {sortedProviders.length} proveedores encontrados
            </p>

            {/* Providers Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {sortedProviders.map((provider) => (
                <Link key={provider.id} to={`/proveedor/${provider.id}`}>
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group">
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={provider.portfolio[0] || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop'}
                        alt={provider.businessName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {provider.isVerified && (
                        <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                          Verificado
                        </Badge>
                      )}

                      {/* Rating */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-gray-900">{provider.rating}</span>
                        </div>
                        <span className="text-white/80 text-sm">({provider.reviewCount})</span>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {provider.businessName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {provider.description}
                      </p>

                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        {provider.location}
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.categories.slice(0, 3).map((cat) => (
                          <Badge key={cat} variant="secondary" className="bg-purple-50 text-purple-700">
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <span className="text-sm text-gray-500">Desde</span>
                          <p className="font-semibold text-gray-900">
                            ${Math.min(...provider.services.map(s => s.price)).toLocaleString()} MXN
                          </p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                          Ver perfil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedProviders.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron proveedores</h3>
                <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
