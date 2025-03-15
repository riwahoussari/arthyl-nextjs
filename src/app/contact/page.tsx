"use client";
import { useInView, motion } from "motion/react";
import Button from "../../components/global/Button";
import PageTitle from "../../components/global/PageTitle";
import { useRef } from "react";

export default function ContactPage() {
  const inputRef1 = useRef<HTMLDivElement>(null);
  const isInView1 = useInView(inputRef1, { once: true });

  const inputRef2 = useRef<HTMLDivElement>(null);
  const isInView2 = useInView(inputRef2, { once: true });

  const inputRef3 = useRef<HTMLDivElement>(null);
  const isInView3 = useInView(inputRef3, { once: true });

  const subTitleRef1 = useRef<HTMLDivElement>(null);
  const isTitleInView1 = useInView(subTitleRef1, { once: true });

  const subTitleRef2 = useRef<HTMLDivElement>(null);
  const isTitleInView2 = useInView(subTitleRef2, { once: true });

  return (
    <>
      <PageTitle>Contact</PageTitle>
      <section className="side-padding z-1 relative">
        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-32 pb-[120px] lg:max-w-full lg:flex-row lg:justify-center lg:gap-16 xl:gap-48">
          <form className="w-full space-y-8 text-xl lg:max-w-[450px] xl:max-w-[500px]">
            <h2
              ref={subTitleRef1}
              className="mb-10 overflow-hidden text-base font-light opacity-75 lg:text-lg"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isTitleInView1 ? { y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
              >
                SEND YOUR MESSAGE
              </motion.span>
            </h2>
            <div ref={inputRef1}>
              <div className="overflow-hidden">
                <motion.label
                  htmlFor="fullName"
                  className="mb-1 block text-xl"
                  initial={{ y: "100%" }}
                  animate={isInView1 ? { y: 0 } : {}}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                >
                  Full Name
                </motion.label>
              </div>
              <motion.input
                initial={{ y: "25%" }}
                animate={isInView1 ? { y: "0" } : {}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. John Doe"
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
              />
            </div>
            <div ref={inputRef2}>
              <div className="overflow-hidden">
                <motion.label
                  htmlFor="phoneNumber"
                  className="mb-1 block"
                  initial={{ y: "100%" }}
                  animate={isInView2 ? { y: 0 } : {}}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                >
                  Phone Number
                </motion.label>
              </div>
              <motion.input
                initial={{ y: "25%" }}
                animate={isInView1 ? { y: "0" } : {}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                id="phoneNumber"
                name="phoneNumber"
                placeholder="e.g. 71 123 123"
                type="text"
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
              />
            </div>
            <div ref={inputRef3}>
              <div className="overflow-hidden">
                <motion.label
                  htmlFor="message"
                  className="mb-1 block"
                  initial={{ y: "100%" }}
                  animate={isInView3 ? { y: 0 } : {}}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  Message
                </motion.label>
              </div>
              <motion.textarea
                initial={{ y: "25%" }}
                animate={isInView1 ? { y: "0" } : {}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                name="message"
                id="message"
                rows={4}
                placeholder="Say or ask anything..."
                className="border-1 bg-beige w-full rounded-lg border-black/75 px-4 py-3 duration-100 ease-in-out hover:scale-[102%] focus:border-black focus:text-black focus:hover:scale-100"
              ></motion.textarea>
            </div>
            <div>
              <Button size="lg" arrow={true}>
                Send Message
              </Button>
            </div>
          </form>
          <div className="space-y-6">
            <h2
              className="mb-10 overflow-hidden text-base font-light opacity-75 lg:text-lg"
              ref={subTitleRef2}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isTitleInView2 ? { y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
              >
                OR REACH OUT
              </motion.span>
            </h2>

            <motion.div
              initial={{ y: "50%" }}
              animate={isTitleInView2 ? { y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
            >
              <Button secondary={true} arrow={true} size="lg">
                Whatsapp (71 123 123)
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: "50%" }}
              animate={isTitleInView2 ? { y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
            >
              <Button secondary={true} arrow={true} size="lg">
                Email (hello@arthyl.com)
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
