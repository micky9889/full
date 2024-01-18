import ReactDOM from "react-dom/client";
import App from "./App";
//Redux
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/index";
//Router 
import {BrowserRouter} from 'react-router-dom'

const store = legacy_createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
