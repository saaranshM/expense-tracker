import { FC, MutableRefObject } from "react";
import registerImg from "../../assets/img/register-img.png";

interface RegisterHeroProps {
  divRef: MutableRefObject<HTMLDivElement>;
}

export const RegisterHero: FC<RegisterHeroProps> = ({ divRef }) => {
  return (
    <div className="register-hero">
      <div className="register-hero_container">
        <div className="register-hero_heading">
          Lightning fast way to manage your expenses
          <span> Start Now!</span>
        </div>

        <img src={registerImg} alt="Login Hero" className="register-hero_img" />
        <div ref={divRef} className="cursor"></div>
      </div>
    </div>
  );
};
