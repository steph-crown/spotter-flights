import type { IFlightLeg, IFlightSegment } from "@/interfaces/flight.interface";

export function analyzeFlightStops(leg: IFlightLeg) {
  const segments = leg.segments;
  const stops = [];

  if (segments.length <= 1) {
    return {
      stops: [],
      totalStopMinutes: 0,
    };
  }

  const totalFlightMinutes = segments.reduce(
    (total, segment) => total + segment.durationInMinutes,
    0
  );

  const totalStopMinutes = leg.durationInMinutes - totalFlightMinutes;

  for (const segment of segments) {
    if (segment.destination?.flightPlaceId === leg.destination.id) {
      continue;
    }

    stops.push({
      id: segment.destination?.flightPlaceId,
      name: segment.destination?.name,
      type: segment.destination?.type,
      country: segment.destination?.country,
    });
  }

  return {
    stops,
    totalStopMinutes,
  };
}

export function getLayoverMinutes(
  arrivalTime: string,
  departureTime: string
): number {
  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);

  const diffInMs = departure.getTime() - arrival.getTime();

  if (diffInMs < 0) return 0;

  return Math.floor(diffInMs / (1000 * 60));
}

export function getSegmentLayover(
  segments: IFlightSegment[],
  currentIndex: number
): number {
  if (currentIndex >= segments.length - 1) return 0;

  const currentSegment = segments[currentIndex];
  const nextSegment = segments[currentIndex + 1];

  return getLayoverMinutes(currentSegment.arrival, nextSegment.departure);
}
