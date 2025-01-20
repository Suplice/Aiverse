interface ButtonProps {
  value?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  TextColor?: "white" | "black";
  id?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const colorValue = props.TextColor === "white" ? "text-white" : "text-black";
  return (
    <button
      id={props.id}
      type={props.type}
      onClick={props.onClick}
      className={`text-center   font-semibold text-md transition-all duration-200 ${props.className} ${colorValue} `}
      disabled={props.disabled}
    >
      {props.value} {props.children}
    </button>
  );
};

export default Button;
