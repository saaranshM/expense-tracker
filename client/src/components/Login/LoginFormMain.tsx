import { FC, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import Button from "../common/Button";
import Input from "../common/Input";
import * as Yup from "yup";

const LoginFormMain: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const loginHandler = (values: { email: string; password: string }) => {
    console.log(values);
  };

  const createNewAccountRouteHandler = () => {
    console.log("create");
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={loginHandler}>
      {() => (
        <Form className="login-form-main" action="submit">
          <Input
            type="email"
            label="email"
            name="email"
            placeholder="Enter Email"
            ref={emailRef}
          />
          <Input
            type="password"
            label="password"
            name="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
          <Button primary type="submit">
            Log In
          </Button>
          <div className="login-form-main_or-text">or</div>
          <Button type="button" onClick={createNewAccountRouteHandler}>
            Create New Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginFormMain;
