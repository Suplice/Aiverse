import { useParams } from "react-router";
import AIReviewButtonsComponent from "./AIReviewButtonsComponent"
import { useEffect, useState } from "react";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "../AIViewPageComponents/ServiceDetail";
import FullDescriptionComponent from "../AIViewPageComponents/FullDescriptionComponent";
import ServiceGallery from "../AIViewPageComponents/ServiceGallery";

const AIReviewPageMain = () => {
    const { id } = useParams<{ id: string }>() || { id: '' };
    const { services } = useAiService();
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
     const [, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("ID from URL:", id);
    }, [id]);

    const service = services.find((s) => s.Id === Number(id));

    useEffect(() => {
        const fetchGalleryImages = async () => {
          try {
            console.log("fetching images");
            const service = services?.find((s) => s.Id === Number(id));
            if (!service) throw new Error("Service not found");
    
            const response = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/aiservice/getservicegallery?serviceTitle=${service.Title}`
            );
            const data = await response.json();
    
            if (!response.ok || !data.success) {
              throw new Error(data.message || "Failed to fetch gallery images");
            }
    
            console.log("Zdjęcia:" + data);
            setGalleryImages(data.data);
          } catch {
            console.log("error");
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

    return(
        <div className="bg-[#121212] p-6 max-w-[1500px] text-white flex flex-col w-full self-center gap-8 pb-24">
        <ServiceDetail service={service} />
        <FullDescriptionComponent FullDescription={service.FullDescription!} />
        <ServiceGallery galleryImages={galleryImages} />
        <AIReviewButtonsComponent id={id || ''} />
        </div>
    )
}

export default AIReviewPageMain;