import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header/Header";

function Page({ title, description }) {
  return (
    <main className="page-content">
      {/* <p className="eyebrow">ALWAYS MODEST</p> */}
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
        <Route
          path="/"
          element={
            <Page
              title="Everything worth bringing home."
              description="Browse considered essentials for everyday living."
            />
          }
        />
        <Route
          path="/about"
          element={
            <Page
              title="Thoughtfully made."
              description="We curate useful products with a sharp eye for quality."
            />
          }
        />
        <Route
          path="/products"
          element={
            <Page
              title="The collection."
              description="Explore the latest products in the shop."
            />
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
