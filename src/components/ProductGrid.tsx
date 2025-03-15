import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { Button } from "./ui/button";
import { Filter, RefreshCw } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

interface ProductGridProps {
  title?: string;
  products?: Product[];
  showFilters?: boolean;
  onAddToCart?: (id: string) => void;
}

const ProductGrid = ({
  title = "Хиты продаж",
  products = [
    {
      id: "product-1",
      name: "Детский комбинезон",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
      discount: 10,
    },
    {
      id: "product-2",
      name: "Платье для девочки",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80",
    },
    {
      id: "product-3",
      name: "Куртка для мальчика",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=400&q=80",
      discount: 15,
    },
    {
      id: "product-4",
      name: "Школьная форма",
      price: 4299,
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80",
    },
    {
      id: "product-5",
      name: "Детские кроссовки",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80",
      discount: 5,
    },
    {
      id: "product-6",
      name: "Шапка зимняя",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
    },
    {
      id: "product-7",
      name: "Пижама детская",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
      discount: 20,
    },
    {
      id: "product-8",
      name: "Носки детские (3 пары)",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80",
    },
  ],
  showFilters = true,
  onAddToCart = () => {},
}: ProductGridProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleFilterChange = () => {
    // In a real application, this would filter products based on criteria
    // For now, we'll just simulate filtering with a timeout
    setTimeout(() => {
      setFilteredProducts(products);
    }, 300);
  };

  const handleResetFilters = () => {
    setFilteredProducts(products);
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showFilters && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={toggleFilters}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {filtersVisible ? "Скрыть фильтры" : "Показать фильтры"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetFilters}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Сбросить
              </Button>
            </div>
          )}
        </div>

        {showFilters && filtersVisible && (
          <div className="mb-6">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                discount={product.discount}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="my-12 text-center">
            <p className="text-lg text-gray-500">
              По вашему запросу ничего не найдено. Попробуйте изменить параметры
              фильтрации.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
