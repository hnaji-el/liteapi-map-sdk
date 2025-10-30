import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./index.css";

import {
  createPricePopup,
  setHotelDetailsPopup,
  stylePricePopup,
} from "./popups.js";
import { getCheckinAndCheckout } from "./utils.js";
import { getPlaceCoordinates, getHotelsRates } from "./api.js";

export default async function liteAPIMapInit({
  selector,
  placeId,
  mapboxToken,
}) {
  if (!mapboxToken) {
    console.error(
      "Mapbox access token is required. Please provide it in the liteAPIMapInit options.",
    );
    return;
  }

  const coordinates = await getPlaceCoordinates(placeId);

  mapboxgl.accessToken = mapboxToken;
  const map = new mapboxgl.Map({
    container: selector,
    style: "mapbox://styles/mapbox/standard",
    center: [coordinates.longitude, coordinates.latitude], // center coordinates [lng, lat]
    zoom: 12,
    attributionControl: false,
  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  // Add a fullscreen control to a map.
  map.addControl(new mapboxgl.FullscreenControl());

  map.on("load", () => loadPrices(placeId, map));
}

async function loadPrices(placeId, map) {
  const { checkin, checkout } = getCheckinAndCheckout();

  const hotels = await getHotelsRates({
    placeId,
    checkin,
    checkout,
    currency: "USD",
    guestNationality: "US",
    adults: 2,
  });

  for (const hotel of hotels) {
    const pricePopup = createPricePopup(map, hotel);

    const pricePopupContainer = pricePopup.getElement();

    stylePricePopup(pricePopupContainer);

    pricePopupContainer.addEventListener("click", () => {
      const url = `https://whitelabel.nuitee.link/hotels/${hotel.id}?placeId=${placeId}&checkin=${checkin}&checkout=${checkout}&adults=${2}&occupancies=${window.btoa(
        JSON.stringify([{ adults: 2 }]),
      )}`;
      window.open(url, "_blank");
    });

    setHotelDetailsPopup(map, hotel, pricePopupContainer);
  }
}
