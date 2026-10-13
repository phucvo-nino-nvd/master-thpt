import React, { useLayoutEffect, useRef, useState } from "react";
import { Sidebar } from "./NativeUI";
import { Flight } from "./Flight";
import { C } from "./theme";

const reveal = (text: string, t: number, at: number) =>
  text.slice(
    0,
    Math.floor(Math.max(0, Math.min(1, (t - at - 0.12) / 0.85)) * text.length),
  );

/** Original ExamRoom layout in obstacle mode. Answers are selected, not graded inline. */
export const BombPractice = ({ t }: { t: number }) => {
  t = Math.round(t * 60) / 60;
  const hintRef = useRef<HTMLButtonElement>(null);
  const answerRef = useRef<HTMLButtonElement>(null);
  const [targets, setTargets] = useState({
    hint: [1350, 230],
    answer: [950, 550],
  });
  const level = t >= 2.05 ? 2 : t >= 0.85 ? 1 : 0;
  const completedLevel = t >= 3.02 ? 2 : t >= 1.82 ? 1 : 0;
  const streaming = level > completedLevel;
  const picked = t >= 3.45;
  useLayoutEffect(() => {
    const measure = () => {
      const h = hintRef.current?.getBoundingClientRect();
      const a = answerRef.current?.getBoundingClientRect();
      if (!h || !a) return;
      const next = {
        hint: [h.x + h.width / 2, h.y + h.height / 2],
        answer: [a.x + a.width * 0.66, a.y + a.height / 2],
      };
      setTargets((old) =>
        JSON.stringify(old) === JSON.stringify(next) ? old : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(answerRef.current!.parentElement!.parentElement!);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [level]);
  const h = targets.hint,
    a = targets.answer;
  return (
    <>
      <div
        className="native"
        style={{
          position: "absolute",
          inset: 0,
          width: 1440,
          height: 810,
          transform: "scale(1.3333333333)",
          transformOrigin: "top left",
          display: "grid",
          gridTemplateColumns: "232px 1fr",
          background: C.paper,
        }}
      >
        <Sidebar />
        <main className="exam-main" style={{ height: 810, overflow: "hidden" }}>
          <div className="exam-inner">
            <header className="exam-topbar">
              <button className="exam-back">‹</button>
              <div>
                <h1 className="exam-title">
                  Bom ôn tập: Tính đơn điệu và cực trị của hàm số
                </h1>
                <div className="exam-meta">
                  <span className="exam-tag">Gỡ bom</span>
                  <span>6 câu</span>
                </div>
              </div>
            </header>
            <div className="exam-progressRow">
              <span className="exam-progress">
                <span style={{ width: picked ? "16.6667%" : "0%" }} />
              </span>
              <span className="exam-progressCopy">
                {picked ? 1 : 0} / 6 câu
              </span>
            </div>
            <section className="exam-layout">
              <article className="exam-question">
                <div className="exam-questionHead">
                  <div className="exam-questionLabel">
                    <span className="exam-questionNum">1</span>CÂU 1 / 6
                  </div>
                  <div className="exam-tools">
                    <button className="exam-tool">Đánh dấu câu</button>
                    <button
                      ref={hintRef}
                      className="exam-tool exam-hint"
                      disabled={streaming}
                    >
                      Gợi ý ({completedLevel}/3)
                    </button>
                  </div>
                </div>
                <div className="exam-prompt">
                  Cho hàm số có{" "}
                  <span
                    style={{ fontFamily: "Georgia,serif", fontStyle: "italic" }}
                  >
                    f′(x) = 3(x + 1)(x − 1)
                  </span>
                  .<br />
                  Hàm số có bao nhiêu điểm cực trị?
                </div>
                {level > 0 && (
                  <div className="exam-hints">
                    <div>
                      <strong>Gợi ý 1: </strong>
                      {reveal(
                        "Tìm nghiệm của f′(x), rồi xét dấu hai bên mỗi nghiệm.",
                        t,
                        0.85,
                      ) || "Đang lấy gợi ý…"}
                    </div>
                    {level > 1 && (
                      <div>
                        <strong>Gợi ý 2: </strong>
                        {reveal(
                          "Tại x = −1 và x = 1, f′(x) đều đổi dấu.",
                          t,
                          2.05,
                        ) || "Đang lấy gợi ý…"}
                      </div>
                    )}
                  </div>
                )}
                <div className="exam-options">
                  {["1", "2", "3", "0"].map((value, i) => (
                    <button
                      key={value}
                      ref={i === 1 ? answerRef : undefined}
                      className={
                        "exam-option" +
                        (picked && i === 1 ? " exam-selected" : "")
                      }
                    >
                      <span className="exam-letter">{"ABCD"[i]}</span>
                      <span className="exam-optionCopy">{value}</span>
                      {picked && i === 1 && (
                        <span className="exam-mark">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="exam-foot">
                  <button className="exam-secondary" disabled>
                    ← Câu trước
                  </button>
                  <button className="exam-primary">Câu tiếp →</button>
                </div>
              </article>
              <aside className="exam-side">
                <div className="exam-timer">
                  <p className="exam-timerLabel">THỜI GIAN</p>
                  <p className="exam-timerValue">
                    00:{String(Math.floor(t)).padStart(2, "0")}
                  </p>
                  <p className="exam-timerNote">Cố lên, em đang làm rất ổn!</p>
                </div>
                <div
                  className="exam-navigator"
                  style={{ borderColor: "#d9dce5" }}
                >
                  <div className="exam-navTitle">
                    Danh sách câu
                    <span className="exam-navCount">
                      {picked ? 1 : 0} đã làm
                    </span>
                  </div>
                  <div className="exam-grid">
                    {Array.from({ length: 6 }, (_, i) => (
                      <button
                        key={i}
                        className={
                          "exam-cell" + (i === 0 ? " exam-current" : "")
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </button>
                    ))}
                  </div>
                  <div className="exam-legend">
                    <span>
                      <i className="exam-cur" />
                      Đang làm
                    </span>
                    <span>
                      <i />
                      Đã trả lời
                    </span>
                    <span>
                      <i className="exam-flag" />
                      Cần xem lại
                    </span>
                  </div>
                </div>
                <button className="exam-submit">NỘP BÀI &amp; CHẤM NGAY</button>
                <div className="exam-note">
                  <strong>Mẹo nhỏ:</strong> Câu khó có thể bỏ qua và quay lại
                  sau. Đừng để một câu giữ chân em quá lâu nhé.
                </div>
              </aside>
            </section>
          </div>
        </main>
      </div>
      <Flight
        t={t}
        at={0.05}
        duration={0.8}
        hold={0.1}
        points={[[2050, 200], [1770, 100], [h[0] + 150, h[1] - 80], h]}
      />
      <Flight
        t={t}
        at={0.95}
        duration={1.1}
        hold={0.25}
        points={[h, [h[0] - 60, h[1] + 95], [h[0] + 140, h[1] + 90], h]}
      />
      <Flight
        t={t}
        at={2.3}
        duration={1.15}
        hold={0.15}
        points={[h, [h[0] - 190, h[1] + 160], [a[0] + 110, a[1] - 80], a]}
      />
      <Flight
        t={t}
        at={3.6}
        duration={2.05}
        points={[a, [a[0] - 70, a[1] + 100], [1690, 440], [2080, 240]]}
      />
    </>
  );
};
