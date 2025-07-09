import { useLazyGetConfigQuery } from "@/services/flight.service";
import { setLocaleSettings } from "@/store/slices/flightSearch.slice";
import {
  findMatchingLocaleConfig,
  getDefaultLocaleConfig,
} from "@/utils/locale.utils";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "./redux";

export const useLocaleInitialization = () => {
  const dispatch = useAppDispatch();
  const [getConfig, { data: configData, isLoading, isError }] =
    useLazyGetConfigQuery();

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const initializeLocale = useCallback(async () => {
    if (configData?.status && configData.data) {
      const matchingConfig = await findMatchingLocaleConfig(configData.data);

      if (matchingConfig) {
        dispatch(
          setLocaleSettings({
            countryCode: matchingConfig.countryCode,
            market: matchingConfig.market,
            currency: matchingConfig.currency,
          })
        );
      } else {
        const defaultConfig = getDefaultLocaleConfig();
        dispatch(setLocaleSettings(defaultConfig));
      }
    } else if (isError) {
      const defaultConfig = getDefaultLocaleConfig();
      dispatch(setLocaleSettings(defaultConfig));

      console.warn(
        "Failed to fetch locale config, using defaults:",
        defaultConfig
      );
    }
  }, [configData?.data, configData?.status, dispatch, isError]);

  useEffect(() => {
    initializeLocale();
  }, [configData, isError, dispatch, initializeLocale]);

  return {
    isLoadingConfig: isLoading,
    configError: isError,
  };
};
