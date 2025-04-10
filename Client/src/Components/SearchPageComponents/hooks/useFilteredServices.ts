import { useState } from "react";
import { AiService } from "../../../Utils/Models/AiService";

const useFilteredServices = (services: AiService[]) => {
  const [filteredServices, setFilteredServices] = useState(services);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Filters the services based on the search parameters.
   * It filters the services based on the categories, price range, and search text.
   * It sets the filtered services to the state and sets the loading state to false.
   * It uses a setTimeout function to simulate the loading time.
   *
   * @function filterServices
   * @param {URLSearchParams} params Search parameters from the url query used to filter the services.
   * @returns
   */
  const filterServices = (params: URLSearchParams) => {
    if (services.length === 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const newServices = services.filter((service) => {
      const categories = params.get("categories")?.split(",") || [];

      const priceRange = params.get("priceRange")?.split(",").map(Number) || [];
      const searchText = params.get("searchText")?.toLowerCase() || "";

      const isCategoryMatch = service.Categories
        ? (categories[0] === "" && categories.length === 1) ||
          service.Categories.some((category) => categories.includes(category))
        : true;

      const isPriceMatch =
        priceRange.length === 0 ||
        (service.Price === "Free" && priceRange[0] === 0) ||
        service.Price.split(" - ").some((price) => {
          const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
          return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
        });
      const isSearchTextMatch =
        searchText === "" ||
        service.Title.toLowerCase().includes(searchText) ||
        service.Description.toLowerCase().includes(searchText);

      return isCategoryMatch && isPriceMatch && isSearchTextMatch;
    });

    setFilteredServices(
      newServices.filter((service) => service.Status === "Verified")
    );
    setIsLoading(false);
  };

  return { filteredServices, filterServices, isLoading };
};

export default useFilteredServices;
