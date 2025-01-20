interface TextFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  color?: "white" | "black";
  onClick?: () => void;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const colorValue = props.color === "white" ? "text-white" : "text-black";
  return (
    <p
      onClick={props.onClick}
      className={` text-center font-semibold text-md ${props.className} ${colorValue}`}
    >
      {props.value} {props.children}
    </p>
  );
};

export default TextField;
