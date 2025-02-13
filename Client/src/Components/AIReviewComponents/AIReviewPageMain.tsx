import { useParams } from "react-router";
import AIReviewButtonsComponent from "./AIReviewButtonsComponent";
import { useEffect, useState } from "react";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "../AIViewPageComponents/ServiceDetail";
import FullDescriptionComponent from "../AIViewPageComponents/FullDescriptionComponent";
import ServiceGallery, {
  GalleryImage,
} from "../AIViewPageComponents/ServiceGallery";

const AIReviewPageMain = () => {
  const { id } = useParams<{ id: string }>() || { id: "" };
  const { services } = useAiService();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [, setLoading] = useState<boolean>(true);

  const service = services.find((s) => s.Id === Number(id));

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    if (services?.length > 0) {
      fetchGalleryImages();
    }
  }, [id, services]);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="bg-[#121212] p-6 max-w-[1500px] text-white flex flex-col w-full self-center gap-8 pb-24">
      <ServiceDetail service={service} />
      <FullDescriptionComponent FullDescription={service.FullDescription!} />
      <ServiceGallery galleryImages={galleryImages} />
      <AIReviewButtonsComponent id={id || ""} />
    </div>
  );
};

export default AIReviewPageMain;
