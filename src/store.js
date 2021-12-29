import { configureStore } from "@reduxjs/toolkit";
import deviceInformationReducer from "./features/deviceInformation/deviceInformationSlice";
import deviceInteractionReducer from "./features/deviceInteraction/deviceInteractionSlice";
import settingsReducer from "./features/settings/settingsSlice";
import lastAppRefreshReducer from "./features/lastAppRefresh/lastAppRefreshSlice";
export default configureStore({
  reducer: {
    deviceInformation: deviceInformationReducer,
    deviceInteraction: deviceInteractionReducer,
    settings: settingsReducer,
    lastAppRefresh: lastAppRefreshReducer,
  },
});