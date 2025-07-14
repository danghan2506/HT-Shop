import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import FavouriteButton from "./fav-button";
const SmallProduct = ({ product }) => {
  return (
    <Card className="w-80 group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <FavouriteButton product={product}/>
      </div>

      <CardContent className="p-4">
        <Link to={`/product/${product._id}`} className="block">
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2 flex-1">
              {product.name}
            </h2>
            <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap">
              {product.price} VNĐ
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SmallProduct;
