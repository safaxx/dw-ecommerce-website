import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Metadata from "./components/layout/Metadata";
import ProductsPage from "./components/Product/ProductsPage";

function Page({ title, description }) {
  return (
    <main className="page-content">
      <Metadata title={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/about"
          element={
            <Page
              title="About"
              description="We curate useful products with a sharp eye for quality."
            />
           
          }
        />
        <Route
          path="/products"
          element={
             <ProductsPage/>
          }
        />
        <Route
          path="/contact"
          element={
            <Page
              title="Let us help."
              description="Reach out with questions about products or orders."
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
