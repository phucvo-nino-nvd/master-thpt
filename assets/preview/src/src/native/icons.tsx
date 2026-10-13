import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const line = ({ size = 20, ...props }: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const SunIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const RouteIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M9 6h8a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h8" />
  </svg>
);

export const BookIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const ChecklistIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="m7 9 1 1 2-2m-3 7 1 1 2-2m3-5h4m-4 6h4" />
  </svg>
);

export const HistoryIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2" />
  </svg>
);

export const GearIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="m9 3-.5 2a8 8 0 0 0-2 1.2l-2-.6-2 3.4L4 10.5a8 8 0 0 0 0 3l-1.5 1.5 2 3.4 2-.6a8 8 0 0 0 2 1.2l.5 2h6l.5-2a8 8 0 0 0 2-1.2l2 .6 2-3.4-1.5-1.5a8 8 0 0 0 0-3L21.5 9l-2-3.4-2 .6a8 8 0 0 0-2-1.2L15 3z" />
  </svg>
);

export const LogoutIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...line({ size: 14, ...p })}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...line({ size: 14, ...p })}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...line({ size: 24, ...p })}>
    <rect x="4" y="11" width="16" height="10" rx="2.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...line(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const AgentIcon = (p: IconProps) => (
  <svg {...line({ stroke: "none", ...p })}>
    <defs>
      <linearGradient id="agent-shell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7B79FF" />
        <stop offset="1" stopColor="#4A48E8" />
      </linearGradient>
    </defs>
    <path
      d="M9.4 3.4Q12 -.6 14.6 3.4L22.8 17.4Q25 21.8 20 22H4Q-1 21.8 1.2 17.4Z"
      fill="url(#agent-shell)"
    />
    <rect x="8" y="11.2" width="3" height="6.6" rx="1.5" fill="#fff" />
    <rect x="13" y="11.2" width="3" height="6.6" rx="1.5" fill="#fff" />
  </svg>
);

export const PencilIcon = (p: IconProps) => (
  <svg {...line({ size: 16, ...p })}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

export const BookmarkIcon = ({
  size = 18,
  filled,
  ...p
}: IconProps & { filled?: boolean }) => (
  <svg
    {...line({
      size,
      fill: filled ? "var(--gold-soft)" : "none",
      stroke: filled ? "var(--gold-ink)" : "var(--soft)",
      ...p,
    })}
  >
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...line({ stroke: "none", ...p })}>
    <defs>
      <linearGradient id="flame-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFA24D" />
        <stop offset="0.6" stopColor="#FF7A1F" />
        <stop offset="1" stopColor="#F2541B" />
      </linearGradient>
    </defs>
    <path
      d="M12.4 1.8Q13.4 1.2 14 2.2C15.4 5 20 8.2 20 14.6A8 8 0 0 1 4 14.6C4 11.4 5.4 9.2 7 7.8Q7.9 7.1 8.2 8.2Q8.6 10 9.8 10.8C9.6 7.4 10.6 3.6 12.4 1.8Z"
      fill="url(#flame-shine)"
    />
    <path
      d="M11.6 12.6Q12 12.1 12.5 12.6C13.8 14 15.6 15.2 15.6 17.6A3.6 3.6 0 0 1 8.4 17.6C8.4 15.6 10 14.2 11.6 12.6Z"
      fill="#FFE066"
    />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...line({ stroke: "none", ...p })}>
    <defs>
      <linearGradient id="bolt-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE066" />
        <stop offset="0.55" stopColor="#FFC21A" />
        <stop offset="1" stopColor="#F5A300" />
      </linearGradient>
    </defs>
    <path
      d="M10.2 13.8H6Q4 13.8 5 12Q8.2 6.2 13.6 2.4C15 .9 17.8 1.6 17 3.8Q16.4 6.8 14.6 9.4Q14.3 10 15 10H19.2Q21.2 10 20.2 11.8Q17 17.6 11.6 21.4C10.2 22.9 7.4 22.2 8.2 20Q8.8 17 10.6 14.4Q10.9 13.8 10.2 13.8Z"
      fill="url(#bolt-shine)"
    />
    <path
      d="M13.8 4.4Q11 6.6 8.8 10.2"
      stroke="#fff"
      strokeWidth="1.8"
      opacity="0.75"
    />
  </svg>
);

export const CrownIcon = (p: IconProps) => (
  <svg {...line({ color: "var(--gold-ink)", ...p })}>
    <path d="m3 6 4.5 4L12 3l4.5 7L21 6l-2 11H5ZM5 21h14" />
  </svg>
);

export const StopwatchIcon = (p: IconProps) => (
  <svg {...line({ stroke: "none", ...p })}>
    <defs>
      <linearGradient id="stopwatch-shell" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5CD0FF" />
        <stop offset="1" stopColor="#1C9BE6" />
      </linearGradient>
    </defs>
    <rect
      x="9"
      y="1.4"
      width="6"
      height="2.8"
      rx="1.2"
      fill="url(#stopwatch-shell)"
    />
    <rect x="11" y="3.6" width="2" height="2.6" fill="url(#stopwatch-shell)" />
    <circle cx="12" cy="14" r="8.6" fill="url(#stopwatch-shell)" />
    <circle cx="12" cy="14" r="6.2" fill="#E8F7FF" />
    <path d="M12 14V7.8A6.2 6.2 0 0 0 5.8 14Z" fill="#BFE9FF" />
    <path
      d="M12 14L14.8 16.6"
      stroke="#1C9BE6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="14" r="1.2" fill="#1C9BE6" />
  </svg>
);

export const TrophyIcon = (p: IconProps) => (
  <svg {...line({ size: 48, stroke: "none", ...p })}>
    <defs>
      <linearGradient id="trophy-cup" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE066" />
        <stop offset="0.55" stopColor="#FFC21A" />
        <stop offset="1" stopColor="#F5A300" />
      </linearGradient>
      <linearGradient id="trophy-arm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFAA5C" />
        <stop offset="1" stopColor="#F0761E" />
      </linearGradient>
      <linearGradient id="trophy-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7A76A0" />
        <stop offset="1" stopColor="#4E4A6B" />
      </linearGradient>
    </defs>
    <path
      d="M7 5.2H4.4Q2.6 5.2 3 7.4Q3.6 10.8 7.6 12.4M17 5.2H19.6Q21.4 5.2 21 7.4Q20.4 10.8 16.4 12.4"
      stroke="url(#trophy-arm)"
      strokeWidth="1.9"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M10.5 13.6H13.5L13.1 18.4H10.9Z" fill="url(#trophy-arm)" />
    <path
      d="M6.6 2.4H17.4Q18.4 2.4 18.3 3.4L17.6 10.4Q17.2 14.4 12 14.4Q6.8 14.4 6.4 10.4L5.7 3.4Q5.6 2.4 6.6 2.4Z"
      fill="url(#trophy-cup)"
    />
    <path
      d="M12.00 4.50L12.85 6.43L14.95 6.64L13.38 8.05L13.82 10.11L12.00 9.05L10.18 10.11L10.62 8.05L9.05 6.64L11.15 6.43Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    <path
      d="M8.4 18H15.6Q16.6 18 16.8 19L17.2 21.2Q17.4 22.4 16.2 22.4H7.8Q6.6 22.4 6.8 21.2L7.2 19Q7.4 18 8.4 18Z"
      fill="url(#trophy-base)"
    />
    <path
      d="M9.9 19.7H14.1L14.4 20.9H9.6Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth="0.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const ForwardIcon = (p: IconProps) => (
  <svg {...line({ fill: "currentColor", strokeWidth: 2.4, ...p })}>
    <path d="M3 6v12l8-6ZM12 6v12l8-6Z" />
  </svg>
);
