import { createBrowserRouter } from "react-router-dom";
import games from "./games";
import filters from "./filters";
import tags from "./tags";
import dashboard from "./dashboard";

const router = createBrowserRouter([dashboard, games, filters, tags]);

export default router;
