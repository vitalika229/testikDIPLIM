import React, { useState } from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  age: string;
  season: string;
  priceRange: [number, number];
  sizes: string[];
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps = {}) => {
  const [filters, setFilters] = useState<FilterState>({
    age: "all",
    season: "all",
    priceRange: [0, 10000],
    sizes: [],
  });

  const handleAgeChange = (value: string) => {
    const newFilters = { ...filters, age: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSeasonChange = (value: string) => {
    const newFilters = { ...filters, season: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter((s) => s !== size);

    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Age Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Возраст
          </label>
          <Select value={filters.age} onValueChange={handleAgeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите возраст" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все возрасты</SelectItem>
              <SelectItem value="0-1">0-1 год</SelectItem>
              <SelectItem value="1-3">1-3 года</SelectItem>
              <SelectItem value="3-6">3-6 лет</SelectItem>
              <SelectItem value="6-9">6-9 лет</SelectItem>
              <SelectItem value="9-12">9-12 лет</SelectItem>
              <SelectItem value="12+">12+ лет</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Season Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Сезон
          </label>
          <Select value={filters.season} onValueChange={handleSeasonChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сезон" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все сезоны</SelectItem>
              <SelectItem value="winter">Зима</SelectItem>
              <SelectItem value="spring">Весна</SelectItem>
              <SelectItem value="summer">Лето</SelectItem>
              <SelectItem value="autumn">Осень</SelectItem>
              <SelectItem value="demi">Демисезон</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Цена: {filters.priceRange[0]} ₽ - {filters.priceRange[1]} ₽
          </label>
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            max={10000}
            step={100}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>

        {/* Size Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Размер
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["56", "62", "68", "74", "80", "86", "92", "98"].map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) =>
                    handleSizeChange(size, checked === true)
                  }
                />
                <label
                  htmlFor={`size-${size}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
