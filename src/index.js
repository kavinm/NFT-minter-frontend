import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createStore} from 'redux'
import { accountReducer } from './reducers/accountReducer';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

export const store = createStore(accountReducer)

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819"
  }
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({ colors, config });

const rootElement = document.getElementById("root");
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </QueryClientProvider>
,
  rootElement
);
