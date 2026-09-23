import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const adminLinks = [
	{ label: "Dashboard", to: "/admin" },
	{ label: "Products", to: "/admin/products" },
	{ label: "Orders", to: "/admin/orders" },
	{ label: "Users", to: "/admin/users" },
	{ label: "Reviews", to: "/admin/reviews" },
];

const AdminSidebar = () => (
	<aside className="admin-sidebar">
		<div>
			<p className="admin-eyebrow">Store management</p>
			<h1 className="admin-sidebar-title">Admin</h1>
		</div>
		<nav aria-label="Admin navigation" className="admin-nav">
			{adminLinks.map((link) => (
				<NavLink
					key={link.to}
					to={link.to}
					end={link.to === "/admin"}
					className={({ isActive }) =>
						isActive ? "admin-nav-link admin-nav-link-active" : "admin-nav-link"
					}
				>
					{link.label}
				</NavLink>
			))}
		</nav>
		<NavLink className="admin-back-link" to="/">
			<ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
			<span>Back to storefront</span>
		</NavLink>
	</aside>
);

export default AdminSidebar;
