import React from "react";
import { useGetTopProductsQuery } from "../redux/api/product-api-slice";
import Loading from "./loader";
import SmallProduct from "./small-product";
import CarouselProductDisplay from "./carousel-product-display";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error while loading product</div>;
  }
  return (
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-6 xl:gap-8 px-4">
        {/* SmallProduct Grid */}
        <div className="xl:block xl:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="xl:block xl:flex-shrink-0">
          <CarouselProductDisplay />
        </div>
      </div>
    </>
  );
};

export default Header;
