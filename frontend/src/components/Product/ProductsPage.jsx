import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";
import Product from "../Home/Product";
import { getProducts } from "../../../app/actions/ProductConstants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function AllProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section
      className="featured-products"
      aria-labelledby="featured-products-title"
    >
      <h2 id="featured-products-title">All products</h2>
      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
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
