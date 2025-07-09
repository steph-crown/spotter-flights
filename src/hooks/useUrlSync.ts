import { useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateFromUrlParams } from "@/store/slices/flightSearch.slice";
import type {
  IFlightSearchState,
  ILocation,
  IPassengerCounts,
  SortByOption,
} from "@/interfaces/flight.interface";

const DEFAULT_PASSENGERS: IPassengerCounts = {
  adults: 1,
  children: 0,
  infantsInSeat: 0,
  infantsOnLap: 0,
} as const;

const DEFAULT_TRIP_TYPE = "round_trip" as const;
const DEFAULT_CLASS_TYPE = "economy" as const;
const DEFAULT_SORT_BY = "best" as const;

export const useUrlSync = () => {
  const dispatch = useAppDispatch();
  const flightSearch = useAppSelector((state) => state.flightSearch);
  const [searchParams, setSearchParams] = useSearchParams();

  const isDefaultPassengers = useMemo(
    () =>
      JSON.stringify(flightSearch.passengers) ===
      JSON.stringify(DEFAULT_PASSENGERS),
    [flightSearch.passengers]
  );

  const updateUrlFromState = useCallback(() => {
    const params = new URLSearchParams();

    if (flightSearch.tripType !== DEFAULT_TRIP_TYPE) {
      params.set("tripType", flightSearch.tripType);
    }

    if (flightSearch.classType !== DEFAULT_CLASS_TYPE) {
      params.set("class", flightSearch.classType);
    }

    if (flightSearch.sortBy !== DEFAULT_SORT_BY) {
      params.set("sortBy", flightSearch.sortBy);
    }

    if (!isDefaultPassengers) {
      params.set("passengers", JSON.stringify(flightSearch.passengers));
    }

    if (flightSearch.origin) {
      params.set(
        "from",
        JSON.stringify({
          code: flightSearch.origin.code,
          city: flightSearch.origin.city,
          skyId: flightSearch.origin.skyId,
          entityId: flightSearch.origin.entityId,
        })
      );
    }

    if (flightSearch.destination) {
      params.set(
        "to",
        JSON.stringify({
          code: flightSearch.destination.code,
          city: flightSearch.destination.city,
          skyId: flightSearch.destination.skyId,
          entityId: flightSearch.destination.entityId,
        })
      );
    }

    if (flightSearch.departureDate) {
      params.set("departure", flightSearch.departureDate);
    }

    if (
      flightSearch.returnDate &&
      flightSearch.tripType === DEFAULT_TRIP_TYPE
    ) {
      params.set("return", flightSearch.returnDate);
    }

    setSearchParams(params, { replace: true });
  }, [flightSearch, isDefaultPassengers, setSearchParams]);

  const parseLocationFromParam = useCallback(
    (param: string | null): ILocation | null => {
      if (!param) return null;

      try {
        const parsed = JSON.parse(param);
        return {
          code: parsed.code || "",
          city: parsed.city || "",
          name: parsed.name || parsed.city || "",
          country: parsed.country || "",
          skyId: parsed.skyId,
          entityId: parsed.entityId,
        };
      } catch {
        return null;
      }
    },
    []
  );

  const parsePassengersFromParam = useCallback(
    (param: string | null): IPassengerCounts => {
      if (!param) return DEFAULT_PASSENGERS;

      try {
        return JSON.parse(param);
      } catch {
        return DEFAULT_PASSENGERS;
      }
    },
    []
  );

  useEffect(() => {
    const tripType =
      (searchParams.get("tripType") as IFlightSearchState["tripType"]) ||
      DEFAULT_TRIP_TYPE;
    const classType =
      (searchParams.get("class") as IFlightSearchState["classType"]) ||
      DEFAULT_CLASS_TYPE;
    const sortBy =
      (searchParams.get("sortBy") as SortByOption) || DEFAULT_SORT_BY;
    const passengers = parsePassengersFromParam(searchParams.get("passengers"));
    const origin = parseLocationFromParam(searchParams.get("from"));
    const destination = parseLocationFromParam(searchParams.get("to"));
    const departureDate = searchParams.get("departure");
    const returnDate = searchParams.get("return");

    dispatch(
      updateFromUrlParams({
        tripType,
        classType,
        passengers,
        origin,
        destination,
        departureDate,
        sortBy,
        returnDate: tripType === DEFAULT_TRIP_TYPE ? returnDate : null,
      })
    );
  }, [
    searchParams,
    dispatch,
    parseLocationFromParam,
    parsePassengersFromParam,
  ]);

  return { updateUrlFromState };
};
