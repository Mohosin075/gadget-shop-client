import { useEffect, useState } from "react";
import Filterbar from "./Filterbar";
import SearchBar from "./SearchBar";
import SortByPrice from "./SortByPrice";
import axios from "axios";
import Loading from "./Loading";
import ProductCard from "../../components/ProductCard";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface Product {
  _id: string;
  brand: string;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageURL: string;
}

// interface ProductsState {
//   products: Product[];
//   loading: boolean;
//   search: string;
//   sort: string;
//   brand: string;
//   category: string;
//   uniqueBrand: string[];
//   uniqueCategory: string[];
//   totalPage: number;
//   page: number;
// }

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [uniqueBrand, setUniqueBrand] = useState<string[]>([]);
  const [uniqueCategory, setUniqueCategory] = useState<string[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit: number = 6;

  useEffect(() => {
    setLoading(true);
    const fetch = () => {
      axios
        .get(
          `http://localhost:3000/all-product?page=${page}&limit=${limit}&title=${search}&brand=${brand}&category=${category}&sort=${sort}`
        )
        .then((data) => {
          setProducts(data.data.product);
          setUniqueBrand(data.data.brands);
          setUniqueCategory(data.data.categories);
          setTotalPage(Math.ceil(data.data.total / Number(limit)));
          setLoading(false);
        });
    };
    fetch();
  }, [category, search, brand, sort, totalPage, page, limit]);

  const handleSearch: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const handleReset = () => {
    setSearch("");
    setSort("asc");
    setBrand("");
    setCategory("");
  };

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
          ) : products?.length === 0 ? (
            <h3 className="text-3xl text-center">No Product found</h3>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-4">
                {products.map((product, i) => (
                  <ProductCard key={i} product={product} />
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
};

export default Products;
