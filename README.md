# LiteAPI Map SDK

[![npm version](https://badge.fury.io/js/liteapi-map-component-sdk.svg)](https://badge.fury.io/js/liteapi-map-component-sdk)

A client-side SDK to easily embed an interactive map displaying hotel prices from the [LiteAPI](https://liteapi.travel) platform.

## Features

- Displays an interactive map centered on a specific location.
- Fetches and displays hotel prices as interactive popups on the map.
- Shows detailed hotel information on hover.
- Redirects to a booking page on click.

## Prerequisites

Before you begin, you will need:

1.  **Node.js and npm:** [Download and install here](https://nodejs.org/).
2.  **LiteAPI API Key:** Get your key from the [LiteAPI dashboard](https://dashboard.liteapi.travel/developer). This is required for the map backend server.
3.  **Mapbox Access Token:** Get your public token from the [Mapbox Account page](https://account.mapbox.com/).

## Installation & Setup

This SDK has two parts: a map backend server for fetching data and a frontend client for displaying the map. You must run the backend server for the SDK to function.

### Part 1: Backend Server Setup

The backend server acts as a proxy to securely use your LiteAPI API Key.

1.  **Clone the repository and navigate to the server directory:**

    ```bash
    git clone https://github.com/hnaji-el/liteapi-map-sdk.git
    cd liteapi-map-sdk/map-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `map-server` directory and add your LiteAPI API Key:

    ```
    // filepath: map-server/.env
    LITEAPI_API_KEY="YOUR_LITEAPI_API_KEY"
    ```

4.  **Run the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

### Part 2: Frontend SDK Integration

Now, in your separate frontend project:

1.  **Install the SDK from npm:**

    ```bash
    npm install liteapi-map-sdk
    ```

2.  **Configure CSS Loader:**
    This SDK imports its own stylesheet directly in the JavaScript files (`import "./styles.css"`). Your project's bundler (like Webpack, Vite, or Parcel) must be configured to handle CSS imports.

    Most modern frontend frameworks like Vite, Parcel or Next.js have this configured out of the box.

## Usage

1.  **Add a container element** to your HTML file where the map will be rendered.

    ```html
    <div id="map"></div>
    ```

2.  **Import and initialize the SDK** in your JavaScript file.

    ```javascript
    import liteAPIMapInit from "liteapi-map-sdk";

    liteAPIMapInit({
      selector: "map",
      placeId: "ChIJW_1NRk0pQg0RfH9uEzX0KdA", // Example: Madrid
      mapboxToken: "YOUR_MAPBOX_PUBLIC_ACCESS_TOKEN",
    });
    ```

### `liteAPIMapInit(options)`

Initializes the map and loads the hotel price data. It takes a single configuration object with the following properties:

| Option        | Type     | Required | Description                                                                                                    |
| ------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `selector`    | `string` | Yes      | The string ID of the HTML element where the map will be rendered. The specified element must have no children. |
| `placeId`     | `string` | Yes      | The LiteAPI `placeId` for the desired location or area.                                                        |
| `mapboxToken` | `string` | Yes      | Your Mapbox access token.                                                                                      |

---

## License

This project is licensed under the MIT License.
