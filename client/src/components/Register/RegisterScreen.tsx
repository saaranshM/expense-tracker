import { useRef, MouseEvent } from "react";
import RegisterForm from "./RegisterForn";
import { RegisterHero } from "./RegisterHero";

export const RegisterScreen = () => {
  return (
    <section className="register">
      <RegisterHero />
      <RegisterForm />
    </section>
  );
};
