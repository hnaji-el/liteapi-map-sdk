import mapboxgl from "mapbox-gl";

export function createPricePopup(map, hotel) {
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

export function stylePricePopup(pricePopupContainer) {
  const popupTip = pricePopupContainer.querySelector(".mapboxgl-popup-tip");
  const popupContent = pricePopupContainer.querySelector(
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

export function setHotelDetailsPopup(map, hotel, pricePopupContainer) {
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

  pricePopupContainer.addEventListener("mouseleave", () => {
    hotelDetailsPopup.style.display = "none";
  });
}
