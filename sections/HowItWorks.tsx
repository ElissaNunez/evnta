import { useEffect, useRef } from 'react';
import { Calendar, ListChecks, Sparkles, PartyPopper } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    number: '01',
    title: 'Crea tu evento',
    description: 'Cuéntanos qué tipo de evento quieres, fecha, ubicación y presupuesto.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: ListChecks,
    number: '02',
    title: 'Selecciona servicios',
    description: 'Elige entre mobiliario, banquete, música, decoración y más.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Recibe propuestas',
    description: 'Nuestro sistema encuentra los mejores proveedores disponibles.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: PartyPopper,
    number: '04',
    title: 'Reserva y disfruta',
    description: 'Confirma tu reserva y nosotros nos encargamos del resto.',
    color: 'from-green-500 to-green-600',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.step-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600">
            Organiza tu evento en 4 simples pasos
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="step-card opacity-0 translate-y-8 transition-all duration-600 group"
            >
              <div className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                )}

                {/* Card */}
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 h-full hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-gray-100">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Number */}
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500 opacity-20">
                    {step.number}
                  </span>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
