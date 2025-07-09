import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { flightService } from "@/services/flight.service";
import flightSearchReducer from "@/store/slices/flightSearch.slice";

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    [flightService.reducerPath]: flightService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          flightService.util.resetApiState.type,
        ],
        ignoredPaths: [
          `${flightService.reducerPath}.mutations`,
          `${flightService.reducerPath}.queries`,
          `${flightService.reducerPath}.subscriptions`,
        ],
      },
    }).concat(flightService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
