export interface CityStop {
  city: string;
  country: string;
  arrival_date: string;
  departure_date: string;
  transport_type: 'flight' | 'train' | 'bus' | 'ferry' | '';
}

export type ScheduleRefType = '' | 'attraction' | 'hotel' | 'restaurant' | 'transport';

export interface ScheduleItem {
  date: string;
  time_start: string;
  time_end: string;
  activity: string;
  category: 'sightseeing' | 'food' | 'transport' | 'shopping' | 'rest' | 'entertainment' | 'other';
  notes: string;
  // Reference to an entity in another tab. When set, the entity supplies
  // address / lat / lng / photo / website. Free items leave both empty.
  ref_type: ScheduleRefType;
  ref_key: string;
}

export interface Hotel {
  city: string;
  name: string;
  address: string;
  check_in_date: string;
  check_out_date: string;
  check_in_time: string;
  confirmation_no: string;
  phone: string;
  website: string;
  notes: string;
  lat: number;
  lng: number;
  price: string;
  price_currency: string;
  room_type: string;
  photo_url: string;
  images: string[]; // reservation document images (Drive URLs)
}

export interface Transport {
  name: string;
  type: 'flight' | 'train' | 'bus' | 'ferry';
  from_city: string;
  to_city: string;
  date: string;
  departure_time: string;
  arrival_time: string;
  carrier: string;
  booking_ref: string;
  terminal: string;
  seat: string;
  notes: string;
  price: string;
  price_currency: string;
  images: string[]; // booking document images (Drive URLs)
}

export interface Attraction {
  name: string;
  city: string;
  category: string;
  address: string;
  hours: string;
  price: string;
  website: string;
  notes: string;
  lat: number;
  lng: number;
  photo_url: string;
  slug: string;
}

export interface Restaurant {
  name: string;
  city: string;
  cuisine: string;
  address: string;
  hours: string;
  price_range: string;
  rating: string;
  reservation_required: string;
  reservation_link: string;
  website: string;
  google_maps_link: string;
  notes: string;
  lat: number;
  lng: number;
  photo_url: string;
}

export interface ShoppingItem {
  rowIndex: number; // 1-based incl header; first data row = 2
  hasBought: boolean;
  item: string;
  brand: string;
  location: string;
  count: string;
  price: string;
  to: string;
  notes: string;
}

export interface Bookmark {
  rowIndex: number; // 1-based incl header; first data row = 2
  image_url: string;
  file_id: string; // Drive id (for deletion); empty for app-library/external images
  caption: string;
  category: string; // free-form label, e.g. transportation / shopping / dont-buy
  link: string; // optional external URL (e.g. the Instagram post)
  created_at: string; // ISO timestamp
  added_by: string;
  rotation: number; // display rotation in degrees (0/90/180/270)
}

export interface TripData {
  overview: CityStop[];
  schedule: ScheduleItem[];
  hotels: Hotel[];
  transport: Transport[];
  attractions: Attraction[];
  restaurants: Restaurant[];
  shopping: ShoppingItem[];
  bookmarks: Bookmark[];
}

export interface DaySchedule {
  date: string;
  items: ScheduleItem[];
  hotel: Hotel | null;
}
