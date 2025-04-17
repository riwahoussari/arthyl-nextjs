"use client";
import XIconSvg from "@/components/global/XIconSvg";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ModalInfo } from "./page";
import { Portal } from "./Portal";
import Button from "@/components/global/Button";

export default function Modal({
  modal,
  onClose,
}: {
  modal: ModalInfo;
  onClose: () => void;
}) {
  // disable main content scroll
  useEffect(() => {
    if (modal.open) {
      document.body.classList.add("overflow-hidden");
      document.querySelector("header")?.classList.add("hidden");
      document.querySelector("footer")?.classList.add("hidden");

      document.querySelector("main")?.classList.add("h-dvh");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.querySelector("header")?.classList.remove("hidden");
      document.querySelector("footer")?.classList.remove("hidden");

      document.querySelector("main")?.classList.remove("h-dvh");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.querySelector("header")?.classList.remove("hidden");
      document.querySelector("footer")?.classList.remove("hidden");

      document.querySelector("main")?.classList.remove("h-dvh");
    };
  }, [modal.open]);

  // FORM SUBMISSION
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [pending, setPending] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const data = {
      fullName: fullNameRef.current?.value,
      email: emailRef.current?.value,
      artworkName: modal.item?.title,
    };

    if (!data.fullName || !data.email || !data.artworkName) {
      alert("Please fill in all fields.");
      setPending(false);
      return;
    }

    const response = await fetch("/api/request-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Message Sent Successfully!");
      if (fullNameRef.current) fullNameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
    } else {
      alert("Failed to send message :(");
    }
    setPending(false);
  };

  if (!modal.open) return;
  return (
    <Portal>
      {/* overlay */}
      <div className="z-900 fixed inset-0 bg-black/50 backdrop-blur-2xl" />

      {/* modal */}
      <div className="bg-beige z-1000 -translate-1/2 fixed left-1/2 top-1/2 max-h-[min(800px,90vh)] w-[90%] max-w-[1024px] overflow-x-hidden rounded-2xl">
        <div className="relative flex h-full flex-col-reverse gap-4 overflow-y-auto p-4 md:p-8 lg:grid lg:grid-cols-2 lg:gap-20">
          {/* close button */}
          <button
            className="border-b-1 border-l-1 bg-beige/50 fixed right-0 top-0 aspect-square cursor-pointer rounded-bl-lg p-3 pr-4 backdrop-blur-sm duration-200 ease-in-out hover:bg-red-500"
            onClick={onClose}
          >
            <XIconSvg />
          </button>

          {/* col 1 */}
          <div className="max-w-[500px] pt-4">
            {/* title */}
            <h2 className="text-2xl font-medium md:text-3xl lg:text-4xl">
              {modal.item?.title}
            </h2>

            {/* stock */}
            <p className="text-sm opacity-70 md:text-base lg:text-lg">
              {modal.item?.remainingStock}/{modal.item?.totalStock} Remaining
            </p>

            {/* features */}
            <ul className="my-4 space-y-2 pl-4 lg:my-6 lg:space-y-3 lg:pl-6">
              {modal.item?.features?.map((feature, i) => (
                <li
                  key={i}
                  className="list-disc text-sm md:text-base lg:text-lg"
                >
                  {feature}
                </li>
              ))}
            </ul>

            {/* sizes - small screens */}
            <div className="not-sr-only mt-8 lg:sr-only">
              <p className="text-base font-medium md:text-lg lg:text-xl">
                Available In:
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {modal.item?.sizes.map((size, i) => (
                  <div
                    key={i}
                    className="border-1 rounded-md border-black/70 p-3"
                  >
                    <p className="text-sm font-medium md:text-base lg:text-lg">
                      {size.name}
                    </p>
                    <p className="opacity-70">
                      {size.width}x{size.height}x{size.depth}(cm)
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Inquiry From */}
            <form
              className="border-t-1 mt-12 space-y-4 border-black/50 pb-4 pt-6 text-xl lg:mt-16 lg:pb-0 lg:pt-8"
              onSubmit={handleSubmit}
            >
              {/* Full Name Input */}
              <div>
                {/* label */}
                <div className="overflow-hidden">
                  <label
                    htmlFor={"fullName"}
                    className="block text-sm md:text-base lg:text-lg"
                  >
                    Full Name
                  </label>
                </div>
                {/* input */}
                <input
                  disabled={pending}
                  required
                  ref={fullNameRef}
                  id={"fullName"}
                  name={"fullName"}
                  type={"text"}
                  placeholder={"e.g. John Doe"}
                  className="border-1 bg-beige w-[min(100%,400px)] rounded-lg border-black/75 px-3 py-2 text-sm duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100 md:text-base lg:w-[80%] lg:text-lg"
                />
              </div>

              {/* Email Input */}
              <div className="mb-6">
                {/* label */}
                <div className="overflow-hidden">
                  <label
                    htmlFor={"email"}
                    className="block text-sm md:text-base lg:text-lg"
                  >
                    Email
                  </label>
                </div>
                {/* input */}
                <input
                  required
                  disabled={pending}
                  ref={emailRef}
                  id={"email"}
                  name={"email"}
                  type={"email"}
                  placeholder={"name@domain.com"}
                  className="border-1 bg-beige w-[min(100%,400px)] rounded-lg border-black/75 px-3 py-2 text-sm duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100 md:text-base lg:w-[80%] lg:text-lg"
                />
              </div>

              {/* Submit Button */}
              <Button size="sm" arrow disabled={pending}>
                Request Inquiry
              </Button>
            </form>
          </div>

          {/* col 2 */}
          <div>
            {/* image */}
            {modal.item?.mainImg && (
              <Image
                src={modal.item?.mainImg}
                placeholder="blur"
                alt={`Photo of ${modal.item.title} artpiece.`}
                className="bg-placeholder aspect-square w-full max-w-[400px] overflow-hidden rounded-xl"
              />
            )}

            {/* sizes - lg screens */}
            <div className="mt-8 hidden lg:block" aria-hidden>
              <p className="text-base font-medium md:text-lg lg:text-xl">
                Available In:
              </p>

              <div className="mt-4 flex flex-wrap gap-6">
                {modal.item?.sizes.map((size, i) => (
                  <div
                    key={i}
                    className="border-1 max-w-[40%] rounded-md border-black/70 p-4"
                  >
                    <p className="text-sm font-medium md:text-base lg:text-lg">
                      {size.name}
                    </p>
                    <p className="opacity-70">
                      {size.width}x{size.height}x{size.depth} (cm)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
