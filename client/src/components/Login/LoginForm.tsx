import { FC } from "react";
import LoginFormMain from "./LoginFormMain";

const LoginForm: FC = () => {
  return (
    <section className="login-form">
      <div className="login-form_container">
        <h2 id="loginHeading" className="login-form_heading">
          Welcome Back! <p>Please login to your account.</p>
        </h2>
        <LoginFormMain />
      </div>
    </section>
  );
};

export default LoginForm;
