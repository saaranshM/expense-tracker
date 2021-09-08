import { FC } from "react";
import loginImg from "../../assets/img/login-img.png";

const LoginHero: FC = () => {
  return (
    <div className="login-hero">
      <div className="login-hero_container">
        <div className="login-hero_heading">
          Lightning fast way to manage your expenses
          <span> Start Now!</span>
        </div>
        <img src={loginImg} alt="Login Hero" className="login-hero_img" />
      </div>
    </div>
  );
};

export default LoginHero;
