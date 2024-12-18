import { FormEvent, useEffect, useState } from "react";
import Filterbar from "./Filterbar";
import SearchBar from "./SearchBar";
import SortByPrice from "./SortByPrice";
import axios from "axios";
import Loading from "./Loading";
import ProductCard from "../../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueBrand, setUniqueBrand] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetch = () => {
      setLoading(true);
      axios
        .get(
          `http://localhost:3000/all-product?page=${page}&limit=${limit}&title=${search}&brand=${brand}&category=${category}&sort=${sort}`
        )
        .then((data) => {
          console.log(data);
          setProducts(data.data.product);
          setUniqueBrand(data.data.brands);
          setUniqueCategory(data.data.categories);
          setTotalPage(Math.ceil(data.data.total / Number(limit)));
          setLoading(false);
        });
    };
    fetch();
  }, [category, search, brand, sort, totalPage, page, limit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const handleReset = () => {
    setSearch("");
    setSort("asc");
    setBrand("");
    setCategory("");
  };

  console.log({ page, totalPage });

  const handlePagination = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage);
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto my-5 relative">
      <h2 className="text-center text-xl">All Product</h2>
      <div className="flex justify-between">
        <SearchBar handleSearch={handleSearch} />
        <SortByPrice setSort={setSort} />
      </div>
      <div className="grid grid-cols-12 mt-3 gap-3">
        <div className="col-span-3">
          <Filterbar
            setBrand={setBrand}
            setCategory={setCategory}
            handleReset={handleReset}
            uniqueBrand={uniqueBrand}
            uniqueCategory={uniqueCategory}
          />
        </div>
        <div className="col-span-9">
          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <h3 className="text-3xl text-center">No Product found</h3>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
              <div className="flex justify-center my-8">
                <div className="join">
                  <button
                    disabled={page === 1}
                    onClick={() => handlePagination(page - 1)}
                    className="join-item btn"
                  >
                    prev
                  </button>
                  <button className="join-item btn">
                    page {page} of {totalPage}
                  </button>
                  <button
                    disabled={page === totalPage}
                    onClick={() => handlePagination(page + 1)}
                    className="join-item btn"
                  >
                    next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
