export interface ApiHotel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  thumbnail: string;
  rating: number;
}

export interface HotelsApiResponse {
  data: ApiHotel[];
  hotelIds: string[];
}

export interface ApiRate {
  data: {
    hotelId: string;
    roomTypes?: {
      rates?: {
        retailRate?: {
          total?: {
            amount: number;
          }[];
        };
      }[];
    }[];
  }[];
}
