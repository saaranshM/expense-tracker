import { FC } from "react";

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <div className="button">
      <button
        onClick={(e) => {
          e.preventDefault();
        }}>
        {text}
      </button>
    </div>
  );
};

export default Button;
