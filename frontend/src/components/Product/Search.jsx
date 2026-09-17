import React, { useState } from "react";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearchProducts = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <>
      <form onSubmit={handleSearchProducts}>
        <input
          type="text"
          placeholder="search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
