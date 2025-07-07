import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import { updateFromUrlParams } from "@/store/slices/flightSearch.slice";
import type {
  IFlightSearchState,
  ILocation,
  IPassengerCounts,
} from "@/interfaces/flight.interface";

export const useUrlSync = () => {
  const dispatch = useAppDispatch();
  const flightSearch = useAppSelector((state) => state.flightSearch);
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert state to URL params
  const updateUrlFromState = useCallback(() => {
    const params = new URLSearchParams();

    // Basic trip info
    if (flightSearch.tripType !== "round_trip") {
      params.set("tripType", flightSearch.tripType);
    }
    if (flightSearch.classType !== "economy") {
      params.set("class", flightSearch.classType);
    }

    // Passengers (only if different from default)
    const defaultPassengers = {
      adults: 1,
      children: 0,
      infantsInSeat: 0,
      infantsOnLap: 0,
    };
    if (
      JSON.stringify(flightSearch.passengers) !==
      JSON.stringify(defaultPassengers)
    ) {
      params.set("passengers", JSON.stringify(flightSearch.passengers));
    }

    // Locations
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

    // Dates
    if (flightSearch.departureDate) {
      params.set("departure", flightSearch.departureDate);
    }
    if (flightSearch.returnDate && flightSearch.tripType === "round_trip") {
      params.set("return", flightSearch.returnDate);
    }

    setSearchParams(params, { replace: true });
  }, [flightSearch, setSearchParams]);

  // Update state from URL params on mount and when URL changes
  useEffect(() => {
    const tripType =
      (searchParams.get("tripType") as IFlightSearchState["tripType"]) ||
      "round_trip";
    const classType =
      (searchParams.get("class") as IFlightSearchState["classType"]) ||
      "economy";

    let passengers: IPassengerCounts = {
      adults: 1,
      children: 0,
      infantsInSeat: 0,
      infantsOnLap: 0,
    };
    const passengersParam = searchParams.get("passengers");
    if (passengersParam) {
      try {
        passengers = JSON.parse(passengersParam);
      } catch {
        console.warn("Invalid passengers parameter in URL");
      }
    }

    let origin: ILocation | null = null;
    const fromParam = searchParams.get("from");
    if (fromParam) {
      try {
        const parsed = JSON.parse(fromParam);
        origin = {
          code: parsed.code || "",
          city: parsed.city || "",
          name: parsed.name || parsed.city || "",
          country: parsed.country || "",
          skyId: parsed.skyId,
          entityId: parsed.entityId,
        };
      } catch {
        console.warn("Invalid from parameter in URL");
      }
    }

    let destination: ILocation | null = null;
    const toParam = searchParams.get("to");
    if (toParam) {
      try {
        const parsed = JSON.parse(toParam);
        destination = {
          code: parsed.code || "",
          city: parsed.city || "",
          name: parsed.name || parsed.city || "",
          country: parsed.country || "",
          skyId: parsed.skyId,
          entityId: parsed.entityId,
        };
      } catch {
        console.warn("Invalid to parameter in URL");
      }
    }

    const departureDate = searchParams.get("departure");
    const returnDate = searchParams.get("return");

    // Update state with URL params
    dispatch(
      updateFromUrlParams({
        tripType,
        classType,
        passengers,
        origin,
        destination,
        departureDate,
        returnDate: tripType === "round_trip" ? returnDate : null,
      })
    );
  }, [searchParams, dispatch]);

  return { updateUrlFromState };
};
