import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = new ApolloClient({
  uri: "http://localhost:3033/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ApolloProvider>
  );
}

export default App;
