import { useState, useEffect, useRef } from "react";
import upgradePlan from "./assets/upgrade-plan.png";
import wrongCode from "./assets/wrong-code.png";
import acceptRsvp from "./assets/accept-rsvp.png";
import aiChatbot from "./assets/AI-chatbot.png";
import aiChecklist from "./assets/ai-checklist.png";
import aiSugg from "./assets/ai-sugg.png";
import aiTab from "./assets/AI-tab.png";
import aiTabResult from "./assets/AI-tab-result.png";
import autoAssign from "./assets/auto-assign.png";
import calendar from "./assets/calander.png";
import correctCode from "./assets/correct-code.png";
import createEvent from "./assets/create-event.png";
import dashboard from "./assets/dashboard.png";
import enterCode from "./assets/enter-code.png";
import eventsTab from "./assets/events-tab.png";
import expense from "./assets/expense.png";
import pricing from "./assets/pricing.png";
import profile from "./assets/profile.png";
import reg from "./assets/reg.png";
import rsvp from "./assets/rsvp.png";
import settings from "./assets/settings.png";
import step2 from "./assets/step-2.png";
import summSug from "./assets/summ-sug.png";
import timeline from "./assets/timeline.png";

const NAVY = "#0B1D3A";
const NAVY_LIGHT = "#122347";
const NAVY_MID = "#1B3060";
const WHITE = "#FFFFFF";
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const TEAL = "#4ECDC4";
const SLATE = "#8FA3BF";

const slides = [
  { id: 1, type: "intro" },
  { id: 2, type: "target" },
  { id: 3, type: "techstack" },
  { id: 4, type: "flow" },
  { id: 5, type: "features" },
  { id: 6, type: "ai" },
  { id: 7, type: "additional" },
  { id: 8, type: "challenges" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    setInView(true);
  }, []);
  return inView;
}

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

function SlideWrapper({ children, active, index }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0) scale(1)" : "translateX(60px) scale(0.97)",
      transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: active ? "all" : "none",
      overflow: "hidden",
    }}>
      {children}
    </div>
  );
}

function GlowOrb({ x, y, color, size = 300, opacity = 0.18 }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      width: size, height: size,
      borderRadius: "50%",
      background: color,
      filter: `blur(${size * 0.4}px)`,
      opacity,
      pointerEvents: "none",
      zIndex: 0,
    }} />
  );
}

function GridLines() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none", zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Tag({ children, color = GOLD }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px",
      border: `1px solid ${color}40`,
      borderRadius: 20, fontSize: 11, fontWeight: 600,
      color, background: `${color}10`,
      letterSpacing: "0.08em", textTransform: "uppercase",
    }}>{children}</span>
  );
}

function Card({ children, style = {}, glint = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,${hovered ? 0.15 : 0.07})`,
        borderRadius: 16, padding: "20px 22px",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.15)",
        position: "relative", overflow: "hidden",
        ...style,
      }}>
      {glint && hovered && (
        <div style={{
          position: "absolute", top: 0, left: "-100%",
          width: "60%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          animation: "glint 0.6s ease forwards",
        }} />
      )}
      {children}
    </div>
  );
}

// SLIDE 1: Intro
function IntroSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);
  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="-100px" y="-80px" color={NAVY_MID} size={500} opacity={0.8} />
      <GlowOrb x="60%" y="50%" color={GOLD} size={350} opacity={0.12} />
      <GlowOrb x="70%" y="-50px" color={TEAL} size={250} opacity={0.1} />

      {/* Decorative arc */}
      <svg style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", opacity: 0.1 }} width="500" height="500" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="220" fill="none" stroke={GOLD} strokeWidth="1" strokeDasharray="8 12" />
        <circle cx="250" cy="250" r="180" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="140" fill="none" stroke={TEAL} strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, padding: "0 60px", textAlign: "left" }}>
        <div style={{
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
          transition: "all 0.6s ease 0.1s", marginBottom: 16,
        }}>
          <Tag>Full-Stack Event Platform</Tag>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(52px, 7vw, 88px)",
          fontWeight: 900, color: WHITE, margin: 0,
          lineHeight: 1.0, letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(30px)",
          transition: "all 0.7s ease 0.25s",
        }}>
          Plan<span style={{ color: GOLD }}>It</span>
        </h1>

        <div style={{
          width: 60, height: 3,
          background: `linear-gradient(90deg, ${GOLD}, ${TEAL})`,
          borderRadius: 2, margin: "20px 0 24px",
          opacity: show ? 1 : 0, transition: "all 0.6s ease 0.4s",
        }} />

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18, color: SLATE, lineHeight: 1.7,
          margin: "0 0 32px", maxWidth: 500,
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
          transition: "all 0.6s ease 0.5s",
        }}>
          AI-powered event planning platform with smart guest management, budget tracking, seating, timelines, and seamless RSVP flows.
        </p>

        <div style={{
          display: "flex", gap: 40,
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
          transition: "all 0.6s ease 0.65s",
        }}>
          {[
            { label: "Core Features", value: "10+", icon: "✦" },
            { label: "AI-Powered", value: "6", icon: "◈" },
            { label: "User Roles", value: "3", icon: "◉" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: GOLD, lineHeight: 1 }}>
                {s.icon} {active ? <AnimatedCounter value={parseInt(s.value)} suffix={s.value.includes("+") ? "+" : ""} /> : "0"}
              </div>
              <div style={{ fontSize: 12, color: SLATE, marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 44, padding: "20px 24px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: `3px solid ${GOLD}`,
          borderRadius: 10,
          opacity: show ? 1 : 0, transition: "all 0.6s ease 0.8s",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: SLATE, margin: 0 }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>Objective:</span> Eliminate the chaos of manual event planning by centralizing every workflow into one intelligent, beautiful platform — saving hours of coordination time for every event.
          </p>
        </div>
      </div>
    </div>
  );
}

// SLIDE 2: Target Users
function TargetSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const users = [
    { icon: "🎓", role: "Event Hosts", color: GOLD, needs: "Create & manage full events end-to-end", benefit: "Dashboard, checklists, AI planning, budgets" },
    { icon: "👥", role: "Guests", color: TEAL, needs: "Seamless RSVP & event info access", benefit: "Public RSVP page, QR check-in, seating info" },
    { icon: "⚙️", role: "Admins", color: SLATE, needs: "Platform management & control", benefit: "Premium upgrades, user management, analytics" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="-80px" y="60%" color={TEAL} size={400} opacity={0.1} />
      <GlowOrb x="70%" y="-60px" color={GOLD} size={300} opacity={0.1} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(15px)", transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color={TEAL}>02 — Who Uses PlanIt</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 6px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)", transition: "all 0.5s ease 0.2s",
        }}>Target <span style={{ color: GOLD }}>Users</span></h2>
        <p style={{ color: SLATE, fontSize: 15, margin: "0 0 36px", opacity: show ? 1 : 0, transition: "all 0.5s ease 0.3s" }}>
          PlanIt serves three distinct user groups, each benefiting from the platform's unique capabilities.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {users.map((u, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(30px)",
              transition: `all 0.6s ease ${0.35 + i * 0.15}s`,
            }}>
              <Card glint style={{ height: "100%" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${u.color}18`, border: `1px solid ${u.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 16,
                }}>{u.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: u.color, margin: "0 0 12px", fontWeight: 700 }}>{u.role}</h3>
                <div style={{ fontSize: 12, color: SLATE, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>User Need</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", margin: "0 0 16px", lineHeight: 1.6 }}>{u.needs}</p>
                <div style={{ height: 1, background: `${u.color}20`, margin: "12px 0" }} />
                <div style={{ fontSize: 12, color: SLATE, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>How PlanIt Helps</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: `${u.color}CC`, margin: 0, lineHeight: 1.6 }}>{u.benefit}</p>
              </Card>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.9s",
        }}>
          {["One platform, three experiences", "Role-based access control", "Tailored UX per user type", "Premium tier for power users"].map((t, i) => (
            <div key={i} style={{
              padding: "7px 16px", borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 12, color: SLATE, fontFamily: "'DM Sans', sans-serif",
            }}>✦ {t}</div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 24 }}>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1s`,
          }}>
            <img src={profile} alt="User Profile" style={{ width: "100%", minHeight: "280px", borderRadius: 10, border: `1px solid ${GOLD}40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1.1s`,
          }}>
            <img src={pricing} alt="Pricing" style={{ width: "100%", minHeight: "280px", borderRadius: 10, border: `1px solid ${TEAL}40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1.2s`,
          }}>
            <img src={settings} alt="Settings" style={{ width: "100%", minHeight: "280px", borderRadius: 10, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// SLIDE 3: Tech Stack
function TechStackSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const categories = [
    {
      label: "Frontend", color: TEAL,
      techs: [
        { name: "React + TypeScript", why: "Type-safe, component-driven UI" },
        { name: "Vite", why: "Lightning-fast dev & build" },
        { name: "Tailwind CSS", why: "Rapid, consistent styling" },
        { name: "Framer Motion", why: "Smooth, expressive animations" },
      ]
    },
    {
      label: "Backend", color: GOLD,
      techs: [
        { name: "Node.js + Express", why: "Scalable REST API server" },
        { name: "MongoDB + Mongoose", why: "Flexible document-based storage" },
        { name: "JWT Auth", why: "Stateless, secure authentication" },
      ]
    },
    {
      label: "AI & Tools", color: "#A78BFA",
      techs: [
        { name: "OpenRouter API", why: "Multi-model AI access layer" },
        { name: "Cypress", why: "End-to-end test coverage" },
        { name: "In-Memory MongoDB", why: "Zero-setup demo mode" },
      ]
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="60%" y="70%" color={GOLD} size={350} opacity={0.1} />
      <GlowOrb x="-60px" y="20%" color="#A78BFA" size={300} opacity={0.1} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(15px)", transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color="#A78BFA">03 — Technologies</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 32px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Tech <span style={{ color: GOLD }}>Stack</span></h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {categories.map((cat, ci) => (
            <div key={ci} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(30px)",
              transition: `all 0.6s ease ${0.3 + ci * 0.15}s`,
            }}>
              <Card style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 6, height: 28, background: cat.color, borderRadius: 3 }} />
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cat.techs.map((t, ti) => (
                    <div key={ti} style={{
                      padding: "10px 14px",
                      background: `${cat.color}0A`,
                      border: `1px solid ${cat.color}20`,
                      borderRadius: 10,
                    }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: WHITE, marginBottom: 3 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: SLATE }}>{t.why}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20, padding: "14px 20px",
          background: `${GOLD}10`, border: `1px solid ${GOLD}25`,
          borderRadius: 12, display: "flex", alignItems: "center", gap: 16,
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.85s",
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: SLATE, margin: 0 }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>Why this stack?</span> — TypeScript + React ensures reliability. Express + MongoDB gives API flexibility. OpenRouter unlocks multi-model AI without vendor lock-in.
          </p>
        </div>
      </div>
    </div>
  );
}

// SLIDE 4: Website Flow
function FlowSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const steps = [
    { num: "01", title: "Visit PlanIt", sub: "Landing page — explore features & pricing", icon: "🌐", color: TEAL },
    { num: "02", title: "Sign Up / Login", sub: "Register or sign in, JWT token issued", icon: "🔐", color: GOLD },
    { num: "03", title: "Create Event", sub: "Name, date, type, guests — full setup wizard", icon: "📅", color: "#A78BFA" },
    { num: "04", title: "Manage Everything", sub: "Guests, budget, checklist, seating, timeline", icon: "⚙️", color: TEAL },
    { num: "05", title: "AI Processes", sub: "OpenRouter analyzes data, returns insights", icon: "🤖", color: GOLD },
    { num: "06", title: "RSVP & Check-In", sub: "Guests get QR code; scan to check in live", icon: "✅", color: "#A78BFA" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="50%" y="50%" color={TEAL} size={500} opacity={0.07} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color={TEAL}>04 — User Journey</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 32px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Main Website <span style={{ color: GOLD }}>Flow</span></h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1fr 1fr", gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px) scale(0.96)",
              transition: `all 0.55s ease ${0.3 + i * 0.1}s`,
            }}>
              <Card glint>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    minWidth: 42, height: 42, borderRadius: 10,
                    background: `${s.color}18`, border: `1px solid ${s.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: s.color, fontWeight: 700, letterSpacing: "0.1em" }}>{s.num}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: WHITE }}>{s.title}</span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: SLATE, margin: 0, lineHeight: 1.5 }}>{s.sub}</p>
                  </div>
                </div>
                {i < steps.length - 1 && i % 3 !== 2 && (
                  <div style={{
                    position: "absolute", right: -9, top: "50%", transform: "translateY(-50%)",
                    color: s.color, fontSize: 14, opacity: 0.5, zIndex: 2,
                  }}>→</div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20, display: "flex", alignItems: "center", gap: 8,
          opacity: show ? 1 : 0, transition: "all 0.5s ease 1s",
        }}>
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, ${TEAL}, ${GOLD}, #A78BFA)`, borderRadius: 1, opacity: 0.3 }} />
          <span style={{ fontSize: 12, color: SLATE, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>Complete end-to-end flow • Frontend ↔ REST API ↔ MongoDB ↔ OpenRouter AI</span>
          <div style={{ flex: 1, height: 2, background: `linear-gradient(90deg, #A78BFA, ${GOLD}, ${TEAL})`, borderRadius: 1, opacity: 0.3 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateX(-20px)",
            transition: `all 0.6s ease 1.2s`,
          }}>
            <img src={createEvent} alt="Create Event" style={{ width: "100%", minHeight: "300px", borderRadius: 12, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateX(20px)",
            transition: `all 0.6s ease 1.3s`,
          }}>
            <img src={eventsTab} alt="Events Tab" style={{ width: "100%", minHeight: "300px", borderRadius: 12, border: `1px solid ${TEAL}40`, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// SLIDE 5: Dashboard
function DashboardSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const metrics = [
    { label: "Total Guests", value: "142", color: TEAL, icon: "👥" },
    { label: "Budget Used", value: "68%", color: GOLD, icon: "💰" },
    { label: "Tasks Done", value: "12/15", color: "#F97316", icon: "✅" },
    { label: "Timeline", value: "On Track", color: "#A78BFA", icon: "⏱️" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="70%" y="30%" color={GOLD} size={320} opacity={0.1} />
      <GlowOrb x="-40px" y="60%" color={TEAL} size={280} opacity={0.09} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color={GOLD}>05 — Event Dashboard</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 28px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Real-Time <span style={{ color: GOLD }}>Dashboard</span></h2>
        <p style={{ color: SLATE, fontSize: 15, margin: "0 0 32px", opacity: show ? 1 : 0, transition: "all 0.5s ease 0.3s" }}>
          Central hub for event hosts — monitor guests, budget, tasks, and timeline progress at a glance. Live updates ensure you're always in control.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
              transition: `all 0.55s ease ${0.3 + i * 0.09}s`,
            }}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: m.color, marginBottom: 6 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: SLATE, letterSpacing: "0.06em", textTransform: "uppercase" }}>{m.label}</div>
              </Card>
            </div>
          ))}
        </div>

        <div style={{
          opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
          transition: `all 0.55s ease 1s`,
        }}>
          <img src={dashboard} alt="Dashboard" style={{ width: "100%", minHeight: "320px", borderRadius: 12, border: `1px solid ${GOLD}40`, objectFit: "cover" }} />
        </div>

        <div style={{
          marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12,
          opacity: show ? 1 : 0, transition: "all 0.5s ease 1.2s",
        }}>
          {[
            "Live guest count & RSVP status",
            "Budget breakdown by category",
            "Checklist completion progress",
            "Day-of timeline milestones"
          ].map((t, i) => (
            <div key={i} style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 12, color: SLATE, fontFamily: "'DM Sans', sans-serif",
              textAlign: "center"
            }}>✦ {t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SLIDE 6: Core Features
function FeaturesSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const features = [
    { icon: "📊", name: "Event Dashboard", desc: "Live stats: guests, budget, tasks, timeline progress at a glance", color: GOLD },
    { icon: "👥", name: "Guest Management", desc: "Groups, RSVP tracking, status filters, bulk actions", color: TEAL },
    { icon: "💰", name: "Budget Tracker", desc: "Expense categories, real-time totals, overspend alerts", color: "#F97316" },
    { icon: "✅", name: "Checklist System", desc: "Auto-generated tasks, due dates, completion tracking", color: "#A78BFA" },
    { icon: "🪑", name: "Seating Planner", desc: "Drag-and-drop table assignments, visual layout builder", color: TEAL },
    { icon: "⏱️", name: "Timeline Builder", desc: "Day-of schedule with ordered milestones and time slots", color: GOLD },
    { icon: "📱", name: "Public RSVP Page", desc: "Shareable link + QR code for contactless check-in", color: "#F97316" },
    { icon: "⭐", name: "Premium Upgrade", desc: "Unlimited AI credits, advanced features, priority access", color: "#A78BFA" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "36px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="80%" y="20%" color={GOLD} size={300} opacity={0.1} />
      <GlowOrb x="-50px" y="70%" color={TEAL} size={280} opacity={0.09} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color={GOLD}>06 — Core Capabilities</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 28px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Core <span style={{ color: GOLD }}>Features</span></h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
              transition: `all 0.55s ease ${0.3 + i * 0.07}s`,
            }}>
              <Card glint style={{ padding: "16px 18px" }}>
                <div style={{
                  fontSize: 24, marginBottom: 12,
                  width: 44, height: 44, borderRadius: 10,
                  background: `${f.color}15`, border: `1px solid ${f.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: f.color, margin: "0 0 6px" }}>{f.name}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: SLATE, margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </Card>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
            transition: `all 0.55s ease 0.8s`,
          }}>
            <img src={dashboard} alt="Dashboard" style={{ width: "100%", minHeight: "200px", borderRadius: 10, border: `1px solid ${GOLD}40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
            transition: `all 0.55s ease 0.9s`,
          }}>
            <img src={expense} alt="Budget Expense" style={{ width: "100%", minHeight: "200px", borderRadius: 10, border: `1px solid #F9731640`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
            transition: `all 0.55s ease 1s`,
          }}>
            <img src={rsvp} alt="RSVP Page" style={{ width: "100%", minHeight: "200px", borderRadius: 10, border: `1px solid ${TEAL}40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
            transition: `all 0.55s ease 1.1s`,
          }}>
            <img src={timeline} alt="Timeline" style={{ width: "100%", minHeight: "200px", borderRadius: 10, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// SLIDE 6: AI Features
function AISlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const aiFeatures = [
    { icon: "💡", title: "Budget Analysis", desc: "AI reviews your spending, flags overspend, suggests reallocation across categories", model: "OpenRouter" },
    { icon: "⚠️", title: "Risk Detection", desc: "Identifies planning gaps, overdue tasks, and potential day-of conflicts proactively", model: "OpenRouter" },
    { icon: "📝", title: "Smart Suggestions", desc: "Context-aware recommendations for checklists, vendors, and timelines", model: "OpenRouter" },
    { icon: "🤖", title: "AI Assistant", desc: "Global chat interface — ask anything about your event, get instant answers", model: "OpenRouter" },
    { icon: "🎯", title: "AI Insights Panel", desc: "Per-event intelligence tab surfacing key metrics and action items", model: "OpenRouter" },
    { icon: "⚡", title: "Credit System", desc: "Free tier with credits; Premium unlocks unlimited AI usage across all features", model: "Platform" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="50%" y="-60px" color="#A78BFA" size={400} opacity={0.12} />
      <GlowOrb x="10%" y="70%" color={GOLD} size={280} opacity={0.09} />

      {/* Decorative AI circuit lines */}
      <svg style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.05, pointerEvents: "none" }} width="300" height="300" viewBox="0 0 300 300">
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx="300" cy="300" r={50 + i * 45} fill="none" stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="3 6" />
        ))}
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color="#A78BFA">07 — Artificial Intelligence</Tag>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
            color: WHITE, margin: 0, letterSpacing: "-0.02em",
            opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
          }}>AI <span style={{ color: GOLD }}>Features</span></h2>
          <span style={{
            padding: "4px 12px", borderRadius: 20,
            background: "#A78BFA20", border: "1px solid #A78BFA40",
            fontSize: 12, color: "#A78BFA", fontFamily: "'DM Sans', sans-serif",
            opacity: show ? 1 : 0, transition: "all 0.5s ease 0.3s",
          }}>Powered by OpenRouter</span>
        </div>
        <p style={{ color: SLATE, fontSize: 14, margin: "0 0 28px", opacity: show ? 1 : 0, transition: "all 0.5s ease 0.3s" }}>
          OpenRouter provides unified access to multiple AI models, enabling PlanIt to deliver intelligent assistance without locking into a single provider.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {aiFeatures.map((f, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
              transition: `all 0.55s ease ${0.4 + i * 0.09}s`,
            }}>
              <Card glint style={{ borderTop: `2px solid #A78BFA30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: WHITE }}>{f.title}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: SLATE, margin: "0 0 12px", lineHeight: 1.55 }}>{f.desc}</p>
                <Tag color="#A78BFA">{f.model}</Tag>
              </Card>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1.1s`,
          }}>
            <img src={aiChatbot} alt="AI Chatbot" style={{ width: "100%", minHeight: "240px", borderRadius: 10, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1.2s`,
          }}>
            <img src={aiSugg} alt="AI Suggestions" style={{ width: "100%", minHeight: "240px", borderRadius: 10, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
          <div style={{
            opacity: show ? 1 : 0, transform: show ? "none" : "translateY(20px)",
            transition: `all 0.55s ease 1.3s`,
          }}>
            <img src={aiChecklist} alt="AI Checklist" style={{ width: "100%", minHeight: "240px", borderRadius: 10, border: `1px solid #A78BFA40`, objectFit: "cover" }} />
          </div>
        </div>

        <div style={{
          marginTop: 20, padding: "12px 20px",
          background: "#A78BFA10", border: "1px solid #A78BFA25", borderRadius: 10,
          opacity: show ? 1 : 0, transition: "all 0.5s ease 1.4s",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: SLATE, margin: 0 }}>
            <span style={{ color: "#A78BFA", fontWeight: 700 }}>Why AI matters:</span> — Manual event planning is error-prone and time-consuming. AI turns hours of analysis into instant, actionable insights — making every event host feel like they have a professional planner at their side.
          </p>
        </div>
      </div>
    </div>
  );
}

// SLIDE 7: Additional Features
function AdditionalSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const items = [
    { icon: "🔒", title: "JWT Authentication", desc: "Stateless, secure token-based auth with 7-day expiry", color: GOLD },
    { icon: "📱", title: "Responsive Design", desc: "Fully optimized across desktop, tablet, and mobile", color: TEAL },
    { icon: "🔔", title: "Notifications", desc: "In-app notification system for updates and reminders", color: "#F97316" },
    { icon: "🛡️", title: "Role-Based Access", desc: "Granular permissions: admin, host, and guest roles", color: "#A78BFA" },
    { icon: "📊", title: "Per-User Credits", desc: "AI usage tracked per account; never shared or reset", color: GOLD },
    { icon: "🧪", title: "E2E Testing", desc: "Cypress test suite for critical user flows & reliability", color: TEAL },
    { icon: "🚀", title: "Demo Mode", desc: "In-memory MongoDB — zero-install demo with seed data", color: "#F97316" },
    { icon: "🔑", title: "Secure Env Config", desc: "Dotenv separation of secrets; no keys in codebase", color: "#A78BFA" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="70%" y="60%" color={TEAL} size={350} opacity={0.09} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color={TEAL}>08 — Security & UX</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 28px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Additional <span style={{ color: GOLD }}>Functionalities</span></h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
              transition: `all 0.55s ease ${0.3 + i * 0.07}s`,
            }}>
              <Card style={{ padding: "16px 18px", borderLeft: `3px solid ${item.color}40` }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: item.color, margin: "0 0 6px" }}>{item.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: SLATE, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SLIDE 8: Challenges
function ChallengesSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const challenges = [
    {
      num: "01", color: "#A78BFA",
      challenge: "Real-Time RSVP & QR Check-In",
      problem: "Public RSVP pages needed to work without auth, while still securely updating the guest's status in the system.",
      solution: "Unique guest ID tokens in URLs + QR codes — stateless, tamper-resistant, no login needed for guests.",
    },
    {
      num: "02", color: "#F97316",
      challenge: "Complex State Across Event Tabs",
      problem: "Event detail page has 5+ tabs (Guests, Budget, Checklist, AI, Timeline) — keeping state in sync without prop drilling.",
      solution: "Context-driven architecture with React hooks, each tab fetching only what it needs with optimistic UI updates.",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="60%" y="-40px" color="#F97316" size={300} opacity={0.09} />
      <GlowOrb x="-40px" y="70%" color={GOLD} size={280} opacity={0.09} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color="#F97316">09 — Problem Solving</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 28px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Challenges & <span style={{ color: GOLD }}>Solutions</span></h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {challenges.map((c, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateX(-20px)",
              transition: `all 0.6s ease ${0.3 + i * 0.12}s`,
            }}>
              <Card>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 44, height: 44, borderRadius: 10,
                    background: `${c.color}18`, border: `1px solid ${c.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: c.color,
                  }}>{c.num}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: c.color, margin: "0 0 8px" }}>{c.challenge}</h4>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: SLATE, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Challenge</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.65)", margin: "3px 0 0", lineHeight: 1.55 }}>{c.problem}</p>
                    </div>
                    <div style={{ height: 1, background: `${c.color}20`, margin: "10px 0" }} />
                    <div>
                      <span style={{ fontSize: 10, color: c.color, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>✓ Solution</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.75)", margin: "3px 0 0", lineHeight: 1.55 }}>{c.solution}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SLIDE 10: Vendors & Event Planners
function VendorsSlide({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (active) setTimeout(() => setShow(true), 100); else setShow(false); }, [active]);

  const features = [
    { icon: "📋", title: "Vendor Directory", desc: "Browse curated vendors with reviews, pricing, and availability", color: GOLD },
    { icon: "🔐", title: "Role-Based Access", desc: "Multi-tier permissions: vendors, planners, co-hosts with granular controls", color: TEAL },
    { icon: "✉️", title: "RSVP Templates", desc: "Beautiful, customizable email templates for guest invitations", color: "#F97316" },
    { icon: "📱", title: "Mobile App", desc: "Native iOS/Android apps for on-the-go event management and guest updates", color: "#A78BFA" },
    { icon: "🤝", title: "Vendor Collaboration", desc: "Direct messaging and file sharing between planners and vendors", color: GOLD },
    { icon: "📅", title: "Availability Calendar", desc: "Real-time vendor availability and booking integration", color: TEAL },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: NAVY, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 60px", overflow: "hidden" }}>
      <GridLines />
      <GlowOrb x="30%" y="-60px" color="#A78BFA" size={350} opacity={0.1} />
      <GlowOrb x="80%" y="70%" color={GOLD} size={300} opacity={0.09} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ opacity: show ? 1 : 0, transition: "all 0.5s ease 0.1s", marginBottom: 8 }}>
          <Tag color="#A78BFA">10 — Future Growth</Tag>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 800,
          color: WHITE, margin: "0 0 28px", letterSpacing: "-0.02em",
          opacity: show ? 1 : 0, transition: "all 0.5s ease 0.2s",
        }}>Vendors & Event <span style={{ color: GOLD }}>Planners</span></h2>
        <p style={{ color: SLATE, fontSize: 15, margin: "0 0 28px", opacity: show ? 1 : 0, transition: "all 0.5s ease 0.3s" }}>
          Extend PlanIt's ecosystem with vendor discovery, role-based team collaboration, professional RSVP templates, and mobile-first tools for planners on the go.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              opacity: show ? 1 : 0, transform: show ? "none" : "translateY(25px)",
              transition: `all 0.55s ease ${0.35 + i * 0.08}s`,
            }}>
              <Card glint style={{ borderTop: `2px solid ${f.color}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{f.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: f.color }}>{f.title}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: SLATE, margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </Card>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 28, padding: "18px 24px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: `3px solid #A78BFA`,
          borderRadius: 12,
          opacity: show ? 1 : 0, transition: "all 0.5s ease 1.2s",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: SLATE, margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: "#A78BFA", fontWeight: 700 }}>Vision:</span> Transform PlanIt from a solo-planner tool into a comprehensive event ecosystem where hosts, professional planners, and vendors collaborate seamlessly — creating a unified platform for events of any scale.
          </p>
        </div>
      </div>
    </div>
  );
}

const slideComponents = [IntroSlide, TargetSlide, TechStackSlide, FlowSlide, DashboardSlide, FeaturesSlide, AISlide, AdditionalSlide, ChallengesSlide, VendorsSlide];
const slideTitles = ["Introduction", "Target Users", "Tech Stack", "Website Flow", "Dashboard", "Features", "AI Features", "Additional", "Challenges", "Vendors"];

const slides = [
  { id: 1, type: "intro" },
  { id: 2, type: "target" },
  { id: 3, type: "techstack" },
  { id: 4, type: "flow" },
  { id: 5, type: "dashboard" },
  { id: 6, type: "features" },
  { id: 7, type: "ai" },
  { id: 8, type: "additional" },
  { id: 9, type: "challenges" },
  { id: 10, type: "vendors" },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrent(c => Math.min(c + 1, slides.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#060E1C", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes glint { from { left: -100% } to { left: 200% } }
        @keyframes pulse { 0%,100% { opacity:0.5; transform:scale(1) } 50% { opacity:1; transform:scale(1.15) } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Top bar */}
      <div style={{
        height: 52, background: "rgba(11,29,58,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", zIndex: 100, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: WHITE }}>Plan<span style={{ color: GOLD }}>It</span></span>
          <span style={{ fontSize: 11, color: SLATE, letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: 4 }}>Presentation</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 28 : 8, height: 8, borderRadius: 4,
              background: i === current ? GOLD : "rgba(255,255,255,0.15)",
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: SLATE }}>{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
          <span style={{ fontSize: 11, color: SLATE, opacity: 0.5 }}>· {slideTitles[current]}</span>
        </div>
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {slideComponents.map((SlideComp, i) => (
          <SlideWrapper key={i} active={current === i} index={i}>
            <SlideComp active={current === i} />
          </SlideWrapper>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{
        height: 48, background: "rgba(11,29,58,0.9)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", zIndex: 100, flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          {slideTitles.map((title, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              padding: "4px 12px", borderRadius: 6,
              background: i === current ? `${GOLD}20` : "transparent",
              border: `1px solid ${i === current ? GOLD + "60" : "transparent"}`,
              color: i === current ? GOLD : SLATE,
              fontSize: 11, cursor: "pointer", transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif", fontWeight: i === current ? 700 : 400,
            }}>{title}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{
            width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", color: current === 0 ? "rgba(255,255,255,0.2)" : WHITE,
            cursor: current === 0 ? "not-allowed" : "pointer", fontSize: 14, transition: "all 0.2s",
          }}>←</button>
          <button onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))} disabled={current === slides.length - 1} style={{
            width: 32, height: 32, borderRadius: 8, background: current < slides.length - 1 ? GOLD : "rgba(255,255,255,0.06)",
            border: `1px solid ${current < slides.length - 1 ? GOLD : "rgba(255,255,255,0.1)"}`,
            color: current < slides.length - 1 ? NAVY : "rgba(255,255,255,0.2)",
            cursor: current === slides.length - 1 ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, transition: "all 0.2s",
          }}>→</button>
        </div>
      </div>
    </div>
  );
}
