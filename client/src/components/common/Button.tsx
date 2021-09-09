import { FC } from "react";

interface ButtonProps {
  text: string;
  primary?: boolean;
}

const Button: FC<ButtonProps> = ({ text, primary }) => {
  return (
    <div className="button">
      <button
        className={primary ? "button-primary" : ""}
        onClick={(e) => {
          e.preventDefault();
        }}>
        {text}
      </button>
    </div>
  );
};

export default Button;
