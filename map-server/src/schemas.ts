import { z } from "zod";

export const getPlaceSchema = z.object({
  params: z.object({
    placeId: z.string().min(1, "placeId is required"),
  }),
});

export const getRatesSchema = z.object({
  query: z.object({
    placeId: z.string().min(1, "placeId is required"),
    checkin: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid checkin date format, expected YYYY-MM-DD",
      ),
    checkout: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid checkout date format, expected YYYY-MM-DD",
      ),
    adults: z.coerce.number().int().min(1, "Adults must be at least 1"),
    currency: z.string().min(1, "currency is required"),
    guestNationality: z
      .string()
      .length(2, "guestNationality must be a 2-letter country code"),
  }),
});
