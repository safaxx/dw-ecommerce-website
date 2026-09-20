import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Metadata from "../layout/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import ShippingDetails from "./ShippingDetails";
import ConfirmOrder from "./ConfirmOrder";
import Payment from "./Payment";
import { clearSavedCart } from "../../../app/actions/CartActions";
import "./Checkout.css";

const initialShippingInfo = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phoneNumber: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const taxPrice = 0;
  const shippingPrice = 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems.length, isAuthenticated, navigate]);

  useEffect(() => {
    if (user?.shippingInfo) {
      setShippingInfo((current) => ({
        ...current,
        ...user.shippingInfo,
      }));
    }
  }, [user]);

  if (!isAuthenticated || !cartItems.length) return null;

  const handleShippingChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((current) => ({ ...current, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setError("");

    try {
      const { data } = await axios.post("/api/v1/orders/create", {
        shippingInfo,
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
          product: item.product,
        })),
        paymentInfo: {
          id: "pending",
          status: "pending",
        },
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      dispatch(clearSavedCart());
      navigate(`/my-account/orders/${data.order._id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-content checkout-page">
      <Metadata title="Checkout" />
      <h1>Checkout</h1>
      <CheckoutSteps activeStep={activeStep} />
      <div className="checkout-content">
        {activeStep === 0 && (
          <ShippingDetails
            shippingInfo={shippingInfo}
            onChange={handleShippingChange}
            onSubmit={(event) => {
              event.preventDefault();
              setActiveStep(1);
            }}
          />
        )}
        {activeStep === 1 && (
          <ConfirmOrder
            shippingInfo={shippingInfo}
            cartItems={cartItems}
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            onBack={() => setActiveStep(0)}
            onContinue={() => setActiveStep(2)}
          />
        )}
        {activeStep === 2 && (
          <Payment
            totalPrice={totalPrice}
            loading={submitting}
            error={error}
            onBack={() => setActiveStep(1)}
            onSubmit={handlePlaceOrder}
          />
        )}
      </div>
    </main>
  );
};

export default Checkout;
