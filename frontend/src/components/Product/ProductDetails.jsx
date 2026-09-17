import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../../app/actions/ProductConstants";
import { addItemToCart } from "../../../app/actions/CartActions";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [id]);

  if (loading) {
    return (
      <main className="page-content">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-content">
        <p role="alert">{error}</p>
      </main>
    );
  }

  if (!product?._id) {
    return null;
  }

  const images = product.images?.length ? product.images : [];
  const activeImage = images[activeImageIndex];
  const activeImageUrl = typeof activeImage === "string" ? activeImage : activeImage?.url;
  const rating = product.rating ?? 0;
  const starFillPercent = (Math.max(0, Math.min(rating, 5)) / 5) * 100;
  const inStock = product.stock > 0;

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQuantity = () => setQuantity((q) => Math.min(product.stock, q + 1));
  const handleAddToCart = () => dispatch(addItemToCart(product, quantity));

  return (
    <main className="page-content">
      <Metadata title={product.name} />
      <div className="product-view">
        <div className="product-view-image">
          <div className="product-view-main-image">
            <img src={activeImageUrl} alt={product.name} />
          </div>
          {images.length > 1 && (
            <div className="product-view-thumbnails" role="tablist" aria-label="Product images">
              {images.map((img, index) => {
                const url = typeof img === "string" ? img : img.url;
                return (
                  <button
                    key={img?._id || url || index}
                    type="button"
                    role="tab"
                    aria-selected={index === activeImageIndex}
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    className={`product-view-thumbnail${index === activeImageIndex ? " active" : ""}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={url} alt="" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="product-view-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div
            className="product-rating"
            aria-label={`${rating} out of 5 stars, ${product.numOfReviews} reviews`}
          >
            <span className="product-stars" aria-hidden="true">
              <span
                className="product-stars-fill"
                style={{ width: `${starFillPercent}%` }}
              >
                ★★★★★
              </span>
            </span>
            <span>{product.numOfReviews} reviews</span>
          </div>
          <p className="product-view-price">${product.price}</p>
          <p className="product-view-description">{product.description}</p>
          <p className={`product-view-stock ${inStock ? "in-stock" : "out-of-stock"}`}>
            {inStock ? `In stock (${product.stock} available)` : "Out of stock"}
          </p>
          {inStock && (
            <div className="product-view-cart">
              <div className="product-view-quantity" role="group" aria-label="Quantity">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="product-view-quantity-value">{quantity}</span>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button type="button" className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <section className="product-reviews" aria-labelledby="product-reviews-title">
          <h2 id="product-reviews-title">Reviews</h2>
          <ul className="review-list">
            {product.reviews.map((review) => (
              <li key={review._id} className="review-item">
                <p className="review-name">{review.name}</p>
                <p className="review-rating">{review.rating} / 5</p>
                {review.comment && <p className="review-comment">{review.comment}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;
