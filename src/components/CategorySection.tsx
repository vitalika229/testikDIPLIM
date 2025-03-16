import React from "react";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  title: string;
  icon: string;
  link: string;
  bgColor: string;
  filterAge?: string;
  filterSeason?: string;
  filterType?: string;
  featuredProductId?: string;
}

const CategoryItem = ({
  title,
  icon,
  link,
  bgColor = "bg-pink-100",
  filterAge,
  filterSeason,
  filterType,
  featuredProductId,
}: CategoryProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (featuredProductId && e.ctrlKey) {
      // Only navigate to featured product if Ctrl key is pressed
      navigate(`/product/${featuredProductId}`);
    } else {
      // Otherwise navigate to category page with appropriate filters
      if (filterAge) {
        navigate(`/catalog?category=${link.split("/").pop()}`);
      } else if (filterSeason) {
        navigate(`/catalog?category=${link.split("/").pop()}`);
      } else if (filterType) {
        navigate(`/catalog?category=${link.split("/").pop()}`);
      } else {
        navigate(link);
      }
    }
  };

  return (
    <a
      href={link}
      onClick={handleClick}
      className="flex flex-col items-center group"
    >
      <div
        className={`${bgColor} w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 relative overflow-hidden`}
      >
        <img src={icon} alt={title} className="w-14 h-14 md:w-20 md:h-20" />
        {featuredProductId && (
          <div className="absolute bottom-0 right-0 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            ★
          </div>
        )}
      </div>
      <span className="text-sm md:text-base font-medium text-gray-800 text-center">
        {title}
      </span>
    </a>
  );
};

interface CategorySectionProps {
  title?: string;
  categories?: CategoryProps[];
}

const CategorySection = ({
  title = "Популярные категории",
  categories = [
    {
      title: "Для малышей",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=baby",
      link: "/category/babies",
      bgColor: "bg-blue-100",
      filterAge: "0-1",
      featuredProductId: "baby-1",
    },
    {
      title: "Для девочек",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=girl",
      link: "/category/girls",
      bgColor: "bg-pink-100",
      filterAge: "3-6",
      featuredProductId: "girl-1",
    },
    {
      title: "Для мальчиков",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=boy",
      link: "/category/boys",
      bgColor: "bg-green-100",
      filterAge: "6-9",
      featuredProductId: "boy-1",
    },
    {
      title: "Школьная форма",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=school",
      link: "/category/school",
      bgColor: "bg-yellow-100",
      filterSeason: "demi",
      featuredProductId: "school-1",
    },
    {
      title: "Летняя коллекция",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=summer",
      link: "/category/summer",
      bgColor: "bg-orange-100",
      filterSeason: "summer",
      featuredProductId: "summer-1",
    },
    {
      title: "Верхняя одежда",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=outerwear",
      link: "/category/outerwear",
      bgColor: "bg-indigo-100",
      filterType: "outerwear",
      featuredProductId: "outerwear-1",
    },
    {
      title: "Обувь",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=shoes",
      link: "/category/shoes",
      bgColor: "bg-purple-100",
      filterType: "shoes",
      featuredProductId: "shoes-1",
    },
    {
      title: "Аксессуары",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=accessories",
      link: "/category/accessories",
      bgColor: "bg-red-100",
      filterType: "accessories",
      featuredProductId: "accessories-1",
    },
    {
      title: "Зимняя коллекция",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=winter",
      link: "/category/winter",
      bgColor: "bg-sky-100",
      filterSeason: "winter",
      featuredProductId: "winter-1",
    },
    {
      title: "Спортивная одежда",
      icon: "https://api.dicebear.com/7.x/avataaars/svg?seed=sport",
      link: "/category/sport",
      bgColor: "bg-emerald-100",
      filterType: "sport",
      featuredProductId: "sport-1",
    },
  ],
}: CategorySectionProps) => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              title={category.title}
              icon={category.icon}
              link={category.link}
              bgColor={category.bgColor}
              filterAge={category.filterAge}
              filterSeason={category.filterSeason}
              filterType={category.filterType}
              featuredProductId={category.featuredProductId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
