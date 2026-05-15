import { useEffect, useRef, useState } from "react";

const PLANETS = [
  { name: "Merkuriy", color: "#a89880", r: 3.5,  orbitFrac: 0.17, period: 0.24,  tilt: 0.00 },
  { name: "Venera",   color: "#e8c87a", r: 5.5,  orbitFrac: 0.24, period: 0.62,  tilt: 0.04 },
  { name: "Yer",      color: "#3a8fff", r: 6,    orbitFrac: 0.31, period: 1.0,   tilt: 0.02 },
  { name: "Mars",     color: "#d9603a", r: 4.5,  orbitFrac: 0.38, period: 1.88,  tilt: 0.03 },
  { name: "Yupiter",  color: "#c8a46e", r: 13,   orbitFrac: 0.52, period: 11.86, tilt: 0.015 },
  { name: "Saturn",   color: "#e0c87a", r: 11,   orbitFrac: 0.63, period: 29.46, tilt: 0.035 },
  { name: "Uran",     color: "#7ad4e0", r: 8,    orbitFrac: 0.74, period: 84.0,  tilt: 0.01 },
  { name: "Neptun",   color: "#3050e8", r: 7.5,  orbitFrac: 0.85, period: 164.8, tilt: 0.02 },
];

const STAR_COUNT = 320;

function makeStars() {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    s: 0.3 + Math.random() * 1.4,
    a: 0.2 + Math.random() * 0.7,
    tw: Math.random() * Math.PI * 2,
  }));
}

function hex2rgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export default function SolarSystemAnimation() {
  const canvasRef = useRef(null);
  const speedRef = useRef(0.3);
  const [speed, setSpeed] = useState(0.3);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let W, H, cx, cy;
    let t = 0;
    let rafId;
    const stars = makeStars();
    const trails = PLANETS.map(() => []);

    function resize() {
      const wrap = canvas.parentElement;
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = Math.round(W * 0.56);
      canvas.style.height = H + "px";
      cx = W * 0.5;
      cy = H * 0.5;
      trails.forEach((tr) => (tr.length = 0));
    }

    function orbitR(p) {
      return Math.min(W, H) * 0.5 * p.orbitFrac;
    }

    function planetPos(p, time) {
      const angle = (time / p.period) * Math.PI * 2;
      const or = orbitR(p);
      return {
        x: cx + Math.cos(angle) * or,
        y: cy + Math.sin(angle) * or * (1 - p.tilt),
      };
    }

    function drawStars() {
      stars.forEach((s) => {
        const a = s.a * (0.65 + 0.35 * Math.sin(t * 0.9 + s.tw));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,225,255,${a})`;
        ctx.fill();
      });
    }

    function drawNebula() {
      const ng = ctx.createRadialGradient(cx * 0.6, cy * 0.7, 0, cx * 0.6, cy * 0.7, W * 0.35);
      ng.addColorStop(0, "rgba(30,10,80,0.12)");
      ng.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ng;
      ctx.fillRect(0, 0, W, H);

      const ng2 = ctx.createRadialGradient(cx * 1.4, cy * 1.2, 0, cx * 1.4, cy * 1.2, W * 0.3);
      ng2.addColorStop(0, "rgba(0,40,80,0.1)");
      ng2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ng2;
      ctx.fillRect(0, 0, W, H);
    }

    function drawSun() {
      const pulse = 1 + Math.sin(t * 1.4) * 0.025;
      const sr = Math.min(W, H) * 0.048 * pulse;

      const halo = ctx.createRadialGradient(cx, cy, sr * 0.5, cx, cy, sr * 4.5);
      halo.addColorStop(0, "rgba(255,200,80,0.12)");
      halo.addColorStop(0.4, "rgba(255,140,30,0.05)");
      halo.addColorStop(1, "rgba(255,80,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, sr * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      const corona = ctx.createRadialGradient(cx, cy, sr * 0.8, cx, cy, sr * 2);
      corona.addColorStop(0, "rgba(255,220,120,0.2)");
      corona.addColorStop(1, "rgba(255,120,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, sr * 2, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      for (let i = 0; i < 8; i++) {
        const ra = (i / 8) * Math.PI * 2 + t * 0.25;
        const rlen = sr * (1.25 + 0.18 * Math.sin(t * 2.1 + i * 1.3));
        const rw = sr * (0.06 + 0.03 * Math.sin(t + i));
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ra);
        ctx.beginPath();
        ctx.moveTo(sr * 0.88, -rw * 0.3);
        ctx.quadraticCurveTo(sr * 1.1, 0, rlen, 0);
        ctx.quadraticCurveTo(sr * 1.1, 0, sr * 0.88, rw * 0.3);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,210,80,${0.18 + 0.1 * Math.sin(t + i)})`;
        ctx.fill();
        ctx.restore();
      }

      const sg = ctx.createRadialGradient(cx - sr * 0.32, cy - sr * 0.32, 0, cx, cy, sr);
      sg.addColorStop(0, "#fff8d0");
      sg.addColorStop(0.35, "#ffe060");
      sg.addColorStop(0.7, "#ff9020");
      sg.addColorStop(1, "#cc5000");
      ctx.beginPath();
      ctx.arc(cx, cy, sr, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();
    }

    function drawOrbits() {
      PLANETS.forEach((p) => {
        const or = orbitR(p);
        ctx.beginPath();
        ctx.ellipse(cx, cy, or, or * (1 - p.tilt), 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,130,220,0.1)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    function drawPlanet(p, idx) {
      const pos = planetPos(p, t);
      const [pr, pg, pb] = hex2rgb(p.color);
      const trail = trails[idx];

      trail.push({ x: pos.x, y: pos.y });
      const maxTrail = Math.min(90, Math.round(80 / (speedRef.current + 0.1) * 0.7));
      if (trail.length > maxTrail) trail.shift();

      for (let i = 1; i < trail.length; i++) {
        const alpha = (i / trail.length) * 0.28;
        const a = trail[i - 1], b = trail[i];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${pr},${pg},${pb},${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 3);
      glow.addColorStop(0, `rgba(${pr},${pg},${pb},0.2)`);
      glow.addColorStop(1, `rgba(${pr},${pg},${pb},0)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      const lr = Math.min(255, pr + 90);
      const lg = Math.min(255, pg + 90);
      const lb = Math.min(255, pb + 90);
      const bodyGrad = ctx.createRadialGradient(
        pos.x - p.r * 0.32, pos.y - p.r * 0.32, 0,
        pos.x, pos.y, p.r
      );
      bodyGrad.addColorStop(0, `rgb(${lr},${lg},${lb})`);
      bodyGrad.addColorStop(0.5, p.color);
      bodyGrad.addColorStop(1, `rgba(${Math.round(pr * 0.4)},${Math.round(pg * 0.4)},${Math.round(pb * 0.4)},1)`);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      if (p.name === "Saturn") {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(1, 0.32);
        [
          { r: p.r * 1.9,  lw: 3.5, a: 0.55 },
          { r: p.r * 2.55, lw: 2.5, a: 0.32 },
          { r: p.r * 3.1,  lw: 1.5, a: 0.18 },
        ].forEach((ring) => {
          ctx.beginPath();
          ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(224,200,120,${ring.a})`;
          ctx.lineWidth = ring.lw;
          ctx.stroke();
        });
        ctx.restore();
      }

      if (p.name === "Yer") {
        const ma = (t / 0.075) * Math.PI * 2;
        const mr = p.r * 3.2;
        const mx = pos.x + Math.cos(ma) * mr;
        const my = pos.y + Math.sin(ma) * mr * 0.6;
        ctx.beginPath();
        ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,215,235,0.88)";
        ctx.fill();
        const moonGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 4);
        moonGlow.addColorStop(0, "rgba(200,215,235,0.15)");
        moonGlow.addColorStop(1, "rgba(200,215,235,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = moonGlow;
        ctx.fill();
      }
    }

    function frame() {
      ctx.fillStyle = "#04080f";
      ctx.fillRect(0, 0, W, H);
      drawNebula();
      drawStars();
      drawOrbits();
      drawSun();
      PLANETS.forEach((p, i) => drawPlanet(p, i));
      t += 0.009 * speedRef.current;
      rafId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        background: "#04080f",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        fontFamily: "monospace",
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 18px",
          background: "#060c18",
          borderBottom: "1px solid rgba(0,150,255,0.07)",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{ width: 11, height: 11, borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            letterSpacing: 2,
            color: "rgba(100,190,255,0.45)",
          }}
        >
          SOLAR_SYSTEM_SIMULATION_V2.0
        </div>
        <div
          style={{
            background: "rgba(0,200,255,0.07)",
            border: "1px solid rgba(0,200,255,0.18)",
            color: "rgba(0,200,255,0.55)",
            fontSize: 9,
            letterSpacing: 1.5,
            padding: "3px 9px",
            borderRadius: 4,
          }}
        >
          LIVE
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%" }} />

        {/* Speed Slider */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            width: "55%",
          }}
        >
          <input
            type="range"
            min="0.05"
            max="5"
            step="0.05"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              width: "100%",
              height: 3,
              borderRadius: 2,
              background: "linear-gradient(90deg,#a78bfa,#7c3aed)",
              outline: "none",
              cursor: "pointer",
            }}
          />
          <style>{`
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 18px; height: 18px;
              border-radius: 50%;
              background: radial-gradient(circle at 40% 35%, #c4b5fd, #7c3aed);
              border: 2px solid rgba(167,139,250,0.6);
              cursor: pointer;
              box-shadow: 0 0 10px rgba(139,92,246,0.6);
            }
            input[type=range]::-moz-range-thumb {
              width: 18px; height: 18px;
              border-radius: 50%;
              background: radial-gradient(circle at 40% 35%, #c4b5fd, #7c3aed);
              border: 2px solid rgba(167,139,250,0.6);
              cursor: pointer;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
