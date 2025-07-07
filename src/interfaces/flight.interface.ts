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
  // Trip details
  tripType: "round_trip" | "one_way" | "multi_city";
  classType: "economy" | "premium_economy" | "business" | "first";

  // Passengers
  passengers: IPassengerCounts;

  // ILocations
  origin: ILocation | null;
  destination: ILocation | null;

  // Dates
  departureDate: string | null; // ISO string format
  returnDate: string | null; // ISO string format

  // UI state
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
