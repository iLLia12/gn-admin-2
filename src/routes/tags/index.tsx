import MainLayout from "../../layouts/main";
import Tags from "../../pages/tags";

export default {
  path: "tags",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Tags />,
    },
  ],
};
