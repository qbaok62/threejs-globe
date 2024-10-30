import { getCountry } from "@/ultis";
import { allCountries } from "./all-countries";
import { TCountry } from "@/types";

const connectionsObj = {
  Colombia: [
    "Ecuador",
    "Cuba",
    "Mexico",
    "Peru",
    "Venezuela, RB",
    "Guyana",
    "United States",
  ],
  "South Sudan": [
    "Nigeria",
    "Sudan",
    "Kenya",
    "Uganda",
    "Zambia",
    "Malawi",
    "Ethiopia",
    "Somalia",
    "Madagascar",
    "Yemen, Rep.",
  ],
  India: [
    "Pakistan",
    "Kazakhstan",
    "Maldives",
    "Sri Lanka",
    "Vietnam",
    "Thailand",
  ],
  Thailand: [
    "Singapore",
    "Indonesia",
    "Nepal",
    "Vietnam",
    "Sri Lanka",
    "Cambodia",
    "Pakistan",
  ],
  Panama: [
    "Cuba",
    "Mexico",
    "Ecuador",
    "Colombia",
    "Peru",
    "Venezuela, RB",
    "United States",
  ],
  Fiji: [
    "Tuvalu",
    "Nauru",
    "Kiribati",
    "Tonga",
    "New Caledonia",
    "New Zealand",
  ],
};

export const connections = Object.entries(connectionsObj).reduce(
  (results, [key, value]) => {
    results[key] = value.map((c) => getCountry(c, allCountries));
    return results;
  },
  {} as Record<string, TCountry[]>
);
