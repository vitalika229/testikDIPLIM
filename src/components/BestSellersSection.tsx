import React from "react";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface BestSellersSectionProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    discount?: number;
  }>;
}

const BestSellersSection = ({
  title = "Хиты продаж",
  subtitle = "Самые популярные товары нашего магазина",
  showViewAllButton = true,
  onViewAllClick = () => {},
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
  ],
}: BestSellersSectionProps) => {
  const handleAddToCart = (id: string) => {
    console.log(`Товар ${id} добавлен в корзину`);
    // В реальном приложении здесь будет логика добавления в корзину
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>

          {showViewAllButton && (
            <Button
              onClick={onViewAllClick}
              variant="outline"
              className="group flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Смотреть все
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>

        <ProductGrid
          products={products}
          showFilters={false}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
};

export default BestSellersSection;
