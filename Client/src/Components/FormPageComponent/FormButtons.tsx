const FormButtons = () => {
    const handleCancel = () => {
      // Logika anulowania
      console.log("Formularz anulowany");
    };
  
    return (
        <div className="form-buttons flex justify-end gap-4">
    <button
      type="submit"
      className="bg-[#000000] text-white py-2 px-4 rounded-lg hover:bg-[#fff] hover:text-[#000] duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-gray-800"
    >
      Submit
    </button>
    <button
      type="button"
      className="bg-[#fff] text-[#000000] py-2 px-4 rounded-lg hover:bg-[#000000] hover:text-[#fff] duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-gray-800"
    >
      Cancel
    </button>
  </div>
    );
  };
  
  export default FormButtons;