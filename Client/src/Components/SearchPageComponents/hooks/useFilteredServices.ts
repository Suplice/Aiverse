import { useState } from "react";
import { AiService } from "../../../Utils/Models/AiService";

const useFilteredServices = (services: AiService[]) => {
  const [filteredServices, setFilteredServices] = useState(services);
  const [isLoading, setIsLoading] = useState(false);

  const filterServices = (params: URLSearchParams) => {
    setIsLoading(true);
    setTimeout(() => {
      const newServices = services.filter((service) => {
        const categories = params.get("categories")?.split(",") || [];
        const priceRange =
          params.get("priceRange")?.split(",").map(Number) || [];
        const searchText = params.get("searchText")?.toLowerCase() || "";

        const isCategoryMatch =
          (categories[0] === "" && categories.length === 1) ||
          service.Categories.some((category) => categories.includes(category));
        const isPriceMatch =
          priceRange.length === 0 ||
          (service.price === "Free" && priceRange[0] === 0) ||
          service.price.split(" - ").some((price) => {
            const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
            return (
              numericPrice >= priceRange[0] && numericPrice <= priceRange[1]
            );
          });
        const isSearchTextMatch =
          searchText === "" ||
          service.title.toLowerCase().includes(searchText) ||
          service.description.toLowerCase().includes(searchText);

        return isCategoryMatch && isPriceMatch && isSearchTextMatch;
      });

      setFilteredServices(newServices);
      setIsLoading(false);
    }, 2000);
  };

  return { filteredServices, filterServices, isLoading };
};

export default useFilteredServices;
