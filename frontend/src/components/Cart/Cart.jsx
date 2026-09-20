import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateCartItemQuantity } from "../../../app/actions/CartActions";
import Metadata from "../layout/Metadata";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const changeQuantity = (item, quantity) => {
    if (quantity < 1 || quantity > item.stock) return;
    dispatch(updateCartItemQuantity(item.product, item.size, quantity));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="page-content cart-page">
      <Metadata title="Your Cart" />
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. <Link to="/products">Browse products</Link>
        </p>
      ) : (
        <div className="cart-layout">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={`${item.product}-${item.size}`} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                </div>
                <div className="product-view-quantity" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => changeQuantity(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="product-view-quantity-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => dispatch(removeItemFromCart(item.product, item.size))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <Link to="/checkout" className="add-to-cart-button cart-checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
