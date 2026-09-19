import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../layout/Loader";
import "../User/MyAccount.css";

const OrderDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    axios
      .get(`/api/v1/orders/${id}`)
      .then(({ data }) => setOrder(data.order))
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <section className="account-section">
        <Loader />
      </section>
    );
  }

  if (!order) {
    return (
      <section className="account-section">
        <p>Order not found.</p>
        <Link to="/my-account/orders" className="link-button">
          Back to orders
        </Link>
      </section>
    );
  }

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    orderStatus,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;

  return (
    <section className="account-section" aria-labelledby="order-details-title">
      <div className="account-section-header">
        <h2 id="order-details-title">Order #{order._id}</h2>
        <span
          className={`order-status order-status-${orderStatus.toLowerCase()}`}
        >
          {orderStatus}
        </span>
      </div>

      <div className="account-info-grid">
        <div>
          <span className="account-info-label">Shipping address</span>
          <p>
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
            {shippingInfo.country} {shippingInfo.pincode}
          </p>
        </div>
        <div>
          <span className="account-info-label">Phone number</span>
          <p>{shippingInfo.phoneNumber}</p>
        </div>
        <div>
          <span className="account-info-label">Payment status</span>
          <p>{paymentInfo?.status || "N/A"}</p>
        </div>
      </div>

      <h3 className="order-detail-subtitle">Items</h3>
      <ul className="order-detail-items">
        {orderItems.map((item) => (
          <li key={item.product} className="order-detail-item">
            <img src={item.image} alt={item.name} />
            <span className="order-detail-item-name">{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="order-price-breakdown">
        <p>
          <span>Items</span>
          <span>${itemsPrice.toFixed(2)}</span>
        </p>
        <p>
          <span>Tax</span>
          <span>${taxPrice.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>${shippingPrice.toFixed(2)}</span>
        </p>
        <p className="order-price-total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </p>
      </div>

      <Link to="/my-account/orders" className="link-button">
        Back to orders
      </Link>
    </section>
  );
};

export default OrderDetails;
