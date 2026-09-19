import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ onClose }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchProducts = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
      onClose();
    } else {
      navigate("/products");
    }
  };

  return (
    <form className="header-search" onSubmit={handleSearchProducts}>
        <label className="sr-only" htmlFor="header-search-input">
          Search products
        </label>
        <input
          id="header-search-input"
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />
        <button type="submit" className="search-submit">
          Search
        </button>
        <button type="button" className="search-close" onClick={onClose}>
          Close
        </button>
    </form>
  );
};

export default Search;
