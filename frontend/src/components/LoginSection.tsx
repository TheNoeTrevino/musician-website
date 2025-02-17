import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Log in the user
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Create a new user
      navigate("/");
    } catch (error) {
      console.error("Sign Up Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div id="about" className="h-screen flex flex-row pr-52">
      <div className="w-2/3">
        <img
          className="h-full w-full"
          src="/loginsection_image.png"
          alt="Sebastian playing instrument in a band"
        />
      </div>

      <div className="flex flex-col w-1/2 px-10 justify-center z-10 gap-6 mt-10">
        <div className="text-center">
          <p className="text-7xl text-white">Welcome to Havner Music</p>
          <p className="text-textGray text-xl">
            Lorem ipsum odor amet, consectetuer adipiscing elit.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="text-2xl flex flex-col gap-4 text-white"
        >
          <label>Email</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-black"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="button bg-primary cursor-pointer py-2"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleSignUp}
          className="buttonOutline justify-center cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginSection;
