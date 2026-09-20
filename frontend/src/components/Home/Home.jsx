import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader";
import Product from "./Product";
import { getProducts } from "../../../app/actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
  dispatch(getProducts("", 1, "", "", "", false, [], true));
}, [dispatch]);

  return (
    <section
      className="featured-products"
      aria-labelledby="featured-products-title"
    >
      <h2 id="featured-products-title">Featured products</h2>
      {loading && <Loader />}
      {error && <p role="alert">{error}</p>}
      <div className="product-grid">
        {products
          .filter((product) => product.featuredProduct)
          .map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <main className="page-content">
        <Metadata title="Always Modest" />
        <h1>Everything worth bringing home.</h1>
        <p>Browse our most loved essentials for everyday living.</p>
      </main>
      <hr className="section-divider" />
      <FeaturedProducts />
    </>
  );
}

export default Home;
