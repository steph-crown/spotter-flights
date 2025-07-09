export interface ILocaleConfig {
  country: string;
  countryCode: string;
  market: string;
  currencyTitle: string;
  currency: string;
  currencySymbol: string;
  site: string;
}

export interface IGetConfigResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: ILocaleConfig[];
}
