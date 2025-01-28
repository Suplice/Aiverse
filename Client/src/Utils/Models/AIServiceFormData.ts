import { GalleryImages } from "./ImageGallery";

export type AIServiceFormData = {
    CreatorId: number;
    Title: string;
    Description: string;
    FullDescription: string;
    Price: string;
    Image?: File | undefined;
    ServiceURL: string;
    GalleryImages: GalleryImages;
  }