import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "beige",
        color: "white",
      }}
    >
      <NavLink to="/">Home</NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "red" : "black",
        })}
      >
        About
      </NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}

export default Navbar;
