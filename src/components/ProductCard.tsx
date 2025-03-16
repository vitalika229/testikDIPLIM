import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Check, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  discount?: number;
  sizes?: string[];
  colors?: { name: string; value: string }[];
  season?: string;
  age?: string;
}

const ProductCard = ({
  id = "product-1",
  name = "Детский комбинезон",
  price = 2499,
  image = "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
  discount = 0,
  sizes = ["56", "62", "68", "74", "80", "86"],
  colors = [
    { name: "Синий", value: "blue" },
    { name: "Розовый", value: "pink" },
    { name: "Зеленый", value: "green" },
  ],
  season = "all",
  age = "all",
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the button

    addToCart({
      id,
      name,
      price: discountedPrice,
      size: selectedSize,
      color: selectedColor,
      imageUrl: image,
    });

    // Show added confirmation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleViewProduct = () => {
    navigate(`/product/${id}`);
  };

  const discountedPrice =
    discount > 0 ? Math.round(price * (1 - discount / 100)) : price;

  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white rounded-xl cursor-pointer group">
      <div
        className="relative h-[250px] overflow-hidden"
        onClick={handleViewProduct}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/80 hover:bg-white text-gray-800"
            onClick={handleViewProduct}
          >
            <Eye className="mr-2 h-4 w-4" />
            Подробнее
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2" onClick={handleViewProduct}>
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2 space-y-3">
        <div className="flex items-center gap-2" onClick={handleViewProduct}>
          {discount > 0 ? (
            <>
              <span className="text-lg font-bold text-primary">
                {discountedPrice} ₽
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {price} ₽
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">{price} ₽</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Размер</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Выберите размер" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Цвет</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue placeholder="Выберите цвет" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color.value} value={color.name}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-pink-600 hover:bg-pink-700"} transition-all duration-300 transform hover:scale-105 rounded-full`}
          disabled={isAdded}
        >
          {isAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Добавлено
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />В корзину
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
