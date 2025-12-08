import { Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import BlogPost from "./pages/BlogPost";


export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>

      <nav>
        <Link to="details" style={{ marginRight: "10px" }}>Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}
