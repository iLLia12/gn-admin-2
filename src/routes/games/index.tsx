import Games from "../../pages/games";
import Create from "../../pages/games/create";
import Edit from "../../pages/games/edit";
import MainLayout from "../../layouts/main";

export default {
  path: "games",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Games />,
    },
    {
      path: "create",
      element: <Create />,
    },
    {
      path: ":id/edit",
      element: <Edit />,
    },
  ],
};
