import type {
  IFlightSearchParams,
  IFlightSearchState,
  ILocation,
  IPassengerCounts,
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
  destination: null,
  departureDate: null,
  returnDate: null,
  isSearching: false,
  lastSearchParams: null,
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
      // Clear return date for one-way trips
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

    setLastSearchParams: (
      state,
      action: PayloadAction<IFlightSearchParams>
    ) => {
      state.lastSearchParams = action.payload;
    },

    resetSearch: (state) => {
      return {
        ...initialState,
        tripType: state.tripType, // Keep trip type
      };
    },

    // Bulk update from URL params
    updateFromUrlParams: (
      state,
      action: PayloadAction<Partial<IFlightSearchState>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const selectTripType = (state: RootState) => state.flightSearch.tripType;

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
  setLastSearchParams,
  resetSearch,
  updateFromUrlParams,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
