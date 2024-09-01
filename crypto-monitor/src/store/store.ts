import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coinGeckoApi } from "./coinGeckoApi";

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        message: '',
    },
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        clearErrorMessage: (state) => {
            state.message = '';
        },
    },
});

export const { setErrorMessage, clearErrorMessage } = errorSlice.actions;

export const store = configureStore({
    reducer: {
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
        error: errorSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinGeckoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;