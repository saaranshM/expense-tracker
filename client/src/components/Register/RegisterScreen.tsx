import { useRef, MouseEvent } from "react";
import { RegisterHero } from "./RegisterHero";

export const RegisterScreen = () => {
  const cursorRef = useRef(document.createElement("div"));

  const handleMouseMove = (e: MouseEvent) => {
    cursorRef.current.style.left = e.clientX + "px";
    cursorRef.current.style.top = e.clientY + "px";
  };
  return (
    <section onMouseMove={handleMouseMove} className="register">
      <RegisterHero divRef={cursorRef} />
    </section>
  );
};
