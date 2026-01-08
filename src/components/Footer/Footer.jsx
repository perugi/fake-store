import githubLogo from "../../assets/githublogo.png";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <a className={styles.ghLink} href="https://github.com/perugi">
        <div>Made by</div>
        <img className={styles.ghLogo} src={githubLogo} alt="" />
        <div>Dominik Perusko</div>
      </a>
    </footer>
  );
}
