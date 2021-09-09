import { FC } from "react";

interface InputPropTypes {
  type: string;
  label: string;
}

const Input: FC<InputPropTypes> = ({ type, label }) => {
  return (
    <div className="input">
      <div className="input-field">
        <label>{label}</label>
        <input type={type} />
        {type === "password" && <p>Forgot Password?</p>}
      </div>
    </div>
  );
};

export default Input;
