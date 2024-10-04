import styles from "./Modal.module.scss";
import { ReactNode } from "react";

type ModalProp = {
  closeByBackground: boolean;
  children: ReactNode;
  show: boolean;
  setShow: (p: boolean) => void;
};

export default function Modal(props: ModalProp) {
  const { closeByBackground, children, show, setShow } = props;
  if (show) {
    return (
      <div
        className={styles.modal}
        onClick={() => {
          if (closeByBackground) setShow(false);
        }}
      >
        {children}
      </div>
    );
  } else {
    return <></>;
  }
}
