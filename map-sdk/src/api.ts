import { Coordinates, Hotel } from "./types";

const API_BASE_URL = "http://localhost:3000";

interface GetHotelsRatesParams {
  placeId: string;
  checkin: string;
  checkout: string;
  currency: string;
  guestNationality: string;
  adults: number;
}

export async function getPlaceCoordinates(
  placeId: string,
): Promise<Coordinates> {
  let coordinates = {
    longitude: -3.7147230999999996,
    latitude: 40.429857399999996,
  }; // default coordinates

  try {
    const res = await fetch(`${API_BASE_URL}/data/places/${placeId}`);
    const body = await res.json();

    if (res.ok) {
      coordinates = { ...body.data.location };
    } else {
      console.error("Fetch place data failed: ", res.status);
    }
  } catch (error) {
    console.error("Failed to fetch place data: ", error);
  }

  return coordinates;
}

export async function getHotelsRates({
  placeId,
  checkin,
  checkout,
  currency,
  guestNationality,
  adults,
}: GetHotelsRatesParams): Promise<Hotel[]> {
  let hotels: Hotel[] = [];

  try {
    const res = await fetch(
      `${API_BASE_URL}/hotels/rates?placeId=${placeId}&checkin=${checkin}&checkout=${checkout}&currency=${currency}&guestNationality=${guestNationality}&adults=${adults}`,
    );
    const body = await res.json();

    if (res.ok) {
      hotels = body.data;
    } else {
      console.error("Failed to fetch hotels rates: ", res.status);
    }
  } catch (error) {
    console.error("Failed to fetch hotels rates: ", error);
  }

  return hotels;
}
