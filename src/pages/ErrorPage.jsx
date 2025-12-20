import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>404</h1>
      <p>
        {error?.statusText ||
          error?.message ||
          "The page you're looking for doesn't exist."}
      </p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default ErrorPage;
