import { FC, useRef, useState, useEffect, FormEvent } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginFormMain: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const emailOnChange = (value: string) => {
    setEmail(value);
  };
  const passwordOnChange = (value: string) => {
    setPassword(value);
  };

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  const createNewAccountHandler = () => {
    console.log("crate");
  };
  return (
    <form onSubmit={loginHandler} className="login-form-main">
      <Input
        type="email"
        label="email"
        placeholder="Enter Email"
        ref={emailRef}
        value={email}
        onChange={emailOnChange}
      />
      <Input
        type="password"
        label="password"
        placeholder="Enter Password"
        ref={passwordRef}
        value={password}
        onChange={passwordOnChange}
      />
      <Button primary type="submit">
        Log In
      </Button>
      <div className="login-form-main_or-text">or</div>
      <Button type="button" onClick={createNewAccountHandler}>
        Create New Account
      </Button>
    </form>
  );
};

export default LoginFormMain;
