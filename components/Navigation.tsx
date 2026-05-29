import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, User, LogOut, ChevronDown, 
  LayoutDashboard, Settings
} from 'lucide-react';
import { BrandName } from '@/components/BrandName';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Explorar', href: '/explorar' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Para proveedores', href: '/proveedores' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'client':
        return '/cliente/dashboard';
      case 'provider':
        return '/proveedor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  const isLandingPage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isLandingPage
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo-evnta-new.png" 
              alt="EVNTA" 
              className="h-8 w-auto object-contain"
            />
            <BrandName className="text-xl" textClass="text-black" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-[100px] truncate">{user?.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/perfil')}>
                      <User className="w-4 h-4 mr-2" />
                      Mi perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/configuracion')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-700"
                  onClick={() => navigate('/login')}
                >
                  Iniciar sesión
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
                  onClick={() => navigate('/crear-evento')}
                >
                  Crear evento
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-gray-200" />
                {isAuthenticated ? (
                  <>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/perfil"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Mi perfil
                    </Link>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="mt-4"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Iniciar sesión
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                      onClick={() => {
                        navigate('/crear-evento');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Crear evento
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
