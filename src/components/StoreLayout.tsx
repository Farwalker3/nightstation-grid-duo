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
      if (width < 640) {
        setGridSize({ cols: 12, rows: 8 });
      } else if (width < 1024) {
        setGridSize({ cols: 14, rows: 9 });
      } else {
        setGridSize({ cols: 16, rows: 10 });
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

        // Teenage Engineering section (top-left, 4x3)
        if (x >= 1 && x <= 4 && y >= 1 && y <= 3) {
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
        
        // Kitchen area (top-right, 3x2)
        else if (x >= gridSize.cols - 4 && x <= gridSize.cols - 2 && y >= 1 && y <= 2) {
          cell = {
            ...cell,
            type: 'kitchen',
            name: 'Kitchen & Coffee Bar'
          };
        }
        
        // Lounge area (bottom-left, 3x2)
        else if (x >= 1 && x <= 3 && y >= gridSize.rows - 3 && y <= gridSize.rows - 2) {
          cell = {
            ...cell,
            type: 'lounge',
            name: 'Lounge & Seating Area'
          };
        }
        
        // Future sections scattered around
        else if (
          (x >= 6 && x <= 8 && y >= 2 && y <= 3) ||
          (x >= 10 && x <= 11 && y >= 4 && y <= 5) ||
          (x >= 5 && x <= 6 && y >= gridSize.rows - 2 && y <= gridSize.rows - 1)
        ) {
          cell = {
            ...cell,
            type: 'future',
            name: 'Future Section'
          };
        }
        
        // Walkways (creating paths through the store)
        else if (
          (x === 0 || x === gridSize.cols - 1 || y === 0 || y === gridSize.rows - 1) || // perimeter
          (x === 5 && y >= 1 && y <= gridSize.rows - 2) || // vertical walkway
          (y === 4 && x >= 1 && x <= gridSize.cols - 2) // horizontal walkway
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
    <div className="min-h-screen bg-background p-4 flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Dotcoon Store Map
        </h1>
        <p className="text-lg text-secondary font-medium mb-1">
          aka Nightstation
        </p>
        <p className="text-sm text-muted-foreground">
          Interactive Grid Layout • Click sections to explore inventory
        </p>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <StoreGrid
            cells={gridCells}
            gridSize={gridSize}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
          />
        </div>
      </div>

      <footer className="text-center text-xs text-muted-foreground mt-4">
        Grid: {gridSize.cols}×{gridSize.rows} • Responsive Store Layout
      </footer>
    </div>
  );
}