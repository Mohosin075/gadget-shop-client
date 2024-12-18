import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

function DashboardLayout() {
  const role = useUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div>
          <Outlet />
        </div>

        <div>
          <label
            htmlFor="my-drawer-2"
            className=" lg:hidden flex justify-end p-4"
          >
            <FaBarsStaggered />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          {/* Sidebar content here */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {role === "seller" && (
            <>
              <li>
                <NavLink to="/dashboard/add-product">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-product">My Product</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/dashboard/some">Add Something</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
