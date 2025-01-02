import { Button } from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import styles from "./Index.module.css";
import BannerHome from "../../assets/icons/banner-home.svg";

export function Index() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="mainSection">
          <div className={styles.banner}>
            <div className={styles.text}>
              <h1>Stedet hvor amatørmusikere finder hinanden og spiller music sammen</h1>
              <Link to="/musicians">
                <Button variant="primary" size="auto">
                  Find musicians
                </Button>
              </Link>
            </div>
            <div className={styles.imageContainer}>
              <img src={BannerHome} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
