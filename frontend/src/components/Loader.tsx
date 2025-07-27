type LoaderProps = {
  size?: "sm" | "md" | "lg";
};

const Loader = ({ size = "lg" }: LoaderProps) => {
  const sizeMap = {
    sm: "w-[16px] h-[16px]",
    md: "w-[40px] h-[40px]",
    lg: "w-[80px] h-[80px]",
  };

  return (
    <div className={`lds-ellipsis ${sizeMap[size]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { Loader };
