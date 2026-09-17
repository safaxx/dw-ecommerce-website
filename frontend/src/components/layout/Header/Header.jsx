import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { NavLink, Link } from "react-router-dom";

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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" />
    </svg>
  );
}

function Header() {
  return (
    <Disclosure as="header" className="site-header">
      <div className="nav-container">
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
            <Link to="/search" className="icon-button" aria-label="Search">
              <SearchIcon />
            </Link>
            <Link to="/account" className="icon-button" aria-label="Account">
              <UserIcon />
            </Link>
          </div>

          <DisclosureButton className="menu-button">Menu</DisclosureButton>
        </div>
      </div>

      <DisclosurePanel className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Header;
