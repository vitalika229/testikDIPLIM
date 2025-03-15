import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  discount?: number;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id = "product-1",
  name = "Детский комбинезон",
  price = 2499,
  image = "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
  discount = 0,
  onAddToCart = () => {},
}: ProductCardProps) => {
  const handleAddToCart = () => {
    onAddToCart(id);
  };

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {discount > 0 && (
          <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-2">
          {discount > 0 ? (
            <>
              <span className="text-lg font-bold text-primary">
                {discountedPrice.toFixed(0)} ₽
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {price} ₽
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">{price} ₽</span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
