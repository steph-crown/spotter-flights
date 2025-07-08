/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAirport {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export interface ISearchAirportsResponse {
  status: boolean;
  timestamp: number;
  data: IAirport[];
}

export interface ILocation {
  code: string;
  name: string;
  city: string;
  country: string;
  skyId?: string;
  entityId?: string;
}

export interface IPassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

export interface IFlightSearchState {
  tripType: TripType;
  classType: ClassType;
  passengers: IPassengerCounts;

  origin: ILocation | null;
  destination: ILocation | null;

  departureDate: string | null;
  returnDate: string | null;

  isSearching: boolean;
  lastSearchParams: IFlightSearchParams | null;
}

export interface IFlightSearchParams {
  tripType: string;
  classType: string;
  passengers: IPassengerCounts;
  origin: ILocation | null;
  destination: ILocation | null;
  departureDate: string | null;
  returnDate: string | null;
}

export interface IFlightSearchFilters {
  tripType: TripType;
  classType: ClassType;
  passengers: {
    adults: number;
    children: number;
    infantsInSeat: number;
    infantsOnLap: number;
  };
  origin: {
    code: string;
    city: string;
    skyId: string;
    entityId: string;
  } | null;
  destination: {
    code: string;
    city: string;
    skyId: string;
    entityId: string;
  } | null;
  departureDate: string | null;
  returnDate: string | null;
}

export type TripType = "round_trip" | "one_way";
export type ClassType = "economy" | "premium_economy" | "business" | "first";

export interface FlightSearchRequest {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string; // YYYY-MM-DD format
  returnDate?: string; // YYYY-MM-DD format for round trip
  cabinClass: "economy" | "premium_economy" | "business" | "first";
  adults: number;
  children?: number;
  infants?: number;
  sortBy?:
    | "best"
    | "price_high"
    | "fastest"
    | "outbound_take_off_time"
    | "outbound_landing_time"
    | "return_take_off_time"
    | "return_landing_time";
  limit?: number;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface IFlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: IFlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco: {
    ecoContenderDelta: number;
  };
  fareAttributes: any;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface IFlightLeg {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string; // ISO datetime
  arrival: string; // ISO datetime
  timeDeltaInDays: number;
  carriers: IFlightCarrier;
  segments: IFlightSegment[];
}

export interface FlightPlace {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
  flightPlaceId?: string;
  type?: string;
}

export interface IFlightCarrier {
  marketing: IFlightCarrierInfo[];
  operating: IFlightCarrierInfo[];
  operationType: string;
}

export interface IFlightCarrierInfo {
  id: number;
  logoUrl: string;
  name: string;
}

export interface IFlightSegment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: IFlightCarrierInfo;
  operatingCarrier: IFlightCarrierInfo;
}

export interface IFlightSearchResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: IFlightItinerary[];
    messages: any[];
    filterStats: {
      duration: {
        min: number;
        max: number;
        multiCityMin: number;
        multiCityMax: number;
      };
      airports: any[];
      carriers: any[];
      stopPrices: {
        direct: {
          isPresent: boolean;
        };
        one: {
          isPresent: boolean;
        };
        twoOrMore: {
          isPresent: boolean;
        };
      };
    };
    token: string;
    destinationImageUrl?: string;
  };
}

export interface IFlightSearchRequest {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass: "economy" | "premium_economy" | "business" | "first";
  adults: number;
  children?: number;
  infants?: number;
  sortBy?:
    | "best"
    | "price_high"
    | "fastest"
    | "outbound_take_off_time"
    | "outbound_landing_time"
    | "return_take_off_time"
    | "return_landing_time";
  limit?: number;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface IFlightStop {
  id: string | undefined;
  name: string;
  type: string | undefined;
  country: string;
}
