import { FC } from "react";

interface InputPropTypes {
  type: string;
  label: string;
  placeholder: string;
}

const Input: FC<InputPropTypes> = ({ type, label, placeholder }) => {
  return (
    <div className="input">
      <div className="input-field">
        <label>{label}</label>
        <input placeholder={placeholder} type={type} />
        {type === "password" && <p>Forgot Password?</p>}
      </div>
    </div>
  );
};

export default Input;
