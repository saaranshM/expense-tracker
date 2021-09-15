import { FC, MutableRefObject } from "react";
import registerImg from "../../assets/img/register-img.png";

export const RegisterHero: FC = () => {
  return (
    <div className="register-hero">
      <div className="register-hero_container">
        <div className="register-hero_heading">
          Lightning fast way to manage your expenses
          <span> Start Now!</span>
        </div>

        <img src={registerImg} alt="Login Hero" className="register-hero_img" />
      </div>
    </div>
  );
};
