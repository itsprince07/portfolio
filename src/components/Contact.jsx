import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_1w584qz", // 🔹 replace with EmailJS Service ID
        "template_tm1civu", // 🔹 replace with EmailJS Template ID
        formRef.current,
        "SuTejASEbVjeKCH2a" // 🔹 replace with EmailJS Public Key
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);
          formRef.current.reset();
          setTimeout(() => setSent(false), 4000);
        },
        (error) => {
          setLoading(false);
          alert("❌ Something went wrong: " + error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative min-h-[100vh] grid place-items-center px-6 py-24 
                 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-400 overflow-hidden"
    >
      {/* Floating Clouds */}
      <motion.div
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute top-16 left-10 w-64 h-32 bg-white/70 rounded-[60%] blur-2xl opacity-70"
      />
      <motion.div
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 28, repeat: Infinity }}
        className="absolute top-32 right-20 w-72 h-36 bg-white/70 rounded-[70%] blur-2xl opacity-70"
      />

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="relative z-10 w-full max-w-3xl rounded-3xl 
                   bg-gradient-to-tr from-white/40 to-white/20 
                   border border-white/20 backdrop-blur-2xl 
                   p-10 shadow-2xl text-sky-900"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-sky-800 drop-shadow-lg">
          Contact <span className="text-sky-600">Me</span>
        </h2>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-sky-900 font-medium">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-sky-600" />
            <a href="mailto:admin@pyncore.com" className="hover:underline">
              admin@pyncore.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-sky-600" />
            <a
              href="https://wa.me/917398293231"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              +91 73982 93231
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          whileHover={{ scale: 1.01 }}
          className="grid gap-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="from_name"
              required
              placeholder="Your Name"
              className="px-4 py-3 rounded-xl bg-white/70 border border-sky-200 
                         outline-none focus:border-sky-400 shadow-inner"
            />
            <input
              name="from_email"
              required
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 rounded-xl bg-white/70 border border-sky-200 
                         outline-none focus:border-sky-400 shadow-inner"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows={5}
            className="mt-2 w-full px-4 py-3 rounded-xl bg-white/70 border 
                       border-sky-200 outline-none focus:border-sky-400 shadow-inner"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-2xl 
                       bg-gradient-to-r from-sky-500 to-sky-600 
                       text-white font-semibold shadow-lg border border-sky-700
                       hover:from-sky-600 hover:to-sky-700 transition-all disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Send Message
              </>
            )}
          </motion.button>

          {sent && (
            <p className="text-center mt-3 text-green-700 font-semibold">
              ✅ Message sent successfully!
            </p>
          )}
        </motion.form>
      </motion.div>

      {/* Decorative Hills */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg
          className="w-full h-40 md:h-56"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#34d399"
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,234.7C672,235,768,181,864,160C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
