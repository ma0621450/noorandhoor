import { Search, Users, Handshake, FileText, ClipboardCheck } from "lucide-react";

/** Figma Group 804 — 681.17 × 365.95 */
const GW = 681.17;
const GH = 365.95;
const WELL = 74;
const WELL_R = WELL / 2;

const STEPS = [
  {
    step: "01",
    title: "Property Search & Consultation",
    Icon: Search,
    hub: { x: 84.9, y: 177.0 },
    side: "bottom",
    labelW: 158,
    numY: 268.4,
    titleY: 326.0,
    lineY1: 237.8,
    lineY2: 287.4,
  },
  {
    step: "02",
    title: "Financial Pre Approval",
    Icon: Users,
    hub: { x: 213.4, y: 235.8 },
    side: "top",
    labelW: 163,
    numY: 0.5,
    titleY: 49.7,
    lineY1: 119.2,
    lineY2: 168.7,
  },
  {
    step: "03",
    title: "Property Search & Consultation",
    Icon: Handshake,
    hub: { x: 341.3, y: 178.9 },
    side: "bottom",
    labelW: 140,
    numY: 268.4,
    titleY: 318.1,
    lineY1: 237.8,
    lineY2: 287.4,
  },
  {
    step: "04",
    title: "Signing (Final Documents & Legal Process)",
    Icon: FileText,
    hub: { x: 470.2, y: 235.8 },
    side: "top",
    labelW: 188,
    numY: 0,
    titleY: 49.7,
    lineY1: 119.2,
    lineY2: 168.7,
    titleLeading: "16px",
  },
  {
    step: "05",
    title: "Transfer & Handover",
    Icon: ClipboardCheck,
    hub: { x: 599.2, y: 177.6 },
    side: "bottom",
    labelW: 147,
    numY: 268.4,
    titleY: 318.1,
    lineY1: 237.8,
    lineY2: 287.4,
  },
];

function pct(n, total) {
  return `${(n / total) * 100}%`;
}

function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function ribbonDiscs() {
  const hubs = STEPS.map((s) => s.hub);
  const discs = hubs.map((h) => ({ ...h, r: 48 }));

  for (let i = 0; i < hubs.length - 1; i++) {
    const a = hubs[i];
    const b = hubs[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const p1 = { x: a.x + dx * 0.32, y: a.y + dy * 0.12 };
    const p2 = { x: a.x + dx * 0.68, y: b.y - dy * 0.12 };
    for (let t = 0; t <= 1; t += 0.04) {
      discs.push({ ...cubic(a, p1, p2, b, t), r: 20 });
    }
  }
  return discs;
}

function WaveSvg() {
  const discs = ribbonDiscs();
  const hubs = STEPS.map((s) => s.hub);

  return (
    <svg
      viewBox={`0 0 ${GW} ${GH}`}
      className="absolute inset-0 h-full w-full overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="rpGold"
          gradientUnits="userSpaceOnUse"
          x1={hubs[0].x}
          y1="0"
          x2={hubs[4].x}
          y2="0"
        >
          <stop offset="13.91%" stopColor="#EEC876" />
          <stop offset="86.09%" stopColor="#B3813D" />
        </linearGradient>
        <filter id="rpGoo" x="-35%" y="-70%" width="170%" height="240%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
          />
        </filter>
        <filter id="rpShadow" x="-30%" y="-70%" width="160%" height="240%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#rpShadow)">
        <g filter="url(#rpGoo)" fill="url(#rpGold)">
          {discs.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      </g>

      {/* Connectors — stop short of the gold ring (no overlay on hubs) */}
      {STEPS.map(({ step, hub, lineY1, lineY2 }) => (
        <line
          key={`line-${step}`}
          x1={hub.x}
          y1={lineY1}
          x2={hub.x}
          y2={lineY2}
          stroke="#F5F5F5"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function DesktopProcess() {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[681px] md:block"
      style={{ aspectRatio: `${GW} / ${GH}` }}
    >
      <WaveSvg />

      {STEPS.map(({ step, title, Icon, hub, labelW, numY, titleY, titleLeading }) => (
        <div key={step}>
          {/* Perfect circle: both axes sized from the same stage unit */}
          <div
            className="absolute z-10 flex items-center justify-center rounded-full bg-[#111111] shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
            style={{
              left: pct(hub.x - WELL_R, GW),
              top: pct(hub.y - WELL_R, GH),
              width: pct(WELL, GW),
              height: pct(WELL, GH),
            }}
          >
            <Icon className="h-[43%] w-[43%] text-[#F5F5F5]" strokeWidth={2.67} />
          </div>

          <p
            className="font-josefin absolute z-10 -translate-x-1/2 text-center text-[clamp(1.75rem,6.58vw,2.801rem)] font-bold leading-none text-[#E9C349]"
            style={{
              left: pct(hub.x, GW),
              top: pct(numY, GH),
              width: pct(labelW, GW),
            }}
          >
            {step}
          </p>

          <p
            className="absolute z-10 -translate-x-1/2 text-center text-[clamp(0.65rem,2.05vw,0.875rem)] font-semibold text-[#F5F5F5]"
            style={{
              left: pct(hub.x, GW),
              top: pct(titleY, GH),
              width: pct(labelW, GW),
              lineHeight: titleLeading || "20px",
            }}
          >
            {title}
          </p>
        </div>
      ))}
    </div>
  );
}

function MobileProcess() {
  return (
    <div className="mx-auto flex max-w-[320px] flex-col md:hidden">
      {STEPS.map(({ step, title, Icon }, index) => (
        <div key={step} className="relative flex gap-4 pb-9 last:pb-0">
          {index < STEPS.length - 1 && (
            <div className="absolute bottom-0 left-[27px] top-[56px] w-[4px] rounded-full bg-gradient-to-b from-[#EEC876] to-[#B3813D]" />
          )}
          <div className="relative z-10 flex size-[56px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#EEC876] to-[#B3813D] p-[5px] shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
            <div className="flex size-full items-center justify-center rounded-full bg-[#111]">
              <Icon className="h-6 w-6 text-[#F5F5F5]" strokeWidth={2.5} />
            </div>
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="font-josefin text-[32px] font-bold leading-none text-[#E9C349]">{step}</p>
            <p className="mt-1.5 text-sm font-semibold leading-5 text-[#F5F5F5]">{title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RentingProcess() {
  return (
    <section className="section-full pt-12 sm:pt-14 lg:pt-16">
      <div className="w-full rounded-t-[20px] bg-[#252525] px-4 pb-16 pt-12 sm:px-6 sm:pt-14 lg:px-10">
        <div className="mx-auto flex w-full max-w-[1119px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-10">
            <h2 className="text-gold-gradient text-center text-[clamp(1.75rem,4vw,2.875rem)] leading-[1.04] lg:text-[46px] lg:leading-[48px]">
              Renting Process (Step-By-Step)
            </h2>
            <DesktopProcess />
            <MobileProcess />
          </div>
        </div>
      </div>
    </section>
  );
}
