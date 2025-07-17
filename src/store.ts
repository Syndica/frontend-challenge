import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "tasks",
  storage,
};

const persistedTaskReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Required for redux-persist to not throw warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer types for use throughout app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;