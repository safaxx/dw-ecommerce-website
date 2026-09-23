import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

const AdminLayout = () => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);

	if (loading) {
		return <main className="admin-status">Checking admin access...</main>;
	}

	if (!isAuthenticated || user?.role !== "admin") {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="admin-shell">
			<AdminSidebar />
			<main className="admin-main">
				<Outlet />
			</main>
		</div>
	);
};

export default AdminLayout;
