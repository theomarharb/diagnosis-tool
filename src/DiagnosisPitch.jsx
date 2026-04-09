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

function getResult(total) {
  if (total <= 10) return {
    level: "STRAIGHTFORWARD",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.25)",
    glow: "rgba(52,211,153,0.15)",
    price: "$3,500 – $4,000",
    timeline: "1 – 3 months",
    description: "Strong fundamentals. You're in contact or close to it, the breakup is recent, and there aren't major complications blocking the path. This is about precision and timing — doing the right things at the right moments.",
    approach: "Active reconnection coaching from day one. Benny builds your game plan immediately and guides every interaction in real time.",
  };
  if (total <= 16) return {
    level: "MODERATE",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
    glow: "rgba(251,191,36,0.15)",
    price: "$4,000 – $5,000",
    timeline: "3 – 5 months",
    description: "Your situation has layers — a period of no contact, a rebound relationship, or emotional work that needs to happen before reconnection. There's a clear path, but it requires strategic patience and expert timing.",
    approach: "Strategic positioning first, then precision reconnection when the window opens. Benny monitors your situation and tells you exactly when and how to make each move.",
  };
  return {
    level: "COMPLEX",
    color: "#F87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.25)",
    glow: "rgba(248,113,113,0.15)",
    price: "$5,000 – $6,500",
    timeline: "4 – 6+ months",
    description: "Multiple layers — long history, deep no contact, children or divorce proceedings, an established rebound, or significant emotional recovery needed. This requires Benny's full strategic involvement across a longer timeline.",
    approach: "Foundation work, strategic no-contact management with emergency support for critical moments, then precision reconnection when conditions are right.",
  };
}

const deliverables = [
  { icon: "🎯", title: "1-on-1 Onboarding", desc: "Deep-dive with Benny into your specific situation" },
  { icon: "📞", title: "Weekly Group Coaching", desc: "Live calls with Benny + Kobi (behavioral analysis)" },
  { icon: "💬", title: "Direct Access to Benny", desc: "WhatsApp for real-time guidance when moments happen" },
  { icon: "📝", title: "Message Review", desc: "Benny reviews every text before you send it to your ex" },
  { icon: "🤖", title: "Benny AI — 24/7", desc: "Instant support between sessions, any time of day" },
  { icon: "👥", title: "Private Community", desc: "Support from others going through the same process" },
  { icon: "📚", title: "Full Resource Library", desc: "Attachment styles, NC strategy, reconnection playbooks" },
  { icon: "⚡", title: "Scales When It Matters", desc: "Weekly 1:1 calls activate when reconnection goes live" },
];

export default function DiagnosisPitch() {
  const [answers, setAnswers] = useState({});
  const [mode, setMode] = useState("setup"); // setup | present
  const [revealStep, setRevealStep] = useState(0); // 0=factors, 1=result, 2=approach, 3=deliverables, 4=investment

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === factors.length;
  const result = allAnswered ? getResult(totalScore) : null;

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
              Score: {totalScore}/24 → <span style={{ color: result.color, fontWeight: 600 }}>{result.level}</span> → <span style={{ color: "#FFF", fontWeight: 600 }}>{result.price}</span>
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
              {result.description}
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
              {result.approach}
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
              What You Get
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
        {revealStep >= 4 && (
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
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 44,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: 8,
              letterSpacing: -0.5,
            }}>
              {result.price}
            </div>
            <div style={{
              width: 60,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${result.color}, transparent)`,
              margin: "16px auto",
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
              Payment plans available.
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
