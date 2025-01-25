import { useParams } from "react-router";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "./ServiceDetail";
import CommentSection from "../CommentSection/CommentSection";
import { useEffect } from "react";
import FullDescriptionComponent from "./FullDescriptionComponent";
import ServiceGallery from "./ServiceGallery";
import PageNavigation from "./PageNavigation";
import Block from "../UI/Block";
import LandingNavbar from "../LandingComponents/LandingNavbar";

const galleryImages = [
  "https://picsum.photos/id/237/600/600", // Czarno-białe zdjęcie psa
  "https://picsum.photos/id/238/600/600", // Zdjęcie budynku
  "https://picsum.photos/id/239/600/600", // Zdjęcie gór
  "https://picsum.photos/id/240/600/600", // Zdjęcie morza
  "https://picsum.photos/id/241/600/600", // Zdjęcie kwiatów
];

const AIViewPageMain = () => {
  const { id } = useParams<{ id: string }>();
  const { services } = useAiService();

  useEffect(() => {
    console.log("Provided services:", services);
  }, [services]);

  useEffect(() => {
    console.log("ID from URL:", id);
  }, [id]);

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
        <FullDescriptionComponent FullDescription={String(service.FullDescription)} />
        </div>
        <div id="gallery">
        <ServiceGallery images={galleryImages} />
        </div>
        <div id="comments">
        <CommentSection AiServiceId={service.Id} />
        </div>
      </div>
  );
};

export default AIViewPageMain;