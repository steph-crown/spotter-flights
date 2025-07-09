// hooks/useLocaleInitialization.ts

import { useLazyGetConfigQuery } from "@/services/flight.service";
import { setLocaleSettings } from "@/store/slices/flightSearch.slice";
import {
  findMatchingLocaleConfig,
  getDefaultLocaleConfig,
} from "@/utils/locale.utils";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";

export const useLocaleInitialization = () => {
  const dispatch = useAppDispatch();
  const [getConfig, { data: configData, isLoading, isError }] =
    useLazyGetConfigQuery();

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const initializeLocale = async () => {
    if (configData?.status && configData.data) {
      // const userLocale = getUserLocale();
      const matchingConfig = await findMatchingLocaleConfig(configData.data);

      if (matchingConfig) {
        // Found a matching locale configuration
        dispatch(
          setLocaleSettings({
            countryCode: matchingConfig.countryCode,
            market: matchingConfig.market,
            currency: matchingConfig.currency,
          })
        );

        console.log(
          `Using locale configuration for ${matchingConfig.country}:`,
          {
            countryCode: matchingConfig.countryCode,
            market: matchingConfig.market,
            currency: matchingConfig.currency,
          }
        );
      } else {
        // No matching config found, use defaults
        const defaultConfig = getDefaultLocaleConfig();
        dispatch(setLocaleSettings(defaultConfig));

        console.log(
          `No matching locale found for  using default:`,
          defaultConfig
        );
      }
    } else if (isError) {
      // API call failed, use defaults
      const defaultConfig = getDefaultLocaleConfig();
      dispatch(setLocaleSettings(defaultConfig));

      console.warn(
        "Failed to fetch locale config, using defaults:",
        defaultConfig
      );
    }
  };

  useEffect(() => {
    initializeLocale();
  }, [configData, isError, dispatch]);

  return {
    isLoadingConfig: isLoading,
    configError: isError,
  };
};
