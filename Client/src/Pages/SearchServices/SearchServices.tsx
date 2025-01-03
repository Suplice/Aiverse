import { useParams } from "react-router-dom";

const SearchServices = () => {
  const { data } = useParams<{ data: string }>();

  return (
    <div>
      <h1>{decodeURIComponent(data || "")}</h1>
    </div>
  );
};

export default SearchServices;
