
import { 
  Hero, 
  HowItWorks, 
  EventBuilder, 
  ServiceCategories, 
  FeaturedProviders, 
  Testimonials, 
  Pricing, 
  CTABanner, 
  Footer 
} from '@/sections';

export function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <EventBuilder />
      <ServiceCategories />
      <FeaturedProviders />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </main>
  );
}
