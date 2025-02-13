import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export type GalleryImage = {
  original: string;
  thumbnail: string;
};

interface ServiceGalleryProps {
  galleryImages: GalleryImage[];
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({
  galleryImages,
}: {
  galleryImages: GalleryImage[];
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <ImageGallery
        items={galleryImages}
        lazyLoad={true}
        showPlayButton={false}
        autoPlay={true}
      />
    </div>
  );
};

export default ServiceGallery;
