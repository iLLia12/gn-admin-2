import { Link, Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="flex w-full">
      <aside className="flex justify-center bg-amber-800 h-screen w-[100px]">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/filters">Filters</Link>
          </li>
          <li>
            <Link to="/tags">Tags</Link>
          </li>
        </ul>
      </aside>
      <div>
        <header className="bg-indigo-900 w-screen">Header is here</header>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
