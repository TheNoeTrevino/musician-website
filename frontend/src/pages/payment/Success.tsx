import { Link, useNavigate } from "react-router-dom";
import { PaymentService } from "../../services/PaymentService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PaymentStatusResponseDTO } from "../../dtos/dtos";

const Success = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusResponseDTO>(
    {} as PaymentStatusResponseDTO,
  );
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchStatus() {
      try {
        const result = await PaymentService.checkStatus();
        console.log("Payment status result:", result);

        if (isMounted) {
          setPaymentStatus(result);

          if (result.status === "SUCCESS") {
            toast.success("Your purchase was successful");
          } else if (result.status === "ERROR" || result.status === "PENDING") {
            toast.error("Payment was not successful");
            navigate("/cancel");
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        if (isMounted) {
          navigate("/cancel");
        }
      }
    }

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="h-screen bg-black flex flex-row relative">
        <div className="flex flex-col items-center text-center gap-7 w-full h-full justify-center">
          <h1 className="text-8xl text-white">Thank you for your purchase! </h1>
          <p className="text-5xl text-white m-3">
            An email will be sent with the pieces you have purchased within 48
            hours.
          </p>
          <div>
            <p className="text-2xl text-white m-3">
              If you have any questions, please email us at:
            </p>
            <p className="text-2xl text-white m-3">SebastianHavner@gmail.com</p>
          </div>
          <span className="text-textGray text-4xl">
            <p>
              We really appreciate it! Feel free to continue browsing our{" "}
              <Link to={"/"} className="text-sky-700 underline">
                website.
              </Link>{" "}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Success;
