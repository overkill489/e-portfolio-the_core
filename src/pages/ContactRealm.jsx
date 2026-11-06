import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  RadioTower,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import SignalVisualizer from "../components/SignalVisualizer";
import { contactChannels, contactLinks } from "../data/contact";
import emailjs from "@emailjs/browser";

const EMAIL = "overkill.489@gmail.com";

export default function ContactRealm({ onBack }) {
  const [selectedChannel, setSelectedChannel] = useState("career");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState("");

  const activeChannel = contactChannels.find(
    (channel) => channel.id === selectedChannel,
  );

  const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
    activeChannel.subject,
  )}&body=${encodeURIComponent(activeChannel.body)}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const selectChannel = (id) => {
    setSelectedChannel(id);
    setCopied(false);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setSendStatus("");

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          reply_to: form.email.trim(),
          inquiry_type: activeChannel.label,
          subject: activeChannel.subject,
          message: form.message.trim(),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      console.log("EmailJS success:", result.status, result.text);

      setSendStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS failed:", error);
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-cyan-400">
              <RadioTower size={18} />
              REALM 05 / COMMUNICATION SYSTEMS
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              THE SIGNAL<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
              Every great connection starts with a conversation. Whether it's an
              opportunity, collaboration, or a simple hello, I'm always
              interested in connecting with people who build interesting things.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
            COMMUNICATIONS ONLINE
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,1fr)]">
          <div className="min-w-0">
            <div className="overflow-hidden border border-cyan-500/20 bg-[#08111a]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
                <p className="text-[10px] tracking-[0.25em] text-cyan-400">
                  SIGNAL TRANSMISSION
                </p>

                <span className="text-[10px] tracking-wider text-gray-500">
                  CORE COMMS / 05
                </span>
              </div>

              <SignalVisualizer activeChannel={activeChannel} />

              <div className="grid grid-cols-3 border-t border-white/10">
                <div className="border-r border-white/10 p-4 text-center">
                  <p className="text-[9px] tracking-wider text-gray-500">
                    STATUS
                  </p>
                  <p className="mt-2 text-xs text-cyan-300">READY</p>
                </div>

                <div className="border-r border-white/10 p-4 text-center">
                  <p className="text-[9px] tracking-wider text-gray-500">
                    CHANNEL
                  </p>
                  <p className="mt-2 text-xs text-cyan-300">
                    {activeChannel.number}
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-[9px] tracking-wider text-gray-500">
                    METHOD
                  </p>
                  <p className="mt-2 text-xs text-cyan-300">EMAIL</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-white/10 bg-white/[0.02] p-6">
              <p className="mb-5 text-[10px] tracking-[0.25em] text-cyan-400">
                SELECT TRANSMISSION TYPE
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {contactChannels.map((channel) => {
                  const selected = selectedChannel === channel.id;

                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() => selectChannel(channel.id)}
                      aria-pressed={selected}
                      className={`min-w-0 cursor-pointer border p-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10"
                          : "border-white/10 hover:border-cyan-400/40"
                      }`}
                    >
                      <span className="text-[10px] text-cyan-500">
                        {channel.number}
                      </span>

                      <p
                        className={`mt-4 text-[10px] font-semibold leading-5 tracking-wider ${
                          selected ? "text-cyan-300" : "text-gray-400"
                        }`}
                      >
                        {channel.label}
                      </p>

                      <div
                        className={`mt-4 h-1 w-8 ${
                          selected ? "bg-cyan-400" : "bg-white/10"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="relative flex-1 overflow-hidden border border-cyan-500/20 bg-[#08111a] p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/[0.06] blur-3xl" />

              <div className="relative">
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-cyan-400">
                    TRANSMISSION DETAILS
                  </span>

                  <Mail size={18} className="text-cyan-400" />
                </div>

                <div
                  key={activeChannel.id}
                  className="motion-safe:animate-[signal-reveal_450ms_ease-out_both]"
                >
                  <p className="mb-4 text-[10px] tracking-[0.2em] text-gray-500">
                    {activeChannel.label}
                  </p>

                  <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {activeChannel.title}
                  </h2>

                  <p className="mt-6 max-w-lg text-sm leading-8 text-gray-400">
                    {activeChannel.description}
                  </p>
                </div>

                <div className="my-9 h-px bg-white/10" />

                <p className="mb-3 text-[10px] tracking-[0.2em] text-gray-500">
                  DIRECT COMMUNICATION ADDRESS
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-black/20 p-4">
                  <span className="break-all text-sm text-white">{EMAIL}</span>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex shrink-0 cursor-pointer items-center gap-2 text-cyan-400 transition-colors hover:text-white"
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                    <span className="text-[10px]">
                      {copied ? "COPIED" : "COPY"}
                    </span>
                  </button>
                </div>

                {sendStatus === "success" ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-8 flex min-h-[420px] flex-col items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.04] p-8 text-center motion-safe:animate-[transmission-success_700ms_ease-out_both]"
                  >
                    <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-cyan-400/20 motion-safe:animate-ping" />

                      <div className="absolute inset-3 rounded-full border border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.15)]" />

                      <CheckCircle2
                        size={56}
                        strokeWidth={1.5}
                        className="relative z-10 text-cyan-400"
                      />
                    </div>

                    <p className="mb-4 text-[10px] tracking-[0.35em] text-cyan-400">
                      SIGNAL CONFIRMED / 200 OK
                    </p>

                    <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      TRANSMISSION
                      <span className="block text-cyan-400">SUCCESSFUL.</span>
                    </h3>

                    <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
                      Your message has been submitted successfully. Thank you
                      for reaching out! I'll get back to you as soon as I can.
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      TRANSMISSION COMPLETE
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSendStatus("");
                        setForm({
                          name: "",
                          email: "",
                          message: "",
                        });
                      }}
                      className="mt-10 cursor-pointer border border-cyan-400/50 px-6 py-4 text-xs tracking-[0.2em] text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                    >
                      SEND ANOTHER TRANSMISSION
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSend} className="mt-8 space-y-4">
                    <div>
                      <label
                        htmlFor="signal-name"
                        className="mb-3 block text-[10px] tracking-[0.2em] text-cyan-400"
                      >
                        YOUR NAME
                      </label>

                      <input
                        id="signal-name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        maxLength={100}
                        autoComplete="name"
                        className="w-full border border-cyan-500/20 bg-black/40 p-4 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="signal-email"
                        className="mb-3 block text-[10px] tracking-[0.2em] text-cyan-400"
                      >
                        EMAIL ADDRESS
                      </label>

                      <input
                        id="signal-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        maxLength={254}
                        autoComplete="email"
                        className="w-full border border-cyan-500/20 bg-black/40 p-4 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="signal-message"
                        className="mb-3 block text-[10px] tracking-[0.2em] text-cyan-400"
                      >
                        TRANSMISSION MESSAGE
                      </label>

                      <textarea
                        id="signal-message"
                        rows={5}
                        placeholder="Write your message..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                        minLength={10}
                        maxLength={3000}
                        className="w-full resize-y border border-cyan-500/20 bg-black/40 p-4 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full cursor-pointer items-center justify-center gap-3 bg-cyan-400 p-5 font-bold tracking-[0.15em] text-black transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={17} />
                      {sending ? "TRANSMITTING..." : "SEND TRANSMISSION"}
                    </button>

                    {sendStatus === "error" && (
                      <p
                        role="alert"
                        className="text-center text-sm text-red-400"
                      >
                        Transmission failed. Please try again.
                      </p>
                    )}
                  </form>
                )}

                <p className="mt-4 text-center text-xs leading-6 text-gray-500">
                  Opens your email application with a prepared subject and
                  message.
                </p>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-7">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck size={18} className="text-cyan-400" />
                <h3 className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
                  EXPLORE MY WORK
                </h3>
              </div>

              <div className="space-y-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 border border-white/10 p-4 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/[0.04] focus-visible:outline-2 focus-visible:outline-cyan-300"
                  >
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-white">
                        {link.label}
                      </p>

                      <p className="mt-2 text-xs text-gray-500">{link.value}</p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-gray-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.2em] text-gray-500 sm:flex-row">
          <span>THE CORE / COMMUNICATIONS SYSTEM</span>
          <span>CONNECTION ESTABLISHED THROUGH CONVERSATION.</span>
        </div>
      </div>
    </section>
  );
}
