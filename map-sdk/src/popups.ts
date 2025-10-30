import mapboxgl from "mapbox-gl";
import { Hotel } from "./types";

export function createPricePopup(
  map: mapboxgl.Map,
  hotel: Hotel,
): mapboxgl.Popup {
  const pricePopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    closeOnMove: false,
  })
    .setLngLat([hotel.longitude, hotel.latitude])
    .setHTML(
      `
        <div class="price">
          <span>$</span>
          <span>${Math.floor(hotel.price)}</span>
        </div>
        `,
    )
    .addTo(map);

  return pricePopup;
}

export function stylePricePopup(pricePopupContainer: HTMLElement): void {
  const popupTip = pricePopupContainer.querySelector<HTMLElement>(
    ".mapboxgl-popup-tip",
  );
  const popupContent = pricePopupContainer.querySelector<HTMLElement>(
    ".mapboxgl-popup-content",
  );

  if (pricePopupContainer) {
    pricePopupContainer.style.cursor = "pointer";
  }
  if (popupTip) {
    popupTip.style.display = "none";
  }
  if (popupContent) {
    popupContent.style.padding = "0";
    popupContent.style.borderRadius = "20px";
  }
}

export function setHotelDetailsPopup(
  map: mapboxgl.Map,
  hotel: Hotel,
  pricePopupContainer: HTMLElement,
) {
  const hotelDetailsPopup = document.createElement("div");

  hotelDetailsPopup.className = "hotel-details-popup";
  map.getContainer().appendChild(hotelDetailsPopup);

  pricePopupContainer.addEventListener("mouseenter", () => {
    hotelDetailsPopup.innerHTML = `
        <img alt="hotel photo" src=${hotel.thumbnail} class="hotel-photo"/>
        <p class="text-style">${hotel.name}</p>
        <p class="text-style text-font">Rating: ${hotel.rating}</p>
        <p class="text-style text-font">Address: ${hotel.address}, ${hotel.city}</p>
      `;
    hotelDetailsPopup.style.display = "block";
  });

  pricePopupContainer.addEventListener("mouseleave", (event) => {
    // Hide only if the mouse is not moving to the details popup
    if (!hotelDetailsPopup.contains(event.relatedTarget as Node | null)) {
      hotelDetailsPopup.style.display = "none";
    }
  });

  hotelDetailsPopup.addEventListener("mouseleave", (event) => {
    // Hide only if the mouse is not moving back to the price popup
    if (!pricePopupContainer.contains(event.relatedTarget as Node | null)) {
      hotelDetailsPopup.style.display = "none";
    }
  });
}
