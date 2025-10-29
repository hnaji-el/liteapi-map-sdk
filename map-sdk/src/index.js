import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./index.css";

import { getPlaceCoordinates, getHotelsRates } from "./api.js";
import { getCheckinAndCheckout } from "./utils.js";

async function handleLoad({ placeId, map }) {
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
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      closeOnMove: false,
    })
      .setLngLat([hotel.longitude, hotel.latitude])
      .setHTML(
        `
        <div class="rate">
          <span>$</span>
          <span>${Math.floor(hotel.price)}</span>
        </div>
        `,
      )
      .addTo(map);

    const popupContainer = popup.getElement();
    const popupTip = popupContainer.querySelector(".mapboxgl-popup-tip");
    const popupContent = popupContainer.querySelector(
      ".mapboxgl-popup-content",
    );

    if (popupContainer) {
      popupContainer.style.cursor = "pointer";
    }
    if (popupTip) {
      popupTip.style.display = "none";
    }
    if (popupContent) {
      popupContent.style.padding = "0";
      popupContent.style.borderRadius = "20px";
    }

    popupContainer.addEventListener("click", () => {
      const url = `https://whitelabel.nuitee.link/hotels/${hotel.id}?placeId=${placeId}&checkin=${checkin}&checkout=${checkout}&adults=${2}&occupancies=${window.btoa(
        JSON.stringify([{ adults: 2 }]),
      )}`;
      window.open(url, "_blank");
    });
  }
}

export default async function liteAPIMapInit({ selector, placeId }) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaG5hamktZWwiLCJhIjoiY21oN3Z1dDg4MG96dTJpczYwN2wzZGFsOSJ9.TD_bFVB2gtSRhxfYO8ppZg";
  const coordinates = await getPlaceCoordinates(placeId);

  const map = new mapboxgl.Map({
    container: selector,
    style: "mapbox://styles/mapbox/standard",
    center: [coordinates.longitude, coordinates.latitude], // center coordinates [lng, lat]
    zoom: 12,
  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
  // Add a fullscreen control to a map.
  map.addControl(new mapboxgl.FullscreenControl());

  map.on("load", () => handleLoad({ placeId, map }));
}
