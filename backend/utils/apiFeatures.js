class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    //console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const category = this.queryString.category?.trim();
    const filterCategory = category
      ? { category: { $regex: category, $options: "i" } }
      : {};

    const priceFilter = {};
    const price = this.queryString.price || {};

    for (const operator of ["gt", "gte", "lt", "lte"]) {
      const value = price[operator] ?? this.queryString[`price[${operator}]`];

      if (value !== undefined && Number.isFinite(Number(value))) {
        priceFilter[`$${operator}`] = Number(value);
      }
    }

    const filterPrice = Object.keys(priceFilter).length
      ? { price: priceFilter }
      : {};

    const filterStock =
      this.queryString.inStock === "true" ? { stock: { $gt: 0 } } : {};

    const sizes = this.queryString.sizes
      ? this.queryString.sizes.split(",").filter(Boolean)
      : [];
    const filterSizes = sizes.length ? { sizes: { $in: sizes } } : {};
    const filterFeatured =
      this.queryString.featuredProduct === "true"
        ? { featuredProduct: true }
        : {};
    // console.log("Price filter:", filterPrice);
    this.query = this.query.find({
      ...filterCategory,
      ...filterPrice,
      ...filterStock,
      ...filterSizes,
      ...filterFeatured
    });
    return this;
  }

  pagination(resultsPerPage) {
    const currPage = Number(this.queryString.page) || 1;
    const skip = (currPage - 1) * resultsPerPage;
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
