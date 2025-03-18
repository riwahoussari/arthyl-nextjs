"use client";

import { useInView, motion } from "motion/react";
import { FormEvent, useRef, useState } from "react";
import Button from "../../components/global/Button";
import PageTitle from "../../components/global/PageTitle";
import { CONTACT_EMAIL, CONTACT_PHONE_NUMBER } from "@/utils/contactInfo";

export default function ContactPage() {
  // Create references for form inputs and titles
  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    phoneNumber: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
    sendTitle: useRef<HTMLParagraphElement>(null),
    reachOutTitle: useRef<HTMLParagraphElement>(null),
  };

  // Track visibility for animations
  const inView = {
    fullName: useInView(refs.fullName, { once: true }),
    phoneNumber: useInView(refs.phoneNumber, { once: true }),
    message: useInView(refs.message, { once: true }),
    sendTitle: useInView(refs.sendTitle, { once: true }),
    reachOutTitle: useInView(refs.reachOutTitle, { once: true }),
  };

  // adds move up animation to elements
  // returns motion properties to the element it was called from
  const moveUpAnim = (
    refName: keyof typeof inView,
    {
      delay = 0,
      duration = 0.4,
      y = "100%",
    }: { delay?: number; duration?: number; y?: string } = {}
  ) => ({
    initial: { y },
    animate: inView[refName] ? { y: 0 } : {},
    transition: { duration, ease: "easeInOut", delay },
  });

  // Reach out links
  const reachOutLinks = [
    {
      text: `Whatsapp (${CONTACT_PHONE_NUMBER})`,
      href: `https://wa.me/${CONTACT_PHONE_NUMBER.replaceAll(" ", "")}`,
    },
    { text: `Email (${CONTACT_EMAIL})`, href: `mailto:${CONTACT_EMAIL}` },
  ];

  // FORM SUBMISSION
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const data = {
      fullName: refs.fullName.current?.value,
      phoneNumber: refs.phoneNumber.current?.value,
      message: refs.message.current?.value,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Message Sent Successfully!");
      if (refs.fullName.current) refs.fullName.current.value = "";
      if (refs.phoneNumber.current) refs.phoneNumber.current.value = "";
      if (refs.message.current) refs.message.current.value = "";
    } else {
      alert("Failed to send message :(");
    }
    setPending(false);
  };

  return (
    <>
      {/* FORM SUBMISSION STATUS */}
      {/* Title */}
      <PageTitle>Contact</PageTitle>

      {/* Content */}
      <section className="side-padding z-1 relative">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-32 pb-[120px] lg:max-w-full lg:flex-row lg:justify-center lg:gap-16 xl:gap-48">
          {/* Contact Form */}
          <form
            className="w-full space-y-8 text-xl lg:max-w-[450px] xl:max-w-[500px]"
            onSubmit={handleSubmit}
          >
            {/* Section Title */}
            <h2
              ref={refs.sendTitle}
              className="mb-10 overflow-hidden text-base font-light opacity-75 lg:text-lg"
            >
              <motion.span
                className="inline-block"
                {...moveUpAnim("sendTitle", { delay: 0.1 })}
              >
                SEND YOUR MESSAGE
              </motion.span>
            </h2>

            {/* Full Name Input */}
            <div>
              {/* label */}
              <div className="overflow-hidden">
                <motion.label
                  htmlFor={"fullName"}
                  className="mb-1 block text-xl"
                  {...moveUpAnim("fullName", { delay: 0.1 })}
                >
                  Full Name
                </motion.label>
              </div>
              {/* input */}
              <motion.input
                disabled={pending}
                required
                ref={refs.fullName}
                id={"fullName"}
                name={"fullName"}
                type={"text"}
                placeholder={"e.g. John Doe"}
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
                {...moveUpAnim("fullName", { duration: 0.3, y: "25%" })}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              {/* label */}
              <div className="overflow-h'phoneNumber'den">
                <motion.label
                  htmlFor={"phoneNumber"}
                  className="mb-1 block text-xl"
                  {...moveUpAnim("phoneNumber", { delay: 0.1 })}
                >
                  Phone Number
                </motion.label>
              </div>
              {/* input */}
              <motion.input
                required
                disabled={pending}
                ref={refs.phoneNumber}
                id={"phoneNumber"}
                name={"phoneNumber"}
                type={"tel"}
                placeholder={"e.g. 71 123 123"}
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
                {...moveUpAnim("phoneNumber", { duration: 0.3, y: "25%" })}
              />
            </div>

            {/* Message Field  Input*/}
            <div>
              <div className="overflow-hidden">
                <motion.label
                  htmlFor="message"
                  className="mb-1 block"
                  {...moveUpAnim("message", { duration: 0.3 })}
                >
                  Message
                </motion.label>
              </div>
              <motion.textarea
                required
                disabled={pending}
                ref={refs.message}
                id="message"
                name="message"
                rows={4}
                placeholder="Say or ask anything..."
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
                {...moveUpAnim("message", { duration: 0.3, y: "25%" })}
              ></motion.textarea>
            </div>

            {/* Submit Button */}
            <Button size="lg" arrow disabled={pending}>
              Send Message
            </Button>
          </form>

          {/* Reach Out Link */}
          <div className="space-y-6">
            {/* Section Title */}
            <h2
              ref={refs.reachOutTitle}
              className="mb-10 overflow-hidden text-base font-light opacity-75 lg:text-lg"
            >
              <motion.span
                className="inline-block"
                {...moveUpAnim("reachOutTitle", { delay: 0.1 })}
              >
                OR REACH OUT
              </motion.span>
            </h2>

            {/* Reach Out Links */}
            {reachOutLinks.map(({ text, href }, i) => (
              <motion.div
                key={text}
                {...moveUpAnim("reachOutTitle", {
                  delay: 0.1 + i * 0.2,
                  y: "50%",
                })}
              >
                <a href={href} target="_blank">
                  <Button secondary arrow size="lg">
                    {text}
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
