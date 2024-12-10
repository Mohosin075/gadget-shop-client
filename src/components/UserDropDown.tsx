import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function UserDropDown() {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();
  const handleLogOut =()=>{
    logOut()
    navigate('/')
  }

  return (
    <div className="dropdown dropdown-left dropdown-bottom">
      <div tabIndex={0} role="button" className="m-1">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img
              src={`${
                user?.photoURL ? user?.photoURL : "https://www.pngitem.com/pimgs/m/137-1370051_avatar-generic-avatar-hd-png-download.png"
              }`}
            />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <button onClick={handleLogOut} className="btn btn-sm">Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default UserDropDown;
