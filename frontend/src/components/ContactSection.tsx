const ContactSection = () => {
  return (
    <div
      id="contact"
      className="h-screen bg-black flex flex-row px-52 gap-8 py-40"
    >
      <div className="flex flex-col w-full  gap-10  z-10  ">
        <p className="text-7xl text-white">Contact Me</p>
        <span className="text-textGray text-4xl font-light w-4/5">
          Feel free to reach out if you have any questions about my music or are
          interested in a commission!
        </span>
      </div>

      <div className="flex flex-col  justify-between text-2xl font-light text-textGray w-full gap-5 ">
        <div className="flex flex-row  gap-6 justify-between w-full rounded-lg min-h-[62px]">
          <div className="flex cursor-text items-center   px-6 h-full rounded-xl border border-solid border-white w-full ">
            First Name
          </div>
          <div className="flex cursor-text items-center  px-6 h-full rounded-xl border border-solid border-white w-full ">
            Last Name
          </div>
        </div>
        <div className=" py-2 cursor-text  px-6 h-full rounded-xl border border-solid border-white w-full ">
          Email
        </div>
        <div className=" cursor-text  py-2  px-6 h-full rounded-xl border border-solid border-white w-full ">
          Message
        </div>
        <div className="button   w-full text-4xl font-semibold text-center  bg-primary rounded-xl border border-solid  min-h-[77px] ">
          Send
        </div>
      </div>
    </div>
  );
};

export default ContactSection;