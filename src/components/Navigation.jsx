import { NavLink, useNavigate } from "react-router-dom";

function Navigation({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">Student Portal</div>

      <div className="nav-links">
        {user ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/students"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Students
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Register
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
          </>
        )}
      </div>

      {user && (
        <div className="nav-user">
          <span className="user-info">
            Welcome, <strong>{user.username}</strong>
          </span>

          <span className="role-badge">{user.role}</span>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
