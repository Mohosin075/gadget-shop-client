import React from "react";

interface Product {
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { brand, title, price, description, category, stock, imageURL } =
    product;

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
          <button className="btn w-full">add to wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
