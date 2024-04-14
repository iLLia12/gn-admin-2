import Games from "../../pages/games";
import CreateGame from "../../pages/games/create";
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
      element: <CreateGame />,
    },
  ],
};
