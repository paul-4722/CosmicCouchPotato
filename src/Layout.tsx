import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
}
