export type ProductCategory = 'todos' | 'brincos' | 'pulseiras' | 'aneis' | 'colares' | 'tornozeleiras';

export interface CarbonFootprint {
  emittedKg: number;              // CO2 emitted during production/packaging (e.g., 0.35kg)
  savedVsTraditionalKg: number;  // CO2 saved compared to conventional jewelry (e.g., 3.8kg)
  plasticRemovedGrams: number;    // Ocean plastic collected per piece (e.g., 45g)
  treesEquivalent: number;       // Equivalent in tree daily absorption
}

export interface Product {
  id: string;
  name: string;
  category: 'brincos' | 'pulseiras' | 'aneis' | 'colares' | 'tornozeleiras';
  price: number;
  originalPrice?: number;
  description: string;
  shortStory: string;
  materials: string[];
  carbonFootprint: CarbonFootprint;
  imageUrl: string;
  secondaryImageUrl?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  artisanOrigin: string; // e.g., "Trancoso, Bahia" or "Fernando de Noronha, PE"
  featured?: boolean;
}

export interface CustomSetComponentItem {
  id: string;
  name: string;
  type: 'base' | 'pendant' | 'earring' | 'ring';
  price: number;
  material: string;
  co2SavedKg: number;
  plasticRemovedGrams: number;
  imageUrl: string;
  description: string;
}

export interface CustomSetConfiguration {
  id: string;
  title: string;
  base: CustomSetComponentItem | null;
  pendant: CustomSetComponentItem | null;
  earring: CustomSetComponentItem | null;
  ring: CustomSetComponentItem | null;
  engravingText?: string;
  cordColor?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  isCustomSet?: boolean;
  customSetDetails?: CustomSetConfiguration;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarUrl: string;
  productPurchased: string;
  quote: string;
  rating: number;
  date: string;
  environmentalImpact: {
    co2SavedKg: number;
    plasticRemovedGrams: number;
    treesEquivalent: number;
    treesPlanted?: number;
    initiative: string; // e.g., "Mudas de Manguezal no Delta do Parnaíba"
  };
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  location: string;
  status: 'completed' | 'current' | 'pending';
  iconType: 'craft' | 'pack' | 'transit' | 'bike' | 'delivered';
}

export interface DeliveryTrackingData {
  orderCode: string;
  statusText: string;
  statusCode: 'separacao' | 'embalagem_eco' | 'transporte_verde' | 'rota_final' | 'entregue';
  estimatedArrival: string;
  courierType: string; // e.g. "Veículo 100% Elétrico + Bike Cargo Solar"
  totalCo2SavedThisDeliveryKg: number;
  kmTraveledGreen: number;
  origin: {
    city: string;
    state: string;
    locationName: string;
    lat: number;
    lng: number;
  };
  destination: {
    city: string;
    state: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  currentLocation: {
    lat: number;
    lng: number;
    description: string;
  };
  progressPercentage: number;
  timeline: TrackingEvent[];
  itemsSummary: string;
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface UserEcoProfile {
  name: string;
  email: string;
  avatarUrl: string;
  city: string;
  joinDate: string;
  tierTitle: string; // e.g. "Guardiã dos Corais"
  totalOrders: number;
  totalCO2SavedKg: number;
  totalPlasticCollectedGrams: number;
  mangrovesFunded: number;
  monthlyImpact: {
    month: string;
    co2Kg: number;
    plasticGrams: number;
  }[];
  badges: EcoBadge[];
  certificates: {
    id: string;
    code: string;
    title: string;
    date: string;
    co2NeutralizedKg: number;
    certifier: string;
  }[];
}
