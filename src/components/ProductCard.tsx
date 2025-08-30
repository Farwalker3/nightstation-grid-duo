import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    image?: string;
    link: string;
    stock: 'available' | 'low' | 'out';
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const getStockBadge = () => {
    switch (product.stock) {
      case 'available':
        return (
          <Badge className="bg-inventory-available text-inventory-available-foreground">
            In Stock
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-inventory-low text-inventory-low-foreground">
            Low Stock
          </Badge>
        );
      case 'out':
        return (
          <Badge className="bg-inventory-out text-inventory-out-foreground">
            Out of Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(product.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="p-3 hover:bg-card-hover transition-colors duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-card-foreground text-sm truncate">
              {product.name}
            </h4>
            {getStockBadge()}
          </div>
          <p className="text-lg font-bold text-primary">
            {product.price}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
          <Button
            size="sm"
            variant="product"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleProductClick}
            disabled={product.stock === 'out'}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Buy
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="p-1 hover:bg-primary/10"
            onClick={handleProductClick}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}