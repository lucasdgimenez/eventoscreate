import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import React from 'react';
import store from "../src/store"
import {Provider} from "react-redux"

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  );
}

