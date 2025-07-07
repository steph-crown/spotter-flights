import type { IAirport, ILocation } from "@/interfaces/flight.interface";

export const convertAirportToLocation = (airport: IAirport): ILocation => {
  return {
    code: airport.skyId,
    name: airport.presentation.title,
    city: airport.presentation.title,
    country: airport.presentation.subtitle,
    skyId: airport.skyId,
    entityId: airport.entityId,
  };
};

export const formatLocationForUrl = (location: ILocation) => {
  return {
    code: location.code,
    city: location.city,
    skyId: location.skyId,
    entityId: location.entityId,
  };
};
