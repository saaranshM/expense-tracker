import { FC } from "react";
import RegisterFormMain from "./RegisterFormMain";

const RegisterForm: FC = () => {
  return (
    <section className="register-form">
      <div className="register-form_container">
        <h2 className="register-form_heading">
          Register Now! <p>Please enter your details.</p>
        </h2>
        <RegisterFormMain />
      </div>
    </section>
  );
};

export default RegisterForm;
