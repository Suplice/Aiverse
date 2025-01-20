import { AnimatePresence, motion } from "motion/react";
import BlockTextField from "../../UI/BlockTextField";
import TextField from "../../UI/TextField";

interface LandingServiceCardDescriptionProps {
  Description: string;
  isDescriptionVisible: boolean;
}

const LandingServiceCardDescription: React.FC<
  LandingServiceCardDescriptionProps
> = (props) => {
  return (
    <AnimatePresence>
      {props.isDescriptionVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0, overflow: "hidden" }}
          transition={{ duration: 0.3 }}
        >
          <BlockTextField color="white" className="w-full p-2">
            <TextField color="white" className="text-lg">
              {props.Description}
            </TextField>
          </BlockTextField>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingServiceCardDescription;
