export interface Hotel {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  price: number;
  address: string;
  city: string;
  thumbnail: string;
  rating: number;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}
