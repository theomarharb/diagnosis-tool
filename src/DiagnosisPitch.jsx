import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700&display=swap');`;

const factors = [
  {
    id: "duration",
    label: "Relationship Duration",
    options: [
      { label: "< 1 year", short: "<1y", points: 1 },
      { label: "1–3 years", short: "1-3y", points: 2 },
      { label: "3–5 years", short: "3-5y", points: 3 },
      { label: "5+ years", short: "5y+", points: 4 },
    ],
  },
  {
    id: "contact",
    label: "Contact Status",
    options: [
      { label: "Regular contact", short: "Regular", points: 1 },
      { label: "Limited (kids/logistics)", short: "Limited", points: 2 },
      { label: "No contact", short: "No contact", points: 3 },
      { label: "Blocked", short: "Blocked", points: 4 },
    ],
  },
  {
    id: "timeframe",
    label: "Time Since Breakup",
    options: [
      { label: "< 2 weeks", short: "<2w", points: 1 },
      { label: "2 wks – 2 months", short: "2w-2m", points: 2 },
      { label: "2–6 months", short: "2-6m", points: 3 },
      { label: "6+ months", short: "6m+", points: 4 },
    ],
  },
  {
    id: "complications",
    label: "Complications",
    options: [
      { label: "None", short: "None", points: 1 },
      { label: "Shared home/finances", short: "Home/$", points: 2 },
      { label: "Kids together", short: "Kids", points: 3 },
      { label: "Divorce/legal", short: "Divorce", points: 4 },
    ],
  },
  {
    id: "rebound",
    label: "Ex Seeing Someone?",
    options: [
      { label: "No", short: "No", points: 1 },
      { label: "Possibly", short: "Maybe", points: 2 },
      { label: "Yes — recent", short: "Yes (new)", points: 3 },
      { label: "Yes — established", short: "Yes (est.)", points: 4 },
    ],
  },
  {
    id: "readiness",
    label: "Emotional State",
    options: [
      { label: "Ready to act", short: "Ready", points: 1 },
      { label: "Stable, needs plan", short: "Stable", points: 2 },
      { label: "Struggling", short: "Struggling", points: 3 },
      { label: "In crisis", short: "Crisis", points: 4 },
    ],
  },
];

const pricingMatrix = {
  STRAIGHTFORWARD: {
    fullPay: 3500,
    nonUS: { total: 4000, two: 2000, three: 1333 },
    usFinancing: { total: 4700, payva: 392, clarity: 131 },
  },
  MODERATE: {
    fullPay: 4500,
    nonUS: { total: 5200, two: 2600, three: 1733 },
    usFinancing: { total: 6000, payva: 500, clarity: 167 },
  },
  COMPLEX: {
    fullPay: 6000,
    nonUS: { total: 6900, two: 3450, three: 2300 },
    usFinancing: { total: 8000, payva: 667, clarity: 222 },
  },
};

function buildDescription(answers) {
  const parts = [];

  // Duration
  const dur = answers.duration;
  if (dur >= 3) parts.push(`You were together for ${dur >= 4 ? "over five years" : "three to five years"} — that kind of history doesn't just disappear.`);
  else if (dur === 2) parts.push("You had a meaningful relationship of a few years together — there's real history to work with.");
  else parts.push("Your relationship is relatively fresh, which means emotions are still close to the surface.");

  // Contact
  const ct = answers.contact;
  if (ct >= 3) parts.push(`You're currently ${ct === 4 ? "blocked" : "in no contact"}, which means the reconnection path requires careful strategic timing.`);
  else if (ct === 2) parts.push("You have limited contact — mostly logistical — which gives us a narrow but usable channel.");
  else parts.push("You're still in regular contact, which is a strong advantage for reconnection.");

  // Timeframe
  const tf = answers.timeframe;
  if (tf >= 3) parts.push(`It's been ${tf === 4 ? "over six months" : "a few months"} since the breakup, so we need to account for emotional distance that's built up.`);
  else if (tf === 2) parts.push("The breakup is still fairly recent — emotions haven't fully settled, which we can work with.");
  else parts.push("This just happened — timing is on your side if we move with precision right now.");

  // Complications
  const cp = answers.complications;
  if (cp >= 3) parts.push(`There are significant complications — ${cp === 4 ? "divorce or legal proceedings" : "kids together"} — that add layers we need to navigate carefully.`);
  else if (cp === 2) parts.push("Shared home or finances add some logistical complexity, but also keep you connected.");
  else parts.push("There are no major external complications, so we can focus purely on the relationship itself.");

  // Rebound
  const rb = answers.rebound;
  if (rb >= 3) parts.push(`Your ex ${rb === 4 ? "is in an established relationship" : "has started seeing someone new"}, which changes the strategy but doesn't close the door.`);
  else if (rb === 2) parts.push("There may be someone else in the picture, so we'll factor that into the approach.");
  // No rebound = don't mention it

  // Readiness
  const rd = answers.readiness;
  if (rd >= 3) parts.push(`Emotionally, you're ${rd === 4 ? "in a tough place right now" : "struggling"} — and part of this process is getting you to a position of strength before we make any moves.`);
  else if (rd === 2) parts.push("You're in a stable headspace and ready for a plan — that's exactly where we need you.");
  else parts.push("You're ready to take action — that energy is an asset we can channel immediately.");

  return parts.join(" ");
}

function buildApproach(answers) {
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  if (total <= 10) return "Active reconnection coaching from day one. Benny builds your game plan immediately and guides every interaction in real time.";
  if (total <= 16) return "Strategic positioning first, then precision reconnection when the window opens. Benny monitors your situation and tells you exactly when and how to make each move.";
  return "Foundation work, strategic no-contact management with emergency support for critical moments, then precision reconnection when conditions are right.";
}

function getResult(total) {
  if (total <= 10) return {
    level: "STRAIGHTFORWARD",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
    glow: "rgba(52,211,153,0.15)",
    timeline: "1 – 3 months",
  };
  if (total <= 16) return {
    level: "MODERATE",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
    glow: "rgba(251,191,36,0.15)",
    timeline: "3 – 5 months",
  };
  return {
    level: "COMPLEX",
    color: "#F87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.25)",
    glow: "rgba(248,113,113,0.15)",
    timeline: "4 – 6+ months",
  };
}

const deliverables = [
  { icon: "🎯", title: "Onboarding Call", desc: "45-minute onboarding call with Benny" },
  { icon: "📞", title: "Weekly Group Coaching", desc: "Weekly group coaching calls with Benny" },
  { icon: "🔒", title: "Phase 1 — NC Quiet", desc: "Weekly 1:1 check-in with Benny + emergency WhatsApp access" },
  { icon: "⚡", title: "Phase 2 — Reconnection", desc: "Weekly 1:1 calls with Benny + full WhatsApp access + message review before every send" },
  { icon: "🤖", title: "Benny AI — 24/7", desc: "Real-time support between sessions" },
  { icon: "👥", title: "Community Access", desc: "Skool community with all call replays, lessons, and frameworks" },
  { icon: "📚", title: "Resource Library", desc: "Magnet Mode resource library" },
  { icon: "🏆", title: "Until the Outcome", desc: "Benny stays until the outcome — no monthly expiration" },
];

export default function DiagnosisPitch() {
  const [answers, setAnswers] = useState({});
  const [paymentPath, setPaymentPath] = useState("");
  const [splitView, setSplitView] = useState(null); // null | "2pay" | "3pay"
  const [mode, setMode] = useState("setup"); // setup | present
  const [revealStep, setRevealStep] = useState(0); // 0=factors, 1=result, 2=approach, 3=deliverables, 4=investment

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === factors.length && paymentPath !== "";
  const result = allAnswered ? getResult(totalScore) : null;
  const pricing = result ? pricingMatrix[result.level] : null;

  const handleSelect = (factorId, points) => {
    setAnswers({ ...answers, [factorId]: points });
  };

  const startPresentation = () => {
    setMode("present");
    setRevealStep(0);
  };

  const nextStep = () => {
    if (revealStep < 4) setRevealStep(revealStep + 1);
  };

  const prevStep = () => {
    if (revealStep > 0) setRevealStep(revealStep - 1);
  };

  const reset = () => {
    setAnswers({});
    setPaymentPath("");
    setSplitView(null);
    setMode("setup");
    setRevealStep(0);
  };

  // ─── SETUP MODE (closer only, not shared) ───
  if (mode === "setup") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0B0F1A",
        fontFamily: "'DM Sans', sans-serif",
        color: "#E0E0E0",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <style>{FONTS}</style>

        <div style={{
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.2)",
          borderRadius: 10,
          padding: "12px 20px",
          marginBottom: 30,
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
        }}>
          <span style={{ fontSize: 13, color: "#FBBF24", fontWeight: 500 }}>
            ⚙️ SETUP MODE — Fill this out during the call. Don't share screen yet.
          </span>
        </div>

        <div style={{ maxWidth: 700, width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Payment Path */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #1E2740",
            borderRadius: 12,
            padding: "16px 20px",
          }}>
            <div style={{ fontSize: 13, color: "#6C7A9B", marginBottom: 10, fontWeight: 500, letterSpacing: 0.5 }}>
              Payment Path
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Full Pay", "US Financing", "Non-US Split Pay"].map((opt) => {
                const selected = paymentPath === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setPaymentPath(opt)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: selected ? "1px solid #4A6CF7" : "1px solid #252D44",
                      background: selected ? "rgba(74,108,247,0.15)" : "transparent",
                      color: selected ? "#8BA3FF" : "#7A8AAD",
                      fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      fontWeight: selected ? 600 : 400,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {factors.map((factor) => (
            <div key={factor.id} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid #1E2740",
              borderRadius: 12,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 13, color: "#6C7A9B", marginBottom: 10, fontWeight: 500, letterSpacing: 0.5 }}>
                {factor.label}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {factor.options.map((opt) => {
                  const selected = answers[factor.id] === opt.points;
                  return (
                    <button
                      key={opt.points}
                      onClick={() => handleSelect(factor.id, opt.points)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: selected ? "1px solid #4A6CF7" : "1px solid #252D44",
                        background: selected ? "rgba(74,108,247,0.15)" : "transparent",
                        color: selected ? "#8BA3FF" : "#7A8AAD",
                        fontSize: 13,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        fontWeight: selected ? 600 : 400,
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <div style={{
              fontSize: 14,
              color: "#6C7A9B",
              marginBottom: 12,
            }}>
              Score: {totalScore}/24 → <span style={{ color: result.color, fontWeight: 600 }}>{result.level}</span> → <span style={{ color: "#FFF", fontWeight: 600 }}>{paymentPath}</span>
            </div>
            <button
              onClick={startPresentation}
              style={{
                padding: "14px 40px",
                background: "linear-gradient(135deg, #4A6CF7, #3B5BDB)",
                border: "none",
                borderRadius: 10,
                color: "#FFF",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              Start Presentation →
            </button>
          </div>
        )}

        <div style={{ marginTop: 20, fontSize: 11, color: "#2A3550" }}>
          Internal Tool — Not Visible to Prospect
        </div>
      </div>
    );
  }

  // ─── PRESENTATION MODE (shared with prospect) ───
  const selectedOptions = factors.map(f => {
    const pts = answers[f.id];
    const opt = f.options.find(o => o.points === pts);
    return { factor: f.label, selected: opt?.label || "", points: pts, color: pts <= 1 ? "#34D399" : pts <= 2 ? "#6CE4A0" : pts <= 3 ? "#FBBF24" : "#F87171" };
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B0F1A",
      fontFamily: "'DM Sans', sans-serif",
      color: "#E0E0E0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>
      <style>{FONTS}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 12,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "#4A5578",
          marginBottom: 14,
        }}>
          Coach Benny Lichtenwalner
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 38,
          fontWeight: 700,
          color: "#FFFFFF",
          margin: "0 0 6px 0",
          lineHeight: 1.15,
        }}>
          Your Situation Assessment
        </h1>
        <p style={{ fontSize: 15, color: "#5A6A8A", margin: 0 }}>
          Based on everything you've shared with us today
        </p>
      </div>

      <div style={{ maxWidth: 640, width: "100%" }}>

        {/* STEP 0: Situation Factors */}
        {revealStep >= 0 && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1A2240",
            borderRadius: 16,
            padding: "28px 28px 20px",
            marginBottom: 20,
            animation: revealStep === 0 ? "fadeIn 0.5s ease" : undefined,
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4A5578",
              marginBottom: 20,
              fontWeight: 600,
            }}>
              Your Situation
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {selectedOptions.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 10,
                  border: "1px solid #161D30",
                }}>
                  <span style={{ fontSize: 14, color: "#7A8AAD" }}>{item.factor}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, color: "#C0CCE0", fontWeight: 500 }}>{item.selected}</span>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}40`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Complexity Result */}
        {revealStep >= 1 && (
          <div style={{
            background: result.bg,
            border: `1px solid ${result.border}`,
            borderRadius: 16,
            padding: "32px 28px",
            marginBottom: 20,
            boxShadow: `0 0 40px ${result.glow}`,
            animation: "fadeIn 0.6s ease",
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4A5578",
              marginBottom: 14,
              fontWeight: 600,
            }}>
              Situation Complexity
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 32,
              fontWeight: 700,
              color: result.color,
              marginBottom: 16,
              letterSpacing: 1,
            }}>
              {result.level}
            </div>
            <p style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: "#A0AEC0",
              margin: 0,
            }}>
              {buildDescription(answers)}
            </p>
          </div>
        )}

        {/* STEP 2: Approach */}
        {revealStep >= 2 && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1A2240",
            borderRadius: 16,
            padding: "28px",
            marginBottom: 20,
            animation: "fadeIn 0.6s ease",
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4A5578",
              marginBottom: 14,
              fontWeight: 600,
            }}>
              Your Path Forward
            </div>
            <p style={{ fontSize: 15, color: "#C0CCE0", lineHeight: 1.7, margin: "0 0 16px 0" }}>
              {buildApproach(answers)}
            </p>
            <div style={{
              display: "flex",
              gap: 20,
              padding: "16px 0 0",
              borderTop: "1px solid #1A2240",
            }}>
              <div>
                <div style={{ fontSize: 11, color: "#4A5578", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Timeline</div>
                <div style={{ fontSize: 16, color: "#FFF", fontWeight: 600 }}>{result.timeline}</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: What's Included */}
        {revealStep >= 3 && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1A2240",
            borderRadius: 16,
            padding: "28px",
            marginBottom: 20,
            animation: "fadeIn 0.6s ease",
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4A5578",
              marginBottom: 20,
              fontWeight: 600,
            }}>
              What You Need
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {deliverables.map((d, i) => (
                <div key={i} style={{
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #161D30",
                  borderRadius: 10,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 20 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, color: "#D0D8E8", fontWeight: 600, marginBottom: 2 }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: "#6C7A9B", lineHeight: 1.4 }}>{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Investment */}
        {revealStep >= 4 && pricing && (
          <div style={{
            background: "linear-gradient(135deg, #111833 0%, #151D38 100%)",
            border: `1px solid ${result.border}`,
            borderRadius: 16,
            padding: "36px 28px",
            marginBottom: 20,
            textAlign: "center",
            boxShadow: `0 0 60px ${result.glow}`,
            animation: "fadeIn 0.6s ease",
          }}>
            <div style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4A5578",
              marginBottom: 8,
              fontWeight: 600,
            }}>
              Your Investment
            </div>

            {/* Main price display */}
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: 8,
              letterSpacing: -0.5,
            }}>
              ${(paymentPath === "Full Pay" ? pricing.fullPay : paymentPath === "US Financing" ? pricing.usFinancing.total : pricing.nonUS.total).toLocaleString()}
            </div>

            {paymentPath === "Full Pay" && (
              <div style={{ fontSize: 14, color: "#5A6A8A" }}>Paid in full</div>
            )}

            {paymentPath === "US Financing" && (
              <div style={{ fontSize: 14, color: "#5A6A8A" }}>Financed</div>
            )}

            {paymentPath === "Non-US Split Pay" && (
              <>
                <div style={{ fontSize: 14, color: "#5A6A8A", marginBottom: 16 }}>Payment plan</div>

                {/* Split toggle buttons — closer clicks to show breakdown */}
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 8 }}>
                  {["2pay", "3pay"].map((opt) => {
                    const active = splitView === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setSplitView(active ? null : opt)}
                        style={{
                          padding: "8px 20px",
                          borderRadius: 8,
                          border: active ? `1px solid ${result.color}` : "1px solid #1E2740",
                          background: active ? `${result.color}15` : "transparent",
                          color: active ? result.color : "#5A6A8A",
                          fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: active ? 600 : 400,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {opt === "2pay" ? "2 Payments" : "3 Payments"}
                      </button>
                    );
                  })}
                </div>

                {splitView && (
                  <div style={{
                    marginTop: 16,
                    padding: "16px 24px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid #1A2240",
                    borderRadius: 10,
                    animation: "fadeIn 0.3s ease",
                  }}>
                    <div style={{ fontSize: 14, color: "#C0CCE0", fontWeight: 500 }}>
                      ${(splitView === "2pay" ? pricing.nonUS.two : pricing.nonUS.three).toLocaleString()} × {splitView === "2pay" ? "2" : "3"}
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={{
              width: 60,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${result.color}, transparent)`,
              margin: "20px auto",
            }} />
            <p style={{
              fontSize: 16,
              color: "#8A9ABD",
              margin: "0 auto",
              maxWidth: 440,
              lineHeight: 1.7,
              fontFamily: "'Fraunces', serif",
            }}>
              One investment. Benny in your corner until you get them back.
            </p>
            <p style={{
              fontSize: 13,
              color: "#4A5578",
              margin: "16px auto 0",
              maxWidth: 400,
              lineHeight: 1.6,
            }}>
              No monthly fees. No renewals. No surprise charges.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          padding: "0 4px",
        }}>
          <button
            onClick={revealStep === 0 ? reset : prevStep}
            style={{
              padding: "10px 20px",
              background: "transparent",
              border: "1px solid #1E2740",
              borderRadius: 8,
              color: "#4A5578",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            {revealStep === 0 ? "← Back to Setup" : "← Previous"}
          </button>

          {/* Step indicators */}
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3, 4].map(s => (
              <div key={s} style={{
                width: s === revealStep ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: s <= revealStep ? result?.color || "#4A6CF7" : "#1E2740",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          {revealStep < 4 ? (
            <button
              onClick={nextStep}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #4A6CF7, #3B5BDB)",
                border: "none",
                borderRadius: 8,
                color: "#FFF",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={reset}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid #1E2740",
                borderRadius: 8,
                color: "#4A5578",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
              }}
            >
              New Assessment
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
