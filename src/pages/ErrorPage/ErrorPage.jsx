import { useRouteError, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();
  const is404 = error?.status === 404;

  return (
    <div className={styles.errorPage}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>
          {is404 ? "404" : error?.status || "Error"}
        </h1>
        <h2 className={styles.errorTitle}>
          {is404 ? "Page Not Found" : "Oops! Something went wrong"}
        </h2>
        <p className={styles.errorMessage}>
          {is404
            ? "The page you're looking for doesn't exist. It might have been moved or deleted."
            : "We encountered an unexpected error. Please try again later."}
        </p>
        <Link to="/" className={styles.buttonLink}>
          <Button variant="secondary">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
