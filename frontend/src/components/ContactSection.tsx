import { useState } from "react";
import { toast } from "react-toastify";
import { ContactDTO } from "../dtos/dtos";
import { EmailService } from "../services/EmailService";

const ContactSection = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  return (
    <div
      id="contact"
      className="min-h-screen bg-black flex flex-col md:flex-row px-4 md:px-12 lg:px-24 xl:px-52 gap-6 md:gap-8 pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-20 lg:pb-40"
    >
      <div className="flex flex-col w-full gap-4 md:gap-6 lg:gap-10 z-10">
        <p className="text-4xl md:text-6xl lg:text-7xl text-white">Contact Me</p>
        <span className="text-textGray text-base md:text-xl lg:text-2xl xl:text-4xl font-light w-full md:w-4/5">
          Feel free to reach out if you have any questions about my music or are
          interested in a commission!
        </span>
      </div>

      <div className="flex flex-col justify-between text-lg md:text-xl lg:text-2xl font-light text-textGray w-full gap-5">
        <form
          className="flex flex-col justify-between text-lg md:text-xl lg:text-2xl font-light text-textGray w-full gap-4 md:gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            const contactSubmission: ContactDTO = {
              firstName: firstName,
              lastName: lastName,
              from: from,
              subject: subject,
              message: message,
            };
            EmailService.sendEmail(contactSubmission);
          }}
          onInvalid={(e) => {
            e.preventDefault();
            // TODO: fix this
            const fieldName = (e.target as HTMLInputElement).id;
            toast.error(`Please fill: ${fieldName}`);
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-between w-full rounded-lg min-h-[62px]">
            <input
              id="First Name"
              className="flex cursor-text items-center px-4 md:px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
              type="text"
              name="first-name"
              required
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              id="Last Name"
              className="flex cursor-text items-center px-4 md:px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
              type="text"
              name="last-name"
              required
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-4 md:gap-6 justify-between w-full rounded-lg min-h-[62px]">
            <input
              id="Email"
              className="flex cursor-text items-center px-4 md:px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
              type="text"
              name="email"
              required
              placeholder="Your Email"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-4 md:gap-6 justify-between w-full rounded-lg min-h-[62px]">
            <input
              id="Subject"
              className="flex cursor-text items-center px-4 md:px-6 h-full rounded-xl border border-solid border-white w-full bg-inherit"
              type="text"
              name="subject"
              required
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <textarea
            id="Message"
            className="flex cursor-text items-start px-4 md:px-6 pt-3 h-32 md:h-40 lg:h-full rounded-xl border border-solid border-white w-full bg-inherit"
            name="message"
            required
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="button w-full text-2xl md:text-3xl lg:text-4xl font-semibold text-center bg-primary rounded-xl border border-solid min-h-[60px] md:min-h-[70px] lg:min-h-[77px]"
            type="submit"
            name="send"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
