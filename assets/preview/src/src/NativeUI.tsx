import { Warrior } from "./Warrior";
import React, { useLayoutEffect, useRef } from "react";
import { Img, staticFile } from "remotion";
import { ease } from "./motion";
import { Variation } from "./ui";
import {
  SunIcon,
  RouteIcon,
  BookIcon,
  ChecklistIcon,
  HistoryIcon,
  LockIcon,
  CheckIcon,
  BoltIcon,
  TrophyIcon,
  AgentIcon,
  StopwatchIcon,
  ChevronUpIcon,
} from "./native/icons";
import "./native/nav.css";
import "./native/rail.css";
import "./native/path.css";
import "./native/proc.css";
import "./native/exam.css";
import "./native/tutor.css";
import "./native/tokens.css";
export const OpenMascot = ({ style }: { style?: React.CSSProperties }) => (
  <Img
    src={staticFile("brand/mascot-eyes-open.png")}
    style={{
      width: 180,
      height: 180,
      objectFit: "contain",
      mixBlendMode: "multiply",
      ...style,
    }}
  />
);
export const Sidebar = () => (
  <nav className="nav-nav" style={{ width: 232, height: "100%" }}>
    <div className="nav-brand">
      <span className="nav-mark">M</span>MASTER THPT
    </div>
    {[
      ["Hôm nay", SunIcon],
      ["Lộ trình", RouteIcon],
      ["Kho đề thi", BookIcon],
      ["Nhiệm vụ", ChecklistIcon],
      ["Lịch sử", HistoryIcon],
    ].map(([label, I]: any) => (
      <div
        key={label}
        className={"nav-link " + (label === "Lộ trình" ? "nav-active" : "")}
      >
        <I />
        {label}
      </div>
    ))}
    <div className="nav-account">
      <div className="nav-card">
        <span className="nav-avatar" style={{ background: "#4a48e8" }}>
          PV
        </span>
        <span className="nav-name">PHUC VO</span>
        <ChevronUpIcon />
      </div>
    </div>
  </nav>
);
export const Rail = () => (
  <aside className="rail-rail" style={{ height: "100%" }}>
    <div className="rail-pills">
      <div className="rail-pill rail-xp">
        <BoltIcon />
        12 XP
      </div>
    </div>
    <div className="rail-streak">
      <div className="rail-streakHead">
        <div className="rail-streakArt">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <path
              d="M35 5c-4 15-18 30-17 45 1 21 36 21 37 0 0-11-8-22-13-31l-5 12Z"
              fill="#ffb21e"
            />
            <path
              d="M35 27c-3 13-11 20-10 27 1 12 22 12 23 0 1-9-5-17-7-23l-4 11Z"
              fill="#ffe08a"
            />
            <text
              x="35"
              y="58"
              textAnchor="middle"
              fontSize="22"
              fontWeight="800"
              fill="#e99c00"
            >
              1
            </text>
          </svg>
        </div>
        <div>
          <div className="rail-streakDays">1 ngày liền</div>
          <div className="rail-streakCopy">
            Giữ lửa xong cho hôm nay.
            <br />
            Mai quay lại nha.
          </div>
        </div>
      </div>
      <div className="rail-week">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
          <div key={d} className="rail-day">
            {d}
            <span className={"rail-dot " + (!i ? "rail-done" : "")}>
              {!i && <CheckIcon />}
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="rail-card">
      <div className="rail-cardHead">
        Nhiệm vụ hằng ngày<span className="rail-badge">Còn 4 tiếng</span>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className={"rail-task " + (i ? "rail-indigo" : "")}>
          <span className="rail-taskIcon">
            {i ? <TrophyIcon size={30} /> : <BoltIcon size={34} />}
          </span>
          <div className="rail-taskBody">
            <div className="rail-taskTitle">
              {i
                ? "Trả lời đúng 3 câu liên tiếp · +30 XP"
                : "Trả lời đúng 13 câu · +52 XP"}
            </div>
            <div className="rail-bar">
              <span className="rail-track">
                <span
                  className="rail-fill"
                  style={{ width: i ? "67%" : "23%" }}
                />
              </span>
              <span className="rail-num">{i ? "2 / 3" : "3 / 13"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <section className="proc-card" aria-label="Tiến trình">
      <button className="rail-task proc-summary">
        <span className="rail-taskIcon" style={{ background: "#e3f5ff" }}>
          <StopwatchIcon size={30} />
        </span>
        <span className="rail-taskBody">
          <span className="rail-taskTitle proc-summaryTitle">
            Chờ duyệt nguồn · 1 nguồn chờ duyệt
            <ChevronUpIcon size={16} className="proc-caret proc-open" />
          </span>
          <span className="rail-bar">
            <span className="rail-track">
              <span
                className="rail-fill"
                style={{ width: "75%", background: "#29B0F2" }}
              />
            </span>
            <span className="rail-num">3 / 4</span>
          </span>
        </span>
      </button>
    </section>
  </aside>
);
export const Stage = ({
  placement = false,
  bomb = true,
  t = 5,
}: {
  placement?: boolean;
  bomb?: boolean;
  t?: number;
}) => (
  <main className="path-main" style={{ height: "100%", overflow: "hidden" }}>
    <div className="path-top">
      <div className="path-header">
        <div>
          <div className="path-headerKicker">CHẶNG 1 · ĐANG THỰC HIỆN</div>
          <h1 className="path-headerTitle">
            ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ
          </h1>
        </div>
        <div className="path-headerSide">
          <span className="path-headerCount">0/6 trạm</span>
          <span className="path-headerBar" />
        </div>
      </div>
    </div>
    <div className="path-scroll" style={{ paddingTop: 22, overflow: "hidden" }}>
      {placement && (
        <div className="path-start">
          <div className="path-startBody">
            <div className="path-startKicker">BÀI XÁC ĐỊNH TRÌNH ĐỘ</div>
            <div className="path-startTitle">Lộ trình Lớp 12</div>
            <div className="path-startCopy">
              Làm vài câu để mình xếp trạm hợp sức cho em.
            </div>
          </div>
          <div className="path-startGo">LÀM BÀI XÁC ĐỊNH →</div>
        </div>
      )}
      <div className="path-divider">
        Chặng 1 · ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ
      </div>
      <div className="path-map" style={{ height: 850 }}>
        <svg
          width="720"
          height="800"
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
        >
          <path
            d="M370 248C370 337 150 337 150 426S370 515 370 604S150 693 150 782"
            className="path-path"
            stroke="#d3d6e0"
          />
          {bomb ? (
            <>
              <path
                d="M150 70C150 114.5 546 114.5 546 159"
                className="path-path"
                stroke="#f2542d"
                style={{ opacity: ease(t, 0.3, 0.9) }}
              />
              <path
                d="M546 159C546 203.5 370 203.5 370 248"
                className="path-path"
                stroke="#d3d6e0"
              />
            </>
          ) : (
            <path
              d="M150 70C150 159 370 159 370 248"
              className="path-path"
              stroke="#d3d6e0"
            />
          )}
        </svg>
        {[
          [150, 70],
          [370, 248],
          [150, 426],
          [370, 604],
        ].map(([x, y], i) => (
          <div key={i} className="path-node" style={{ left: x, top: y }}>
            <div
              className={
                "path-press path-station " +
                (!i && bomb ? "path-fail" : "path-locked")
              }
            >
              {!i && bomb ? "!" : <LockIcon size={24} />}
            </div>
          </div>
        ))}
        {bomb && (
          <div
            className="path-node"
            style={{ left: 546, top: 159, opacity: ease(t, 0.5, 1) }}
          >
            <div className="path-bomb">
              <Img
                src={staticFile("brand/bomb.png")}
                style={{
                  width: 96,
                  height: 84,
                  objectFit: "contain",
                  display: "block",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            <div className="path-label path-blocked path-left">
              <span className="path-labelName">
                Bom ôn tập: Tính đơn điệu và cực trị của hàm số
              </span>
              <span className="path-labelSub">Gỡ bom · 6 câu</span>
            </div>
          </div>
        )}
        <OpenMascot
          style={{
            position: "absolute",
            left: 455,
            top: 340,
            width: 180,
            height: 180,
          }}
        />
      </div>
    </div>
  </main>
);
export const NativeApp = ({
  placement = false,
  t = 5,
  dock = true,
}: {
  placement?: boolean;
  t?: number;
  dock?: boolean;
}) => (
  <div
    className="native"
    style={{
      position: "relative",
      width: 1440,
      height: 780,
      display: "grid",
      gridTemplateColumns: "232px minmax(0,1fr) 348px",
      background: "#fbfbf8",
      overflow: "hidden",
    }}
  >
    <Sidebar />
    <Stage placement={placement} bomb={!placement} t={t} />
    <Rail />
    {dock && (
      <div style={{ position: "absolute", right: 40, bottom: 24, width: 300 }}>
        <CreateDock />
      </div>
    )}
  </div>
);
export const CreateDock = ({ authoring = false }: { authoring?: boolean }) => (
  <div className="proc-dock">
    <span className="proc-spark">
      <AgentIcon size={28} />
    </span>
    <span className="proc-dockBody">
      <strong>Tạo đề thi</strong>
      <small>
        {authoring
          ? "Đang soạn: Cực trị hàm số"
          : "Gom hoặc soạn câu theo ý em"}
      </small>
    </span>
    <ChevronUpIcon size={28} className="proc-chevron proc-open" />
  </div>
);
export const CreateWidget = ({ t = 0 }: { t?: number }) => {
  const typed = "Cực trị hàm số";
  const ready = t >= 3.05;
  const sent = t >= 1.65;
  const authoring = sent && !ready;
  return (
    <div
      className="native"
      style={{ position: "relative", width: 300, height: 400 }}
    >
      <section
        className="proc-panel"
        style={{
          position: "absolute",
          bottom: 84,
          maxHeight: "none",
          overflow: "visible",
        }}
      >
        <div className="proc-head">
          <h2>Tạo đề thi</h2>
          <div className="proc-collapse">
            Thu gọn <ChevronUpIcon size={16} />
          </div>
        </div>
        <p className="proc-context">
          Gom câu có sẵn trong kho, chưa đủ thì trợ lý tự soạn thêm cho em.
        </p>
        <div className="proc-search">
          <input
            readOnly
            value={
              t < 0.4 || sent
                ? ""
                : typed.slice(
                    0,
                    Math.floor(Math.min(1, (t - 0.4) / 0.9) * typed.length),
                  )
            }
            placeholder="Tích phân, Đạo hàm, ..."
          />
          <button
            disabled={t < 0.4 || sent}
            style={{ opacity: t < 0.4 || sent ? 0.5 : 1 }}
          >
            Tạo
          </button>
        </div>
        <div className="proc-suggest">
          {[
            ["Bảng biến thiên", "37"],
            ["Bài toán tối ưu hoá", "38"],
            ["Diện tích giới hạn bởi hai đồ thị", "38"],
          ].map(([s, n]) => (
            <button key={s} disabled={authoring}>
              {s}
              <small>{n}%</small>
            </button>
          ))}
        </div>
        {authoring && (
          <div className="tutor-typing proc-typing">
            <TypingDots t={t - 1.65} />
            <span>
              "Cực trị hàm số" ·{" "}
              {t < 2.72 ? "Agent đang soạn câu" : "Đang lưu vào kho"}
            </span>
          </div>
        )}
        {ready && (
          <div className="proc-sets">
            <a>
              <span>Cực trị hàm số</span>
              <small>10 câu →</small>
            </a>
          </div>
        )}
      </section>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <CreateDock authoring={authoring} />
      </div>
    </div>
  );
};
export const Question = ({
  wrong = false,
  tutor = false,
}: {
  wrong?: boolean;
  tutor?: boolean;
}) => (
  <div className="native">
    <div className="exam-question" style={{ width: 736, padding: "24px 26px" }}>
      <div className="exam-questionHead">
        <div className="exam-questionLabel">
          <span className="exam-questionNum">1</span>CÂU 1 / 1
        </div>
        <div className="exam-tools">
          <button className="exam-tool exam-ask">Hỏi trợ lý</button>
          <button className="exam-tool exam-hint">Xem lời giải</button>
        </div>
      </div>
      <div className="exam-prompt">
        Cho hàm số{" "}
        <span style={{ fontFamily: "Georgia", fontStyle: "italic" }}>
          y = f(x)
        </span>{" "}
        có bảng biến thiên như sau:
      </div>
      <div
        style={{
          height: 169,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "22px 0 34px",
        }}
      >
        <div style={{ transform: "scale(.64)", transformOrigin: "center" }}>
          <Variation />
        </div>
      </div>
      <div className="exam-prompt" style={{ marginTop: 0 }}>
        Hàm số đã cho có bao nhiêu điểm cực trị?
      </div>
      <div className="exam-options">
        {["1", "2", "3", "0"].map((x, i) => (
          <button
            key={x}
            className={"exam-option " + (wrong && i === 0 ? "exam-wrong" : "")}
          >
            <span className="exam-letter">{"ABCD"[i]}</span>
            <span className="exam-optionCopy">
              {"ABCD"[i]}. {x}
            </span>
            {wrong && i === 0 && <span className="exam-mark">×</span>}
          </button>
        ))}
      </div>
      {wrong && (
        <div className="exam-feedback exam-miss">
          Chưa đúng. Hàm số có hai điểm cực trị vì <i>f′(x)</i> đổi dấu tại{" "}
          <i>x = −1</i> và <i>x = 1</i>.
        </div>
      )}
      <div
        style={{
          borderTop: "2px solid #f0f1f7",
          marginTop: 22,
          paddingTop: 18,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            border: "2px solid #ecedf2",
            borderRadius: 14,
            padding: "12px 15px",
            color: "#a1a5af",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          ← Câu trước
        </div>
        <div
          style={{
            borderRadius: 14,
            padding: "13px 17px",
            background: "#4a48e8",
            boxShadow: "0 4px 0 #3230b8",
            color: "#fff",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          Về lịch sử
        </div>
      </div>
    </div>
  </div>
);
/** Same three-dot waiting state as the web app; driven by video time. */
export const TypingDots = ({ t }: { t: number }) => (
  <span className="tutor-dots" aria-hidden="true">
    {[0, 1, 2].map((i) => {
      const phase = (((t - i * 0.16) % 1.25) + 1.25) % 1.25;
      const lift = phase < 0.75 ? Math.sin((phase / 0.75) * Math.PI) : 0;
      return (
        <i
          key={i}
          style={{
            opacity: 0.38 + 0.62 * lift,
            transform: `translateY(${-4 * lift}px)`,
          }}
        />
      );
    })}
  </span>
);
const REPLY =
  "Dựa vào bảng biến thiên:\n\n• x = −1: f′(x) đổi dấu + → −, nên có cực đại.\n• x = 1: f′(x) đổi dấu − → +, nên có cực tiểu.\n\nVậy có 2 điểm cực trị. Đáp án B. Em đã bỏ sót cực tiểu tại x = 1.";
export const Tutor = ({ t }: { t: number }) => {
  const body = useRef<HTMLDivElement>(null);
  const sent = t >= 1.35;
  const streaming = t >= 1.95;
  const count = Math.min(
    REPLY.length,
    Math.max(0, Math.floor((t - 1.95) * 30) * 3),
  );
  const reply = REPLY.slice(0, count);
  const busy = sent && count < REPLY.length;
  useLayoutEffect(() => {
    const el = body.current;
    if (!el || !sent) return;
    const scroll = () => {
      el.scrollTop = el.scrollHeight;
    };
    scroll();
    const observer = new ResizeObserver(scroll);
    Array.from(el.children).forEach((child) => observer.observe(child));
    observer.observe(el);
    return () => observer.disconnect();
  }, [t, sent, count]);
  return (
    <div className="native">
      <section className="tutor-sheet" style={{ width: 820, height: 760 }}>
        <header className="tutor-head">
          <h2>Hỏi trợ lý về câu 01</h2>
          <button
            className="tutor-close"
            style={
              t >= 4.55
                ? { background: "#ecedf2", color: "#111319", boxShadow: "none" }
                : undefined
            }
          >
            ✕
          </button>
        </header>
        <div
          ref={body}
          className="tutor-body"
          style={{ scrollbarWidth: "none", gap: 16 }}
        >
          <div className="tutor-seed">
            Em đang hỏi về <strong>Câu 01</strong>: Hàm số có bao nhiêu điểm cực
            trị?
            {["1", "2", "3", "0"].map((x, i) => (
              <div
                key={x}
                className={"tutor-choice " + (i === 0 ? "tutor-picked" : "")}
              >
                <b>{"ABCD"[i]}</b>
                <span>
                  {"ABCD"[i]}. {x}
                </span>
              </div>
            ))}
          </div>
          {sent && (
            <div className="tutor-msg tutor-student">
              <span className="tutor-who">PHUC VO</span>
              <div className="tutor-text">
                Giải thích lại câu này theo cách dễ hiểu hơn giúp em.
              </div>
            </div>
          )}
          {sent && !streaming && (
            <div className="tutor-typing">
              <TypingDots t={t - 1.35} />
              Trợ lý đang soi lại đáp án của em
            </div>
          )}
          {reply && (
            <div className="tutor-msg tutor-ai">
              <span className="tutor-who">TRỢ LÝ</span>
              <div className="tutor-text">{reply}</div>
            </div>
          )}
        </div>
        <footer className="tutor-foot">
          <div className="tutor-pills">
            {[
              "Giải thích lại",
              "Soi lời giải",
              "Lý thuyết",
              "Câu tương tự",
            ].map((s) => (
              <button className="tutor-pill" key={s} disabled={busy}>
                {s}
              </button>
            ))}
          </div>
          <div className="tutor-compose">
            <div
              className="tutor-input"
              style={{ color: sent ? "#787d8d" : "#111319" }}
            >
              {sent
                ? "Hỏi thêm về câu hỏi này…"
                : "Giải thích lại câu này giúp em."}
            </div>
            <button className="tutor-send" disabled={sent}>
              GỬI
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};
export const Milestone = ({ t }: { t: number }) => (
  <div className="native">
    <div className="path-modal" style={{ width: 516, padding: "0 28px 24px" }}>
      <div className="path-modalArt" style={{ height: 318 }}>
        <Warrior t={t} />
      </div>
      <div className="path-modalKicker">TRẠM 3 · XONG</div>
      <h2 className="path-modalTitle">Qua trạm rồi nè!</h2>
      <p className="path-modalCopy">
        Cực trị hàm số: đúng 3 câu liền. Trạm 4 mở khóa rồi.
      </p>
      <div className="path-tiles">
        <div className="path-tile">
          <b>+20</b>XP
        </div>
        <div className="path-tile">
          <b>13</b>NGÀY LIỀN
        </div>
        <div className="path-tile">
          <b>3/3</b>ĐÚNG LIỀN
        </div>
      </div>
      <div className="path-modalButton">TIẾP TỤC</div>
    </div>
  </div>
);
