import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

interface LegalTemplateProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalTemplate({ title, lastUpdated, children }: LegalTemplateProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 text-gray-600 -ml-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Última actualización: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-10 border border-white/60">
          <div className="prose prose-purple max-w-none legal-content">
            {children}
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/terminos" className="text-purple-600 hover:underline">Términos y Condiciones</Link>
          <span className="text-gray-300">|</span>
          <Link to="/privacidad" className="text-purple-600 hover:underline">Privacidad</Link>
          <span className="text-gray-300">|</span>
          <Link to="/cookies" className="text-purple-600 hover:underline">Cookies</Link>
          <span className="text-gray-300">|</span>
          <Link to="/aviso-legal" className="text-purple-600 hover:underline">Aviso Legal</Link>
          <span className="text-gray-300">|</span>
          <Link to="/cancelacion" className="text-purple-600 hover:underline">Cancelaciones</Link>
        </div>
      </div>
    </div>
  );
}
