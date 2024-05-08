import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
const MainLayout = () => {
  const [size, setSetSize] = useState(100);

  function handleOpenAside() {
    setSetSize(size == 100 ? 250 : 100);
  }
  return (
    <div className="flex w-full">
      <aside
        className={`flex justify-center transition-all bg-amber-800 h-auto w-[${size}px]`}
      >
        <ul className="bg-amber-800">
          <li onClick={handleOpenAside} className="cursor-pointer">
            Size
          </li>
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
      <div className={`w-[calc(100%)]`}>
        <header className="w-auto bg-indigo-900 h-[50px]">
          Header is here
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
