import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { LoginDTO } from "../dtos/dtos";

const LoginSection = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInfo: LoginDTO = {
      username: username,
      password: password,
    };
    await AuthService.login(loginInfo, navigate);
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };

  return (
    <div id="about" className="min-h-screen flex flex-col md:flex-row md:pr-52">
      {/* Image section - hidden on mobile, visible on tablet+ */}
      <div className="hidden md:block md:w-2/3">
        <img
          className="h-full w-full object-cover"
          src="/loginsection_image.png"
          alt="Sebastian playing instrument in a band"
          loading="lazy"
        />
      </div>

      {/* Form section - full width on mobile, half width on desktop */}
      <div className="flex flex-col w-full md:w-1/2 px-4 md:px-8 lg:px-10 justify-center z-10 gap-4 md:gap-6 py-12 md:py-0 md:mt-10">
        <div className="text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white">Welcome to Havner Music</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="text-lg md:text-xl lg:text-2xl flex flex-col gap-3 md:gap-4 text-white"
        >
          <label>Username</label>
          <input
            className="flex cursor-text items-center px-4 md:px-6 py-3 md:py-2 rounded-xl border border-solid border-white w-full bg-black"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="flex cursor-text items-center px-4 md:px-6 py-3 md:py-2 rounded-xl border border-solid border-white w-full bg-inherit"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="button bg-primary cursor-pointer py-3 md:py-2 mt-2"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleSignUp}
          className="buttonOutline justify-center cursor-pointer py-3 md:py-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginSection;
