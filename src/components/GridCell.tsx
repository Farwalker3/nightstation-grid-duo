import { cn } from '@/lib/utils';

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
  }>;
}

interface GridCellProps {
  cell: GridCellData;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function GridCell({ 
  cell, 
  isSelected, 
  isHovered, 
  onClick, 
  onMouseEnter, 
  onMouseLeave 
}: GridCellProps) {
  const getCellStyles = () => {
    const baseStyles = "aspect-square transition-all duration-200 rounded-sm border";
    
    switch (cell.type) {
      case 'teenage-engineering':
        return cn(
          baseStyles,
          "bg-gradient-primary cursor-pointer hover:scale-110 hover:z-10 relative",
          "border-primary/30 hover:border-primary shadow-sm hover:shadow-glow-primary",
          isSelected && "scale-110 z-10 shadow-glow-primary animate-pulse-glow",
          isHovered && "brightness-110"
        );
      
      case 'kitchen':
        return cn(
          baseStyles,
          "bg-gradient-secondary cursor-pointer hover:scale-110 hover:z-10 relative",
          "border-secondary/30 hover:border-secondary shadow-sm hover:shadow-glow-secondary",
          isSelected && "scale-110 z-10 shadow-glow-secondary animate-pulse-glow",
          isHovered && "brightness-110"
        );
      
      case 'lounge':
        return cn(
          baseStyles,
          "bg-accent cursor-pointer hover:scale-110 hover:z-10 relative",
          "border-accent/30 hover:border-accent shadow-sm",
          isSelected && "scale-110 z-10 shadow-product animate-pulse-glow",
          isHovered && "brightness-110"
        );
      
      case 'future':
        return cn(
          baseStyles,
          "bg-muted cursor-pointer hover:scale-105 hover:z-10 relative",
          "border-muted-foreground/20 hover:border-muted-foreground/40",
          "opacity-60 hover:opacity-80",
          isSelected && "scale-105 z-10 opacity-100",
          isHovered && "brightness-110"
        );
      
      case 'walkway':
        return cn(
          baseStyles,
          "bg-border/50 border-border/30"
        );
      
      case 'empty':
      default:
        return cn(
          baseStyles,
          "bg-background/20 border-border/10"
        );
    }
  };

  // Stock indicator for product sections
  const getStockIndicator = () => {
    if (!cell.products || cell.products.length === 0) return null;
    
    const availableCount = cell.products.filter(p => p.stock === 'available').length;
    const lowCount = cell.products.filter(p => p.stock === 'low').length;
    
    if (availableCount > 0) {
      return <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-inventory-available rounded-full" />;
    } else if (lowCount > 0) {
      return <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-inventory-low rounded-full" />;
    } else {
      return <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-inventory-out rounded-full" />;
    }
  };

  const isInteractive = cell.type !== 'empty' && cell.type !== 'walkway';

  return (
    <div
      className={getCellStyles()}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={isInteractive ? onMouseEnter : undefined}
      onMouseLeave={isInteractive ? onMouseLeave : undefined}
      title={cell.name || cell.type}
    >
      {getStockIndicator()}
      
      {/* Hover tooltip */}
      {isHovered && cell.name && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg whitespace-nowrap z-20 animate-fade-in">
          {cell.name}
          {cell.products && (
            <div className="text-xs opacity-75">{cell.products.length} items</div>
          )}
        </div>
      )}
    </div>
  );
}