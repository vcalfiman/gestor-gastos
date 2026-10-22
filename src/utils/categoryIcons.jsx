import * as LucideIcons from 'lucide-react';

// Arreglo completo con los nombres de los íconos disponibles para el selector modal
export const CATEGORY_ICONS = [
  'Tag',
  'Home',
  'Utensils',
  'Car',
  'ShoppingBag',
  'Briefcase',
  'HeartPulse',
  'GraduationCap',
  'Plane',
  'Gamepad2',
  'Zap',
  'Droplets',
  'Wifi',
  'Tv',
  'Smartphone',
  'Shirt',
  'Book',
  'Coffee',
  'Dumbbell',
  'Gift',
  'Music',
  'Film',
  'DollarSign',
  'CreditCard',
  'Wrench',
  'Scissors',
  'Dog',
  'Baby',
  'Sun',
  'Moon',
  'ShoppingCart',
  'PartyPopper',
  'Fuel',
  'Route',
  'Road',
  'Router',
  'School',
  'Beef',
  'Hamburger',
  'CookingPot',
  'Sofa',
  'Rocket',
  'User',
  'FileText',
  'Store',
  'ClipboardCheck',
  'Headset',
  'PawPrint',
  'Library',
  'AlarmClock',
  'Clapperboard',
  'Puzzle',
  'PiggyBank',
  'Bike',
  'Ship',
  'TreePalm',
  'Paintbrush'


];

// Alias para evitar errores si CategoryManager importa AVAILABLE_ICONS
export const AVAILABLE_ICONS = CATEGORY_ICONS;

// Componente para renderizar un ícono de forma dinámica por su nombre
export function CategoryIcon({ iconName, className = 'w-5 h-5' }) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Tag;
  return <IconComponent className={className} />;
}