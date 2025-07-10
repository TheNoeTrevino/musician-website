import { toast } from "react-toastify";
import {
  LoginDTO,
  LoginResponseDTO as LoginAndResgisterResponseDTO,
  RegisterDTO,
} from "../dtos/dtos";

const baseUrl = import.meta.env.BACKEND_URL;

export const AuthService = {
  async login(loginDTO: LoginDTO, navigate: (path: string) => void) {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDTO),
    });

    if (response.status === 401) {
      toast.error("Unauthorized, please check your credentials");
      throw new Error("Unauthorized, bad credentials");
    }

    const loginResponse: LoginAndResgisterResponseDTO = await response.json();
    toast.success("Successfully logged in");

    navigate("/");
    localStorage.setItem("jwt", loginResponse.jwtToken);
    return loginResponse;
  },

  async register(registerDTO: RegisterDTO, navigate: (path: string) => void) {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerDTO),
    });

    const registerResponse: LoginAndResgisterResponseDTO =
      await response.json();

    if (!registerResponse.successful) {
      toast.error("Something went wrong making your account");
      return registerResponse;
    }

    toast.success("Successfully registered, please log in.");
    navigate("/login");
    return registerResponse;
  },
};
