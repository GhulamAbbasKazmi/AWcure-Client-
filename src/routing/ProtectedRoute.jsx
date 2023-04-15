import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./ProtectedRoute.css";

import errorImage from "../assets/401 Error.png";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="Protected-Route-Main">
        <img className="error-image" src={errorImage} />
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
