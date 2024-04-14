import MainLayout from "../../layouts/main";
import Filters from "../../pages/filters";

export default {
  path: "filters",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Filters />,
    },
  ],
};
