import { forwardRef } from "react";

interface InputPropTypes {
  type?: "email" | "password" | "text";
  label: string;
  placeholder: string;
  value: string | undefined;
  onChange: (val: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputPropTypes>(
  ({ type, label, placeholder, value, onChange }, ref) => {
    return (
      <div className="input">
        <div className="input-field">
          <label>{label}</label>
          <input
            ref={ref as any}
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            placeholder={placeholder}
            type={type}
          />
          {type === "password" && <p>Forgot Password?</p>}
        </div>
      </div>
    );
  }
);

export default Input;
