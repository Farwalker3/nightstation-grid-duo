import { useState, useEffect } from 'react';
import { StoreSection } from './StoreSection';
import { ProductCard } from './ProductCard';

interface StoreSectionData {
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
}

const initialSections: StoreSectionData[] = [
  {
    id: 'teenage-engineering',
    name: 'Teenage Engineering',
    type: 'products',
    gridSize: { cols: 3, rows: 2 },
    position: { x: 0, y: 0 },
    description: 'The Field System™ & Audio Gear',
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
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen Area',
    type: 'space',
    gridSize: { cols: 2, rows: 2 },
    position: { x: 3, y: 0 },
    description: 'Coffee & Refreshments'
  },
  {
    id: 'lounge',
    name: 'Lounge & Seating',
    type: 'space',
    gridSize: { cols: 2, rows: 1 },
    position: { x: 0, y: 2 },
    description: 'Comfortable Seating Area'
  },
  {
    id: 'future-1',
    name: 'Future Section',
    type: 'future',
    gridSize: { cols: 1, rows: 1 },
    position: { x: 2, y: 2 },
    description: 'Coming Soon'
  },
  {
    id: 'future-2',
    name: 'Future Section',
    type: 'future',
    gridSize: { cols: 2, rows: 1 },
    position: { x: 3, y: 2 },
    description: 'Coming Soon'
  }
];

export function StoreLayout() {
  const [sections, setSections] = useState<StoreSectionData[]>(initialSections);
  const [gridSize, setGridSize] = useState({ cols: 5, rows: 3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setGridSize({ cols: 2, rows: 6 });
        // Adjust sections for mobile layout
        setSections(prev => prev.map((section, index) => ({
          ...section,
          gridSize: { cols: 1, rows: 1 },
          position: { x: index % 2, y: Math.floor(index / 2) }
        })));
      } else {
        setGridSize({ cols: 5, rows: 3 });
        setSections(initialSections);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    console.log(`Clicked section: ${sectionId}`);
  };

  const getGridClasses = () => {
    if (isMobile) {
      return 'grid-cols-2 grid-rows-6';
    }
    return 'grid-cols-5 grid-rows-3';
  };

  const getSectionClasses = (section: StoreSectionData) => {
    if (isMobile) {
      return 'col-span-1 row-span-1';
    }
    
    const colSpan = section.gridSize.cols === 1 ? 'col-span-1' :
                   section.gridSize.cols === 2 ? 'col-span-2' :
                   section.gridSize.cols === 3 ? 'col-span-3' :
                   section.gridSize.cols === 4 ? 'col-span-4' : 'col-span-5';
    
    const rowSpan = section.gridSize.rows === 1 ? 'row-span-1' :
                   section.gridSize.rows === 2 ? 'row-span-2' : 'row-span-3';
    
    return `${colSpan} ${rowSpan}`;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Dotcoon
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            aka Nightstation
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Interactive Store Layout - {isMobile ? 'Mobile' : 'Desktop'} View
          </p>
        </header>

        <div 
          className={`grid gap-4 md:gap-6 auto-rows-fr min-h-[600px] md:min-h-[800px] ${getGridClasses()}`}
        >
          {sections.map((section) => (
            <StoreSection
              key={section.id}
              section={section}
              onClick={() => handleSectionClick(section.id)}
              className={getSectionClasses(section)}
            />
          ))}
        </div>

        <footer className="mt-12 text-center text-muted-foreground">
          <p className="text-sm">
            Store layout adapts to your screen size • Click sections to explore inventory
          </p>
        </footer>
      </div>
    </div>
  );
}