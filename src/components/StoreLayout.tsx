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
    story?: string;
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
                id: 'computer-2',
                name: 'Computer-2',
                price: '$0',
                link: 'https://teenage.engineering/store/computer-2',
                stock: 'out',
                story: `In the neon-soaked dimension of Grid-90, where data streams flow like aurora through fiber-optic forests, there lived a young dreamer named Zara. She spent her nights in abandoned server farms, the hum of cooling fans her lullaby, crafting beats on makeshift terminals.\n\nOne evening, while exploring the ruins of the old Corporate Towers, she discovered something extraordinary—a translucent case glowing with soft internal light. Inside, circuits danced like constellations, and when she touched it, the Computer-2 whispered stories of rebellion through its mini-ITX heart.\n\n"I am not just a machine," it hummed in frequencies only dreamers could hear. "I am possibility. I am the quiet revolution in your backpack, the studio in your tent, the future you carry to mountain peaks and midnight coding sessions."\n\nZara smiled, understanding. In this world where mega-corporations tried to control creativity, the Computer-2 was different. Small enough to hide, powerful enough to dream, transparent enough to trust. It didn't demand a desk or a corner office—it wanted to travel, to create, to be part of adventures.\n\nTogether, they would build something beautiful. Not in boardrooms or glass towers, but around campfires and in cozy corners, where the best ideas are born from quiet moments and wild imagination.\n\nThe Computer-2 wasn't just hardware. It was hope, crystallized in plastic and silicon, waiting for the next dreamer to pick it up and change the world, one gentle keystroke at a time.`
              },
              {
                id: 'field-desk',
                name: 'Field Desk',
                price: '$1,200',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available',
                story: `In the quiet hours before dawn, when the world holds its breath, Maya sets up her Field Desk by the lake. The aluminum surface catches the first light, transforming into a portal between dreams and reality.\n\nThis isn't just furniture—it's a launching pad for ideas that refuse to wait for office hours. Every cable groove tells a story of late-night sessions, every adjustment speaks of finding the perfect angle for creativity to flow.\n\nThe desk remembers every beat, every melody, every moment of pure inspiration that happened upon its surface.`
              },
              {
                id: 'field-case',
                name: 'Field Case',
                price: '$400',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'low',
                story: `Alex carries the Field Case like a treasure chest of possibilities. Inside, dreams are organized with surgical precision—each cable, each device, each tool waiting for its moment to shine.\n\nOn trains, in forests, on rooftops overlooking sleeping cities, the case opens to reveal not just equipment, but a complete creative universe. Compact, protected, always ready for the next adventure.\n\nIt's the difference between having ideas and being able to act on them, anywhere, anytime.`
              },
              {
                id: 'op-1-field',
                name: 'OP-1 Field',
                price: '$2,300',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available',
                story: `In the dimension where music grows on trees and melodies flow like rivers, the OP-1 Field is both compass and map. Its screen glows with the warmth of possibility, each key a stepping stone across the creative void.\n\nLuna discovered hers in a thrift shop that existed only on Tuesdays, run by an old woman who claimed to trade in dreams. "This one's special," she whispered, "it remembers every song that was never finished and helps you complete them."\n\nNow Luna travels the world, the OP-1 Field her constant companion, turning waiting rooms into recording studios and park benches into concert halls. The music it makes doesn't just fill the air—it fills the spaces between heartbeats, the pauses between thoughts, the quiet moments where magic lives.`
              },
              {
                id: 'tx-6',
                name: 'TX-6',
                price: '$1,200',
                link: 'https://teenage.engineering/products/field-system',
                stock: 'available',
                story: `The TX-6 sits quietly in River's backpack, patient as a cat, powerful as a storm. In coffee shops and on mountain trails, it transforms the ordinary into the extraordinary, mixing reality with dreams until you can't tell where one ends and the other begins.\n\nSix channels of pure possibility, each one a doorway to somewhere new. River learned that the best mixes happen not in studios, but in the spaces between—on night buses, in 24-hour diners, wherever inspiration strikes and refuses to wait for permission.`
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
          Interactive Grid Layout • Click sections to explore inventory & stories
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
        Grid: {gridSize.cols}×{gridSize.rows} • Responsive Store Layout • Stories from Grid-90
      </footer>
    </div>
  );
}