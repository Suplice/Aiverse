const FormButtons = () => {
    const handleCancel = () => {
      console.log("Formularz anulowany");
    };
  
    return (
        <div className="form-buttons flex justify-end gap-4 mt-4">

    <button
      type="button"
      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-gray-800"
      onClick={handleCancel}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-800"
    >
      Submit
    </button>
    
  </div>
    );
  };
  
  export default FormButtons;