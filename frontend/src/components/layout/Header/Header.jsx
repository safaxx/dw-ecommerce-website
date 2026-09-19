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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" />
    </svg>
  );
}

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Disclosure as="header" className="site-header">
      <div className="nav-container">
        {isSearchOpen ? (
          <Search onClose={() => setIsSearchOpen(false)} />
        ) : (
          <>
            <NavLink to="/" className="brand">
              ALWAYS MODEST
            </NavLink>

            <div className="nav-right">
              <nav className="desktop-nav" aria-label="Main navigation">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="header-icons">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Open search"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <SearchIcon />
                </button>
                {isAuthenticated ? (
                  <Menu as="div" className="account-menu">
                    <MenuButton className="icon-button" aria-label="Account">
                      <UserIcon />
                    </MenuButton>
                    <MenuItems className="account-menu-items">
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
                    <UserIcon />
                  </Link>
                )}
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
