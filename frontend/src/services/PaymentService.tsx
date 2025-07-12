import { PaymentStatusResponseDTO } from "../dtos/dtos";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const SESSION = "SEB_SESSION_ID";

export const PaymentService = {
  async checkStatus(): Promise<PaymentStatusResponseDTO> {
    const sessionId = localStorage.getItem(SESSION);
    console.log("Session ID:", sessionId);
    try {
      const response = await fetch(`${baseUrl}/payment/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId }),
      });

      const responseData: PaymentStatusResponseDTO = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(
        `Something went wrong sending the email. Error5: ${error}`,
      );
    }
  },
};
