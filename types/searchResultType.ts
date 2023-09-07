export interface RootObject {
  code: number;
  data: SearchResultType;
  message: string;
  status: number;
}

export interface SearchResultType {
  paginated_data: SearchData[];
  total_count: number;
}

export interface SearchData {
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
