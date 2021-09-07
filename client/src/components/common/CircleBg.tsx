import React, { Fragment } from "react";
import styles from "./CircleBg.module.scss";

const CircleBg: React.FC = (props) => {
  return (
    <Fragment>
      <div className={styles.CircleBg}>{props.children}</div>
    </Fragment>
  );
};

export default CircleBg;
