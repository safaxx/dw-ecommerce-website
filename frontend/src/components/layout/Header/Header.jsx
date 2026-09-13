import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }) =>
  `nav-link${isActive ? " nav-link-active" : ""}`;

function Header() {
  return (
    <Disclosure as="header" className="site-header">
      <div className="nav-container">
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

        <DisclosureButton className="menu-button">Menu</DisclosureButton>
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
