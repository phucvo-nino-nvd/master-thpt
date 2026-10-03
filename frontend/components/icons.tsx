import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const line = ({ size = 20, ...props }: IconProps) => ({
	width: size,
	height: size,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 2,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
	'aria-hidden': true,
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

export const PencilIcon = (p: IconProps) => (
	<svg {...line({ size: 16, ...p })}>
		<path d="M12 20h9" />
		<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
	</svg>
);

export const TargetIcon = (p: IconProps) => (
	<svg {...line(p)}>
		<circle cx="12" cy="12" r="10" />
		<circle cx="12" cy="12" r="6" />
		<circle cx="12" cy="12" r="2" />
	</svg>
);

export const BookmarkIcon = ({ size = 18, filled, ...p }: IconProps & { filled?: boolean }) => (
	<svg {...line({ size, fill: filled ? 'var(--gold-soft)' : 'none', stroke: filled ? 'var(--gold-ink)' : 'var(--soft)', ...p })}>
		<path d="M6 3h12v18l-6-4-6 4z" />
	</svg>
);

export const FlameIcon = (p: IconProps) => (
	<svg {...line({ color: 'var(--coral)', ...p })}>
		<path d="M12 3c1 4 7 6 7 12a7 7 0 0 1-14 0c0-3 1.5-5 3-6 .2 2 1.2 3.3 3 4 0-4 .2-7 1-10Z" />
	</svg>
);

export const BoltIcon = (p: IconProps) => (
	<svg {...line({ color: 'var(--gold-ink)', ...p })}>
		<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
	</svg>
);

export const CrownIcon = (p: IconProps) => (
	<svg {...line({ color: 'var(--gold-ink)', ...p })}>
		<path d="m3 6 4.5 4L12 3l4.5 7L21 6l-2 11H5ZM5 21h14" />
	</svg>
);

export const TrophyIcon = (p: IconProps) => (
	<svg {...line({ size: 48, color: 'var(--gold-ink)', ...p })}>
		<path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 2v4m-4 3v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1ZM6 21h12" />
	</svg>
);
