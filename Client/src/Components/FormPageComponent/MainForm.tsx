import React, { useState } from "react";
import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import FileUpload from "./FileUpload";

const MainForm = () => {

    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        FullDescription: "",
        Price: "",
        Image: "",
      });

      
    return (
        <form className="form bg-[#252729] shadow-lg rounded-lg p-6 max-w-lg mx-auto text-gray-200">
            <FormInput />
            <FileUpload />
            <FormButtons />
        </form>
    );
}

export default MainForm;