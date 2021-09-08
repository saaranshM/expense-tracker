import { FC, Fragment, useRef, MouseEvent } from "react";
import LoginHero from "./LoginHero";

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = () => {
  const cursorRef = useRef(document.createElement("div"));

  console.log(cursorRef);

  const handleMouseMove = (e: MouseEvent) => {
    cursorRef.current.style.left = e.clientX + "px";
    cursorRef.current.style.top = e.clientY + "px";
  };
  return (
    <Fragment>
      <section onMouseMove={handleMouseMove} className="login">
        <LoginHero divRef={cursorRef} />
      </section>
    </Fragment>
  );
};

export default LoginScreen;
