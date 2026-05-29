import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { BrandName } from '@/components/BrandName';

const footerLinks = {
  clientes: [
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Crear evento', href: '/crear-evento' },
    { label: 'Buscar proveedores', href: '/explorar' },
    { label: 'Preguntas frecuentes', href: '/terminos' },
  ],
  proveedores: [
    { label: 'Registrarse', href: '/registro-proveedor' },
    { label: 'Precios', href: '/#precios' },
    { label: 'Centro de ayuda', href: '/aviso-legal' },
    { label: 'Cancelaciones', href: '/cancelacion' },
  ],
  herramientas: [
    { label: 'Contratos Digitales', href: '/contratos' },
    { label: 'Centro de Disputas', href: '/disputas' },
    { label: 'Crear evento', href: '/crear-evento' },
  ],
  legal: [
    { label: 'Términos y Condiciones', href: '/terminos' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Aviso Legal', href: '/aviso-legal' },
    { label: 'Cancelaciones', href: '/cancelacion' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/logo-evnta-new.png" 
                alt="EVNTA" 
                className="h-10 w-auto object-contain"
              />
              <BrandName className="text-xl" textClass="text-white" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              La plataforma líder para planificar y contratar servicios de eventos en México. 
              Conectamos clientes con los mejores proveedores locales.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:hola@eventhub.mx" 
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hola@eventhub.mx
              </a>
              <a 
                href="tel:+525512345678" 
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +52 55 1234 5678
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                Ciudad de México, México
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Para clientes</h4>
            <ul className="space-y-3">
              {footerLinks.clientes.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Para proveedores</h4>
            <ul className="space-y-3">
              {footerLinks.proveedores.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Herramientas</h4>
            <ul className="space-y-3">
              {footerLinks.herramientas.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 EVNTA. Todos los derechos reservados.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all hover:scale-110"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
