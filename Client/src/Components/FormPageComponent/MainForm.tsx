import React, { useState } from "react";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import FileUpload from "./FileUpload";

interface FormData {
    Title: string;
    Description: string;
    FullDescription: string;
    Price: string;
    Image: File | null;
  }

const MainForm = () => {

    const [formData, setFormData] = useState<FormData>({
        Title: "",
        Description: "",
        FullDescription: "",
        Price: "",
        Image: null,
      });

      const handleChange = (name: keyof FormData, value: string | File | null) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("Title", formData.Title);
        formDataToSend.append("Description", formData.Description);
        formDataToSend.append("FullDescription", formData.FullDescription);
        formDataToSend.append("Price", formData.Price);
        if (formData.Image) {
          formDataToSend.append("Image", formData.Image);
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
              console.log("Dane zostały pomyślnie przesłane");
            } else {
                console.log(data);
            }
          } catch (error) {
            console.error("Błąd sieci:", error);
          }
        };

      
    return (
        <form className="form bg-[#252729] shadow-lg rounded-lg p-6 max-w-lg mx-auto text-gray-200" onSubmit={handleSubmit}>
            <FormInput formData={formData} onChange={handleChange }/>
            <FileUpload onFileChange={(file) => handleChange("Image", file)} />
            <FormButtons />
        </form>
    );
}

export default MainForm;