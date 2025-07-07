import type { ISearchAirportsResponse } from "@/interfaces/flight.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightService = createApi({
  reducerPath: "flightService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPIDAPI_KEY || "");
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPIDAPI_HOST);
      return headers;
    },
  }),
  tagTypes: ["Airport"],
  endpoints: (builder) => ({
    searchAirports: builder.query<
      ISearchAirportsResponse,
      { query: string; locale?: string }
    >({
      query: ({ query, locale = "en-US" }) => ({
        url: "searchAirport",
        params: {
          query,
          locale,
        },
      }),
      providesTags: ["Airport"],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useSearchAirportsQuery, useLazySearchAirportsQuery } =
  flightService;
