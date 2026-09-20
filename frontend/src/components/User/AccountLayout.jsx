import { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const navItems = [
    { label: "Profile", to: "/my-account" },
    { label: "Orders", to: "/my-account/orders" },
    { label: "Wishlist", to: "/my-account/wishlist" },
  ];
  const linkClass = ({ isActive }) =>
    `account-nav-link${isActive ? " account-nav-link-active" : ""}`;

  return (
    <div className="page-content account-layout">
      <nav className="account-nav" aria-label="Account navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/my-account"}
            className={linkClass}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="account-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
