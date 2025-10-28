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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
