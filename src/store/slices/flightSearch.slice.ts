import type {
  IFlightSearchState,
  ILocation,
  IPassengerCounts,
  SortByOption,
} from "@/interfaces/flight.interface";
import type { RootState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: IFlightSearchState = {
  tripType: "round_trip",
  classType: "economy",
  passengers: {
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  },
  origin: null,
  countryCode: "US",
  market: "en-US",
  currency: "USD",
  destination: null,
  departureDate: null,
  returnDate: null,
  isSearching: false,
  sortBy: "best",
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setTripType: (
      state,
      action: PayloadAction<IFlightSearchState["tripType"]>
    ) => {
      state.tripType = action.payload;
      if (action.payload === "one_way") {
        state.returnDate = null;
      }
    },

    setClassType: (
      state,
      action: PayloadAction<IFlightSearchState["classType"]>
    ) => {
      state.classType = action.payload;
    },

    setPassengers: (state, action: PayloadAction<IPassengerCounts>) => {
      state.passengers = action.payload;
    },

    setOrigin: (state, action: PayloadAction<ILocation | null>) => {
      state.origin = action.payload;
    },

    setDestination: (state, action: PayloadAction<ILocation | null>) => {
      state.destination = action.payload;
    },

    setDepartureDate: (state, action: PayloadAction<string | null>) => {
      state.departureDate = action.payload;
    },

    setReturnDate: (state, action: PayloadAction<string | null>) => {
      state.returnDate = action.payload;
    },

    swapLocations: (state) => {
      const temp = state.origin;
      state.origin = state.destination;
      state.destination = temp;
    },

    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },

    setSortBy: (state, action: PayloadAction<SortByOption>) => {
      state.sortBy = action.payload;
    },

    resetSearch: (state) => {
      return {
        ...initialState,
        tripType: state.tripType,
      };
    },

    updateFromUrlParams: (
      state,
      action: PayloadAction<Partial<IFlightSearchState>>
    ) => {
      Object.assign(state, action.payload);
    },

    setLocaleSettings: (
      state,
      action: PayloadAction<{
        countryCode: string;
        market: string;
        currency: string;
      }>
    ) => {
      state.countryCode = action.payload.countryCode;
      state.market = action.payload.market;
      state.currency = action.payload.currency;
    },
  },
});

export const selectTripType = (state: RootState) => state.flightSearch.tripType;
export const selectFlightSearch = (state: RootState) => state.flightSearch;
export const selectSortBy = (state: RootState) => state.flightSearch.sortBy;
export const selectLocaleSettings = (state: RootState) => ({
  countryCode: state.flightSearch.countryCode,
  market: state.flightSearch.market,
  currency: state.flightSearch.currency,
});

export const {
  setTripType,
  setClassType,
  setPassengers,
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  swapLocations,
  setSearching,
  resetSearch,
  updateFromUrlParams,
  setSortBy,
  setLocaleSettings,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
