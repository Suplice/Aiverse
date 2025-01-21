interface BlockProps {
  key?: string | number | undefined;
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch";
  gap?: number | string;
  wrap?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Block: React.FC<BlockProps> = (props) => {
  const direction = props.direction === "row" ? "flex-row" : "flex-col";
  const justify = props.justify ? `justify-${props.justify}` : "";
  const align = props.align ? `items-${props.align}` : "";
  const gap = props.gap ? `gap-${props.gap}` : "";
  const wrap = props.wrap ? "flex-wrap" : "flex-nowrap";

  return (
    <div
      key={props.key}
      className={`flex ${direction} ${justify} ${align} ${gap} ${wrap} ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Block;
