import { useState } from "react";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import BlockTextField from "../UI/BlockTextField";
import { AiService } from "../../Utils/Models/AiService";
import Block from "../UI/Block";
import TextField from "../UI/TextField";

const FormsToCheck = () => {
  const { services, updateService } = useAiService();

  //const pendingServices = services.filter((s) => s.Status === "Pending");
  const pendingServices = services
  const [selectedForm, setSelectedForm] = useState<AiService | null>(null);

  if (pendingServices.length === 0) {
    return( 
    <BlockTextField
      color="white"
      className="text-white text-center p-5"
    >
      No services found
    </BlockTextField>)
  }

  const handleAccept = () => {
   if(selectedForm !== null) {
    updateService({...selectedForm, Status: "Verified"});
   }
    setSelectedForm(null);
  };

  const handleDeny = () => {
    if(selectedForm !== null) {
      updateService({...selectedForm, Status: "Declined"});
     }
    setSelectedForm(null);
  };

  const handleReturn = () => {
    if(selectedForm !== null) {
      updateService({...selectedForm, Status: "Pending"});
     }
    setSelectedForm(null);
  };

  return (
    <div className="p-4 bg-[#1E1E1E] rounded shadow-md w-3/4 text-white">
      <h2 className="text-2xl font-bold mb-4">Forms to Check</h2>
      {selectedForm ? (
        <div className="space-y-4">
          <div className="flex flex-row gap-16">
            <div className="md:w-1/4 w-full flex justify-center">
              <img
                src={selectedForm.Image}
                alt={selectedForm.Title}
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
               
            <div className="md:w-3/4 w-full flex flex-col gap-8 h-full">
                <h1 className="text-4xl font-bold">{selectedForm.Title}</h1>
                <h2 className="text-2xl font-semibold ">Pricing: {selectedForm.Price}</h2>
            </div>  
          </div>
          
          <div className="space-x-2">
            <p className="text-2xl font-semibold ">Description: </p>
            <p className="text-2l  ">{selectedForm.Description}</p>
          </div>

          <div className="space-x-2">
            <p className="text-2xl font-semibold ">Full Description: </p>
            <p className="text-2l  ">{selectedForm.FullDescription}</p>
          </div> 
          
          <div className="space-x-2">
            <button
              onClick={() => handleAccept()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeny()}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
            >
              Deny
            </button>
            <button
              onClick={() => handleReturn()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Return
            </button>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {pendingServices.map((form) => (
            <li
              key={form.Id}
              className="flex items-center justify-between bg-[#2C2C2C] p-3 rounded"
            >
              <span
                className={`text-lg ${
                  form.Status === "Verified"
                    ? "text-green-400"
                    : form.Status === "Declined"
                    ? "text-orange-400"
                    : "text-white"
                }`}
              >
                <Block
                  direction="column"
                  gap={2}
                  className="w-full md:w-1/4 px-2 flex-wrap md:flex-row "
                  align="center"
                >
                  <img src={form.Image} alt={form.Title} className="w-14 " />
                  <Block
                    direction="column"
                    gap={2}
                    className="md:items-start"
                    align="center"
                  >
                    <div className="flex flex-col items-center md:items-start">
                      <TextField color="white" className="text-2xl">
                        {form.Title}
                      </TextField>
                    </div>
                  </Block>
                </Block>
              </span>

              <div className="space-x-2">
                <button
                  onClick={() => setSelectedForm(form)}
                  className="px-4 py-2 bg-[#444444] text-white rounded hover:bg-[#555555] transition duration-200"
                >
                  View
                </button>
                <span
                  className={`text-sm font-semibold ${
                    form.Status === "Verified"
                      ? "text-green-400"
                      : form.Status === "Declined"
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  {form.Status === "Pending" ? "Pending" : form.Status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormsToCheck;
