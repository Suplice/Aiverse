import { TiStarFullOutline } from "react-icons/ti";
import BlockTextField from "../../UI/BlockTextField";
import TextField from "../../UI/TextField";
import Block from "../../UI/Block";

interface LandingServiceCardMainDataProps {
  image: string;
  title: string;
  stars: number;
  reviews: number;
  Categories: string[];
  price: string;
}

const LandingServiceCardMainData: React.FC<LandingServiceCardMainDataProps> = (
  props
) => {
  return (
    <>
      <Block
        direction="column"
        gap={2}
        className="w-full md:w-1/4 px-2 flex-wrap md:flex-row"
        align="center"
      >
        <img src={props.image} alt={props.title} className="w-14 " />
        <Block
          direction="column"
          gap={2}
          className="md:items-start"
          align="center"
        >
          <div className="flex flex-col items-center md:items-start">
            <TextField color="white" className="text-2xl">
              {props.title}
            </TextField>
            <Block direction="row" gap={2}>
              <BlockTextField className="flex flex-row gap-1 items-center text-white">
                <TiStarFullOutline className="text-yellow-300" />
                {props.stars}
              </BlockTextField>

              <TextField color="white" className="underline">
                {props.reviews} Reviews
              </TextField>
            </Block>
          </div>
        </Block>
      </Block>

      <BlockTextField color="white" className="w-full md:w-1/4">
        <TextField color="white" className="font-mono md:text-left">
          {props.price}
        </TextField>
      </BlockTextField>

      <BlockTextField color="white" className="w-full md:w-1/4">
        <TextField color="white" className="font-mono md:text-left">
          {props.Categories.join(", ")}
        </TextField>
      </BlockTextField>
    </>
  );
};
export default LandingServiceCardMainData;
