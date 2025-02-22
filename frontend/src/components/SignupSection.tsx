import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { RegisterDTO } from "../dtos/dtos";

const SignupSection = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerDTO: RegisterDTO = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      emailAddress: emailAddress,
    };
    await AuthService.register(registerDTO, navigate);
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
          onSubmit={handleSignup}
          className="text-2xl flex flex-col gap-4 text-white"
        >
          <label>Username</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-black"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-black"
            type="text"
            placeholder="Enter Email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />

          <label>First Name</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-black"
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label>Last Name</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-black"
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="flex cursor-text items-center px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="button bg-primary cursor-pointer py-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupSection;
