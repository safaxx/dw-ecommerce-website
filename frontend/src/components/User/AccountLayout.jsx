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
  `nav-link${isActive ? " nav-link-active" : ""}`;


  return (
    <>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Outlet/>
    </>
  );
};

export default AccountLayout;
