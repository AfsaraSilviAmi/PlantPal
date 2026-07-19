"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
    const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  toast.success("Thank you! Your message has been received.");

  setForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
};
  return (
    <main className="bg-[#F9F6EE]">

      {/* ================= HERO ================= */}

   <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">

        <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-green-200 blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-100 blur-3xl opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >

          <span className="text-primary-green font-semibold uppercase tracking-wider">
            Contact PlantPal
          </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-dark mt-4 leading-tight">
            We'd Love To Hear
            <br />
            From You
          </h1>

         <p className="mt-6 text-base sm:text-lg text-gray-600 leading-7 max-w-2xl mx-auto">
            Whether you have a question, feedback, or simply want to say
            hello, we're always happy to hear from fellow plant lovers.
          </p>

        </motion.div>

      </section>

      {/* ================= CONTACT ================= */}

      <section className="pb-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Contact Information */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
           className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg h-full"
          >

            <h2 className="text-3xl font-bold text-primary-dark mb-8">
              Get In Touch
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-primary-green text-white flex items-center justify-center">
                  <FaEnvelope />
                </div>

                <div>
                  <h4 className="font-bold text-primary-dark">
                    Email
                  </h4>

                  <p className="text-gray-600">
                    afsarasilvi44@gmail.com
                  </p>
                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-primary-green text-white flex items-center justify-center">
                  <FaPhoneAlt />
                </div>

                <div>
                  <h4 className="font-bold text-primary-dark">
                    Phone
                  </h4>

                  <p className="text-gray-600">
                    +880 1900-000000
                  </p>
                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-primary-green text-white flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h4 className="font-bold text-primary-dark">
                    Location
                  </h4>

                  <p className="text-gray-600">
                    Dhaka, Bangladesh
                  </p>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Contact Form */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-10 shadow-lg"
          >

            <h2 className="text-3xl font-bold text-primary-dark mb-8">
              Send a Message
            </h2>

            <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

  <div>
    <label className="block mb-2 font-semibold text-primary-dark">
      Full Name
    </label>

    <Input
      radius="lg"
      size="lg"
      variant="bordered"
      placeholder="John Doe"
      className="w-full"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />
  </div>

  <div>
    <label className="block mb-2 font-semibold text-primary-dark">
      Email Address
    </label>

    <Input
      type="email"
      radius="lg"
      size="lg"
      className="w-full"
      variant="bordered"
      placeholder="john@email.com"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
  </div>

  <div>
    <label className="block mb-2 font-semibold text-primary-dark">
      Subject
    </label>

    <Input
      radius="lg"
      size="lg"
      variant="bordered"
      className="w-full"
      placeholder="How can we help?"
      value={form.subject}
      onChange={(e) =>
        setForm({ ...form, subject: e.target.value })
      }
    />
  </div>

  <div>
    <label className="block mb-2 font-semibold text-primary-dark">
      Message
    </label>

    <textarea
      rows={4}
      className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none focus:border-primary-green transition"
      placeholder="Write your message..."
      value={form.message}
      onChange={(e) =>
        setForm({ ...form, message: e.target.value })
      }
    />
  </div>

  <Button
    type="submit"
    className="bg-primary-green text-white rounded-full px-10 font-semibold"
  >
    Send Message
  </Button>

</form>
          </motion.div>

        </div>

      </section>

      {/* ================= FAQ ================= */}

      <section className="bg-white py-24">

        <div className="max-w-5xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-4xl font-bold text-primary-dark mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600">
              Here are a few questions we often receive.
            </p>

          </motion.div>

          <div className="space-y-6">

            {[
              {
                q: "Is PlantPal free to use?",
                a: "Yes. Browsing plants, managing your collection, and using most features are completely free.",
              },
              {
                q: "Can I add my own plants?",
                a: "Absolutely! Logged-in users can contribute plants to the PlantPal community.",
              },
              {
                q: "Does PlantPal provide AI plant care?",
                a: "Yes. PlantPal AI can answer questions about watering, sunlight, soil, diseases, and general plant care.",
              },
            ].map((faq) => (
              <motion.div
                key={faq.q}
                whileHover={{ y: -4 }}
                className="bg-[#F9F6EE] rounded-2xl p-8 border border-green-100"
              >
                <h3 className="font-bold text-xl text-primary-dark mb-3">
                  {faq.q}
                </h3>

                <p className="text-gray-600 leading-7">
                  {faq.a}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}