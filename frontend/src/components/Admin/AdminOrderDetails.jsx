import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../layout/Loader";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/v1/orders/admin/${id}`)
      .then(({ data }) => setOrder(data.order))
      .catch((requestError) =>
        setError(requestError.response?.data?.message || requestError.message),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p role="alert">{error}</p>;
  if (!order) return null;

  return (
    <section className="admin-page">
      <p className="admin-eyebrow">Fulfillment</p>
      <h2>Order #{order._id.slice(-8)}</h2>

      <div className="checkout-confirmation">
        <div className="checkout-confirmation-block">
          <h2>Customer</h2>
          <p>{order.user?.name || "—"}</p>
          <p>{order.user?.email || "—"}</p>
        </div>

        <div className="checkout-confirmation-block">
          <h2>Shipping Details</h2>
          <p>{order.shippingInfo.address}</p>
          <p>
            {order.shippingInfo.city}, {order.shippingInfo.state},{" "}
            {order.shippingInfo.pincode}
          </p>
          <p>{order.shippingInfo.country}</p>
          <p>{order.shippingInfo.phoneNumber}</p>
        </div>

        <div className="checkout-confirmation-block">
          <h2>Order Status</h2>
          <p>
            <span
              className={`admin-status-pill admin-status-${order.orderStatus.toLowerCase()}`}
            >
              {order.orderStatus}
            </span>
          </p>
          <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
          {order.deliveredAt && (
            <p>Delivered: {new Date(order.deliveredAt).toLocaleString()}</p>
          )}
        </div>

        <div className="checkout-confirmation-block">
          <h2>Payment</h2>
          <p>Method: {order.paymentMethod}</p>
          <p>Status: {order.paymentInfo?.status || "pending"}</p>
          {order.paymentInfo?.id && <p>Payment ID: {order.paymentInfo.id}</p>}
        </div>

        <div className="checkout-confirmation-block">
          <h2>Order Items</h2>
          <ul className="checkout-items">
            {order.orderItems.map((item) => (
              <li key={item._id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <p>
              <span>Subtotal</span>
              <strong>${order.itemsPrice.toFixed(2)}</strong>
            </p>
            <p>
              <span>Tax</span>
              <strong>${order.taxPrice.toFixed(2)}</strong>
            </p>
            <p>
              <span>Shipping</span>
              <strong>${order.shippingPrice.toFixed(2)}</strong>
            </p>
            <p className="checkout-total">
              <span>Total</span>
              <strong>${order.totalPrice.toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrderDetails;
