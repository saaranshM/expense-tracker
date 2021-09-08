import { FC } from "react";
import LoginHero from "./LoginHero";

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = () => {
  return (
    <section className="login">
      <LoginHero />
    </section>
  );
};

export default LoginScreen;
