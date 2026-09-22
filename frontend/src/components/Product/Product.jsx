import { Link } from 'react-router-dom'

function Product({product}) {
  const image = product.images?.[0];
  const imageUrl = typeof image === 'string' ? image : image?.url;
  const rating = product.rating ?? 0;
  const starFillPercent = Math.max(0, Math.min(rating, 5)) / 5 * 100;

  return (
    <Link className="product-card" to={`/products/${product._id}`}>
        <div className="product-image-wrap">
          <img src={imageUrl} alt={product.name} />
        </div>
        <div className="product-details">
          <p className="product-name">{product.name}</p>
          <div className="product-rating" aria-label={`${rating} out of 5 stars, ${product.numOfReviews} reviews`}>
            <span className="product-stars" aria-hidden="true">
              <span className="product-stars-fill" style={{ width: `${starFillPercent}%` }}>★★★★★</span>
            </span>
            <span>{product.numOfReviews} reviews</span>
          </div>
          <span className="product-price">${product.price}</span>
        </div>
    </Link>
  )
}

export default Product