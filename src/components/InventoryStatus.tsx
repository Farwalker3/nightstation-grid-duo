import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface InventoryStatusProps {
  stock: number;
}

export function InventoryStatus({ stock }: InventoryStatusProps) {
  const getStatusInfo = () => {
    if (stock >= 2) {
      return {
        icon: <CheckCircle className="w-3 h-3" />,
        text: 'Well Stocked',
        className: 'bg-inventory-available text-success-foreground'
      };
    } else if (stock >= 1) {
      return {
        icon: <AlertCircle className="w-3 h-3" />,
        text: 'Low Stock',
        className: 'bg-inventory-low text-secondary-foreground'
      };
    } else {
      return {
        icon: <XCircle className="w-3 h-3" />,
        text: 'Out of Stock',
        className: 'bg-inventory-out text-destructive-foreground'
      };
    }
  };

  const status = getStatusInfo();

  return (
    <Badge className={`${status.className} flex items-center space-x-1 text-xs`}>
      {status.icon}
      <span>{status.text}</span>
    </Badge>
  );
}