import React, { createContext, useContext, useState } from "react";

export interface FilterState {
  age: string;
  season: string;
  type: string;
  priceRange: [number, number];
  sizes: string[];
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  applyFilters: (products: any[]) => any[];
}

const defaultFilters: FilterState = {
  age: "all",
  season: "all",
  type: "all",
  priceRange: [0, 10000],
  sizes: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const applyFilters = (products: any[]) => {
    return products.filter((product) => {
      // Filter by price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by age (assuming product has an age property)
      if (filters.age !== "all" && product.age && product.age !== filters.age) {
        return false;
      }

      // Filter by season (assuming product has a season property)
      if (
        filters.season !== "all" &&
        product.season &&
        product.season !== filters.season
      ) {
        return false;
      }

      // Filter by type (assuming product has a type property)
      if (
        filters.type !== "all" &&
        product.type &&
        product.type !== filters.type
      ) {
        return false;
      }

      // Filter by size (assuming product has a sizes array)
      if (filters.sizes.length > 0 && product.sizes) {
        const hasMatchingSize = filters.sizes.some((size) =>
          product.sizes.includes(size),
        );
        if (!hasMatchingSize) {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        applyFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
