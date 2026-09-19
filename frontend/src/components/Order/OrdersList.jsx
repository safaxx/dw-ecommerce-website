import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../layout/Loader";
import { clearErrors } from "../../../app/actions/UserActions";

import "../User/MyAccount.css";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    axios
      .get("/api/v1/orders/my-orders")
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setOrdersLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <>
      <section
        className="account-section"
        aria-labelledby="account-orders-title"
      >
        <h2 id="account-orders-title">Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id}>
                <Link
                  to={`/my-account/orders/${order._id}`}
                  className="order-item"
                >
                  <div>
                    <p className="order-id">Order #{order._id}</p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`order-status order-status-${order.orderStatus.toLowerCase()}`}
                  >
                    {order.orderStatus}
                  </span>
                  <p className="order-items-count">
                    {order.orderItems.length} item(s)
                  </p>
                  <p className="order-total">${order.totalPrice.toFixed(2)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default OrdersList;
