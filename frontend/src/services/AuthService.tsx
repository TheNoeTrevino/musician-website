import { toast } from "react-toastify";
import {
  LoginDTO,
  LoginResponseDTO as LoginAndResgisterResponseDTO,
  RegisterDTO,
} from "../dtos/dtos";

export const AuthService = {
  async login(loginDTO: LoginDTO, navigate: (path: string) => void) {
    const response = await fetch("http://localhost:8080/auth/login", {
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
};
