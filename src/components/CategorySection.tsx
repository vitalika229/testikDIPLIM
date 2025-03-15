import React from "react";
import { Link } from "react-router-dom";

interface CategoryProps {
  title: string;
  icon: string;
  link: string;
  bgColor: string;
}

const CategoryItem = ({
  title,
  icon,
  link,
  bgColor = "bg-pink-100",
}: CategoryProps) => {
  return (
    <Link to={link} className="flex flex-col items-center group">
      <div
        className={`${bgColor} w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}
      >
        <img src={icon} alt={title} className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <span className="text-sm md:text-base font-medium text-gray-800 text-center">
        {title}
      </span>
    </Link>
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
  ],
}: CategorySectionProps) => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              title={category.title}
              icon={category.icon}
              link={category.link}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
