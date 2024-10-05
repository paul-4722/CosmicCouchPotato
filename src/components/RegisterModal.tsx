import styles from "./RegisterModal.module.scss";
import Modal from "./Modal";
import arrowRight from "../assets/arrow_right_alt.svg";

type Prop = {
  show: boolean;
  setShow: (s: boolean) => void;
};

export default function RegisterModal(props: Prop) {
  const { show, setShow } = props;
  return (
    <Modal show={show} setShow={setShow} closeByBackground={true}>
      <div className={styles.body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          {"Register and\nMake Your\nOwn Stellar System!"}
        </div>
        <input placeholder="Name" />
        <input type="password" placeholder="Password" />
        <button>
          Register <img src={arrowRight} />
        </button>
        <div className={styles.quit} onClick={() => setShow(false)}>
          go back to celestia
        </div>
      </div>
    </Modal>
  );
}
