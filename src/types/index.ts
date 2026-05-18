export interface CityStop {
  city: string;
  country: string;
  arrival_date: string;
  departure_date: string;
  transport_type: 'flight' | 'train' | 'bus' | 'ferry' | '';
}

export interface ScheduleItem {
  date: string;
  time_start: string;
  time_end: string;
  activity: string;
  category: 'sightseeing' | 'food' | 'transport' | 'shopping' | 'rest' | 'entertainment' | 'other';
  location_name: string;
  address: string;
  lat: number;
  lng: number;
  notes: string;
  links: string;
  photo_url: string;
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
}

export interface Transport {
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

export interface TripData {
  overview: CityStop[];
  schedule: ScheduleItem[];
  hotels: Hotel[];
  transport: Transport[];
  attractions: Attraction[];
  restaurants: Restaurant[];
}

export interface DaySchedule {
  date: string;
  items: ScheduleItem[];
  hotel: Hotel | null;
}
