import { useNavigate } from "react-router";
import TextField from "../UI/TextField";
import BlockTextField from "../UI/BlockTextField";

const LandingNavbarLogo = () => {
  const navigate = useNavigate();

  return (
    <BlockTextField
      color="white"
      className=" hover:cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      <TextField
        value="AIVERSE."
        className="xl:text-4xl md:text-3xl sm:text-2xl text-xl tracking-tighter sm:font-bold"
        color="white"
      />
    </BlockTextField>
  );
};

export default LandingNavbarLogo;
