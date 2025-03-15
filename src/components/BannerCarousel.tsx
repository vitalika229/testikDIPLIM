import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface BannerCarouselProps {
  banners?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
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
  ],
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white">
      <Carousel className="relative">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
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
                    onClick={() => (window.location.href = banner.linkUrl)}
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
              className="w-2 h-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
              // Note: In a real implementation, this would be connected to the carousel API
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
