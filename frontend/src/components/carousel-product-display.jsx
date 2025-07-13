import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "../redux/api/product-api-slice";
import { data } from "react-router";

const CarouselProductDisplay = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  console.log(data)
  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="w-full max-w-sm xl:max-w-md">
      <h2 className="text-lg font-bold mb-4 text-center">Featured Products</h2>
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {products?.map((product) => (
            <CarouselItem key={product._id} className="pl-2 md:pl-4">
              <Card className="shadow-lg rounded-xl overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                </div>
                <CardContent className="p-3 md:p-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-base md:text-lg font-semibold line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold text-lg md:text-xl">
                      {product.price} VNĐ
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < (product.rating || 4)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({product.rating || 4}/5)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 md:left-2" />
        <CarouselNext className="right-1 md:right-2" />
      </Carousel>
    </div>
  );
};

export default CarouselProductDisplay;
