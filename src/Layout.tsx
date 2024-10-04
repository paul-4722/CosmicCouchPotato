import Header from "./components/Header";
import styles from "./Layout.module.scss";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const { pathname } = useLocation();
  if (pathname == "/") {
    return (
      <div className={styles.layout}>
        <div className={styles.grad}>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.layout}>
        <div className={styles.grad}>
          <Header />
          <Outlet />
        </div>
      </div>
    );
  }
}
