import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search as SearchIcon,
  CircleUserIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { logout } from "../../../../app/actions/UserActions";
import Search from "../../Product/Search";

const navItems = [
  // { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }) =>
  `nav-link${isActive ? " nav-link-active" : ""}`;

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Disclosure as="header" className="site-header">
      <div className="nav-container">
        {isSearchOpen ? (
          <Search onClose={() => setIsSearchOpen(false)} />
        ) : (
          <>
            <div className="nav-left">
              <NavLink to="/" className="brand">
                ALWAYS MODEST
              </NavLink>
              <nav className="desktop-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="nav-right">
              <div className="header-icons">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Open search"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <SearchIcon size={25} strokeWidth={2} aria-hidden="true" />
                </button>
                {isAuthenticated ? (
                  <Menu as="div" className="account-menu">
                    <MenuButton className="icon-button" aria-label="Account">
                      <CircleUserIcon
                        size={25}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <MenuItems className="account-menu-items">
                      {user?.role === "admin" && (
                        <MenuItem>
                          <Link to="/admin">Dashboard</Link>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <Link to="/my-account">Profile</Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => dispatch(logout())}
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link to="/login" className="icon-button" aria-label="Login">
                    <CircleUserIcon
                      size={25}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="icon-button cart-icon-button"
                  aria-label={`Cart, ${cartItemCount} item${cartItemCount === 1 ? "" : "s"}`}
                >
                  <ShoppingCartIcon
                    size={25}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {cartItemCount > 0 && (
                    <span className="cart-badge" aria-hidden="true">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>

              <DisclosureButton className="menu-button">Menu</DisclosureButton>
            </div>
          </>
        )}
      </div>

      {!isSearchOpen && (
        <DisclosurePanel className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </DisclosurePanel>
      )}
    </Disclosure>
  );
}

export default Header;
