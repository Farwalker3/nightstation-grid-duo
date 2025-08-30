import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from './ProductCard';
import { InventoryStatus } from './InventoryStatus';
import { ExternalLink, Package, Coffee, Sofa, Plus } from 'lucide-react';

interface StoreSectionProps {
  section: {
    id: string;
    name: string;
    type: 'products' | 'space' | 'future';
    gridSize: { cols: number; rows: number };
    position: { x: number; y: number };
    products?: Array<{
      id: string;
      name: string;
      price: string;
      image?: string;
      link: string;
      stock: 'available' | 'low' | 'out';
    }>;
    description?: string;
  };
  onClick: () => void;
  className?: string;
}

export function StoreSection({ section, onClick, className }: StoreSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getSectionIcon = () => {
    switch (section.type) {
      case 'products':
        return <Package className="w-6 h-6" />;
      case 'space':
        return section.name.toLowerCase().includes('kitchen') ? 
          <Coffee className="w-6 h-6" /> : <Sofa className="w-6 h-6" />;
      case 'future':
        return <Plus className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getSectionVariant = () => {
    switch (section.type) {
      case 'products':
        return 'bg-gradient-primary';
      case 'space':
        return 'bg-gradient-secondary';
      case 'future':
        return 'bg-gradient-store';
      default:
        return 'bg-gradient-store';
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick();
  };

  const totalStock = section.products?.reduce((acc, product) => {
    if (product.stock === 'available') return acc + 1;
    if (product.stock === 'low') return acc + 0.5;
    return acc;
  }, 0) || 0;

  return (
    <Card
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 ease-smooth
        ${getSectionVariant()} p-0 border-border/50
        hover:scale-105 hover:shadow-store hover:border-primary/50
        ${isExpanded ? 'shadow-product border-primary' : 'shadow-section'}
        ${isHovered ? 'animate-float' : ''}
        ${className}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-card/20 backdrop-blur-sm">
              {getSectionIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground text-sm md:text-base">
                {section.name}
              </h3>
              {section.description && (
                <p className="text-xs text-card-foreground/70">
                  {section.description}
                </p>
              )}
            </div>
          </div>
          
          {section.type === 'products' && (
            <InventoryStatus stock={totalStock} />
          )}
        </div>

        {/* Products Grid */}
        {section.products && section.products.length > 0 && (
          <div className="flex-1 space-y-2">
            {isExpanded ? (
              <div className="grid grid-cols-1 gap-2">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-xs text-card-foreground/60">
                  {section.products.length} products available
                </p>
                <div className="flex flex-wrap gap-1">
                  {section.products.slice(0, 2).map((product) => (
                    <Badge key={product.id} variant="secondary" className="text-xs">
                      {product.name}
                    </Badge>
                  ))}
                  {section.products.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{section.products.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Future Section Content */}
        {section.type === 'future' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted/20 flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
        )}

        {/* External Link Indicator */}
        {section.products && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-card-foreground/50" />
          </div>
        )}
      </div>
    </Card>
  );
}