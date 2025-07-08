import type {
  IFlightSearchRequest,
  IFlightSearchResponse,
  ISearchAirportsResponse,
} from "@/interfaces/flight.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightService = createApi({
  reducerPath: "flightService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sky-scrapper.p.rapidapi.com/api",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPIDAPI_KEY || "");
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPIDAPI_HOST);
      return headers;
    },
  }),
  tagTypes: ["Airport", "FlightSearch"],
  endpoints: (builder) => ({
    searchAirports: builder.query<
      ISearchAirportsResponse,
      { query: string; locale?: string }
    >({
      query: ({ query, locale = "en-US" }) => ({
        url: "/v1/flights/searchAirport",
        params: {
          query,
          locale,
        },
      }),
      providesTags: ["Airport"],
      keepUnusedDataFor: 600,
    }),

    searchFlights: builder.query<IFlightSearchResponse, IFlightSearchRequest>({
      query: (params) => ({
        url: "/v2/flights/searchFlights",
        params: {
          originSkyId: params.originSkyId,
          destinationSkyId: params.destinationSkyId,
          originEntityId: params.originEntityId,
          destinationEntityId: params.destinationEntityId,
          date: params.date,
          returnDate: params.returnDate,
          cabinClass: params.cabinClass,
          adults: params.adults,
          children: params.children || 0,
          infants: params.infants || 0,
          sortBy: params.sortBy || "best",
          limit: params.limit || 50,
          currency: params.currency,
          market: params.market,
          countryCode: params.countryCode,
        },
      }),
      providesTags: ["FlightSearch"],
      keepUnusedDataFor: 300, // 5 minutes cache for flight searches
    }),
  }),
});

export const {
  useSearchAirportsQuery,
  useLazySearchAirportsQuery,
  useSearchFlightsQuery,
  useLazySearchFlightsQuery,
} = flightService;
