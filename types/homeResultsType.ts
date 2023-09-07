export interface RootObject {
  code: number;
  data: HomeData[];
  message: string;
  status: number;
}

export interface HomeData {
  location: Location;
  weatherData: WeatherData;
}

export interface Location {
  __v: number;
  _id: string;
  city: string;
  country: string;
  created_at: Date;
  images: Image[];
  isDeleted: boolean;
  isFeatured: number;
  itinerary_plan_suggestions: string[];
  otherDetails: OtherDetails;
  pincode: string;
  place: string;
  popularActivities: PopularA[];
  popularAttractions: PopularA[];
  state: string;
  taglines: string[];
  updated_at: Date;
  videos: Video[];
}

export interface Image {
  _id: string;
  caption: string;
  url: string;
}

export interface OtherDetails {
  bestTimeToVisit: BestTimeToVisit[];
  travelTips: string[];
}

export interface BestTimeToVisit {
  _id: string;
  end: number;
  start: number;
}

export interface PopularA {
  _id: string;
  activity?: string;
  attraction?: string;
  description: string;
  imageUrl: string;
}

export interface Video {
  _id: string;
  description: string;
  url: string;
}

export interface WeatherData {
  cloud: string;
  condition: string;
  feelslike_c: string;
  gust_mph: string;
  humidity: string;
  is_day: string;
  last_updated: string;
  latitude: number;
  location_country: string;
  location_name: string;
  location_region: string;
  longitude: number;
  precip_mm: string;
  pressure_mb: string;
  temperature: string;
  timezone: string;
  uv: string;
  visibility_km: string;
  wind_degree: string;
  wind_dir: string;
  wind_mph: string;
}
