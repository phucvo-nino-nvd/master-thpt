import React from "react";
import { Onboarding } from "./Onboarding";
import {
  NativeApp,
  Question,
  CreateWidget,
  Tutor,
  Milestone,
} from "./NativeUI";
import { Flight, flightPose, Route } from "./Flight";
import { Img, staticFile } from "remotion";
import { C } from "./theme";
import { ease, smooth, mix, pop, entrance, clamp } from "./motion";
import { Heading, PaperPlane, Pill } from "./ui";
export const Intro = ({ t }: { t: number }) => {
  const introPose = flightPose(smooth(t, 2.9, 3.62), [
    [960, 250],
    [940, 70],
    [1520, 160],
    [2150, 460],
  ]);
  const fold = smooth(t, 0.65, 1.85),
    fly = smooth(t, 2.9, 3.62);
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 72% 75%, #ddddff 0%,transparent 50%),radial-gradient(ellipse at 20% 20%,#e8efff,transparent 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 105,
          top: 72,
          fontSize: 18,
          letterSpacing: 3,
          fontWeight: 800,
          color: C.indigo,
          ...entrance(t, 0.05),
        }}
      >
        MỘT CÁCH HỌC TOÁN MỚI
      </div>
      {["Đạo hàm", "Xác suất", "Tích phân"].map((s, i) => (
        <div
          key={s}
          style={{
            position: "absolute",
            left: [170, 1470, 1390][i],
            top: [300, 300, 780][i],
            transform: `translateY(${15 * Math.sin(t * 1.3 + i)}px) rotate(${[-9, 7, -6][i]}deg) scale(${1 - 0.45 * fly})`,
            opacity: ease(t, 0.2 + i * 0.1, 0.7 + i * 0.1) * (1 - fly),
          }}
        >
          <Pill style={{ fontSize: 24, padding: "21px 29px" }}>{s}</Pill>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          top: 382,
          left: 150,
          right: 150,
          textAlign: "center",
          transform: `translateY(${-80 * fly}px)`,
          opacity: 1 - fly,
        }}
      >
        <div
          style={{
            fontSize: 87,
            lineHeight: 1.18,
            fontWeight: 800,
            letterSpacing: -4,
            ...entrance(t, 0.2),
          }}
        >
          Ôn Toán.
        </div>
        <div
          style={{
            fontSize: 104,
            lineHeight: 1.2,
            fontWeight: 800,
            letterSpacing: -5,
            color: C.indigo,
            ...entrance(t, 0.45),
          }}
        >
          Bắt đầu từ đâu?
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 790,
          width: "100%",
          textAlign: "center",
          fontSize: 26,
          color: C.muted,
          opacity: ease(t, 1.8, 2.2) * (1 - fly),
        }}
      >
        Từ một câu hỏi. Đến hướng đi của riêng bạn.
      </div>
      <PaperPlane
        x={introPose.x}
        y={introPose.y}
        size={mix(132, 240, fly)}
        fold={fold}
        angle={mix(-14, introPose.angle, ease(t, 2.55, 2.9))}
      />
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, opacity: fly }}
      >
        <path
          d="M960 250C940 70 1520 160 2150 460"
          fill="none"
          stroke={C.indigo}
          strokeWidth="3"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - fly)}
        />
      </svg>
    </>
  );
};
const AppFrame = ({
  children,
  t = 1,
}: {
  children: React.ReactNode;
  t?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: 204,
      top: 220,
      width: 1440,
      height: 780,
      transform: `translateY(${24 * (1 - ease(t, 0, 0.5))}px) scale(1.05)`,
      transformOrigin: "top left",
      borderRadius: 22,
      overflow: "hidden",
      boxShadow: "0 26px 70px #17183a19",
      border: "1px solid #ecedf2",
    }}
  >
    {children}
  </div>
);
const Editorial = ({
  t,
  kicker,
  title,
  detail,
  color = C.indigo,
}: {
  t: number;
  kicker: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  color?: string;
}) => (
  <div
    style={{
      position: "absolute",
      left: 104,
      top: 304,
      width: 720,
      ...entrance(t, 0.1),
    }}
  >
    <div
      style={{
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: 2,
        color,
        marginBottom: 28,
      }}
    >
      {kicker}
    </div>
    <div
      style={{
        fontSize: 70,
        lineHeight: 1.15,
        letterSpacing: -3,
        fontWeight: 800,
      }}
    >
      {title}
    </div>
    {detail && (
      <div
        style={{
          fontSize: 27,
          lineHeight: 1.55,
          color: C.muted,
          marginTop: 28,
        }}
      >
        {detail}
      </div>
    )}
  </div>
);
export const Setup = ({ t }: { t: number }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 207,
        top: 45,
        transform: "scale(1.34)",
        transformOrigin: "top left",
      }}
    >
      <Onboarding t={t} />
    </div>
    <Flight
      t={t}
      at={0.05}
      duration={1.45}
      hold={0.1}
      points={[
        [2050, 520],
        [1510, 330],
        [1510, 645],
        [1240, 645],
      ]}
    />
    <Flight
      t={t}
      at={1.6}
      duration={1.1}
      hold={0.1}
      points={[
        [1240, 645],
        [1320, 670],
        [1410, 775],
        [1435, 940],
      ]}
    />
    <Flight
      t={t}
      at={2.8}
      duration={0.82}
      points={[
        [1435, 940],
        [1720, 920],
        [1700, 450],
        [2080, 400],
      ]}
    />
  </>
);
export const Quiz = ({ t }: { t: number }) => (
  <>
    <Editorial
      t={t}
      kicker="02 / MỖI LỖI SAI LÀ MỘT TÍN HIỆU"
      title={
        <>
          Sai một câu.
          <br />
          <span style={{ color: C.coral }}>Biết mình cần ôn gì.</span>
        </>
      }
      detail={
        <>
          Đọc dấu đạo hàm.
          <br />
          Nhận diện đủ hai điểm cực trị.
        </>
      }
    />
    <div
      style={{
        position: "absolute",
        left: 988,
        top: 130,
        transform: `translateY(${28 * (1 - ease(t, 0, 0.5))}px) scale(1.06)`,
        transformOrigin: "top left",
      }}
    >
      <Question wrong={t >= 1.3} />
    </div>
    <Flight
      t={t}
      at={0}
      duration={1.28}
      hold={0.1}
      points={[
        [-140, 855],
        [740, 1040],
        [1060, 820],
        [1230, 595],
      ]}
    />
    <Flight
      t={t}
      at={1.38}
      duration={2.24}
      points={[
        [1230, 595],
        [1360, 355],
        [1630, 475],
        [2080, 310],
      ]}
    />
  </>
);
export const Path = ({ t }: { t: number }) => (
  <>
    <Heading t={t} kicker="03 / LỘ TRÌNH ĐƯỢC CÁ NHÂN HÓA">
      Yếu chỗ nào. <span style={{ color: C.indigo }}>Luyện đúng chỗ đó.</span>
    </Heading>
    <AppFrame t={t}>
      <NativeApp t={t} />
    </AppFrame>
    <Flight
      t={t}
      at={0.25}
      duration={1.0}
      hold={0.15}
      points={[
        [-140, 820],
        [380, 690],
        [784, 390],
        [784, 502],
      ]}
    />
    <Flight
      t={t}
      at={1.4}
      duration={0.8}
      hold={0.25}
      points={[
        [784, 502],
        [784, 610],
        [1184, 550],
        [1199, 592],
      ]}
      color={C.coral}
    />
    <Flight
      t={t}
      at={2.45}
      duration={1.1}
      points={[
        [1199, 592],
        [1370, 670],
        [1750, 770],
        [2080, 620],
      ]}
    />
  </>
);
export const Create = ({ t }: { t: number }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 78% 56%,#e9e8ff,transparent 58%)",
      }}
    />
    <Editorial
      t={t}
      kicker="04 / TẠO ĐỀ NGAY TRONG THANH CÔNG CỤ"
      title={
        <>
          Gõ chủ đề.
          <br />
          <span style={{ color: C.indigo }}>Luyện thêm đúng ý.</span>
        </>
      }
      detail={
        <>
          Gom câu có sẵn trong kho.
          <br />
          Chưa đủ, trợ lý soạn thêm.
        </>
      }
    />
    <div
      style={{
        position: "absolute",
        left: 1070,
        top: 231,
        transform: "scale(2)",
        transformOrigin: "top left",
        ...{ opacity: ease(t, 0, 0.4) },
      }}
    >
      <CreateWidget t={t} />
    </div>
    <Flight
      t={t}
      at={0.05}
      duration={1.5}
      hold={0.13}
      points={[
        [-140, 900],
        [1750, 1040],
        [1860, 460],
        [1620, 552],
      ]}
    />
    <Flight
      t={t}
      at={1.68}
      duration={2.92}
      points={[
        [1620, 552],
        [1330, 205],
        [1030, 760],
        [2080, 1180],
      ]}
    />
  </>
);
export const Chat = ({ t }: { t: number }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.55,
        filter: "blur(5px)",
        transform: "scale(1.06)",
        transformOrigin: "center",
      }}
    >
      <div style={{ position: "absolute", left: 235, top: 100 }}>
        <NativeApp dock={false} />
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, #17183af5 0%, #17183aeb 36%, #17183a99 53%, #17183a88 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 86,
        top: 336,
        width: 675,
        color: "#fff",
        ...entrance(t),
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 2,
          color: C.lime,
        }}
      >
        05 / HIỂU ĐƯỢC LỖI. MỚI THẬT SỰ TIẾN BỘ.
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -3,
          lineHeight: 1.16,
          marginTop: 27,
        }}
      >
        Chưa hiểu?
        <br />
        Hỏi ngay trợ lý.
      </div>
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.5,
          color: "#ffffff",
          marginTop: 29,
        }}
      >
        Giải thích ngay trên câu đang làm.
        <br />
        Từng dấu đổi. Từng bước hiểu.
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        opacity: 1 - ease(t, 4.85, 5.4),
        left: 863,
        top: 106,
        transform: `scale(1.13) translateY(${20 * (1 - ease(t, 0, 0.45))}px)`,
        transformOrigin: "top left",
      }}
    >
      <Tutor t={t} />
    </div>
    <Flight
      t={t}
      at={0.1}
      duration={1.25}
      hold={0.05}
      points={[
        [-140, 862],
        [1100, 1020],
        [1540, 990],
        [1715, 906],
      ]}
      color={C.lime}
    />
    <Flight
      t={t}
      at={1.4}
      duration={3.15}
      hold={0.35}
      points={[
        [1715, 906],
        [1850, 780],
        [1850, 230],
        [1739.88, 153.46],
      ]}
      color={C.lime}
    />
    <Flight
      t={t}
      at={4.9}
      duration={0.8}
      points={[
        [1739.88, 153.46],
        [1660, 90],
        [1930, -50],
        [2080, -100],
      ]}
      color={C.lime}
    />
  </>
);
export const Progress = ({ t }: { t: number }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 50% 100%,#e6edcc,transparent 66%)",
      }}
    />
    <Editorial
      t={t}
      kicker="TỪ CHƯA HIỂU → TỰ MÌNH LÀM ĐƯỢC"
      color={C.green}
      title={
        <>
          Qua một trạm.
          <br />
          <span style={{ color: C.indigo }}>Vững thêm một bước.</span>
        </>
      }
      detail="Luyện đúng trọng tâm. Tiến bộ mỗi ngày."
    />
    <div
      style={{
        position: "absolute",
        left: 1150,
        top: 130,
        transform: `scale(${1.19 * mix(0.93, 1, pop(t, 0.1))})`,
        transformOrigin: "top left",
        opacity: ease(t, 0, 0.3),
      }}
    >
      <Milestone t={t} />
    </div>
    <Flight
      t={t}
      at={0.2}
      duration={3.4}
      points={[
        [940, 1220],
        [1850, 1050],
        [1850, 420],
        [1530, -150],
      ]}
      color={C.lime}
    />
  </>
);
export const Finale = ({ t }: { t: number }) => {
  const converge = smooth(t, 0.2, 1.8),
    logo = ease(t, 1.55, 2.35),
    lock = ease(t, 2.6, 3.35);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: C.navy }} />
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 500,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle,#5550b955,transparent 68%)",
          transform: "translate(-50%,-50%)",
          opacity: 1 - logo,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 825,
          width: "100%",
          textAlign: "center",
          fontSize: 29,
          fontWeight: 700,
          color: "#f2f0ff",
          opacity: ease(t, 0.2, 0.65) * (1 - ease(t, 1.25, 1.6)),
        }}
      >
        Mọi bước học. Cùng một hướng.
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 45%,#ffffff 0%,#f2f0ff 42%,#c9d2ff 100%)",
          clipPath: `circle(${1800 * ease(t, 1.7, 2.55)}px at 960px 500px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 495,
          width: 900,
          height: 900,
          border: "1px solid #b7bcf655",
          borderRadius: "50%",
          transform: `translate(-50%,-50%) scale(${mix(1.8, 0.4, converge)})`,
          opacity: 1 - logo,
        }}
      />
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, opacity: 1 - logo }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${[-120, 2040, 300, 1650, 960][i]} ${[800, 250, -100, 1190, -300][i]} Q${[250, 1500, 200, 1690, 960][i]} ${[100, 100, 800, 100, 120][i]} 960 500`}
            fill="none"
            stroke={[C.indigo, C.coral, C.gold, C.lime, C.lavender][i]}
            strokeWidth={3}
            strokeDasharray="1800"
            strokeDashoffset={-converge * 1800}
          />
        ))}
      </svg>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = [
          [-120, 800],
          [2040, 250],
          [300, -100],
          [1650, 1190],
          [960, -300],
        ][i];
        const b = [
          [250, 100],
          [1500, 100],
          [200, 800],
          [1690, 100],
          [960, 120],
        ][i];
        const e = [960, 500];
        const route: Route = [
          a,
          [a[0] + ((b[0] - a[0]) * 2) / 3, a[1] + ((b[1] - a[1]) * 2) / 3],
          [e[0] + ((b[0] - e[0]) * 2) / 3, e[1] + ((b[1] - e[1]) * 2) / 3],
          e,
        ];
        return (
          <PaperPlane
            key={i}
            {...flightPose(converge, route)}
            size={mix(150, 45, converge)}
            color={[C.indigo, C.coral, C.gold, C.lime, C.lavender][i]}
            opacity={1 - ease(t, 1.6, 1.9)}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 476,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "#fff",
          transform: `translate(-50%,-50%) scale(${mix(0.15, 3, ease(t, 1.7, 2.7))})`,
          opacity: Math.sin(clamp((t - 1.7) / 1.0) * Math.PI) * 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: mix(960, 510, lock),
          top: mix(495, 465, lock),
          width: mix(380, 275, lock),
          height: mix(380, 275, lock),
          transform: `translate(-50%,-50%) perspective(1000px) rotateY(${mix(-78, 0, logo)}deg) scale(${mix(0.35, 1, logo)})`,
          opacity: logo,
          filter: "drop-shadow(0 28px 22px #17183a22)",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 32 32">
          <g transform="rotate(-6 16 16)">
            <rect x="4" y="5" width="24" height="24" rx="6" fill={C.limeDark} />
            <rect x="4" y="3" width="24" height="24" rx="6" fill={C.lime} />
            <path
              d="M10.5 20.5V9.5L16 15.5L21.5 9.5V20.5"
              fill="none"
              stroke={C.navy}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - ease(t, 1.9, 2.55)}
            />
          </g>
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 686,
          top: 417,
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -3,
          color: C.navy,
          opacity: lock,
          transform: `translateX(${55 * (1 - lock)}px)`,
        }}
      >
        MASTER THPT
      </div>
      <div
        style={{
          position: "absolute",
          top: 659,
          width: "100%",
          textAlign: "center",
          ...entrance(t, 3.1),
        }}
      >
        <div style={{ fontSize: 39, fontWeight: 800, letterSpacing: -1.2 }}>
          Học đúng trọng tâm. Tiến bộ mỗi ngày.
        </div>
        <div style={{ fontSize: 23, color: C.muted, marginTop: 22 }}>
          Hệ thống trợ lý AI phối hợp để bạn học Toán hiệu quả hơn.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 881,
          width: "100%",
          textAlign: "center",
          opacity: ease(t, 3.8, 4.3),
        }}
      >
        <Pill
          bg={C.navy}
          color="#fff"
          style={{
            borderColor: C.navy,
            boxShadow: "none",
            padding: "17px 30px",
            fontSize: 21,
          }}
        >
          BẮT ĐẦU HÀNH TRÌNH CỦA BẠN{" "}
          <span style={{ marginLeft: 14, color: C.lime }}>↗</span>
        </Pill>
      </div>
    </>
  );
};
