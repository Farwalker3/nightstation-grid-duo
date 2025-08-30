import { useState } from 'react';
import { GridCell } from './GridCell';
import { InventoryPanel } from './InventoryPanel';

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

interface StoreGridProps {
  cells: GridCellData[];
  gridSize: { cols: number; rows: number };
  selectedCell: GridCellData | null;
  onCellClick: (cell: GridCellData) => void;
}

export function StoreGrid({ cells, gridSize, selectedCell, onCellClick }: StoreGridProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Main Grid */}
      <div 
        className="grid gap-1 aspect-video bg-store-section/20 p-4 rounded-xl border border-border/30 shadow-store"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
        }}
      >
        {cells.map((cell) => (
          <GridCell
            key={cell.id}
            cell={cell}
            isSelected={selectedCell?.id === cell.id}
            isHovered={hoveredCell === cell.id}
            onClick={() => onCellClick(cell)}
            onMouseEnter={() => setHoveredCell(cell.id)}
            onMouseLeave={() => setHoveredCell(null)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-primary rounded-sm" />
          <span className="text-muted-foreground">Teenage Engineering</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-secondary rounded-sm" />
          <span className="text-muted-foreground">Kitchen</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded-sm" />
          <span className="text-muted-foreground">Lounge</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-muted rounded-sm" />
          <span className="text-muted-foreground">Future</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-border rounded-sm" />
          <span className="text-muted-foreground">Walkway</span>
        </div>
      </div>

      {/* Inventory Panel */}
      {selectedCell && (
        <InventoryPanel
          cell={selectedCell}
          onClose={() => onCellClick(selectedCell)}
        />
      )}
    </div>
  );
}