import { useState, useEffect } from 'react';
import { StoreGrid } from './StoreGrid';

interface GridCell {
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

export function StoreLayout() {
  const [gridSize, setGridSize] = useState({ cols: 16, rows: 10 });
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);

  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate optimal grid size based on viewport
      if (width < 640) {
        setGridSize({ cols: 10, rows: 6 });
      } else if (width < 768) {
        setGridSize({ cols: 12, rows: 7 });
      } else if (width < 1024) {
        setGridSize({ cols: 14, rows: 8 });
      } else if (width < 1280) {
        setGridSize({ cols: 16, rows: 9 });
      } else {
        setGridSize({ cols: 18, rows: 10 });
      }
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  // Create the grid layout
  const createGrid = (): GridCell[] => {
    const cells: GridCell[] = [];
    
    for (let y = 0; y < gridSize.rows; y++) {
      for (let x = 0; x < gridSize.cols; x++) {
        let cell: GridCell = {
          id: `${x}-${y}`,
          x,
          y,
          type: 'empty'
        };

        // Teenage Engineering section (top-left, adaptive size)
        const teWidth = Math.floor(gridSize.cols * 0.25);
        const teHeight = Math.floor(gridSize.rows * 0.3);
        if (x >= 1 && x <= teWidth && y >= 1 && y <= teHeight) {
          cell = {
            ...cell,
            type: 'teenage-engineering',
            name: 'Teenage Engineering Field System™',
            products: [
              {
                id: 'field-desk',
                name: 'Field Desk',
                price: '$1,200',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available'
              },
              {
                id: 'field-case',
                name: 'Field Case',
                price: '$400',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'low'
              },
              {
                id: 'op-1-field',
                name: 'OP-1 Field',
                price: '$2,300',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available'
              },
              {
                id: 'tx-6',
                name: 'TX-6',
                price: '$1,200',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available'
              }
            ]
          };
        }
        
        // Kitchen area (top-right, adaptive)
        const kitchenStart = gridSize.cols - Math.floor(gridSize.cols * 0.2);
        const kitchenHeight = Math.floor(gridSize.rows * 0.25);
        if (x >= kitchenStart && x <= gridSize.cols - 2 && y >= 1 && y <= kitchenHeight) {
          cell = {
            ...cell,
            type: 'kitchen',
            name: 'Kitchen & Coffee Bar'
          };
        }
        
        // Lounge area (bottom-left, adaptive)
        const loungeWidth = Math.floor(gridSize.cols * 0.2);
        const loungeStart = gridSize.rows - Math.floor(gridSize.rows * 0.3);
        if (x >= 1 && x <= loungeWidth && y >= loungeStart && y <= gridSize.rows - 2) {
          cell = {
            ...cell,
            type: 'lounge',
            name: 'Lounge & Seating Area'
          };
        }
        
        // Future sections (adaptive positioning)
        if (
          (x >= Math.floor(gridSize.cols * 0.4) && x <= Math.floor(gridSize.cols * 0.6) && y >= 2 && y <= Math.floor(gridSize.rows * 0.4)) ||
          (x >= Math.floor(gridSize.cols * 0.7) && x <= Math.floor(gridSize.cols * 0.85) && y >= Math.floor(gridSize.rows * 0.5) && y <= Math.floor(gridSize.rows * 0.7)) ||
          (x >= Math.floor(gridSize.cols * 0.3) && x <= Math.floor(gridSize.cols * 0.5) && y >= gridSize.rows - 3 && y <= gridSize.rows - 2)
        ) {
          cell = {
            ...cell,
            type: 'future',
            name: 'Future Section'
          };
        }
        
        // Walkways (creating paths through the store)
        if (
          (x === 0 || x === gridSize.cols - 1 || y === 0 || y === gridSize.rows - 1) || // perimeter
          (x === Math.floor(gridSize.cols * 0.35) && y >= 1 && y <= gridSize.rows - 2) || // vertical walkway
          (y === Math.floor(gridSize.rows * 0.5) && x >= 1 && x <= gridSize.cols - 2) // horizontal walkway
        ) {
          cell = {
            ...cell,
            type: 'walkway'
          };
        }

        cells.push(cell);
      }
    }
    
    return cells;
  };

  const gridCells = createGrid();

  const handleCellClick = (cell: GridCell) => {
    if (cell.type !== 'empty' && cell.type !== 'walkway') {
      setSelectedCell(selectedCell?.id === cell.id ? null : cell);
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Compact Header */}
      <header className="text-center py-2 px-4 flex-shrink-0">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dotcoon Store Map
        </h1>
        <p className="text-sm md:text-base text-secondary font-medium">
          aka Nightstation
        </p>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Interactive Grid Layout • Click sections to explore inventory
        </p>
      </header>

      {/* Main Grid Container - Takes remaining space */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4 min-h-0">
        <div className="w-full h-full max-w-none">
          <StoreGrid
            cells={gridCells}
            gridSize={gridSize}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
          />
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="text-center text-xs text-muted-foreground py-1 px-4 flex-shrink-0 hidden md:block">
        Grid: {gridSize.cols}×{gridSize.rows} • Responsive Store Layout
      </footer>
    </div>
  );
}