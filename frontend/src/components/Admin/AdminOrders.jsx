import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../layout/Loader";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/orders/admin/all")
      .then(({ data }) => setOrders(data.orders))
      .catch((requestError) =>
        setError(requestError.response?.data?.message || requestError.message),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-page">
      <p className="admin-eyebrow">Fulfillment</p>
      <h2>Orders</h2>

      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/admin/orders/${order._id}`}>
                    {order._id.slice(-8)}
                  </Link>
                </td>
                <td>{order.user?.name || "—"}</td>
                <td>
                  <span
                    className={`admin-status-pill admin-status-${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.paymentInfo?.status || "pending"}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && orders.length === 0 && <p>No orders yet.</p>}
    </section>
  );
};

export default AdminOrders;
