import { FC } from "react";

interface ButtonProps {
  primary?: boolean;
  type?: "button" | "submit";
  onClick?: (...args: any[]) => void;
}

const Button: FC<ButtonProps> = ({ type, primary, children, onClick }) => {
  return (
    <div className="button">
      <button
        type={type}
        className={primary ? "button-primary" : ""}
        onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
