import {
  // Finanzas & Trabajo
  DollarSign, Briefcase, CreditCard, Wallet, PiggyBank, TrendingUp, Building, Wrench,
  // Comida & Compras
  Utensils, ShoppingBag, ShoppingCart, Coffee, Pizza, Wine, Apple, Store,
  // Transporte & Viajes
  Car, Bus, Bike, Plane, Fuel, Train, MapPin, Navigation,
  // Hogar & Servicios
  Home, Zap, Flame, Droplet, Wifi, Tv, Phone, ShieldCheck, Lightbulb,
  // Entretenimiento & Ocio
  Gamepad2, Film, Music, Dumbbell, Gift, Camera, BookOpen, Heart,
  // Salud & Educación
  HeartPulse, Stethoscope, Pill, GraduationCap, School, Smile, Users, Tag
} from 'lucide-react';

export const AVAILABLE_ICONS = {
  // Finanzas & Trabajo
  DollarSign: { label: 'Dólar', component: DollarSign },
  Wallet: { label: 'Billetera', component: Wallet },
  CreditCard: { label: 'Tarjeta', component: CreditCard },
  PiggyBank: { label: 'Alcancía', component: PiggyBank },
  Briefcase: { label: 'Trabajo', component: Briefcase },
  Building: { label: 'Oficina', component: Building },
  Wrench: { label: 'Herramientas', component: Wrench },
  TrendingUp: { label: 'Inversión', component: TrendingUp },

  // Comida & Compras
  Utensils: { label: 'Comida', component: Utensils },
  Coffee: { label: 'Café', component: Coffee },
  Pizza: { label: 'Comida Rápida', component: Pizza },
  Wine: { label: 'Bebidas', component: Wine },
  Apple: { label: 'Supermercado', component: Apple },
  ShoppingBag: { label: 'Compras', component: ShoppingBag },
  ShoppingCart: { label: 'Carrito', component: ShoppingCart },
  Store: { label: 'Tienda', component: Store },

  // Transporte & Viajes
  Car: { label: 'Auto', component: Car },
  Fuel: { label: 'Combustible', component: Fuel },
  Bus: { label: 'Micro/Bus', component: Bus },
  Bike: { label: 'Bicicleta', component: Bike },
  Train: { label: 'Metro/Tren', component: Train },
  Plane: { label: 'Viaje', component: Plane },
  MapPin: { label: 'Ubicación', component: MapPin },
  Navigation: { label: 'Navegación', component: Navigation },

  // Hogar & Servicios
  Home: { label: 'Hogar', component: Home },
  Zap: { label: 'Electricidad', component: Zap },
  Flame: { label: 'Gas', component: Flame },
  Droplet: { label: 'Agua', component: Droplet },
  Wifi: { label: 'Internet', component: Wifi },
  Tv: { label: 'Streaming', component: Tv },
  Phone: { label: 'Teléfono', component: Phone },
  ShieldCheck: { label: 'Seguros', component: ShieldCheck },
  Lightbulb: { label: 'Luz', component: Lightbulb },

  // Entretenimiento & Ocio
  Gamepad2: { label: 'Juegos', component: Gamepad2 },
  Film: { label: 'Cine', component: Film },
  Music: { label: 'Música', component: Music },
  Dumbbell: { label: 'Gimnasio', component: Dumbbell },
  Gift: { label: 'Regalo', component: Gift },
  Camera: { label: 'Fotografía', component: Camera },
  BookOpen: { label: 'Libros', component: BookOpen },
  Heart: { label: 'Favorito', component: Heart },

  // Salud & Educación
  HeartPulse: { label: 'Salud', component: HeartPulse },
  Stethoscope: { label: 'Doctor', component: Stethoscope },
  Pill: { label: 'Farmacia', component: Pill },
  GraduationCap: { label: 'Estudios', component: GraduationCap },
  School: { label: 'Colegio', component: School },
  Smile: { label: 'Personal', component: Smile },
  Users: { label: 'Familia', component: Users },
  Tag: { label: 'Otros', component: Tag }
};

export const CategoryIcon = ({ iconName, className = "w-4 h-4" }) => {
  const iconData = AVAILABLE_ICONS[iconName] || AVAILABLE_ICONS.Tag;
  const IconComponent = iconData.component;
  return <IconComponent className={className} />;
};