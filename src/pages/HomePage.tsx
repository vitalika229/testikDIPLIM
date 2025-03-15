import React from "react";
import Header from "../components/Header";
import BannerCarousel from "../components/BannerCarousel";
import CategorySection from "../components/CategorySection";
import BestSellersSection from "../components/BestSellersSection";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  // Mock data for banner carousel
  const banners = [
    {
      id: "1",
      title: "Новая весенняя коллекция",
      description: "Яркие и стильные новинки для ваших детей",
      imageUrl:
        "https://images.unsplash.com/photo-1560506840-ec148e82a604?w=1200&q=80",
      linkUrl: "/collections/spring",
    },
    {
      id: "2",
      title: "Скидки до 30% на зимнюю одежду",
      description:
        "Успейте приобрести качественную зимнюю одежду по выгодным ценам",
      imageUrl:
        "https://images.unsplash.com/photo-1565462905097-5e701c31dcdb?w=1200&q=80",
      linkUrl: "/sales/winter",
    },
    {
      id: "3",
      title: "Школьная форма 2023",
      description: "Подготовьтесь к школе заранее с нашей новой коллекцией",
      imageUrl:
        "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&q=80",
      linkUrl: "/collections/school",
    },
  ];

  // Mock data for categories
  const categories = [
    {
      title: "Для малышей",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=baby",
      link: "/category/babies",
      bgColor: "bg-blue-100",
    },
    {
      title: "Для девочек",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=girl",
      link: "/category/girls",
      bgColor: "bg-pink-100",
    },
    {
      title: "Для мальчиков",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=boy",
      link: "/category/boys",
      bgColor: "bg-green-100",
    },
    {
      title: "Школьная форма",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=school",
      link: "/category/school",
      bgColor: "bg-yellow-100",
    },
  ];

  // Mock data for best sellers
  const bestSellers = [
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
  ];

  // Mock data for all products
  const allProducts = [
    ...bestSellers,
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
  ];

  // Handler for adding items to cart
  const handleAddToCart = (id: string) => {
    console.log(`Товар ${id} добавлен в корзину`);
    // В реальном приложении здесь будет логика добавления в корзину
  };

  // Handler for view all products button
  const handleViewAllClick = () => {
    console.log("Переход на страницу всех товаров");
    // В реальном приложении здесь будет навигация на страницу всех товаров
  };

  // Handler for filter changes
  const handleFilterChange = (filters: any) => {
    console.log("Применены фильтры:", filters);
    // В реальном приложении здесь будет логика фильтрации товаров
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Header cartItemCount={3} />

      <main className="flex-1">
        {/* Banner Carousel */}
        <BannerCarousel banners={banners} />

        {/* Popular Categories */}
        <CategorySection categories={categories} />

        {/* Best Sellers */}
        <BestSellersSection
          products={bestSellers}
          onViewAllClick={handleViewAllClick}
        />

        {/* Product Filters */}
        <section className="w-full bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Каталог товаров
            </h2>
            <div className="mb-6">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Product Grid */}
            <ProductGrid
              title="Все товары"
              products={allProducts}
              onAddToCart={handleAddToCart}
              showFilters={false}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
