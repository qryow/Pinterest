import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './reducers/User/UserSlice'
import pinReducer from './reducers/Pins/PinsSlice'
import descReducer from './reducers/Descs/DescsSlice'

const rootReducer = combineReducers({
  userReducer,
  pinReducer,
  descReducer
})

export const setupStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type appDispatch = AppStore['dispatch']