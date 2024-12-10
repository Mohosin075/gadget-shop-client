import ProductCard from "../ProductCard"

function FeaturedProducts() {
  return (
    <div className="lg:flex justify-between gap-5">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default FeaturedProducts