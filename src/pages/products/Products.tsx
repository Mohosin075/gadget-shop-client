import { useEffect, useState } from "react";
import Filterbar from "./Filterbar";
import SearchBar from "./SearchBar";
import SortByPrice from "./SortByPrice";
import axios from "axios";
import Loading from "./Loading";
import ProductCard from "../../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(products);

  useEffect(() => {
    const fetch = () => {
      setLoading(true);
      axios.get(`http://localhost:3000/all-product`).then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-center text-xl">All Product</h2>
      <div className="flex justify-between">
        <SearchBar />
        <SortByPrice />
      </div>
      <div className="grid grid-cols-12 mt-3 gap-3">
        <div className="col-span-3 relative">
          <Filterbar />
        </div>
        <div className="col-span-9">
          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <h3 className="text-3xl text-center">No Product found</h3>
          ) : (
            <div className="grid lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
