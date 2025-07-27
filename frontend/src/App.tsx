import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";

import { RoutePage } from "./utils/RoutePage";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <QueryClientContextProvider>
      <Router>
        <ToastContainer
          position="top-center"
          pauseOnHover
          hideProgressBar
          transition={Bounce}
          closeButton={false}
          closeOnClick
          autoClose={5000}
        />
        <RoutePage />
      </Router>
    </QueryClientContextProvider>
  );
}

export default App;
