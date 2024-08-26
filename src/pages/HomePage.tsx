import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-sky-500 underline">
        Hello world!
      </h1>
      <Link to={"/auth/register"}>
        <button>Auth</button>
      </Link>
    </>
  );
}

export default HomePage;
