const fs = require('fs');
const lucide = require('lucide-react');

const desiredIcons = [
  // Events & Decor
  'Cake', 'CakeSlice', 'Calendar', 'CalendarCheck', 'CalendarClock', 'CalendarDays', 'CalendarHeart', 
  'Camera', 'ChefHat', 'Flower', 'Flower2', 'GlassWater', 'HeartHandshake', 'MapPin', 'Mic', 'Mic2', 
  'Music', 'Palette', 'PartyPopper', 'Tent', 'Ticket', 'Utensils', 'UtensilsCrossed', 'Wine', 
  'Video', 'Users', 'UsersRound', 'Church', 'Castle', 'Sparkles', 'Sun', 'Moon', 'Cloud',
  
  // Gifts & Commerce
  'Archive', 'Award', 'BadgeCent', 'BadgeDollarSign', 'BadgePercent', 'Banknote', 'Box', 
  'Briefcase', 'CircleDollarSign', 'Coins', 'CreditCard', 'Crown', 'Diamond', 'Gem', 'Gift', 
  'Heart', 'Landmark', 'Medal', 'Package', 'PackageOpen', 'Receipt', 'Ribbon', 'Rosette', 
  'ShoppingBag', 'ShoppingCart', 'Star', 'Store', 'Tag', 'Tags', 'TicketPercent', 'Trophy', 
  'Truck', 'Wallet', 'PackageCheck', 'PackagePlus',
  
  // Dates, Nuts & Food
  'Apple', 'Banana', 'Bean', 'Carrot', 'Cherry', 'Citrus', 'Coffee', 'Croissant', 'CupSoda', 
  'Drumstick', 'Egg', 'Fish', 'Grape', 'Leaf', 'Lollipop', 'Milk', 'Nut', 'Pizza', 'Popcorn', 
  'Sandwich', 'Soup', 'Sprout', 'TreeDeciduous', 'TreePine', 'Trees', 'Wheat', 'Candy', 
  'CandyCane', 'Martini', 'Beer', 'Salad',
  
  // Lifestyle & Decor
  'Armchair', 'Bed', 'BedDouble', 'Bell', 'Brush', 'Building', 'Building2', 'CheckCircle', 
  'CheckSquare', 'Clock', 'Compass', 'Crosshair', 'DoorClosed', 'DoorOpen', 'Flame', 
  'Globe', 'Home', 'ImageIcon', 'Key', 'Lamp', 'Lightbulb', 'Lock', 'Mail', 'Map', 'Paintbrush', 'PaintRoller', 'Pen', 
  'PenTool', 'Phone', 'Puzzle', 'Scissors', 'Shield', 'Smile', 'Snowflake', 'Sofa', 'Sunrise', 
  'Sunset', 'Telescope', 'Timer', 'Umbrella', 'Watch', 'Zap', 'Anchor', 'Droplet', 
  'Feather', 'Glasses', 'HeartPulse', 'Infinity', 'Palmtree'
];

// Special mapping for alias
const actualExports = Object.keys(lucide);
const validIcons = [];
const importAliases = [];
const mapEntries = [];

for (const icon of desiredIcons) {
  if (icon === 'ImageIcon') {
    if (actualExports.includes('Image')) {
      importAliases.push('Image as ImageIcon');
      validIcons.push('ImageIcon');
      mapEntries.push('ImageIcon');
    }
  } else {
    if (actualExports.includes(icon)) {
      importAliases.push(icon);
      validIcons.push(icon);
      mapEntries.push(icon);
    } else {
      console.log('Missing in lucide-react:', icon);
    }
  }
}

const fileContent = `import { 
  ${importAliases.join(',\n  ')}
} from 'lucide-react';
import React from 'react';

// Centralized icon map for dynamic rendering
export const IconMap: Record<string, React.ElementType> = {
  ${mapEntries.join(',\n  ')}
};

// Available icons for the Admin Picker
export const availableIcons = Object.keys(IconMap);
`;

fs.writeFileSync('src/lib/icons.ts', fileContent);
console.log('Fixed src/lib/icons.ts successfully with ' + validIcons.length + ' icons.');
