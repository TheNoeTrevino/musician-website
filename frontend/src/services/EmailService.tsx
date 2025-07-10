import { toast } from "react-toastify";
import { ContactDTO, EmailResponseDTO } from "../dtos/dtos";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const EmailService = {
  async sendEmail(contactForm: ContactDTO): Promise<void> {
    toast.success("We are currently sending your email.");
    try {
      const response = await fetch(`${baseUrl}/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        toast.error("Email was not sent. Please try again.");
      }

      const responseData: EmailResponseDTO = await response.json();
      toast.success(responseData.reply);
    } catch (error) {
      throw new Error(
        `Something went wrong sending the email. Error2: ${error}`,
      );
    }
  },
};
