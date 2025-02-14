import { useParams } from "react-router";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "./ServiceDetail";
import CommentSection from "../CommentSection/CommentSection";
import { useEffect, useState } from "react";
import FullDescriptionComponent from "./FullDescriptionComponent";
import ServiceGallery, { GalleryImage } from "./ServiceGallery";
import PageNavigation from "./ResponsiveNav";

const AIViewPageMain = () => {
  /**
   * Service id from the url params
   */
  const { id } = useParams<{ id: string }>();

  /**
   * Gallery images state, holds the gallery images
   * which will be displayed in the gallery component
   */
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const { services } = useAiService();

  useEffect(() => {
    /**
     * Fetches gallery images for a specific AI service when the component mounts or when `id` or `services` changes.
     * The `serviceId` is used to find the correct service from the `services` array, and its title is used to fetch the gallery images.
     *
     * @async
     * @function fetchGalleryImages
     * @returns {Promise<void>}
     */
    const fetchGalleryImages = async () => {
      try {
        const service = services?.find((s) => s.Id === Number(id));
        if (!service) throw new Error("Service not found");

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/aiservice/getservicegallery?serviceTitle=${service.Title}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch gallery images");
        }

        setGalleryImages(
          data.data.map((image: string) => ({
            original: import.meta.env.VITE_API_URL + image,
            thumbnail: import.meta.env.VITE_API_URL + image,
          }))
        );
      } catch {
        console.error("error");
      }
    };

    if (services?.length > 0) {
      fetchGalleryImages();
    }
  }, [id, services]);

  if (!services || services.length === 0) {
    return <div>Loading...</div>;
  }

  const service = services.find((s) => s.Id === Number(id));

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="bg-[#121212] p-6 max-w-[1500px] text-white flex flex-col w-full self-center gap-12">
      <ServiceDetail service={service} />
      <PageNavigation />
      <div id="full-description">
        <FullDescriptionComponent FullDescription={service.FullDescription!} />
      </div>
      <div id="gallery">
        <ServiceGallery galleryImages={galleryImages} />
      </div>
      <div id="comments">
        <CommentSection AiServiceId={service.Id} />
      </div>
    </div>
  );
};

export default AIViewPageMain;
