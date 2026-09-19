import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";
import Product from "../Home/Product";
import { getProducts } from "../../../app/actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { PRODUCT_SIZES } from "../../constants/sizes";

function AllProducts() {
  const dispatch = useDispatch();
  const { products, loading, error, count } = useSelector(
    (state) => state.products,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || 3999;
  const inStock = searchParams.get("inStock") === "true";
  const sizes = searchParams.get("sizes")
    ? searchParams.get("sizes").split(",")
    : [];
  const resultsPerPage = 8;
  const totalPages = Math.ceil((count || 0) / resultsPerPage);

  useEffect(() => {
    axios
      .get("/api/v1/products/categories")
      .then(({ data }) => setCategories(data.categories));
  }, []);

  const goToPage = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", nextPage);
    setSearchParams(params);
  };
  const applyFilter = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    setSearchParams(params);
  };

  const toggleSize = (size) => {
    const nextSizes = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];
    applyFilter({ sizes: nextSizes.join(",") });
  };

  useEffect(() => {
    dispatch(getProducts(keyword, page, category, minPrice, maxPrice, inStock, sizes));
  }, [dispatch, keyword, page, category, minPrice, maxPrice, inStock, sizes.join(",")]);

  return (
    <section
      className="featured-products"
      aria-labelledby="featured-products-title"
    >
      <div className="products-toolbar">
        <h2 id="featured-products-title">
          {keyword ? `Results for "${keyword}"` : "All products"}
        </h2>
        <button
          type="button"
          className="filter-toggle"
          onClick={() => setIsFilterOpen((open) => !open)}
          aria-expanded={isFilterOpen}
          aria-controls="product-filters"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
            <circle cx="9" cy="6" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="16" cy="12" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="11" cy="18" r="1.8" fill="currentColor" stroke="none" />
          </svg>
          Filter
        </button>
      </div>

      {isFilterOpen && (
        <div className="product-filters" id="product-filters">
          <div className="filter-field">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => applyFilter({ category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="filter-min-price">Min price</label>
            <input
              id="filter-min-price"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => applyFilter({ minPrice: e.target.value })}
            />
          </div>
          <div className="filter-field">
            <label htmlFor="filter-max-price">Max price</label>
            <input
              id="filter-max-price"
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => applyFilter({ maxPrice: e.target.value })}
            />
          </div>
          <div className="filter-field">
            <label>Size</label>
            <div className="size-options">
              {PRODUCT_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-option${sizes.includes(size) ? " active" : ""}`}
                  onClick={() => toggleSize(size)}
                  aria-pressed={sizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <label className="filter-toggle-switch">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => applyFilter({ inStock: e.target.checked })}
            />
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-thumb" />
            </span>
            Hide out of stock
          </label>
        </div>
      )}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-arrow"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            aria-label="Previous page"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`pagination-number${num === page ? " active" : ""}`}
                onClick={() => goToPage(num)}
                aria-current={num === page ? "page" : undefined}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pagination-arrow"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
            aria-label="Next page"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

function ProductsPage() {
  return (
    <>
      <main className="page-content">
        <Metadata title="Products" />
        <h1>The Collection</h1>
        <p>Explore the latest products in the shop.</p>
      </main>
      <hr className="section-divider" />
      <AllProducts />
    </>
  );
}

export default ProductsPage;
