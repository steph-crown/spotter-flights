import type { SortByOption } from "@/interfaces/flight.interface";

export const TRIP_OPTIONS = [
  {
    label: "Round Trip",
    value: "round_trip",
  },
  {
    label: "One Way",
    value: "one_way",
  },
];

export const CLASS_OPTIONS = [
  {
    label: "Economy",
    value: "economy",
  },
  {
    label: "Premium Economy",
    value: "premium_economy",
  },
  {
    label: "Business",
    value: "business",
  },
  {
    label: "First",
    value: "first",
  },
];

export const SORT_OPTIONS: { value: SortByOption; label: string }[] = [
  { value: "best", label: "Best" },
  { value: "price_high", label: "Most Expensive" },
  { value: "fastest", label: "Fastest" },
  { value: "outbound_take_off_time", label: "Outbound Takeoff Time" },
  { value: "outbound_landing_time", label: "Outbound Landing Time" },
  { value: "return_take_off_time", label: "Return Takeoff Time" },
  { value: "return_landing_time", label: "Return Landing Time" },
];
