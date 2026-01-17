export interface Review {
  id: string;
  author: string;
  date: string;
  comment: string;
  rating: number;
}

export interface House {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  imageUrl: string;
  amenities: string[];
  reviews: Review[];
  isBooked: boolean;
}

export const createEmptyHouse = (): House => ({
  id: '',
  name: '',
  description: '',
  address: '',
  city: '',
  country: '',
  bedrooms: 0,
  beds: 0,
  bathrooms: 0,
  price: 0,
  imageUrl: '',
  amenities: [],
  reviews: [],
  isBooked: false,
});
