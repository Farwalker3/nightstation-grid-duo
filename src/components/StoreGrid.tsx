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
    story?: string;
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
    <div className="h-full w-full flex flex-col">
      {/* Main Grid - Optimized to fill more screen space */}
      <div className="flex-1 flex items-center justify-center p-1 md:p-2">
        <div 
          className="grid gap-0.5 md:gap-1 bg-store-section/20 p-1 md:p-3 rounded-lg md:rounded-xl border border-border/30 shadow-store w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            maxHeight: '85vh',
            maxWidth: '95vw',
            aspectRatio: `${gridSize.cols} / ${gridSize.rows}`
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
      </div>

      {/* Compact Legend - Minimal space usage */}
      <div className="flex-shrink-0 mt-1 md:mt-2">
        <div className="flex flex-wrap gap-1 md:gap-2 justify-center text-xs px-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-primary rounded-sm" />
            <span className="text-muted-foreground text-xs">TE</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-secondary rounded-sm" />
            <span className="text-muted-foreground text-xs">Kitchen</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-sm" />
            <span className="text-muted-foreground text-xs">Lounge</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-muted rounded-sm" />
            <span className="text-muted-foreground text-xs">Future</span>
          </div>
          <div className="flex items-center space-x-1 hidden sm:flex">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-border rounded-sm" />
            <span className="text-muted-foreground text-xs">Path</span>
          </div>
        </div>
      </div>

      {/* Inventory Panel - Overlay */}
      {selectedCell && (
        <InventoryPanel
          cell={selectedCell}
          onClose={() => onCellClick(selectedCell)}
        />
      )}
    </div>
  );
}