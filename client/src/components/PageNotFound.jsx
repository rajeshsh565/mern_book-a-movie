import {useNavigate} from "react-router-dom";
const PageNotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>It's seems like you are lost!</p>
      <a href="/">
        <button>Home</button>
      </a>
    </div>
  );
}
export default PageNotFound