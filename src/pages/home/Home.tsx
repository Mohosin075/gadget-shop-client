import Accordion from "../../components/home/Accordion";
import Banner from "../../components/home/Banner";
import UserReview from "../../components/home/UserReview";
import Products from "../products/Products";

function Home() {
  return (
    <div>
      <Banner />
      <div className="container mx-auto">
        <div className="my-12">
          <h2 className="text-center font-bold text-3xl mb-4 uppercase">
            Featured Product
          </h2>
          {/* <FeaturedProducts /> */}
          <Products />
        </div>
        <div className="my-12">
          <h2 className="text-center font-bold text-3xl mb-4 uppercase">
            Reviews
          </h2>
          <UserReview />
        </div>
        <div className="my-12 w-full lg:w-3/4 mx-auto">
          <h2 className="text-center font-bold text-3xl mb-4 uppercase">
            Accordion
          </h2>
          <Accordion />
        </div>
      </div>
    </div>
  );
}

export default Home;
