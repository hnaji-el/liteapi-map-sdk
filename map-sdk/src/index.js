import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

async function getPlaceCoordinates(placeId) {
  let coordinates = {
    longitude: -3.7147230999999996,
    latitude: 40.429857399999996,
  }; // default coordinates

  try {
    const res = await fetch(`http://localhost:3000/data/places/${placeId}`);
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

export default async function liteAPIMapInit({ selector, placeId }) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaG5hamktZWwiLCJhIjoiY21oN3Z1dDg4MG96dTJpczYwN2wzZGFsOSJ9.TD_bFVB2gtSRhxfYO8ppZg";
  const coordinates = await getPlaceCoordinates(placeId);

  console.log(coordinates);

  new mapboxgl.Map({
    container: selector,
    style: "mapbox://styles/mapbox/standard",
    center: [coordinates.longitude, coordinates.latitude], // center coordinates [lng, lat]
    zoom: 12,
  });
}
