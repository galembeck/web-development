"use client";

import Image from "next/image";

import { useRef, useState } from "react";

import emailjs from "@emailjs/browser";

import useAlert from "../hooks/useAlert.js";

import { Alert } from "@/components/alert.jsx";
import Link from "next/link.js";

export default function Home() {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Pedro Galembeck",
          from_email: form.email,
          to_email: "galembeckpedro@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="w-full h-fit bg-[#0A0D17] sm:px-10 px-5" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="flex flex-col pt-[67px] pb-[104px] px-[192px] items-center justify-center">
        <h1 className="text-6xl text-title_gradient font-extrabold">
          Get in touch
        </h1>
        <p className="mt-3">
          Reach out, and let´s create a universe of possibilities together
        </p>

        <div className="w-full h-fit bg-[#151621] rounded-[6px] mt-[67px] flex items-center justify-center">
          <div className="p-[60px] max-w-[50%]">
            <h1 className="text-2xl font-semibold">
              Let&apos;s connect constellations
            </h1>
            <p className="text-sm font-extralight mt-2">
              Let&apos;s align our constellations! Reach out and let the magic
              of collaboration illuminate our skies.
            </p>

            <div>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col space-y-5"
              >
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#232231] px-5 py-2 min-h-12 rounded-lg placeholder:text-[#A7A7AD] text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#232231] px-5 py-2 min-h-12 rounded-lg placeholder:text-[#A7A7AD] text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                  placeholder="Email"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#232231] px-5 py-2 min-h-12 rounded-lg placeholder:text-[#A7A7AD] text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                  placeholder="Message"
                />

                <button
                  className="bg-gradient-to-r from-[#763AF5] to-[#A604F2] px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-white gap-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send it to the moon"}

                  <Image
                    src="/assets/rocket.png"
                    alt="Rocket"
                    width={22}
                    height={35}
                  />
                </button>
              </form>
            </div>
          </div>

          <div className="pr-[60px]">
            <Image
              src="/assets/astranout-image.png"
              alt="Astronaut"
              width={516}
              height={536}
              className="object-cover"
            />
          </div>
        </div>

        <footer className="mt-20">
          <p>&copy; {new Date().getFullYear()} <Link href="https://github.com/galembeck" className="text-purple-600 hover:text-purple-800">Pedro Galembeck</Link>. All rights reserved.</p>
        </footer>
      </div>

      {/* <div className="h-fit flex items-center justify-center flex-col">
        <div className="ax-w-xl z-10 sm:px-10 px-5 mt-12">
          <h3 className="sm:text-4xl text-3xl font-semibold text-gray_gradient">
            Let&apos;s talk
          </h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="text-lg text-white-600">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="Pedro Galembeck"
              />
            </label>
            <label className="space-y-3">
              <span className="text-lg text-white-600">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="galembeckpedro@gmail.com"
              />
            </label>
            <label className="space-y-3">
              <span className="text-lg text-white-600">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="Hi, I'm interested in..."
              />
            </label>

            <button
              className="bg-black-500 px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send message"}

              <Image
                src="/assets/arrow-up.png"
                alt="Arrow-up"
                width={10}
                height={10}
                className="object-contain invert brightness-0"
              />
            </button>
          </form>
        </div>
      </div> */}
    </section>
  );
}
