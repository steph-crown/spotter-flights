import type { ILocaleConfig } from "@/interfaces/locale.interface";

const getUserCountryCode = async () => {
  try {
    const countryFromIP = await getCountryFromIP();

    return countryFromIP;
  } catch (error) {
    console.warn("Failed to get country from IP:", error);
  }
};

export const findMatchingLocaleConfig = async (
  localeConfigs: ILocaleConfig[]
): Promise<ILocaleConfig | null> => {
  const userCountryCode = (await getUserCountryCode()) || "US";

  // First, try to find exact match by country code
  const exactMatch = localeConfigs.find(
    (config) =>
      config.countryCode.toLowerCase() === userCountryCode.toLowerCase()
  );

  if (exactMatch) {
    return exactMatch;
  }

  return null;
};

export const getDefaultLocaleConfig = (): {
  countryCode: string;
  market: string;
  currency: string;
} => {
  return {
    countryCode: "US",
    market: "en-US",
    currency: "USD",
  };
};

const getCountryFromIP = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://ipapi.co/country/");

    if (response.ok) {
      const countryCode = await response.text();
      return countryCode.trim().toUpperCase();
    }
  } catch (error) {
    console.warn("IP geolocation failed:", error);
  }

  return null;
};
