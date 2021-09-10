import { forwardRef } from "react";
import { ErrorMessage, useField } from "formik";

interface InputPropTypes {
  type?: "email" | "password" | "text";
  label: string;
  placeholder: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputPropTypes>(
  ({ label, ...props }, ref) => {
    const [field, meta] = useField(props);
    return (
      <div className="input">
        <div className="input-field">
          <label htmlFor={field.name}>{label}</label>
          <input
            className={`${meta.touched && meta.error && "invalid"}`}
            ref={ref as any}
            {...props}
            {...field}
          />
          <ErrorMessage
            component="div"
            className="input-error-message"
            name={field.name}
          />
          {props.type === "password" && <p>Forgot Password?</p>}
        </div>
      </div>
    );
  }
);

export default Input;
