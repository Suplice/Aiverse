import { useParams } from "react-router";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "./ServiceDetail";
import CommentSection from "../CommentSection/CommentSection";
import { useEffect, useState } from "react";
import FullDescriptionComponent from "./FullDescriptionComponent";
import ServiceGallery from "./ServiceGallery";
import PageNavigation from "./PageNavigation";

const AIViewPageMain = () => {
  const { id } = useParams<{ id: string }>();
  const { services } = useAiService();
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID from URL:", id);
  }, [id]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        console.log("fetching images")
        const service = services?.find((s) => s.Id === Number(id));
        if (!service) throw new Error("Service not found");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/aiservice/getservicegallery?serviceTitle=${service.Title}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch gallery images");
        }

        console.log("Zdjęcia:" + data);
        setGalleryImages(data.data);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
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
    <div className="bg-[#121212] p-6 max-w-[1500px] text-white flex flex-col w-full self-center gap-8">
      <ServiceDetail service={service} />
      <PageNavigation />
      <div id="full-description">
        <FullDescriptionComponent
          FullDescription={String(service.FullDescription)}
        />
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
