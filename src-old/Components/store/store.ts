import { configureStore } from "@reduxjs/toolkit";
import celebrityRequestReducer from "./celebrityRequestSlice";
import reportsReducer from "./reportsSlice";
import sponsoredEventReducer from "./sponsoredEventSlice";
import supportReducer from "./supportSlice";
import blockedUsersReducer from "./blockedUsersSlice";

const store = configureStore({
  reducer: {
    celebrityRequest: celebrityRequestReducer,
    reports: reportsReducer,
    sponsoredEvent: sponsoredEventReducer,
    support: supportReducer,
    blockedUsers: blockedUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
