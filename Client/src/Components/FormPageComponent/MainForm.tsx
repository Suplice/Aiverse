import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import FileUpload from "./FileUpload";
import { AIServiceFormData } from "../../Utils/Models/AIServiceFormData";
import GalleryUpload from "./GalleryUpload/GalleryUpload";
import { GalleryImages } from "../../Utils/Models/ImageGallery";
import { useAuth } from "../../Utils/Context/AuthContext";
import { useNavigate } from "react-router";
import CategoryCheckboxes from "./CategoryCheckboxes";

const MainForm = () => {
  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  /**
   * A function to check if the user is authenticated.
   * It checks if the user is authenticated and redirects to the sign-in page if not.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/signin");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState<AIServiceFormData>({
    CreatorId: user?.Id ?? 0,
    Title: "",
    Description: "",
    FullDescription: "",
    Price: "",
    Image: undefined,
    ServiceURL: "",
    Categories: [],
    GalleryImages: undefined,
  });

  /**
   * A function to handle the change of the gallery images.
   * It sets the gallery images in the form data.
   *
   *
   * @function
   * @param {keyof AIServiceFormData} name name of the field to change in the form data
   * @param {GalleryImages} value value to set in the form data
   * @returns {void}
   */
  const handleChangeImages = (
    name: keyof AIServiceFormData,
    value: GalleryImages
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * A function to handle the change of the category checkboxes.
   * It sets the selected categories in the form data.
   *
   * @function handleCategoryChange
   * @param {string[]} selected selected categories to set in the form data
   * @returns {void}
   */
  const handleCategoryChange = (selected: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      Categories: selected,
    }));
  };

  /**
   * A function to handle the change of the form data.
   * It sets the form data in the state.
   *
   * @function handleChange
   * @param {keyof AIServiceFormData} name name of the field to change in the form data
   * @param {string | File | null} value value to set in the form data
   * @returns {void}
   */
  const handleChange = (
    name: keyof AIServiceFormData,
    value: string | File | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * A function to handle the submit event of the form.
   * It sends a POST request to the server to add the AI service.
   *
   * @function handleSubmit
   * @param {React.FormEvent<HTMLFormElement>} e event object of the form submit
   * @returns {Promise<void>}
   */
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
      formData.GalleryImages.forEach((file) => {
        formDataToSend.append("GalleryImages", file);
      });
    }

    formData.Categories.forEach((category) => {
      formDataToSend.append("Categories", category);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/addservice`,
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Błąd sieci:", error);
    }
  };

  return (
    <form
      className=" w-3/4 form bg-[#252729] shadow-lg rounded-lg p-6 text-gray-200 md:w-1/2 mt-8 mb-8"
      onSubmit={handleSubmit}
    >
      <FormInput formData={formData} onChange={handleChange} />
      <CategoryCheckboxes
        selectedCategories={formData.Categories}
        onChange={handleCategoryChange}
      />
      <FileUpload onFileChange={(file) => handleChange("Image", file)} />
      <GalleryUpload
        onFileChange={(files: GalleryImages) =>
          handleChangeImages("GalleryImages", files)
        }
      />
      <FormButtons />
    </form>
  );
};

export default MainForm;
