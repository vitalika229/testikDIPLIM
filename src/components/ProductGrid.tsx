import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { Button } from "./ui/button";
import { Filter, RefreshCw } from "lucide-react";
import { useFilters } from "../context/FilterContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  sizes?: string[];
  colors?: { name: string; value: string }[];
  season?: string;
  age?: string;
}

interface ProductGridProps {
  title?: string;
  products?: Product[];
  showFilters?: boolean;
  searchTerm?: string;
  onAddToCart?: (id: string) => void;
  filterByCategory?: string;
  filterBySubcategory?: string;
}

const defaultProducts: Product[] = [
  // Для малышей (0-1)
  {
    id: "product-1",
    name: "Детский комбинезон",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
    discount: 10,
    season: "winter",
    age: "0-1",
    sizes: ["56", "62", "68", "74"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Серый", value: "gray" },
    ],
  },
  {
    id: "baby-1",
    name: "Боди с длинным рукавом",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=400&q=80",
    season: "all",
    age: "0-1",
    sizes: ["56", "62", "68"],
    colors: [
      { name: "Бежевый", value: "beige" },
      { name: "Мятный", value: "mint" },
    ],
  },
  {
    id: "baby-2",
    name: "Набор шапочек (3 шт)",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
    discount: 5,
    season: "all",
    age: "0-1",
    sizes: ["36", "38", "40"],
    colors: [{ name: "Микс", value: "mix" }],
  },

  // Для девочек (3-6)
  {
    id: "product-2",
    name: "Платье для девочки",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Белый", value: "white" },
    ],
  },
  {
    id: "girl-1",
    name: "Юбка-пачка",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?w=400&q=80",
    season: "all",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Фиолетовый", value: "purple" },
    ],
  },
  {
    id: "girl-2",
    name: "Футболка с единорогом",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1519238359922-989348752efb?w=400&q=80",
    discount: 10,
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Розовый", value: "pink" },
    ],
  },

  // Для мальчиков (6-9)
  {
    id: "product-3",
    name: "Куртка для мальчика",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=400&q=80",
    discount: 15,
    season: "autumn",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Зеленый", value: "green" },
      { name: "Синий", value: "blue" },
    ],
  },
  {
    id: "boy-1",
    name: "Джинсы с подворотами",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
  },
  {
    id: "boy-2",
    name: "Футболка с динозавром",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
    season: "summer",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Зеленый", value: "green" },
      { name: "Серый", value: "gray" },
    ],
  },

  // Школьная форма
  {
    id: "product-4",
    name: "Школьная форма",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
  },
  {
    id: "school-1",
    name: "Блузка школьная",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Голубой", value: "lightblue" },
    ],
  },
  {
    id: "school-2",
    name: "Брюки школьные",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
    season: "demi",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Синий", value: "blue" },
    ],
  },

  // Летняя коллекция
  {
    id: "product-5",
    name: "Детские кроссовки",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80",
    discount: 5,
    season: "summer",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Черный", value: "black" },
    ],
  },
  {
    id: "summer-1",
    name: "Шорты джинсовые",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&q=80",
    season: "summer",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Голубой", value: "lightblue" },
    ],
  },
  {
    id: "summer-2",
    name: "Панама детская",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&q=80",
    discount: 10,
    season: "summer",
    age: "all",
    sizes: ["48", "50", "52", "54"],
    colors: [
      { name: "Желтый", value: "yellow" },
      { name: "Розовый", value: "pink" },
    ],
  },

  // Верхняя одежда
  {
    id: "product-6",
    name: "Шапка зимняя",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80",
    season: "winter",
    age: "1-3",
    sizes: ["48", "50", "52"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Синий", value: "blue" },
    ],
  },
  {
    id: "outerwear-1",
    name: "Пуховик детский",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1515614466515-e512e497a047?w=400&q=80",
    discount: 15,
    season: "winter",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Синий", value: "blue" },
    ],
  },
  {
    id: "outerwear-2",
    name: "Ветровка",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1445796886651-d31a2c15f3c9?w=400&q=80",
    season: "spring",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Желтый", value: "yellow" },
      { name: "Зеленый", value: "green" },
    ],
  },

  // Обувь
  {
    id: "shoes-1",
    name: "Сандалии детские",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80",
    season: "summer",
    age: "1-3",
    sizes: ["22", "23", "24", "25"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Коричневый", value: "brown" },
    ],
  },
  {
    id: "shoes-2",
    name: "Ботинки зимние",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    discount: 10,
    season: "winter",
    age: "3-6",
    sizes: ["28", "29", "30", "31"],
    colors: [
      { name: "Черный", value: "black" },
      { name: "Коричневый", value: "brown" },
    ],
  },

  // Аксессуары
  {
    id: "product-7",
    name: "Пижама детская",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
    discount: 20,
    season: "all",
    age: "3-6",
    sizes: ["98", "104", "110", "116"],
    colors: [
      { name: "Голубой", value: "lightblue" },
      { name: "Розовый", value: "pink" },
    ],
  },
  {
    id: "accessories-1",
    name: "Рюкзак детский",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=400&q=80",
    season: "all",
    age: "3-6",
    sizes: ["one-size"],
    colors: [
      { name: "Розовый", value: "pink" },
      { name: "Синий", value: "blue" },
    ],
  },
  {
    id: "accessories-2",
    name: "Перчатки детские",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=400&q=80",
    discount: 5,
    season: "winter",
    age: "all",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Красный", value: "red" },
      { name: "Синий", value: "blue" },
    ],
  },

  // Зимняя коллекция
  {
    id: "winter-1",
    name: "Комбинезон зимний",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1548382131-e0ebb1f0cdea?w=400&q=80",
    discount: 15,
    season: "winter",
    age: "1-3",
    sizes: ["80", "86", "92", "98"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Розовый", value: "pink" },
    ],
  },
  {
    id: "winter-2",
    name: "Варежки на меху",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=400&q=80",
    season: "winter",
    age: "all",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Серый", value: "gray" },
    ],
  },

  // Спортивная одежда
  {
    id: "sport-1",
    name: "Спортивный костюм",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=400&q=80",
    discount: 10,
    season: "all",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Синий", value: "blue" },
      { name: "Черный", value: "black" },
    ],
  },
  {
    id: "sport-2",
    name: "Футболка спортивная",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=400&q=80",
    season: "summer",
    age: "6-9",
    sizes: ["122", "128", "134", "140"],
    colors: [
      { name: "Белый", value: "white" },
      { name: "Красный", value: "red" },
    ],
  },

  // Другие товары
  {
    id: "product-8",
    name: "Носки детские (3 пары)",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80",
    season: "all",
    age: "all",
    sizes: ["16-18", "19-22", "23-26"],
    colors: [{ name: "Микс", value: "mix" }],
  },
];

const ProductGrid = ({
  title = "Хиты продаж",
  products = defaultProducts,
  showFilters = true,
  searchTerm = "",
  onAddToCart = () => {},
  filterByCategory = "",
  filterBySubcategory = "",
}: ProductGridProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { filters, resetFilters, applyFilters } = useFilters();

  // Apply filters and search whenever they change
  useEffect(() => {
    console.log("ProductGrid useEffect running with:", {
      filterByCategory,
      filterBySubcategory,
      searchTerm,
    });

    let filtered = applyFilters(products);

    // Apply category filter if specified
    if (filterByCategory) {
      if (filterByCategory === "boys") {
        filtered = filtered.filter((product) => {
          // Filter for boys products (either explicitly marked or by category)
          return (
            product.id.includes("boy") ||
            (product.age &&
              (product.age === "6-9" || product.age.includes("boy"))) ||
            (product.id.includes("sport") && !product.id.includes("girl"))
          );
        });

        // Apply subcategory filter for boys if specified
        if (filterBySubcategory) {
          filtered = filtered.filter((product) => {
            switch (filterBySubcategory) {
              case "tshirts":
                return (
                  product.name.toLowerCase().includes("футболк") ||
                  product.id.includes("tshirt")
                );
              case "pants":
                return (
                  product.name.toLowerCase().includes("брюки") ||
                  product.name.toLowerCase().includes("джинс") ||
                  product.id.includes("pants") ||
                  product.id.includes("jeans")
                );
              case "jackets":
                return (
                  product.name.toLowerCase().includes("куртк") ||
                  product.name.toLowerCase().includes("ветровк") ||
                  product.name.toLowerCase().includes("пуховик") ||
                  product.id.includes("jacket")
                );
              case "shoes":
                return (
                  product.name.toLowerCase().includes("обувь") ||
                  product.name.toLowerCase().includes("ботинк") ||
                  product.name.toLowerCase().includes("кроссовк") ||
                  product.id.includes("shoes")
                );
              case "accessories":
                return (
                  product.name.toLowerCase().includes("аксессуар") ||
                  product.name.toLowerCase().includes("шапк") ||
                  product.name.toLowerCase().includes("шарф") ||
                  product.name.toLowerCase().includes("перчатк") ||
                  product.id.includes("accessories")
                );
              default:
                return true;
            }
          });
        }
      } else if (filterByCategory === "girls") {
        filtered = filtered.filter((product) => {
          // Filter for girls products (either explicitly marked or by category)
          return (
            product.id.includes("girl") ||
            (product.colors &&
              product.colors.some(
                (color) =>
                  color.name === "Розовый" || color.name === "Фиолетовый",
              )) ||
            (product.age &&
              (product.age === "3-6" || product.age.includes("girl")))
          );
        });

        // Apply subcategory filter for girls if specified
        if (filterBySubcategory) {
          filtered = filtered.filter((product) => {
            switch (filterBySubcategory) {
              case "dresses":
                return (
                  product.name.toLowerCase().includes("плать") ||
                  product.id.includes("dress")
                );
              case "tshirts":
                return (
                  product.name.toLowerCase().includes("футболк") ||
                  product.id.includes("tshirt")
                );
              case "skirts":
                return (
                  product.name.toLowerCase().includes("юбк") ||
                  product.id.includes("skirt")
                );
              case "shoes":
                return (
                  product.name.toLowerCase().includes("обувь") ||
                  product.name.toLowerCase().includes("ботинк") ||
                  product.name.toLowerCase().includes("кроссовк") ||
                  product.id.includes("shoes")
                );
              case "accessories":
                return (
                  product.name.toLowerCase().includes("аксессуар") ||
                  product.name.toLowerCase().includes("шапк") ||
                  product.name.toLowerCase().includes("шарф") ||
                  product.name.toLowerCase().includes("перчатк") ||
                  product.id.includes("accessories")
                );
              default:
                return true;
            }
          });
        }
      } else if (filterByCategory === "babies") {
        filtered = filtered.filter((product) => {
          // Filter for baby products
          return (
            product.id.includes("baby") ||
            (product.age &&
              (product.age === "0-1" ||
                product.age === "1-3" ||
                product.age.includes("baby")))
          );
        });
      } else if (filterByCategory === "school") {
        filtered = filtered.filter((product) => {
          // Filter for school products
          return (
            product.id.includes("school") ||
            product.id.includes("product-4") ||
            (product.name && product.name.toLowerCase().includes("школьн"))
          );
        });
      } else if (filterByCategory === "summer") {
        filtered = filtered.filter((product) => {
          // Filter for summer products
          return (
            product.id.includes("summer") ||
            (product.season && product.season === "summer")
          );
        });
      }
      // Add more category filters as needed
    }

    // Apply search filter if searchTerm exists
    if (searchTerm && searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          (product.season && product.season.toLowerCase().includes(term)) ||
          (product.age && product.age.toLowerCase().includes(term)),
      );
    }

    setFilteredProducts(filtered);

    // Log for debugging
    console.log("Applied filters:", filters);
    console.log("Filtered products:", filtered);
    console.log("Category filter:", filterByCategory);
  }, [
    filters,
    products,
    applyFilters,
    searchTerm,
    filterByCategory,
    filterBySubcategory,
  ]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleResetFilters = () => {
    resetFilters();
    setFilteredProducts(products);
  };

  return (
    <div id="products" className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showFilters && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={toggleFilters}
                className="flex items-center gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-700 transition-all duration-300"
              >
                <Filter className="h-4 w-4" />
                {filtersVisible ? "Скрыть фильтры" : "Показать фильтры"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetFilters}
                className="flex items-center gap-2 hover:text-pink-700 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
                Сбросить
              </Button>
            </div>
          )}
        </div>

        {showFilters && filtersVisible && (
          <div className="mb-6">
            <ProductFilters />
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
                sizes={product.sizes}
                colors={product.colors}
                season={product.season}
                age={product.age}
                onAddToCart={() => onAddToCart(product.id)}
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
