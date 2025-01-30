import { GalleryImages } from "./ImageGallery";

export type AIServiceFormData = {
    CreatorId: number;
    Title: string;
    Description: string;
    FullDescription: string;
    Price: string;
    Image?: File | undefined;
    Categories: string[];
    ServiceURL: string;
    GalleryImages: GalleryImages;
  }