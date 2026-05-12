import { useState, useEffect } from "react";
import dashboard from "./assets/dashboard.png";
import acceptRsvp from "./assets/accept-rsvp.png";
import expense from "./assets/expense.png";
import aiChecklist from "./assets/ai-checklist.png";
import autoAssign from "./assets/auto-assign.png";
import timeline from "./assets/timeline.png";
import rsvp from "./assets/rsvp.png";
import createEvent from "./assets/create-event.png";
import reg from "./assets/reg.png";
import enterCode from "./assets/enter-code.png";
import wrongCode from "./assets/wrong-code.png";
import aiSugg from "./assets/ai-sugg.png";
import aiTab from "./assets/AI-tab.png";
import summSug from "./assets/summ-sug.png";
import aiChatbot from "./assets/AI-chatbot.png";
import aiTabResult from "./assets/AI-tab-result.png";
import pricing from "./assets/pricing.png";
import correctCode from "./assets/correct-code.png";
import eventsTab from "./assets/events-tab.png";

const C = {
  navy:    "#07111F",
  navy1:   "#0D1E33",
  navy2:   "#152840",
  navy3:   "#1C3354",
  white:   "#FFFFFF",
  offwhite:"#E8EDF4",
  gold:    "#B8975A",
  goldlt:  "#D4B07A",
  golddk:  "#8A6C38",
  slate:   "#6B84A0",
  slatel:  "#9DB3CC",
  line:    "rgba(255,255,255,0.07)",
  accent:  "#4A7FA5",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; height: 100%; overflow: hidden; background: #07111F; }
  ::-webkit-scrollbar { display: none; }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
  @keyframes slideIn { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:none; } }
  @keyframes drawLine{ from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
  @keyframes flowPop { 0%{opacity:0;transform:scale(0.96)} 100%{opacity:1;transform:scale(1)} }
  @keyframes flowGlow { 0%,100%{opacity:.35} 50%{opacity:.9} }
  @keyframes flowShift { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  .gold-shimmer {
    background: linear-gradient(90deg,#B8975A 0%,#D4B07A 40%,#B8975A 60%,#8A6C38 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:shimmer 4s linear infinite;
  }
  .flow-panel {
    position: relative;
    background:
      radial-gradient(ellipse 60% 50% at 30% 40%, rgba(74,127,165,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 80% 70%, rgba(184,151,90,0.08) 0%, transparent 55%),
      linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0));
  }
`;

/* ── Shared primitives ── */
const NoiseBg = () => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.025,pointerEvents:"none",zIndex:0}} xmlns="http://www.w3.org/2000/svg">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>
);

const GeoBg = () => (
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:0.055}} viewBox="0 0 1200 680" preserveAspectRatio="xMidYMid slice">
    <polygon points="600,80 820,460 380,460" fill="none" stroke="white" strokeWidth="0.5"/>
    <polygon points="600,600 820,220 380,220" fill="none" stroke="white" strokeWidth="0.5"/>
  </svg>
);

const SlideWrapper = ({ children, active }) => (
  <div style={{position:"absolute",inset:0,opacity:active?1:0,transform:active?"none":"translateX(36px)",transition:"opacity .5s ease,transform .5s cubic-bezier(.22,1,.36,1)",pointerEvents:active?"all":"none",overflow:"hidden"}}>
    {children}
  </div>
);

const Rule = ({ delay=0, width=48 }) => (
  <div style={{width,height:1,background:C.gold,margin:"12px 0 18px",transformOrigin:"left",animation:`drawLine .7s ${delay}s ease both`}}/>
);

const SLabel = ({ n, title, delay=0 }) => (
  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,animation:`fadeIn .5s ${delay}s ease both`,opacity:0}}>
    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.gold,letterSpacing:"0.12em"}}>{String(n).padStart(2,"0")}</span>
    <div style={{width:18,height:"0.5px",background:C.gold}}/>
    <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:C.slatel}}>{title}</span>
  </div>
);

/* Image placeholder — user replaces src with real screenshot */
const ImgPlaceholder = ({ label, aspectRatio="16/9", style={} }) => (
  <div style={{
    width:"100%", aspectRatio,
    background:"rgba(255,255,255,0.03)",
    border:`1px solid ${C.line}`,
    borderTop:`1px solid ${C.gold}30`,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    gap:8, position:"relative", overflow:"hidden",
    ...style,
  }}>
    {/* Corner marks */}
    {[[0,0],[0,1],[1,0],[1,1]].map(([r,c],i)=>(
      <div key={i} style={{position:"absolute",[r?"bottom":"top"]:6,[c?"right":"left"]:6,width:10,height:10,borderTop:r?"none":`1px solid ${C.gold}50`,borderBottom:r?`1px solid ${C.gold}50`:"none",borderLeft:c?"none":`1px solid ${C.gold}50`,borderRight:c?`1px solid ${C.gold}50`:"none"}}/>
    ))}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1" opacity="0.35">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
    <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:C.slate,letterSpacing:"0.1em",textTransform:"uppercase",opacity:0.7}}>{label}</span>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 1 — INTRODUCTION
══════════════════════════════════════════════════════════════════ */
const Slide1 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 80px",overflow:"hidden"}}>
    <NoiseBg/><GeoBg/>
    <div style={{position:"absolute",right:0,top:0,bottom:0,width:3,background:`linear-gradient(to bottom,transparent,${C.gold},transparent)`}}/>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.gold}60,transparent)`}}/>

    {/* Center text */}
    <div style={{position:"relative",zIndex:1,maxWidth:560,textAlign:"center"}}>
      {active && <>
        <SLabel n={1} title="Project Overview" delay={0.1}/>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(60px,6.5vw,90px)",fontWeight:600,color:C.white,lineHeight:0.95,letterSpacing:"-0.01em",animation:"fadeUp .7s .25s ease both",opacity:0}}>
          Plan<span className="gold-shimmer">It</span>
        </h1>
        <Rule delay={0.4}/>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:300,color:C.slatel,lineHeight:1.8,animation:"fadeUp .6s .5s ease both",opacity:0}}>
          AI-powered event planning platform — guest management, budgets, checklists, seating, timelines, and RSVP flows in one workspace.
        </p>
        <div style={{marginTop:28,padding:"16px 20px",border:`1px solid ${C.gold}25`,borderLeft:`2px solid ${C.gold}`,background:"rgba(184,151,90,0.04)",animation:"fadeUp .6s .65s ease both",opacity:0,textAlign:"left"}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:C.gold,marginBottom:5}}>Core Objective</div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:C.offwhite,lineHeight:1.7,fontWeight:300}}>Replace 5+ disconnected tools with a single intelligent platform, reducing planning time and eliminating coordination errors.</p>
        </div>
        <div style={{display:"flex",gap:36,marginTop:28,animation:"fadeUp .6s .8s ease both",opacity:0,justifyContent:"center",flexWrap:"wrap"}}>
          {[["10+","Core Modules"],["AI-Supported","Design"]].map(([v,l],i)=>(
            <div key={i} style={{borderLeft:`1px solid ${C.gold}50`,paddingLeft:14,textAlign:"left"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:600,color:C.white,lineHeight:1}}>{v}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:C.slate,marginTop:3,letterSpacing:"0.1em",textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
      </>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 2 — TARGET USERS
══════════════════════════════════════════════════════════════════ */
const Slide2 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 80px",overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{position:"relative",zIndex:1}}>
      {active && <>
        <SLabel n={2} title="Target Users" delay={0.05}/>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:50,fontWeight:600,color:C.white,letterSpacing:"-0.01em",lineHeight:1,animation:"fadeUp .6s .15s ease both",opacity:0}}>
          Who Uses <span className="gold-shimmer">PlanIt</span>
        </h2>
        <Rule delay={0.3} width={40}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18,marginTop:4}}>
          {[
            { title:"Individual Event Hosts", sub:"Personal & Social", color:C.gold,
              points:["Weddings, birthdays, anniversaries","AI-generated checklists & RSVP links","Simple guided planning flow"] },
            { title:"Corporate & Business Teams", sub:"Professional Events", color:C.accent,
              points:["Conferences, launches, retreats","Budget control & role-based access","Risk detection at scale"] },
            { title:"Professional Event Planners", sub:"Agency & Freelance", color:C.goldlt,
              points:["Multi-event dashboard","Unlimited AI on premium","Branded RSVP & QR check-in"] },
          ].map((u,i)=>(
            <div key={i} style={{border:`1px solid ${C.line}`,borderTop:`1px solid ${u.color}60`,padding:"22px 22px 20px",background:"rgba(255,255,255,0.02)",position:"relative",animation:`fadeUp .6s ${0.4+i*0.12}s ease both`,opacity:0}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"0.5px",background:`linear-gradient(90deg,${u.color},transparent)`}}/>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600,color:C.white,marginBottom:3}}>{u.title}</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:u.color,marginBottom:14}}>{u.sub}</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {u.points.map((p,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:C.slatel,lineHeight:1.5}}>
                    <div style={{width:1,height:12,background:u.color,marginTop:2,flexShrink:0,opacity:0.6}}/>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:18,display:"flex",alignItems:"center",gap:20,animation:"fadeIn .5s .9s ease both",opacity:0}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:C.slate,whiteSpace:"nowrap"}}>Platform advantage</div>
          <div style={{flex:1,height:"0.5px",background:C.line}}/>
          {["All-in-one workspace","AI-native design","Scales personal to enterprise"].map((t,i)=>(
            <div key={i} style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:C.slatel,padding:"4px 12px",border:`1px solid ${C.line}`,whiteSpace:"nowrap"}}>{t}</div>
          ))}
        </div>
      </>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 3 — TECH STACK
══════════════════════════════════════════════════════════════════ */
const Slide3 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",padding:"44px 80px",gap:56,overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{position:"absolute",left:0,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${C.gold}40,transparent)`}}/>
    <div style={{width:260,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:1}}>
      {active && <>
        <SLabel n={3} title="Technologies" delay={0.05}/>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:50,fontWeight:600,color:C.white,letterSpacing:"-0.01em",lineHeight:1,animation:"fadeUp .6s .15s ease both",opacity:0}}>Tech<br/><span className="gold-shimmer">Stack</span></h2>
        <Rule delay={0.3} width={40}/>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:C.slate,lineHeight:1.8,animation:"fadeUp .6s .4s ease both",opacity:0}}>Chosen for type safety, velocity, and scalability. Each layer has a clear architectural role.</p>
        <div style={{marginTop:20,padding:"14px 16px",border:`1px solid ${C.gold}25`,borderLeft:`2px solid ${C.gold}`,background:"rgba(184,151,90,0.03)",animation:"fadeUp .6s .55s ease both",opacity:0}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",color:C.gold,marginBottom:5}}>Key Decision</div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:C.slatel,lineHeight:1.7}}>OpenRouter decouples AI from any single provider — model switching without code changes.</p>
        </div>
      </>}
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:14,position:"relative",zIndex:1}}>
      {active && [
        { cat:"Frontend", color:C.accent, delay:0.35, items:[{n:"React 18"},{n:"TypeScript"},{n:"Vite"},{n:"Tailwind CSS"},{n:"Framer Motion"}] },
        { cat:"Backend",  color:C.gold,   delay:0.46, items:[{n:"Node.js"},{n:"Express"},{n:"MongoDB"},{n:"Mongoose"}] },
        { cat:"Auth & Security", color:C.goldlt, delay:0.56, items:[{n:"JWT"},{n:"dotenv"},{n:"Role-Based Access Control"}] },
        { cat:"AI & Intelligence", color:"#A78BFA", delay:0.65, items:[{n:"OpenRouter API"},{n:"Budget Analysis"},{n:"Risk Detection"},{n:"Smart Suggestions"}] },
        { cat:"Testing & DevOps", color:C.slatel, delay:0.74, items:[{n:"Cypress E2E"},{n:"mongodb-memory-server"},{n:"Seed Scripts"}] },
      ].map(({ cat, color, delay, items })=>(
        <div key={cat} style={{borderBottom:`1px solid ${C.line}`,paddingBottom:12,animation:`slideIn .6s ${delay}s ease both`,opacity:0}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color,marginBottom:8}}>{cat}</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {items.map((item,i)=>(
              <div key={i} style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:C.offwhite,padding:"4px 11px",border:`1px solid ${C.line}`,borderLeft:`1px solid ${color}60`,background:"rgba(255,255,255,0.02)",letterSpacing:"0.03em"}}>{item.n}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 4 — WEBSITE FLOW (Three.js animated)
══════════════════════════════════════════════════════════════════ */
const FLOW_STEPS = [
  { id:0,  label:"Landing Page",      detail:"Public homepage — value proposition, features, pricing. No auth required.",                                                  sub:["Hero & CTA","Feature overview","Pricing tiers","Demo access"] },
  { id:1,  label:"Register",          detail:"User creates an account. A unique verification code is sent to their email immediately after submission.",                     sub:["Name, email, password","Verification code dispatched","Code expires in 15 min","Wrong code → clear error shown"] },
  { id:2,  label:"Email Verification",detail:"User enters the 6-digit code received by email. Incorrect code shows an inline error. Correct code activates the account.",   sub:["6-digit code input","Wrong code → error state","Correct code → account active","Resend code option"] },
  { id:3,  label:"Login",             detail:"Authenticated sign-in. JWT token issued on success and stored client-side for all subsequent API calls.",                     sub:["Email & password","JWT token issued","7-day session","Role assignment"] },
  { id:4,  label:"Dashboard",         detail:"Central hub with live stats: total guests, RSVP counts, budget remaining, task completion, and notifications.",               sub:["Event summary cards","Live stats","Notification center","Quick-create event"] },
  { id:5,  label:"Create Event",      detail:"Guided wizard: event name, type, date, location, guest count, and initial budget cap.",                                       sub:["Name & type","Date & location","Guest estimate","Budget cap"] },
  { id:6,  label:"Guest Management",  detail:"Add or import guests, assign to groups, record dietary/access needs, and track per-guest RSVP status in real-time.",         sub:["Add / import guests","Group assignment","Dietary notes","RSVP status tracking"] },
  { id:7,  label:"RSVP Dispatch",     detail:"Each guest receives a unique token-protected URL and QR code. No account required for the guest to respond.",                 sub:["Unique token URL","Email dispatch","QR code generation","Public RSVP page"] },
  { id:8,  label:"Budget & Expenses", detail:"Itemized expense tracker with category breakdown. Real-time actual vs. estimated spend with automatic overage alerts.",       sub:["Expense line items","Category breakdown","Actual vs estimate","Overspend alerts"] },
  { id:9,  label:"Checklist",         detail:"AI-generated task list based on event type. Tasks carry due dates, assignees, and completion status — tracked on dashboard.", sub:["AI task generation","Due dates","Assignees","Progress tracking"] },
  { id:10, label:"Seating Planner",   detail:"Visual table layout tool. Assign guests to tables, manage group preferences, and export the finalized seating chart.",        sub:["Table layout builder","Assign guests","Group logic","Export chart"] },
  { id:11, label:"Timeline Builder",  detail:"Day-of schedule with ordered milestones, time slots, and responsible parties. Used as the operational runsheet.",             sub:["Milestone entries","Time slots","Responsible party","Day-of runsheet"] },
  { id:12, label:"AI Insights",       detail:"OpenRouter analysis runs across event data — budget risk, planning gaps, overdue tasks, and smart recommendations.",          sub:["Budget risk flags","Gap detection","Overdue alerts","Recommendations"] },
  { id:13, label:"QR Check-In",       detail:"Guests show QR code at entry. Host scans live. Real-time attendance counter updates instantly on the dashboard.",             sub:["QR per guest","Live scan","Real-time counter","Attendance report"] },
  { id:14, label:"Analytics",         detail:"Post-event: final attendance rate, budget variance, checklist score, and AI performance summary.",                           sub:["Attendance rate","Budget variance","Checklist score","AI summary"] },
  { id:15, label:"Premium & Billing", detail:"Free tier has credit-limited AI. Premium unlocks unlimited AI, advanced analytics, and white-label RSVP pages.",             sub:["AI credits","Unlimited premium","In-app upgrade","Billing management"] },
];

const Slide4 = ({ active }) => {
  const [activeStep,setActiveStep]=useState(0);
  const step=FLOW_STEPS[activeStep];

  // Modern grid layout: 4 cols x 4 rows, contained within bounds
  const cols = 4;
  const rows = Math.ceil(FLOW_STEPS.length / cols);
  // Use padding to keep nodes inside: 8% from edges
  const positions = FLOW_STEPS.map((_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const xPad = 12;
    const yPad = 10;
    const xRange = 100 - xPad * 2;
    const yRange = 100 - yPad * 2;
    return {
      x: cols === 1 ? 50 : xPad + (col / (cols - 1)) * xRange,
      y: rows === 1 ? 50 : yPad + (row / (rows - 1)) * yRange,
    };
  });

  const activePos = positions[activeStep] || { x: 50, y: 50 };

  return (
    <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",overflow:"hidden"}}>
      <NoiseBg/>
      {/* Left: Flow Map */}
      <div style={{width:"58%",height:"100%",position:"relative",flexShrink:0,padding:"20px 16px 20px 20px"}}>
        {active && (
          <div style={{position:"relative",width:"100%",height:"100%",border:`1px solid ${C.line}`,borderTop:`1px solid ${C.gold}40`,borderRadius:10,background:"linear-gradient(135deg, rgba(255,255,255,0.025), rgba(255,255,255,0))",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 20% 20%,rgba(74,127,165,0.10) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 80%,rgba(184,151,90,0.08) 0%,transparent 60%)"}}/>

            {/* Header */}
            <div style={{position:"absolute",left:14,top:12,right:14,display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:3}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:C.slatel}}>User Journey Map</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:C.gold}}>{String(activeStep+1).padStart(2,"0")} / {String(FLOW_STEPS.length).padStart(2,"0")}</div>
            </div>

            {/* SVG connecting lines — contained within padding */}
            <svg style={{position:"absolute",left:"12%",top:"10%",width:"76%",height:"78%",zIndex:1}} viewBox="0 0 100 100" preserveAspectRatio="none">
              {FLOW_STEPS.slice(0,-1).map((_, i) => {
                const pct = (p, pad, range) => ((p - pad) / range) * 100;
                const xPad=12, yPad=10, xRange=76, yRange=80;
                const x1 = ((positions[i].x - 12) / 76) * 100;
                const y1 = ((positions[i].y - 10) / 80) * 100;
                const x2 = ((positions[i+1].x - 12) / 76) * 100;
                const y2 = ((positions[i+1].y - 10) / 80) * 100;
                return <line key={`dim-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a2f44" strokeWidth="0.6" />;
              })}
              {FLOW_STEPS.slice(0,-1).map((_, i) => {
                const x1 = ((positions[i].x - 12) / 76) * 100;
                const y1 = ((positions[i].y - 10) / 80) * 100;
                const x2 = ((positions[i+1].x - 12) / 76) * 100;
                const y2 = ((positions[i+1].y - 10) / 80) * 100;
                return <line key={`active-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i < activeStep ? C.gold : "transparent"} strokeWidth="0.8" style={{transition:"stroke .35s ease"}} />;
              })}
            </svg>

            {/* Nodes */}
            <div style={{position:"absolute",inset:"10% 12% 12% 12%",zIndex:2}}>
              {FLOW_STEPS.map((node, i) => (
                <button
                  key={node.id}
                  onClick={() => setActiveStep(i)}
                  style={{
                    position:"absolute",
                    left:`${((positions[i].x - 12) / 76) * 100}%`,
                    top:`${((positions[i].y - 10) / 80) * 100}%`,
                    transform:"translate(-50%,-50%)",
                    border:"none",
                    background:"transparent",
                    cursor:"pointer",
                    padding:0,
                  }}
                >
                  <div style={{
                    padding:"6px 10px",
                    borderRadius:8,
                    background: i === activeStep
                      ? `linear-gradient(135deg,${C.navy2},${C.navy3})`
                      : i < activeStep
                        ? "rgba(184,151,90,0.08)"
                        : "rgba(255,255,255,0.03)",
                    border: i === activeStep
                      ? `1px solid ${C.gold}60`
                      : i < activeStep
                        ? `1px solid ${C.gold}30`
                        : `1px solid ${C.line}`,
                    boxShadow: i === activeStep ? `0 0 14px rgba(184,151,90,0.25)` : "none",
                    transition:"all .3s ease",
                    whiteSpace:"nowrap",
                    maxWidth:100,
                  }}>
                    <div style={{fontFamily:"'Inter',sans-serif",fontSize:8,color: i === activeStep ? C.gold : i < activeStep ? `${C.gold}70` : C.slate,fontWeight: i===activeStep ? 500 : 300,letterSpacing:"0.03em",overflow:"hidden",textOverflow:"ellipsis"}}>{node.label}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active glow indicator */}
            <div style={{
              position:"absolute",
              left:`calc(12% + ${((activePos.x - 12) / 76) * 76}%)`,
              top:`calc(10% + ${((activePos.y - 10) / 80) * 78}%)`,
              width:28,height:28,borderRadius:"50%",
              border:`1px solid ${C.gold}`,
              boxShadow:"0 0 14px rgba(184,151,90,0.35)",
              transform:"translate(-50%,-50%)",
              transition:"left .45s cubic-bezier(.22,1,.36,1), top .45s cubic-bezier(.22,1,.36,1)",
              zIndex:3,pointerEvents:"none"
            }}/>

            <div style={{position:"absolute",bottom:10,left:14,fontFamily:"'Inter',sans-serif",fontSize:8,color:C.slate,letterSpacing:"0.09em",textTransform:"uppercase"}}>Click any node · Use Prev/Next</div>
          </div>
        )}
      </div>

      {/* Right: Detail Panel */}
      <div style={{width:"42%",height:"100%",borderLeft:`1px solid ${C.line}`,display:"flex",flexDirection:"column",justifyContent:"center",padding:"28px 28px",background:"rgba(7,17,31,0.5)",flexShrink:0}}>
        {active&&<>
          <SLabel n={4} title="Website Flow" delay={0.05}/>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:600,color:C.white,letterSpacing:"-0.01em",lineHeight:1,animation:"fadeUp .6s .15s ease both",opacity:0}}>
            Complete<br/><span className="gold-shimmer">User Journey</span>
          </h2>
          <Rule delay={0.3} width={40}/>
          <div key={activeStep} style={{animation:"flowShift .35s ease both"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:C.gold}}>{String(activeStep+1).padStart(2,"0")} / {String(FLOW_STEPS.length).padStart(2,"0")}</span>
              <div style={{flex:1,height:"0.5px",background:C.line}}/>
            </div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:C.white,marginBottom:8}}>{step.label}</h3>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:C.slatel,lineHeight:1.75,marginBottom:12}}>{step.detail}</p>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {step.sub.map((s2,i)=>(
                <div key={i} style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:C.slate,display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:14,height:"0.5px",background:`${C.gold}60`,flexShrink:0}}/>
                  {s2}
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:20,display:"flex",gap:8}}>
            <button onClick={()=>setActiveStep(s=>Math.max(0,s-1))} disabled={activeStep===0} style={{padding:"5px 16px",fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",border:`1px solid ${C.line}`,background:"transparent",color:activeStep===0?C.slate:C.offwhite,cursor:activeStep===0?"not-allowed":"pointer",transition:"all .2s"}}>Prev</button>
            <button onClick={()=>setActiveStep(s=>Math.min(FLOW_STEPS.length-1,s+1))} disabled={activeStep===FLOW_STEPS.length-1} style={{padding:"5px 16px",fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",border:`1px solid ${C.gold}60`,background:`${C.gold}10`,color:C.gold,cursor:activeStep===FLOW_STEPS.length-1?"not-allowed":"pointer",transition:"all .2s"}}>Next</button>
          </div>
        </>}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   SLIDE 5 — AUTH & EMAIL VERIFICATION
══════════════════════════════════════════════════════════════════ */
const Slide5 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",flexDirection:"column",justifyContent:"center",padding:"40px 80px",overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{position:"relative",zIndex:1}}>
      {active&&<>
        <SLabel n={5} title="Authentication" delay={0.05}/>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:50,fontWeight:600,color:C.white,letterSpacing:"-0.01em",animation:"fadeUp .6s .15s ease both",opacity:0}}>
          Auth & Email <span className="gold-shimmer">Verification</span>
        </h2>
        <Rule delay={0.3} width={40}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginTop:4}}>
          {[
            { title:"Register", color:C.gold, delay:0.4, label:"Registration Page Screenshot",
              note:"User fills name, email, password. Verification code sent on submit.", img:reg },
            { title:"Email Code Sent", color:C.accent, delay:0.52, label:"Verification Email Screenshot",
              note:"Unique 6-digit code dispatched to registered email. Expires in 15 minutes.", img:enterCode },
            { title:"Verify Code", color:C.goldlt, delay:0.64, label:"Code Input Screen Screenshot",
              note:"User enters the code. Correct code activates the account instantly.", img:correctCode },
            { title:"Wrong Code Error", color:"#E05C5C", delay:0.76, label:"Error State Screenshot",
              note:'Invalid code shows inline error: "Invalid or expired code. Please try again."', img:wrongCode },
          ].map((item,i)=>(
            <div key={i} style={{animation:`fadeUp .6s ${item.delay}s ease both`,opacity:0}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:item.color,marginBottom:6}}>{item.title}</div>
              <img src={item.img} style={{width:"100%",aspectRatio:"4/3",marginBottom:8,borderRadius:6,objectFit:"cover",border:`1px solid ${C.line}`,background:"rgba(255,255,255,0.03)"}}/>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:300,color:C.slate,lineHeight:1.6}}>{item.note}</p>
            </div>
          ))}
        </div>
      </>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 6 — CORE FEATURES (image-first grid)
══════════════════════════════════════════════════════════════════ */
const FeatureCard = ({ num, title, label, note, color, delay, img }) => (
  <div style={{animation:`fadeUp .55s ${delay}s ease both`,opacity:0}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:`${color}80`}}>{String(num).padStart(2,"0")}</span>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:C.white}}>{title}</span>
    </div>
    <img src={img} style={{width:"100%",aspectRatio:"16/9",marginBottom:7,borderTop:`1px solid ${color}35`,border:`1px solid ${C.line}`,borderRadius:6,objectFit:"cover",background:"rgba(255,255,255,0.03)"}}/>
    <p style={{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:300,color:C.slate,lineHeight:1.55}}>{note}</p>
  </div>
);

const Slide6 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",flexDirection:"column",padding:"36px 70px",overflow:"hidden"}}>
    <NoiseBg/>
    {active&&<>
      <div style={{marginBottom:18,position:"relative",zIndex:1}}>
        <SLabel n={6} title="Core Features" delay={0.05}/>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:46,fontWeight:600,color:C.white,letterSpacing:"-0.01em",animation:"fadeUp .6s .15s ease both",opacity:0}}>
          Core <span className="gold-shimmer">Features</span>
        </h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,flex:1,position:"relative",zIndex:1}}>
        <FeatureCard delay={0.3} num={1} title="Dashboard"        color={C.gold}   label="Dashboard Screenshot"       note="Live stats: guests, budget, tasks, deadlines." img={dashboard}/>
        <FeatureCard delay={0.36} num={2} title="Guest Management" color={C.accent} label="Guest List Screenshot"      note="Groups, RSVP status, dietary notes, bulk actions." img={eventsTab}/>
        <FeatureCard delay={0.42} num={3} title="Budget Tracker"  color={C.goldlt} label="Budget Screen Screenshot"   note="Itemized expenses, category breakdown, overspend alerts." img={expense}/>
        <FeatureCard delay={0.48} num={4} title="Checklist"       color="#A78BFA"  label="Checklist Screenshot"       note="AI-generated tasks with due dates and progress tracking." img={aiChecklist}/>
        <FeatureCard delay={0.54} num={5} title="Seating Planner" color={C.gold}   label="Seating Planner Screenshot" note="Visual table layout with group assignment logic." img={autoAssign}/>
        <FeatureCard delay={0.60} num={6} title="Timeline Builder" color={C.accent} label="Timeline Screenshot"       note="Day-of runsheet with ordered milestones and time slots." img={timeline}/>
        <FeatureCard delay={0.66} num={7} title="Public RSVP"     color={C.goldlt} label="RSVP Page Screenshot"       note="Token-protected guest page — no account required." img={rsvp}/>
        <FeatureCard delay={0.72} num={8} title="QR Check-In"     color="#A78BFA"  label="QR Check-In Screenshot"     note="Live scan check-in with real-time attendance counter." img={acceptRsvp}/>
      </div>
    </>}
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 7 — AI FEATURES
══════════════════════════════════════════════════════════════════ */
const AIFeatureCardCompact = ({ title, label, note, delay, img }) => (
  <div style={{animation:`fadeUp .55s ${delay}s ease both`,opacity:0,display:"flex",flexDirection:"column",minHeight:0}}>
    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:600,color:C.white,marginBottom:4}}>{title}</div>
    <img src={img} style={{flex:1,minHeight:0,width:"100%",border:"1px solid rgba(167,139,250,0.25)",borderTop:"1px solid rgba(167,139,250,0.35)",borderRadius:6,objectFit:"cover",background:"rgba(255,255,255,0.03)",marginBottom:4}}/>
    <p style={{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:300,color:C.slate,lineHeight:1.5,flexShrink:0}}>{note}</p>
  </div>
);

const Slide7 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",flexDirection:"column",padding:"18px 28px 14px",overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 50% at 70% 50%,rgba(80,60,140,0.05) 0%,transparent 70%)",pointerEvents:"none"}}/>
    {active&&<>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:10,position:"relative",zIndex:1,flexShrink:0}}>
        <div>
          <SLabel n={7} title="Artificial Intelligence" delay={0.05}/>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:600,color:C.white,letterSpacing:"-0.01em",lineHeight:0.95,animation:"fadeUp .6s .15s ease both",opacity:0}}>
            AI <span className="gold-shimmer">Features</span>
          </h2>
        </div>
        <div style={{animation:"fadeIn .5s .3s ease both",opacity:0,padding:"6px 12px",border:"1px solid rgba(167,139,250,0.25)",background:"rgba(167,139,250,0.05)",flexShrink:0}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:"rgba(167,139,250,0.7)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:1}}>Provider</div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"rgba(167,139,250,1)",fontWeight:500}}>OpenRouter API</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"1fr 1fr",gap:10,flex:1,position:"relative",zIndex:1,minHeight:0,overflow:"hidden"}}>
        <AIFeatureCardCompact delay={0.35} title="Budget Risk Analysis"   label="Budget AI Screenshot"      note="Flags overspend by category. Suggests reallocation with specific amounts." img={aiSugg}/>
        <AIFeatureCardCompact delay={0.43} title="Planning Gap Detection" label="Gap Detection Screenshot"  note="Detects overdue tasks, empty time slots, and day-of execution risks." img={aiTab}/>
        <AIFeatureCardCompact delay={0.51} title="Smart Recommendations"  label="Recommendations Screenshot" note="Context-aware checklist items, vendors, and timeline suggestions." img={summSug}/>
        <AIFeatureCardCompact delay={0.59} title="Global AI Assistant"    label="AI Chat Screenshot"        note="Full event context chat — ask anything, get instant answers." img={aiChatbot}/>
        <AIFeatureCardCompact delay={0.67} title="Per-Event Insights"     label="Insights Panel Screenshot" note="Top 3 critical action items ranked by urgency, plus health summary." img={aiTabResult}/>
        <AIFeatureCardCompact delay={0.75} title="Credit & Usage System"  label="Credits UI Screenshot"     note="Free credits tracked atomically. Premium tier bypasses limits entirely." img={pricing}/>
      </div>
    </>}
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 8 — ADDITIONAL FUNCTIONALITIES
══════════════════════════════════════════════════════════════════ */
const AddRow = ({ title, desc, delay }) => (
  <div style={{display:"flex",gap:22,paddingBottom:11,borderBottom:`1px solid ${C.line}`,animation:`slideIn .5s ${delay}s ease both`,opacity:0}}>
    <div style={{width:190,flexShrink:0,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:C.offwhite}}>{title}</div>
    <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:C.slate,lineHeight:1.7}}>{desc}</div>
  </div>
);

const Slide8 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",padding:"44px 80px",gap:52,overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{width:210,flexShrink:0,display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:1}}>
      {active&&<>
        <SLabel n={8} title="Platform Details" delay={0.05}/>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:48,fontWeight:600,color:C.white,lineHeight:0.95,letterSpacing:"-0.01em",animation:"fadeUp .6s .15s ease both",opacity:0}}>Additional<br/><span className="gold-shimmer">Functions</span></h2>
        <Rule delay={0.3} width={40}/>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:C.slate,lineHeight:1.8,animation:"fadeUp .6s .4s ease both",opacity:0}}>Supporting capabilities ensuring security, reliability, and a production-grade experience.</p>
      </>}
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:11,position:"relative",zIndex:1}}>
      {active&&<>
        <AddRow delay={0.35} title="JWT Authentication"          desc="Stateless token-based auth with 7-day expiry. Validated server-side on every protected API route."/>
        <AddRow delay={0.42} title="Email Verification"          desc="6-digit code sent on registration. Wrong code returns an inline error. Account activates only on correct entry."/>
        <AddRow delay={0.49} title="Role-Based Access Control"   desc="Three tiers: admin, event host, guest. Each restricted to authorized API endpoints and UI surfaces at middleware level."/>
        <AddRow delay={0.56} title="Responsive Interface"        desc="Full mobile and tablet support across all screens — dashboard, event management, RSVP, and QR check-in."/>
        <AddRow delay={0.63} title="In-App Notification System"  desc="Persistent notification store per user. RSVP confirmations, task due dates, and AI insights trigger alerts."/>
        <AddRow delay={0.70} title="Zero-Install Demo Mode"      desc="In-memory MongoDB with seeded demo account. Full platform, zero database setup required."/>
        <AddRow delay={0.77} title="End-to-End Test Suite"       desc="Cypress tests covering registration, event creation, RSVP, and AI flows with reproducible seed data."/>
        <AddRow delay={0.84} title="Environment Isolation"       desc="All secrets via dotenv, never committed. Separate .env schemas for frontend and backend with .env.example files."/>
      </>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   SLIDE 9 — CHALLENGES
══════════════════════════════════════════════════════════════════ */
const ChallengeBlock = ({ num, title, challenge, solution, color, delay }) => (
  <div style={{border:`1px solid ${C.line}`,padding:"14px 16px",position:"relative",animation:`fadeUp .6s ${delay}s ease both`,opacity:0,display:"flex",flexDirection:"column",minHeight:0}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,${color}50,transparent)`}}/>
    <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8,flexShrink:0}}>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color,letterSpacing:"0.1em",paddingTop:1,flexShrink:0,textTransform:"uppercase"}}>Challenge {String(num).padStart(2,"0")}</span>
      <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:600,color:C.white}}>{title}</h4>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:1,minHeight:0}}>
      <div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:C.slate,marginBottom:4}}>Problem</div>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:C.slatel,lineHeight:1.55}}>{challenge}</p>
      </div>
      <div>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color,marginBottom:4}}>Solution</div>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:300,color:C.offwhite,lineHeight:1.55}}>{solution}</p>
      </div>
    </div>
  </div>
);

const Slide9 = ({ active }) => (
  <div style={{width:"100%",height:"100%",background:C.navy,position:"relative",display:"flex",flexDirection:"column",padding:"22px 40px",overflow:"hidden"}}>
    <NoiseBg/>
    <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%"}}>
      {active&&<>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:12,flexShrink:0}}>
          <div>
            <SLabel n={9} title="Development Challenges" delay={0.05}/>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,fontWeight:600,color:C.white,letterSpacing:"-0.01em",lineHeight:0.95,animation:"fadeUp .6s .15s ease both",opacity:0}}>Challenges &<br/><span className="gold-shimmer">Solutions</span></h2>
          </div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:300,color:C.slate,maxWidth:240,lineHeight:1.6,textAlign:"right",animation:"fadeIn .6s .3s ease both",opacity:0}}>Five engineering problems resolved with production-grade implementations.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,flex:1,minHeight:0,overflow:"hidden"}}>
          <ChallengeBlock delay={0.38} num={1} color={C.gold}    title="AI Credit Enforcement Without Latency"     challenge="Preventing free-tier AI overuse required a per-request gate without adding response latency."              solution="Atomic MongoDB findOneAndUpdate with $inc — single round-trip checks and decrements. Premium bypasses gate entirely."/>
          <ChallengeBlock delay={0.56} num={2} color={C.goldlt}  title="Unauthenticated RSVP with Tamper Resistance" challenge="Guest RSVP pages needed to work without accounts while remaining securely linked to guest records."  solution="Opaque unique token per guest embedded in RSVP URL. Backend validates token against guest document — no session needed."/>
          <ChallengeBlock delay={0.65} num={3} color="#A78BFA"   title="Shared State Across Multi-Tab Event View"    challenge="Five interconnected tabs needed changes in one (e.g. adding a guest) to reflect instantly in others." solution="React Context exposes shared event state. Mutations trigger targeted API calls and local updates without full re-fetches."/>
          <ChallengeBlock delay={0.74} num={4} color="#E05C5C"   title="Secure Email Verification Flow"              challenge="Preventing account activation without valid email ownership, while keeping the UX frictionless."        solution="6-digit code generated server-side, stored hashed, expires in 15 min. Wrong code returns clear inline error — no account activated until correct."/>
        </div>
      </>}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  { id:0, label:"Introduction",    comp:Slide1 },
  { id:1, label:"Target Users",    comp:Slide2 },
  { id:2, label:"Tech Stack",      comp:Slide3 },
  { id:3, label:"Website Flow",    comp:Slide4 },
  { id:4, label:"Auth & Verify",   comp:Slide5 },
  { id:5, label:"Core Features",   comp:Slide6 },
  { id:6, label:"AI Features",     comp:Slide7 },
  { id:7, label:"Additional",      comp:Slide8 },
  { id:8, label:"Challenges",      comp:Slide9 },
];

export default function App() {
  const [current,setCurrent]=useState(0);
  useEffect(()=>{
    const h=(e)=>{
      if(e.key==="ArrowRight"||e.key==="ArrowDown") setCurrent(c=>Math.min(c+1,SLIDES.length-1));
      if(e.key==="ArrowLeft" ||e.key==="ArrowUp")   setCurrent(c=>Math.max(c-1,0));
    };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[]);

  return (
    <div style={{width:"100vw",height:"100vh",background:C.navy,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{GLOBAL_CSS}</style>

      {/* Top bar */}
      <div style={{height:44,flexShrink:0,borderBottom:`1px solid ${C.line}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:C.navy,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,color:C.white}}>Plan<span style={{color:C.gold}}>It</span></div>
          <div style={{width:1,height:14,background:C.line}}/>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:C.slate}}>Project Presentation</div>
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {SLIDES.map((_,i)=>(
            <button key={i} onClick={()=>setCurrent(i)} style={{width:i===current?24:6,height:6,borderRadius:3,background:i===current?C.gold:i<current?`${C.gold}40`:C.line,border:"none",cursor:"pointer",transition:"all .3s",padding:0}}/>
          ))}
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:C.slate,letterSpacing:"0.1em"}}>
          {String(current+1).padStart(2,"0")} — {SLIDES[current].label}
        </div>
      </div>

      {/* Slides */}
      <div style={{flex:1,position:"relative",overflow:"hidden"}}>
        {SLIDES.map(({comp:Comp},i)=>(
          <SlideWrapper key={i} active={current===i}>
            <Comp active={current===i}/>
          </SlideWrapper>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{height:40,flexShrink:0,borderTop:`1px solid ${C.line}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:C.navy,zIndex:100}}>
        <div style={{display:"flex",gap:2}}>
          {SLIDES.map((s,i)=>(
            <button key={i} onClick={()=>setCurrent(i)} style={{fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.09em",textTransform:"uppercase",padding:"4px 10px",background:i===current?`${C.gold}12`:"transparent",border:i===current?`1px solid ${C.gold}30`:"1px solid transparent",color:i===current?C.gold:C.slate,cursor:"pointer",transition:"all .2s"}}>{s.label}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setCurrent(c=>Math.max(0,c-1))} disabled={current===0} style={{padding:"4px 16px",fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",border:`1px solid ${C.line}`,background:"transparent",color:current===0?C.line:C.slatel,cursor:current===0?"not-allowed":"pointer",transition:"all .2s"}}>← Prev</button>
          <button onClick={()=>setCurrent(c=>Math.min(SLIDES.length-1,c+1))} disabled={current===SLIDES.length-1} style={{padding:"4px 16px",fontFamily:"'Inter',sans-serif",fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",border:`1px solid ${current<SLIDES.length-1?C.gold+"60":C.line}`,background:current<SLIDES.length-1?`${C.gold}10`:"transparent",color:current<SLIDES.length-1?C.gold:C.line,cursor:current===SLIDES.length-1?"not-allowed":"pointer",transition:"all .2s"}}>Next →</button>
        </div>
      </div>
    </div>
  );
}
