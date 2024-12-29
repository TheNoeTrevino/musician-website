import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div>The page you are looking for does not exist</div>
      <Link to={"./"}>Please go back to the home page</Link>
    </div>
  );
};

export default ErrorPage;
