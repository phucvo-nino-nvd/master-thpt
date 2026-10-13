import React, { ReactNode } from "react";
export const START_ICONS: Record<string, ReactNode> = {
  path: (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="7" y="4" width="34" height="40" rx="4" fill="#FFB21E" />
      <rect x="7" y="4" width="6" height="40" rx="3" fill="#F29A0C" />
      <rect x="35" y="8" width="3" height="32" rx="1.5" fill="#FFF3C4" />
      <path d="M15 2h8v14l-4-3-4 3z" fill="#F2542D" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#B86A00"
      >
        1
      </text>
    </svg>
  ),
  mock: (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="#1C9BE6" />
      <circle cx="24" cy="24" r="16" fill="#fff" />
      <path d="M33 15L27 27 21 21z" fill="#F2542D" />
      <path d="M15 33L21 21 27 27z" fill="#C5C9D6" />
      <circle cx="24" cy="24" r="1.8" fill="#fff" />
    </svg>
  ),
};
