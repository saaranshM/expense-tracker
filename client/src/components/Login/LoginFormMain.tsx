import { FC } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginFormMain: FC = () => {
  return (
    <form className="login-form-main">
      <Input type="email" label="email" placeholder="Enter Email" />
      <Input type="password" label="password" placeholder="Enter Password" />
      <Button text="Log In" primary />
      <div className="login-form-main_or-text">or</div>
      <Button text="Create New Account" />
    </form>
  );
};

export default LoginFormMain;
