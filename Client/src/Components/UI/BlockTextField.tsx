interface BlockTextFieldFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  color?: "white" | "black";
  onClick?: () => void;
}

const BlockTextField: React.FC<BlockTextFieldFieldProps> = (props) => {
  const colorValue = props.color === "white" ? "text-white" : "text-black";
  return (
    <div
      onClick={props.onClick}
      className={` text-center font-semibold text-md ${props.className} ${colorValue}`}
    >
      {props.value} {props.children}
    </div>
  );
};

export default BlockTextField;
