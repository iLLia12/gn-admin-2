import MainLayout from "../../layouts/main";
import App from "../../App.tsx";

export default {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <App />,
    },
  ],
};
