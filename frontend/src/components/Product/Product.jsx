import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

function Product({product, isAdmin, onEdit, onDelete}) {
  const image = product.images?.[0];
  const imageUrl = typeof image === 'string' ? image : image?.url;
  const rating = product.rating ?? 0;
  const starFillPercent = Math.max(0, Math.min(rating, 5)) / 5 * 100;

  const handleEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onEdit(product._id);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(product._id);
  };

  return (
    <Link className="product-card" to={`/products/${product._id}`}>
        <div className="product-image-wrap">
          <img src={imageUrl} alt={product.name} />
          {isAdmin && (
            <div className="product-admin-actions">
              <button
                type="button"
                className="product-admin-action"
                onClick={handleEdit}
                aria-label="Edit product"
              >
                <Pencil size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="product-admin-action"
                onClick={handleDelete}
                aria-label="Delete product"
              >
                <Trash2 size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          )}
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