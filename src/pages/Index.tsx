import { StoreLayout } from '@/components/StoreLayout';
import heroImage from '@/assets/store-hero.jpg';

const Index = () => {
  return (
    <>
      {/* SEO Meta */}
      <title>Dotcoon Store Layout - Interactive Tech Store Grid | Nightstation</title>
      <meta 
        name="description" 
        content="Explore Dotcoon's smart, resizable store layout featuring Teenage Engineering products, kitchen area, and lounge space. Interactive inventory system with real-time stock updates." 
      />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dotcoon
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-secondary mb-4 font-medium">
            aka Nightstation
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Smart, resizable store layout that adapts to any screen. 
            Explore our interactive inventory system featuring premium tech gear.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="px-6 py-3 bg-gradient-primary rounded-lg text-primary-foreground font-semibold">
              Interactive Store Grid
            </div>
            <div className="px-6 py-3 bg-gradient-secondary rounded-lg text-secondary-foreground font-semibold">
              Real-time Inventory
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Store Layout Section */}
      <StoreLayout />
    </>
  );
};

export default Index;