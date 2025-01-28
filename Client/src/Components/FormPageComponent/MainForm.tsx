import React, { useState } from "react";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import FileUpload from "./FileUpload";
import { AIServiceFormData } from "../../Utils/Models/AIServiceFormData";
import GalleryUpload from "./GalleryUpload/GalleryUpload";
import { GalleryImages } from "../../Utils/Models/ImageGallery";
import { useActionData } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";

const MainForm = () => {

    const { user } = useAuth();

    const [formData, setFormData] = useState<AIServiceFormData>({
        CreatorId: user?.Id ?? 0,
        Title: "",
        Description: "",
        FullDescription: "",
        Price: "",
        Image: undefined ,
        ServiceURL: "",
        GalleryImages: undefined
      });

      const handleChangeImages = (name: keyof AIServiceFormData, value: GalleryImages) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

      const handleChange = (name: keyof AIServiceFormData, value: string | File | null) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("CreatorId", formData.CreatorId.toString());
        formDataToSend.append("Title", formData.Title);
        formDataToSend.append("Description", formData.Description);
        formDataToSend.append("FullDescription", formData.FullDescription);
        formDataToSend.append("Price", formData.Price);
        formDataToSend.append("ServiceURL", formData.ServiceURL);
        if (formData.Image) {
          formDataToSend.append("Image", formData.Image);
        }


        if (formData.GalleryImages) {
          formData.GalleryImages.forEach((file, index) => {
            formDataToSend.append("GalleryImages", file); 
          });
        }

        for (const [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
          }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aiservice/addservice`, {
              method: "POST",
              body: formDataToSend
            });

            const data = await response.text();
      
            if (response.ok) {
              console.log("Data send succesfully");
            } else {
                console.log(data);
            }
          } catch (error) {
            console.error("Błąd sieci:", error);
          }
        };

      
    return (
        <form className=" w-3/4 form bg-[#252729] shadow-lg rounded-lg p-6 text-gray-200 md:w-1/2" onSubmit={handleSubmit}>
            <FormInput formData={formData} onChange={handleChange }/>
            <FileUpload onFileChange={(file) => handleChange("Image", file)} />
            <GalleryUpload onFileChange={(files: GalleryImages) => handleChangeImages("GalleryImages", files )}/>
            <FormButtons />
        </form>
    );
}

export default MainForm;