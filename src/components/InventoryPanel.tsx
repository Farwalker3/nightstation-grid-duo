import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink, ShoppingCart, Package, Coffee, Sofa, Plus, BookOpen, Sparkles } from 'lucide-react';

interface GridCellData {
  id: string;
  x: number;
  y: number;
  type: 'teenage-engineering' | 'kitchen' | 'lounge' | 'future' | 'empty' | 'walkway';
  name?: string;
  products?: Array<{
    id: string;
    name: string;
    price: string;
    link: string;
    stock: 'available' | 'low' | 'out';
    story?: string;
  }>;
}

interface InventoryPanelProps {
  cell: GridCellData;
  onClose: () => void;
}

export function InventoryPanel({ cell, onClose }: InventoryPanelProps) {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const getSectionIcon = () => {
    switch (cell.type) {
      case 'teenage-engineering':
        return <Package className="w-5 h-5" />;
      case 'kitchen':
        return <Coffee className="w-5 h-5" />;
      case 'lounge':
        return <Sofa className="w-5 h-5" />;
      case 'future':
        return <Plus className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStockBadge = (stock: string) => {
    switch (stock) {
      case 'available':
        return (
          <Badge className="bg-inventory-available text-success-foreground text-xs">
            In Stock
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-inventory-low text-secondary-foreground text-xs">
            Low Stock
          </Badge>
        );
      case 'out':
        return (
          <Badge className="bg-inventory-out text-destructive-foreground text-xs">
            Out of Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleProductClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const formatStory = (story: string) => {
    return story.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (selectedStory) {
    const product = cell.products?.find(p => p.story === selectedStory);
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
        <Card className="w-full max-w-2xl max-h-[80vh] bg-gradient-to-br from-card via-card to-card/80 border-primary/20 shadow-2xl animate-scale-in overflow-hidden">
          <div className="p-6 overflow-y-auto max-h-full">
            {/* Story Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-gradient-primary/10 border border-primary/20">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {product?.name} • Grid-90 Tales
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A story from the alternate dimension
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Story Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground/90 text-base leading-7 space-y-4">
                {formatStory(selectedStory)}
              </div>
            </div>

            {/* Story Footer */}
            <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>From the archives of Grid-90</span>
              </div>
              <Button
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="bg-gradient-primary hover:opacity-80"
              >
                Back to Inventory
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md bg-card border-border shadow-product animate-scale-in max-h-[80vh] overflow-hidden">
        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {getSectionIcon()}
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  {cell.name || cell.type}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Grid Position: ({cell.x}, {cell.y})
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Products */}
          {cell.products && cell.products.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-card-foreground">
                Products ({cell.products.length})
              </h4>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {cell.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-lg bg-card-hover border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm text-card-foreground">
                        {product.name}
                      </h5>
                      {getStockBadge(product.stock)}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-primary">
                        {product.price}
                      </span>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProductClick(product.link)}
                          disabled={product.stock === 'out'}
                          className="text-xs"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleProductClick(product.link)}
                          className="p-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Story Button */}
                    {product.story && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedStory(product.story!)}
                        className="w-full mt-2 text-xs bg-gradient-primary/10 hover:bg-gradient-primary/20 border border-primary/20"
                      >
                        <BookOpen className="w-3 h-3 mr-2" />
                        <Sparkles className="w-3 h-3 mr-1" />
                        Read the Grid-90 Tale
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/20 flex items-center justify-center">
                {getSectionIcon()}
              </div>
              <p className="text-sm">
                {cell.type === 'future' ? 'Coming Soon' : 'No products available'}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Click outside to close • Stories from the dimension of Grid-90
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}