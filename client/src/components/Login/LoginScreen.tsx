import { FC } from "react";
import CircleBg from "../common/CircleBg";
import styles from "./LoginScreen.module.scss";

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = () => {
  return (
    <section>
      <CircleBg>
        <div className={styles.login}></div>
      </CircleBg>
    </section>
  );
};

export default LoginScreen;
