import React from "react";
import { OpenMascot } from "./NativeUI";
import { START_ICONS } from "./OnboardingIcons";
import { smooth } from "./motion";
import "./native/onboarding.css";
export const Onboarding = ({ t }: { t: number }) => {
  const selected = t >= 1.5;
  return (
    <div
      className="native onboard-screen"
      style={{ width: 1123, height: 724, minHeight: 724 }}
    >
      <header className="onboard-bar">
        <button className="onboard-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="m14 6-6 6 6 6" />
          </svg>
        </button>
        <div className="onboard-track">
          <span style={{ width: `${75 + 25 * smooth(t, 1.5, 1.95)}%` }} />
        </div>
      </header>
      <div className="onboard-question">
        <div className="onboard-talk">
          <div className="onboard-mascot onboard-small">
            <OpenMascot style={{ width: 100, height: 100 }} />
          </div>
          <div className="onboard-ask">Giờ mình bắt đầu từ đâu nè?</div>
        </div>
        <div className="onboard-choices">
          <div className="onboard-list onboard-wide">
            {[
              {
                id: "path",
                title: "Học từ đầu lộ trình",
                sub: "Bắt đầu ở Trạm 1 của khối, đi lần lượt từng trạm.",
              },
              {
                id: "mock",
                title: "Xác định trình độ",
                sub: "Vài câu ngắn. Làm tốt thì nhảy thẳng tới trạm hợp sức.",
              },
            ].map((c) => (
              <button
                key={c.id}
                className={`onboard-choice ${selected && c.id === "mock" ? "onboard-on" : ""}`}
              >
                <span className="onboard-glyph">{START_ICONS[c.id]}</span>
                <span className="onboard-choiceText">
                  {c.title}
                  <small>{c.sub}</small>
                </span>
                {c.id === "mock" && (
                  <span className="onboard-badge">GỢI Ý CHO EM</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className={`onboard-footer ${selected ? "onboard-ok" : ""}`}>
        <div className="onboard-footerInner">
          <span className="onboard-footNote">
            {selected ? "Làm vài câu để mình xếp trạm cho em." : ""}
          </span>
          <button
            className="onboard-next"
            disabled={!selected}
            style={
              t >= 2.7 && t < 2.84
                ? { transform: "translateY(5px)", boxShadow: "none" }
                : undefined
            }
          >
            XẾP LỘ TRÌNH
          </button>
        </div>
      </footer>
    </div>
  );
};
