import { toast } from "react-toastify";
import { ContactDTO, EmailResponseDTO } from "../dtos/dtos";

export const EmailService = {
  async sendEmail(contactForm: ContactDTO): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8080/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) {
        toast.error("email was not sent");
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