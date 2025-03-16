import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

interface BannerCarouselProps {
  banners?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
    filterSeason?: string;
  }[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners = [
    {
      id: "1",
      title: "Новая весенняя коллекция",
      description: "Яркие и стильные новинки для ваших детей",
      imageUrl:
        "https://images.unsplash.com/photo-1560506840-ec148e82a604?w=1200&q=80",
      linkUrl: "/collections/spring",
      filterSeason: "summer",
    },
    {
      id: "2",
      title: "Скидки до 30% на зимнюю одежду",
      description:
        "Успейте приобрести качественную зимнюю одежду по выгодным ценам",
      imageUrl:
        "https://images.unsplash.com/photo-1565462905097-5e701c31dcdb?w=1200&q=80",
      linkUrl: "/sales/winter",
      filterSeason: "winter",
    },
    {
      id: "3",
      title: "Школьная форма 2023",
      description: "Подготовьтесь к школе заранее с нашей новой коллекцией",
      imageUrl:
        "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=1200&q=80",
      linkUrl: "/collections/school",
      filterSeason: "demi",
    },
  ],
}) => {
  const navigate = useNavigate();
  const { setFilters } = useFilters();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBannerClick = (
    banner: (typeof banners)[0],
    e: React.MouseEvent,
  ) => {
    e.preventDefault();

    // Apply filters based on banner
    const newFilters: Record<string, string> = {};

    if (banner.filterSeason) {
      newFilters.season = banner.filterSeason;
    }

    setFilters(newFilters);

    // Navigate to home with hash to scroll to products
    navigate("/#products");

    // Scroll to products section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white">
      <Carousel
        className="relative"
        value={activeIndex}
        onValueChange={setActiveIndex}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-white text-lg mb-4 max-w-md">
                    {banner.description}
                  </p>
                  <Button
                    className="w-fit bg-primary hover:bg-primary/90 text-white"
                    onClick={(e) => handleBannerClick(banner, e)}
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white">
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className="right-4 bg-white/80 hover:bg-white">
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((banner, index) => (
            <div
              key={`indicator-${banner.id}`}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${activeIndex === index ? "bg-white w-4" : "bg-white/50"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
