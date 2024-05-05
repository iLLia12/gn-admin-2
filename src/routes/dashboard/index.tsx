import MainLayout from "../../layouts/main";
import Dashboard from "../../pages/dashboard";

export default {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
  ],
};
