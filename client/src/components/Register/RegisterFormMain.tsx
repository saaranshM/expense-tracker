import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { useAppDispatch } from "../../app/hooks/storehooks";
import Button from "../common/Button";
import Input from "../common/Input";
import * as Yup from "yup";
import { UserRegister } from "../../common/types";
import { registerUser } from "../../store/user/thunks";

const RegisterFormMain = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .required("First Name is required"),
    lastName: Yup.string().min(2, "Last Name must be at least 2 characters"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const registerHandler = async (values: UserRegister) => {
    dispatch(registerUser(values));
  };

  const loginNowRouteHandler = () => {
    console.log("login route");
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={registerHandler}>
      <Form className="register-form-main" action="submit">
        <Input
          type="text"
          label="first name"
          name="firstName"
          placeholder="Enter First Name"
          ref={firstNameRef}
        />
        <Input
          type="text"
          label="last name"
          name="lastName"
          placeholder="Enter Last Name"
          ref={lastNameRef}
        />
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
          Register
        </Button>
        <div className="login-form-main_or-text">already registered?</div>
        <Button type="button" onClick={loginNowRouteHandler}>
          Log In Now
        </Button>
      </Form>
    </Formik>
  );
};

export default RegisterFormMain;
