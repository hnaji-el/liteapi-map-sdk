import express from "express";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/data/places/:placeId", async (req, res) => {
  const { placeId } = req.params;
  const url = `https://api.liteapi.travel/v3.0/data/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-API-Key": process.env.LITEAPI_API_KEY,
      },
    });

    const body = await response.json();

    res.status(response.status).json(body);
  } catch (error) {
    console.error("Proxy request failed:", error);
    res.status(500).json({ message: "Failed to fetch data from LiteAPI." });
  }
});

app.get("/hotels/rates", async (req, res) => {
  const { placeId, checkin, checkout, adults, currency, guestNationality } =
    req.query;

  const hotelsUrl = `https://api.liteapi.travel/v3.0/data/hotels?placeId=${placeId}&language=en`;
  const ratesUrl = "https://api.liteapi.travel/v3.0/hotels/rates";

  try {
    // Fetch a list of hotels for the given placeId
    const hotelsRes = await fetch(hotelsUrl, {
      headers: {
        "X-API-Key": process.env.LITEAPI_API_KEY,
      },
    });
    const { data: hotels, hotelIds } = await hotelsRes.json();

    if (!hotelsRes.ok) {
      return res.status(hotelsRes.status).json({ data: [] });
    }

    if (!hotelIds || !hotelIds.length) {
      return res.json({ data: [] });
    }

    // Fetch rates for a list of hotels
    const ratesPayload = {
      hotelIds: hotelIds,
      checkin,
      checkout,
      currency,
      guestNationality,
      occupancies: [
        {
          adults: parseInt(adults, 10),
        },
      ],
    };

    const ratesRes = await fetch(ratesUrl, {
      method: "POST",
      headers: {
        "X-API-Key": process.env.LITEAPI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratesPayload),
    });
    const { data: rates } = await ratesRes.json();

    if (!ratesRes.ok) {
      return res.status(ratesRes.status).json({ data: [] });
    }

    const result = rates.map((h) => {
      const hotelData = hotels.find((h_) => h_.id === h.hotelId);
      const price =
        h?.roomTypes?.[0]?.rates?.[0]?.retailRate?.total?.[0]?.amount || null;

      return {
        ...hotelData,
        price,
      };
    });

    res.json({ data: result });
  } catch (error) {
    console.error("Failed to fetch data from LiteAPI:", error);
    res.status(500).json({ message: "Failed to fetch data from LiteAPI." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
