import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import useUserRole from "../hooks/useUserRole";
import Swal from "sweetalert2";

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

interface ProductCardProps {
  product: Product;
  wishlist?: boolean;
  setLatestData?: Dispatch<SetStateAction<boolean>>;
  latestData?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  wishlist,
  setLatestData,
  latestData,
}) => {
  const { email } = useUserRole();

  const { _id, brand, title, price, description, category, stock, imageURL } =
    product;

  const handleWishlist = async () => {
    console.log(_id);
    await axios
      .patch(`http://localhost:3000/wishlist/add`, {
        userEmail: email,
        productId: _id,
      })
      .then((res) => {
        if (res?.data?.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log({setLatestData, latestData});
          if (setLatestData) {
            setLatestData(!latestData);
          }
        }
      });
  };

  const removeFromWishList = async () => {
    await axios
      .patch(`http://localhost:3000/wishlist/remove`, {
        userEmail: email,
        productId: _id,
      })
      .then((res) => {
        if (res?.data?.modifiedCount === 1) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Remove successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          if (setLatestData) {
            setLatestData(!latestData);
          }
        }
      });
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={imageURL} className="object-cover h-64 w-full" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          brand : <span className="text-red-500">{brand}</span>
        </p>
        <p>
          price : <span className="text-red-500">{price}</span>
        </p>
        <p>
          stock : <span className="text-red-500">{stock}</span>
        </p>
        <p className="font-semibold text-lg">{category}</p>
        <p>
          {description?.length > 40
            ? `${description.slice(0, 40)}...`
            : `${description}`}
        </p>
        <div className="card-actions justify-end">
          {wishlist ? (
            <button
              className="btn w-full bg-red-600 text-white hover:text-black"
              onClick={() => removeFromWishList(_id)}
            >
              remove from wishlist
            </button>
          ) : (
            <button className="btn w-full" onClick={handleWishlist}>
              add to wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
