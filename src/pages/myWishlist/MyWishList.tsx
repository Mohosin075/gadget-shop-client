import { useEffect, useState } from "react";
import useUserRole from "../../hooks/useUserRole";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Loading from "../products/Loading";

function MyWishList() {
  const { _id } = useUserRole();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestData, setLatestData] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMyWishList = async () => {
      await axios.get(`http://localhost:3000/wishlist/${_id}`).then((data) => {
        setWishList(data.data);
        setLoading(false);
      });
    };

    if (_id) {
      getMyWishList();
    }
  }, [_id, latestData]);

  return (
    <div>
      <h2 className="text-4xl text-center uppercase my-4">wishlist</h2>
      {loading ? (
        <Loading />
      ) : wishList.length === 0 ? (
        <div className="text-center">No Data found</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          {wishList.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              wishlist
              setLatestData={setLatestData}
              latestData={latestData}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWishList;
