import { useRef, useState } from "react";

const useSearchInput = (initialValue: string | null) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastInput, setLastInput] = useState<string | null>(null);

  if (initialValue && inputRef.current) {
    inputRef.current.value = initialValue;
  }

  const resetInput = () => {
    setLastInput(inputRef.current?.value || null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return { inputRef, resetInput, lastInput };
};

export default useSearchInput;
