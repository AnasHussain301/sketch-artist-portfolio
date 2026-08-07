"use client";

import { useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Mail,
  PenTool,
  MapPin,
} from "lucide-react";
import { FaInstagram, FaBehance } from "react-icons/fa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------------------------------------------------------------------- */
/* Corner registration marks — the symmetric device repeated on every edge */
/* ---------------------------------------------------------------------- */
function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const placement: Record<string, string> = {
    tl: "top-4 left-4 sm:top-6 sm:left-6",
    tr: "top-4 right-4 sm:top-6 sm:right-6 -scale-x-100",
    bl: "bottom-4 left-4 sm:bottom-6 sm:left-6 -scale-y-100",
    br: "bottom-4 right-4 sm:bottom-6 sm:right-6 -scale-x-100 -scale-y-100",
  };
  return (
    <div
      className={`pointer-events-none fixed z-50 hidden opacity-40 sm:block ${placement[position]}`}
      aria-hidden="true"
    >
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M0 10 V0 H10" stroke="#EAE4D6" strokeWidth="1" />
        <path d="M0 0 L9 9" stroke="#B34A32" strokeWidth="1" />
        <circle cx="3" cy="3" r="1.2" fill="#EAE4D6" />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Hero — a continuous-line eye study that draws itself on load           */
/* ---------------------------------------------------------------------- */
function DrawnEye() {
  const draw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, delay, ease: "easeInOut" }, opacity: { duration: 0.2, delay } },
    },
  });

  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 300 220" className="w-full" fill="none">
        {/* pencil tip that traces the brow stroke */}
        <motion.circle
          r="3.5"
          fill="#B34A32"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
          style={{ offsetPath: `path("M45,68 Q150,20 255,65")`, offsetRotate: "0deg" } as React.CSSProperties}
        />

        <motion.path
          d="M45,68 Q150,20 255,65"
          stroke="#EAE4D6"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={draw(0.1)}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M30,110 Q150,45 270,105"
          stroke="#EAE4D6"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={draw(0.6)}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M30,110 Q150,165 270,105"
          stroke="#EAE4D6"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={draw(0.9)}
          initial="hidden"
          animate="visible"
        />
        <motion.circle
          cx="150"
          cy="107"
          r="26"
          stroke="#B34A32"
          strokeWidth="2"
          variants={draw(1.3)}
          initial="hidden"
          animate="visible"
        />
        <motion.circle
          cx="150"
          cy="107"
          r="10"
          fill="#16140F"
          stroke="#EAE4D6"
          strokeWidth="1.5"
          variants={draw(1.6)}
          initial="hidden"
          animate="visible"
        />
        <motion.circle
          cx="143"
          cy="99"
          r="3.5"
          fill="#EAE4D6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.3 }}
        />

        {/* lashes */}
        {[
          "M55,100 L40,80",
          "M85,86 L76,64",
          "M120,76 L118,52",
          "M180,76 L184,52",
          "M215,86 L226,64",
          "M245,100 L262,82",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="#EAE4D6"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={draw(2.1 + i * 0.05)}
            initial="hidden"
            animate="visible"
          />
        ))}

        {/* cross-hatch shading under the eye */}
        {[
          "M55,150 L90,166",
          "M100,155 L138,172",
          "M148,153 L186,169",
          "M198,150 L234,164",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="#6E6A5E"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={draw(2.5 + i * 0.08)}
            initial="hidden"
            animate="visible"
          />
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Gallery — sketchbook pages pinned with masking tape                    */
/* ---------------------------------------------------------------------- */
const works = [
  {
    title: "Study in Charcoal",
    medium: "Charcoal on toned paper",
    year: "2026",
    rotate: -3,
    paths: [
      "M40,150 Q60,40 100,30 Q140,20 150,60 Q160,100 130,140 Q110,165 70,165 Q45,165 40,150 Z",
      "M75,55 Q90,45 105,55",
      "M60,90 L140,90",
    ],
  },
  {
    title: "Hands at Rest",
    medium: "Graphite, 4B–8B",
    year: "2025",
    rotate: 2,
    paths: [
      "M50,160 Q40,100 60,70 Q70,55 80,70 L82,110",
      "M82,110 L86,60 Q90,45 96,60 L96,112",
      "M96,112 L100,55 Q106,42 110,58 L112,114",
      "M112,114 L118,65 Q124,55 126,70 L124,120 Q140,140 120,165 Q90,175 60,165 Z",
    ],
  },
  {
    title: "Corner Bottle & Fruit",
    medium: "Ink line, still life",
    year: "2025",
    rotate: -1.5,
    paths: [
      "M90,30 L95,50 Q120,60 120,100 L120,150 Q120,165 100,165 L80,165 Q60,165 60,150 L60,100 Q60,60 85,50 L90,30 Z",
      "M40,150 Q35,130 55,125 Q60,145 55,160 Q45,162 40,150 Z",
      "M130,155 Q150,148 150,165 Q135,168 128,160 Z",
    ],
  },
  {
    title: "Alley Cat, Quick Study",
    medium: "Ballpoint, 6 minutes",
    year: "2026",
    rotate: 3,
    paths: [
      "M40,140 Q45,100 70,90 Q66,70 80,60 Q90,52 100,62 Q112,72 108,90 Q135,95 145,130 Q150,150 130,160 Q90,175 55,165 Q38,158 40,140 Z",
      "M75,80 L70,68",
      "M92,78 L96,64",
    ],
  },
  {
    title: "Botanical Study No. 4",
    medium: "Pencil, from life",
    year: "2025",
    rotate: -2,
    paths: [
      "M100,170 L100,60",
      "M100,120 Q60,110 55,75 Q90,80 100,110",
      "M100,100 Q140,88 148,55 Q112,62 100,95",
      "M100,60 Q90,45 100,30 Q110,45 100,60",
    ],
  },
  {
    title: "Self, Unfinished",
    medium: "Graphite, ongoing series",
    year: "2026",
    rotate: 1.5,
    paths: [
      "M70,50 Q100,25 130,50 Q140,80 130,110 Q125,140 100,150 Q75,140 70,110 Q60,80 70,50 Z",
      "M78,85 Q84,80 90,85",
      "M110,85 Q116,80 122,85",
      "M95,95 L95,110 Q95,116 102,116",
    ],
  },
];

function SketchCard({ work, index }: { work: (typeof works)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: work.rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
      className="group relative"
    >
      {/* masking tape */}
      <div className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-2 bg-paper-bright/80 shadow-sm" />

      <div className="torn-edge bg-paper p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
        <svg viewBox="0 0 190 190" className="w-full">
          {work.paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#2B2721"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: index * 0.08 + i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </svg>
        <div className="mt-3 border-t border-graphite/15 pt-3">
          <p className="font-display text-lg text-graphite">{work.title}</p>
          <p className="font-body text-xs uppercase tracking-[0.15em] text-graphite-soft">
            {work.medium} · {work.year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/* Process — a genuine sequence, so numbering is earned here              */
/* ---------------------------------------------------------------------- */
const steps = [
  { n: "01", title: "Observe", body: "Reference photos, live sittings, or a still life — I study proportion and light before the pencil touches paper." },
  { n: "02", title: "Block In", body: "Loose gesture lines establish structure. Nothing is precious yet; this stage is meant to be erased over." },
  { n: "03", title: "Build Value", body: "Layered graphite or charcoal, working dark to light, until the form holds up from across the room." },
  { n: "04", title: "Refine & Sign", body: "Final edge work, a fixative pass, and a signature in the corner — then it's ready for your wall." },
];

/* ---------------------------------------------------------------------- */
/* Contact form                                                           */
/* ---------------------------------------------------------------------- */
type FormState = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Tell me your name.";
    if (!form.email.trim()) next.email = "An email address, please.";
    else if (!EMAIL_REGEX.test(form.email.trim())) next.email = "That doesn't look like a valid email.";
    if (!form.message.trim()) next.message = "What would you like sketched?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      setNote("A couple of fields still need attention.");
      return;
    }
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "The message didn't go through.");
      setStatus("success");
      setNote("Message sent — I read every one and reply within a couple of days.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-paper/60">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={`w-full border-b bg-transparent px-1 py-2 font-body text-paper outline-none transition focus:border-sanguine ${
            errors.name ? "border-sanguine" : "border-paper/25"
          }`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-sanguine-soft">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-paper/60">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={`w-full border-b bg-transparent px-1 py-2 font-body text-paper outline-none transition focus:border-sanguine ${
            errors.email ? "border-sanguine" : "border-paper/25"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-sanguine-soft">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-paper/60">
          What are you picturing?
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`w-full resize-none border-b bg-transparent px-1 py-2 font-body text-paper outline-none transition focus:border-sanguine ${
            errors.message ? "border-sanguine" : "border-paper/25"
          }`}
          placeholder="A portrait, a pet study, a commission for a gift..."
        />
        {errors.message && <p className="mt-1 text-xs text-sanguine-soft">{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={status !== "sending" ? { x: 4 } : {}}
        className="mt-2 inline-flex items-center gap-2 border border-sanguine bg-sanguine/10 px-6 py-3 font-body text-sm uppercase tracking-[0.15em] text-paper transition hover:bg-sanguine/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>

      {status === "success" && <p className="text-sm text-paper/80">{note}</p>}
      {status === "error" && <p className="text-sm text-sanguine-soft">{note}</p>}
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* Page                                                                    */
/* ---------------------------------------------------------------------- */
export default function ArtistPortfolio() {
  const { scrollYProgress } = useScroll();
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <motion.div
        style={{ scaleX: barScale }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-sanguine"
      />

      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      {/* Nav */}
      <header className="relative z-40 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-display text-lg tracking-wide">Studio Sketchbook</span>
        <nav className="hidden gap-8 font-body text-sm uppercase tracking-[0.15em] text-paper/70 md:flex">
          <a href="#work" className="transition hover:text-sanguine-soft">Work</a>
          <a href="#process" className="transition hover:text-sanguine-soft">Process</a>
          <a href="#about" className="transition hover:text-sanguine-soft">About</a>
          <a href="#contact" className="transition hover:text-sanguine-soft">Commission</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-8 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-sanguine-soft">
            Portrait &amp; Line Artist
          </p>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] italic leading-[1.05]">
            Every likeness starts as a blank sheet and a held breath.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-8 text-paper/75">
            I draw people, hands, and quiet still lifes in graphite and charcoal —
            slow, observational work for commissions, gifts, and studies.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-paper px-6 py-3 font-body text-sm uppercase tracking-[0.15em] text-ink transition hover:bg-paper-bright"
            >
              See the sketchbook
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.15em] text-paper/80 transition hover:text-sanguine-soft"
            >
              Commission a piece <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid-paper rounded-sm border border-paper/10 p-10">
            <DrawnEye />
          </div>
          <p className="mt-4 text-center font-hand text-xl text-paper/50">
            drawn live, every time you visit
          </p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section id="work" className="relative mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-sanguine-soft">Sketchbook</p>
          <h2 className="font-display text-3xl italic sm:text-4xl">Recent pages, pinned as they are.</h2>
          <p className="mt-4 font-body text-paper/70">
            Studies and commissions, unedited. Swap these placeholder studies for
            photographs of your own work — the pinned-page frame is built to hold any image.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <SketchCard key={work.title} work={work} index={i} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="grid-paper relative border-y border-paper/10 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-sanguine-soft">Method</p>
          <h2 className="mb-14 font-display text-3xl italic sm:text-4xl">From first line to signature.</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-4xl italic text-sanguine/70">{step.n}</span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-paper/65">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / materials */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-sanguine-soft">On the desk</p>
            <h2 className="font-display text-3xl italic sm:text-4xl">Materials &amp; hand.</h2>
            <p className="mt-5 font-body leading-7 text-paper/75">
              Every piece is worked traditionally, then photographed under
              even light — no digital touch-ups to the drawing itself. What
              you commission is what left the easel.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-paper/15 pt-6 font-body text-sm text-paper/70 sm:grid-cols-3"
          >
            {[
              "Graphite, 2H–8B",
              "Vine & compressed charcoal",
              "Sanguine conté",
              "Toned & bristol paper",
              "Kneaded erasers",
              "Fixative, matte",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <PenTool className="h-3.5 w-3.5 text-sanguine-soft" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative border-t border-paper/10 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="mb-14 font-display text-3xl italic sm:text-4xl">Notes from the frame shop.</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { quote: "The likeness of my grandmother stopped my mother mid-sentence when she opened it.", name: "— commissioned portrait" },
              { quote: "Every value in that charcoal piece is doing work. Nothing wasted.", name: "— gallery visitor" },
              { quote: "Turned a blurry phone photo into something we'll keep for decades.", name: "— pet portrait client" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-paper p-6 text-graphite shadow-[0_14px_30px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute -top-3 left-6 h-5 w-12 -rotate-3 bg-paper-bright/80" />
                <p className="font-hand text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-body text-xs uppercase tracking-[0.15em] text-graphite-soft">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="grid-paper border-t border-paper/10 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-sanguine-soft">Commission</p>
            <h2 className="font-display text-3xl italic sm:text-4xl">Start with a photo and a few words.</h2>
            <p className="mt-5 max-w-md font-body leading-7 text-paper/70">
              Tell me who or what you'd like sketched, and any reference
              images you have. I'll reply with sizing, paper, and timeline options.
            </p>
            <div className="mt-8 flex flex-col gap-3 font-body text-sm text-paper/70">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sanguine-soft" /> studio@example.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sanguine-soft" /> Open for commissions worldwide
              </span>
            </div>
            <div className="mt-8 flex gap-4 text-paper/60">
              <a href="#" aria-label="Instagram" className="transition hover:text-sanguine-soft"><FaInstagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Behance" className="transition hover:text-sanguine-soft"><FaBehance className="h-5 w-5" /></a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-paper/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-paper/40">
            © {new Date().getFullYear()} Studio Sketchbook
          </p>
          <p className="font-hand text-2xl text-paper/50">drawn by hand, every time</p>
        </div>
      </footer>
    </div>
  );
}
