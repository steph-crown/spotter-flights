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
