import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { error, success } from "../components/utils";
import { Oval } from "react-loader-spinner";

const SignIn = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const { handleUser } = useContext(UserContext);
  const [errorz, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, login.username, login.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        handleUser(true);
        success("Welcome, Admin");
        setTimeout(() => navigate("/"), 500);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        const errorCode = err.code;
        console.log(errorCode);
        setError({ code: err.code });
        setLoading(false);
        if (errorCode) {
          error("Unauthorized");
        }
      });
  }
  return (
    <div>
      <div className="h-[100vh] px-3 flex flex-col justify-center">
        <form
          className="max-w-[800px] h-[250px] mx-auto border-2 border-dotted border-blue-800 py-5 px-14 mb-10 rounded-md"
          onSubmit={handleSignIn}
        >
          <label htmlFor="name" className="block mt-3">
            Username:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            className="py-1 px-2 mb-3 block rounded w-full border border-gray-700 focus:outline-blue-800"
          />
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="py-1 px-2 mb-3 block rounded w-full border border-gray-700 focus:outline-blue-800"
          />
          <button
            className="mt-5 text-white px-3 py-1 bg-blue-800 rounded mx-auto hover:bg-blue-700 h-[40px] w-[90px] flex justify-center items-center"
            disabled={loading ? true : false}
          >
            {!loading ? (
              "Sign In"
            ) : (
              <Oval
                ariaLabel="loading-indicator"
                height={30}
                width={30}
                strokeWidth={1}
                strokeWidthSecondary={2000}
                color="white"
                secondaryColor="red"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
