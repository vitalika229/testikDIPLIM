import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { useFilters } from "../context/FilterContext";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CategoryMapping {
  [key: string]: {
    title: string;
    filterAge?: string;
    filterSeason?: string;
    filterType?: string;
    description: string;
    image: string;
  };
}

const categoryMappings: CategoryMapping = {
  babies: {
    title: "Для малышей",
    filterAge: "0-1",
    description: "Комфортная и безопасная одежда для самых маленьких",
    image:
      "https://images.unsplash.com/photo-1607972969064-41a4a5372f07?w=1200&q=80",
  },
  girls: {
    title: "Для девочек",
    filterAge: "3-6",
    description: "Яркие и стильные наряды для маленьких принцесс",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=1200&q=80",
  },
  boys: {
    title: "Для мальчиков",
    filterAge: "6-9",
    description: "Практичная и удобная одежда для активных мальчиков",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1200&q=80",
  },
  school: {
    title: "Школьная форма",
    filterSeason: "demi",
    description:
      "Качественная и стильная школьная форма для детей всех возрастов",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&q=80",
  },
  summer: {
    title: "Летняя коллекция",
    filterSeason: "summer",
    description:
      "Легкие и яркие наряды для самых активных летних приключений вашего ребенка",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80",
  },
  outerwear: {
    title: "Верхняя одежда",
    filterType: "outerwear",
    description: "Теплая и практичная верхняя одежда для любой погоды",
    image:
      "https://images.unsplash.com/photo-1515614466515-e512e497a047?w=1200&q=80",
  },
  shoes: {
    title: "Обувь",
    filterType: "shoes",
    description: "Удобная и качественная обувь для детей всех возрастов",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&q=80",
  },
  accessories: {
    title: "Аксессуары",
    filterType: "accessories",
    description: "Стильные аксессуары для завершения образа вашего ребенка",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80",
  },
  winter: {
    title: "Зимняя коллекция",
    filterSeason: "winter",
    description: "Теплая и уютная одежда для холодных зимних дней",
    image:
      "https://images.unsplash.com/photo-1548382131-e0ebb1f0cdea?w=1200&q=80",
  },
  sport: {
    title: "Спортивная одежда",
    filterType: "sport",
    description: "Удобная и функциональная одежда для активных детей",
    image:
      "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=1200&q=80",
  },
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { setFilters, resetFilters } = useFilters();

  const categoryInfo = categoryId ? categoryMappings[categoryId] : null;

  useEffect(() => {
    if (!categoryInfo) {
      navigate("/");
      return;
    }

    // Reset filters first to clear any previous filters
    resetFilters();

    // Apply filters based on category
    const newFilters: Record<string, any> = {};

    if (categoryInfo.filterAge) {
      newFilters.age = categoryInfo.filterAge;
    }

    if (categoryInfo.filterSeason) {
      newFilters.season = categoryInfo.filterSeason;
    }

    if (categoryInfo.filterType) {
      newFilters.type = categoryInfo.filterType;
    }

    // Apply the new filters
    setFilters(newFilters);

    console.log("Category page filters applied:", newFilters);
  }, [categoryId, categoryInfo, navigate, setFilters, resetFilters]);

  if (!categoryInfo) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <img
            src={categoryInfo.image}
            alt={categoryInfo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {categoryInfo.title}
            </h1>
            <p className="text-white text-lg mb-4 max-w-md">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться назад
          </Button>

          {/* Products */}
          <ProductGrid
            title={`Товары в категории "${categoryInfo.title}"`}
            showFilters={true}
            filterByCategory={categoryId}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
