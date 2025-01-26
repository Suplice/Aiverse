import { useState } from "react";

interface Form {
  id: number;
  title: string;
  description: string;
  status: "pending" | "accepted" | "denied";
}

const FormsToCheck = () => {
  const [forms, setForms] = useState<Form[]>([
    { id: 1, title: "Form 1", description: "Details of Form 1", status: "pending" },
    { id: 2, title: "Form 2", description: "Details of Form 2", status: "pending" },
    { id: 3, title: "Form 3", description: "Details of Form 3", status: "pending" },
  ]);

  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const handleAccept = (id: number) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, status: "accepted" } : form
      )
    );
    setSelectedForm(null);
  };

  const handleDeny = (id: number) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, status: "denied" } : form
      )
    );
    setSelectedForm(null);
  };

  return (
    <div className="p-4 bg-[#1E1E1E] rounded shadow-md w-3/4 text-white">
      <h2 className="text-2xl font-bold mb-4">Forms to Check</h2>

      {selectedForm ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{selectedForm.title}</h3>
          <p className="text-gray-400">{selectedForm.description}</p>
          <div className="space-x-2">
            <button
              onClick={() => handleAccept(selectedForm.id)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeny(selectedForm.id)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
            >
              Deny
            </button>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {forms.map((form) => (
            <li
              key={form.id}
              className="flex items-center justify-between bg-[#2C2C2C] p-3 rounded"
            >
              <span
                className={`text-lg ${
                  form.status === "accepted"
                    ? "text-green-400"
                    : form.status === "denied"
                    ? "text-orange-400"
                    : "text-white"
                }`}
              >
                {form.title}
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
                    form.status === "accepted"
                      ? "text-green-400"
                      : form.status === "denied"
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                >
                  {form.status === "pending" ? "Pending" : form.status}
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
