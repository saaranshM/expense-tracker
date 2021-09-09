import { FC } from "react";
import Input from "../common/Input";

const LoginFormMain: FC = () => {
  return (
    <form className="login-form-main">
      <Input type="email" label="email" />
      <Input type="password" label="password" />
    </form>
  );
};

export default LoginFormMain;
