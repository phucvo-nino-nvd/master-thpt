"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { forceCollide, forceX, forceY } from "d3-force";
import { packEnclose, packSiblings } from "d3-hierarchy";
import type { ForceGraphMethods } from "react-force-graph-2d";
import {
  getKnowledgeGraph,
  KnowledgeGraphNode,
  KnowledgeGraphResponse,
} from "@/shared/api/client";

const STATUS_COLORS: Record<string, string> = {
  mastered: "#4d805e",
  learning: "#d98236",
  weak: "#c85a4a",
  untouched: "#b9ae97",
};

const STATUS_LABELS: Record<string, string> = {
  mastered: "Thành thạo",
  learning: "Đang học",
  weak: "Yếu",
  untouched: "Chưa luyện tập",
};

const GRADE_TINTS: Record<number, string> = {
  10: "#8fa9c4",
  11: "#c9a86a",
  12: "#9a8bb5",
};

const TAU = Math.PI * 2;
const MIN_CLUSTER = 3;
const NODE_PAD = 5;
const PACK_FILL = 0.9;
const DETAIL_ZOOM = 1.6;
const LABEL_ZOOM = 2.6;
const FOCUS_ZOOM = 5.5;
const LABEL_SIZE = 15;
const GOLDEN_ANGLE = 2.399963229728653;

const gradeTint = (grade: number) => GRADE_TINTS[grade] ?? "#b9ae97";
const titleCase = (text: string) =>
  text ? text.charAt(0).toLocaleUpperCase("vi") + text.slice(1) : text;
const radiusOf = (degree: number, children: number) =>
  2.4 + Math.min(degree, 12) * 0.16 + Math.sqrt(Math.min(children, 40)) * 1.5;

type GraphNode = KnowledgeGraphNode & {
  degree: number;
  r: number;
  cluster: string;
  cx: number;
  cy: number;
  x: number;
  y: number;
};

type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
  requires: boolean;
};

type Cluster = { key: string; r: number; x: number; y: number };

type Model = {
  nodes: GraphNode[];
  links: GraphLink[];
  clusters: Cluster[];
  byId: Map<string, GraphNode>;
  requires: Map<string, string[]>;
  neighbours: Map<string, Set<string>>;
  grades: number[];
};

function buildModel(raw: KnowledgeGraphResponse): Model {
  const byId = new Map(raw.nodes.map((node) => [node.id, node]));
  const degree = new Map(raw.nodes.map((node) => [node.id, 0]));
  const children = new Map(raw.nodes.map((node) => [node.id, 0]));
  const requires = new Map<string, string[]>();
  const neighbours = new Map(raw.nodes.map((node) => [node.id, new Set<string>()]));
  const parent = new Map(raw.nodes.map((node) => [node.id, node.id]));

  const find = (id: string): string => {
    let root = id;

    while (parent.get(root) !== root) {
      const grand = parent.get(parent.get(root)!)!;
      parent.set(root, grand);
      root = grand;
    }

    return root;
  };

  const seen = new Set<string>();
  const links: GraphLink[] = [];

  for (const edge of raw.edges) {
    if (!byId.has(edge.source) || !byId.has(edge.target) || edge.source === edge.target) {
      continue;
    }

    parent.set(find(edge.source), find(edge.target));
    neighbours.get(edge.source)!.add(edge.target);
    neighbours.get(edge.target)!.add(edge.source);

    if (edge.relation === "REQUIRES") {
      const list = requires.get(edge.source) ?? [];
      list.push(edge.target);
      requires.set(edge.source, list);
    }

    const key = `${edge.source}->${edge.target}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    degree.set(edge.source, degree.get(edge.source)! + 1);
    degree.set(edge.target, degree.get(edge.target)! + 1);

    if (edge.relation !== "REQUIRES") {
      children.set(edge.target, children.get(edge.target)! + 1);
    }

    links.push({
      source: edge.source,
      target: edge.target,
      requires: edge.relation === "REQUIRES",
    });
  }

  const components = new Map<string, string[]>();

  for (const node of raw.nodes) {
    const root = find(node.id);
    const list = components.get(root) ?? [];
    list.push(node.id);
    components.set(root, list);
  }

  const clusterOf = new Map<string, string>();
  const members = new Map<string, string[]>();

  for (const [root, ids] of components) {
    for (const id of ids) {
      const key = ids.length >= MIN_CLUSTER ? root : `grade-${byId.get(id)!.grade}`;
      clusterOf.set(id, key);
      const list = members.get(key) ?? [];
      list.push(id);
      members.set(key, list);
    }
  }

  const clusters = packSiblings(
    [...members]
      .map(([key, ids]) => ({
        key,
        r: Math.sqrt(
          ids.reduce(
            (sum, id) => sum + (radiusOf(degree.get(id)!, children.get(id)!) + NODE_PAD) ** 2,
            0,
          ) /
            PACK_FILL,
        ),
        x: 0,
        y: 0,
      }))
      .sort((a, b) => b.r - a.r),
  );

  const hull = packEnclose(clusters);

  for (const cluster of clusters) {
    cluster.x -= hull.x;
    cluster.y -= hull.y;
  }

  const circleOf = new Map(clusters.map((cluster) => [cluster.key, cluster]));

  const nodes = raw.nodes.map((node, index) => {
    const cluster = clusterOf.get(node.id)!;
    const circle = circleOf.get(cluster)!;
    const angle = index * GOLDEN_ANGLE;
    const spread = Math.sqrt(((index % 89) + 0.5) / 89) * circle.r * 0.85;

    return {
      ...node,
      label: titleCase(node.label),
      degree: degree.get(node.id)!,
      r: radiusOf(degree.get(node.id)!, children.get(node.id)!),
      cluster,
      cx: circle.x,
      cy: circle.y,
      x: circle.x + Math.cos(angle) * spread,
      y: circle.y + Math.sin(angle) * spread,
    };
  });

  return {
    nodes,
    links,
    clusters,
    byId: new Map(nodes.map((node) => [node.id, node])),
    requires,
    neighbours,
    grades: [...new Set(raw.nodes.map((node) => node.grade))].sort((a, b) => a - b),
  };
}

const endId = (end: string | GraphNode) => (typeof end === "object" ? end.id : end);

export function KnowledgeMapClient() {
  const [Renderer, setRenderer] = useState<any>(null);
  const [raw, setRaw] = useState<KnowledgeGraphResponse | null>(null);
  const [error, setError] = useState("");
  const [focusId, setFocusId] = useState("");
  const [hoverId, setHoverId] = useState("");
  const [picked, setPicked] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>();
  const detailRef = useRef(false);
  const wiredRef = useRef<Model | null>(null);
  const fittedRef = useRef(false);

  useEffect(() => {
    void import("react-force-graph-2d").then((mod) => setRenderer(() => mod.default));

    getKnowledgeGraph()
      .then(setRaw)
      .catch(() => setError("Không thể tải bản đồ tri thức. Vui lòng thử lại."));
  }, []);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      }),
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const model = useMemo(() => (raw ? buildModel(raw) : null), [raw]);
  const data = useMemo(
    () => (model ? { nodes: model.nodes, links: model.links } : { nodes: [], links: [] }),
    [model],
  );

  useEffect(() => {
    const fg = fgRef.current;

    if (!fg || !model || wiredRef.current === model) {
      return;
    }

    wiredRef.current = model;
    fg.d3Force("center", null);
    (fg.d3Force("charge") as any)?.strength(-22).distanceMax(90);
    (fg.d3Force("link") as any)?.distance(26).strength(0.45);
    fg.d3Force("collide", forceCollide<any>((node) => node.r + NODE_PAD).iterations(3));
    fg.d3Force("x", forceX<any>((node) => node.cx).strength(0.35));
    fg.d3Force("y", forceY<any>((node) => node.cy).strength(0.35));
  }, [model, Renderer, size.width]);

  const defaultFocusId = useMemo(() => {
    if (!model) {
      return "";
    }

    const practised = model.nodes
      .filter((node) => node.score !== null)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

    const hub = [...model.nodes].sort((a, b) => b.degree - a.degree)[0];

    return (practised[0] ?? hub)?.id ?? "";
  }, [model]);

  const activeId = focusId || defaultFocusId;
  const focus = model?.byId.get(activeId);

  const related = useMemo(() => {
    if (!model || !focusId) {
      return null;
    }

    return new Set([focusId, ...(model.neighbours.get(focusId) ?? [])]);
  }, [model, focusId]);

  const isLit = useCallback(
    (node: GraphNode) => picked.length === 0 || picked.includes(node.grade),
    [picked],
  );

  const onZoom = useCallback((transform: { k: number }) => {
    const next = transform.k >= DETAIL_ZOOM;

    if (next !== detailRef.current) {
      detailRef.current = next;
      setDetail(next);
    }
  }, []);

  const paintNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, scale: number) => {
      const dimmed = (related ? !related.has(node.id) : false) || !isLit(node);
      const marked = node.id === activeId || node.id === hoverId;

      ctx.globalAlpha = dimmed ? 0.15 : 1;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, TAU);
      ctx.fillStyle =
        picked.length && !dimmed
          ? gradeTint(node.grade)
          : STATUS_COLORS[node.status] ?? STATUS_COLORS.untouched;
      ctx.fill();

      if (marked) {
        ctx.lineWidth = 1.6 / scale;
        ctx.strokeStyle = "#1b2430";
        ctx.stroke();
      }

      if (!dimmed && (marked || scale >= LABEL_ZOOM)) {
        ctx.font = `${marked ? 600 : 500} ${LABEL_SIZE / scale}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.lineWidth = 3 / scale;
        ctx.strokeStyle = "#fafafa";
        ctx.strokeText(node.label, node.x, node.y + node.r + 3 / scale);
        ctx.fillStyle = "#1b2430";
        ctx.fillText(node.label, node.x, node.y + node.r + 3 / scale);
      }

      ctx.globalAlpha = 1;
    },
    [related, activeId, hoverId, isLit, picked],
  );

  const onBackgroundClick = useCallback(() => {
    setFocusId("");
    fgRef.current?.zoomToFit(600, 30);
  }, []);

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("vi");

    if (!model || needle.length < 2) {
      return [];
    }

    return model.nodes
      .filter((node) => node.label.toLocaleLowerCase("vi").includes(needle))
      .slice(0, 20);
  }, [model, query]);

  const revealNode = useCallback((node: GraphNode) => {
    const fg = fgRef.current;

    setFocusId(node.id);
    fg?.centerAt(node.x, node.y, 600);
    fg?.zoom(Math.max(fg.zoom() * 1.8, FOCUS_ZOOM), 600);
  }, []);

  const pickMatch = useCallback(
    (node: GraphNode) => {
      setQuery(node.label);
      setOpen(false);
      revealNode(node);
    },
    [revealNode],
  );

  const toggleGrade = useCallback(
    (grade: number) =>
      setPicked((prev) =>
        prev.includes(grade) ? prev.filter((item) => item !== grade) : [...prev, grade],
      ),
    [],
  );

  const stats = useMemo(() => {
    if (!raw) {
      return { total: "--", mastered: "--", weak: "--", progress: 0 };
    }

    const mastered = raw.nodes.filter((node) => node.status === "mastered").length;
    const weak = raw.nodes.filter((node) => node.status === "weak").length;

    return {
      total: raw.nodes.length,
      mastered,
      weak,
      progress: raw.nodes.length ? Math.round((mastered / raw.nodes.length) * 100) : 0,
    };
  }, [raw]);

  const prerequisites = focus && model ? model.requires.get(focus.id) ?? [] : [];

  return (
    <>
      <header className="documents-head map-header-override">
        <div>
          <h1 className="documents-title">Bản đồ tri thức</h1>
          <p className="text-soft">
            Mỗi nút là một đơn vị kiến thức, các kiến thức liên quan gom thành một cụm. Màu là mức
            thành thạo. Bấm vào cụm để phóng to, bấm vào nút để xem vùng liên quan.
          </p>
        </div>
        <div className="map-progress-container">
          <div className="map-progress-circle">
            <div className="map-progress-inner">{stats.progress}%</div>
          </div>
          <div className="map-progress-label">tổng mức thành thạo</div>
        </div>
      </header>

      <div className="map-layout">
        <div className="map-canvas-card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="map-legend">
            <div className="map-legend-item">
              <span className="dot red" /> Yếu (&lt;50%)
            </div>
            <div className="map-legend-item">
              <span className="dot orange" /> Đang học
            </div>
            <div className="map-legend-item">
              <span className="dot green" /> Thành thạo (&ge;80%)
            </div>
            <div className="map-legend-item">
              <span className="dot" style={{ backgroundColor: STATUS_COLORS.untouched }} /> Chưa luyện
              tập
            </div>
          </div>

          {model ? (
            <div className="map-search">
              {open && matches.length ? (
                <ul className="map-search-results">
                  {matches.map((node) => (
                    <li key={node.id}>
                      <button type="button" onMouseDown={() => pickMatch(node)}>
                        <span className="dot" style={{ backgroundColor: gradeTint(node.grade) }} />
                        {node.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              <input
                type="text"
                placeholder="Tìm kiến thức..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && matches[0]) {
                    pickMatch(matches[0]);
                  }

                  if (event.key === "Escape") {
                    setOpen(false);
                  }
                }}
              />
            </div>
          ) : null}

          {model ? (
            <div className="map-grade-bar">
              {model.grades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  className={picked.length === 0 || picked.includes(grade) ? "is-open" : ""}
                  onClick={() => toggleGrade(grade)}
                >
                  <span className="dot" style={{ backgroundColor: gradeTint(grade) }} /> Lớp {grade}
                </button>
              ))}
            </div>
          ) : null}

          <div
            className="map-canvas-area"
            ref={containerRef}
            style={{ width: "100%", height: "100%", minHeight: "600px", background: "#fafafa" }}
          >
            {error ? <div className="map-canvas-empty documents-error">{error}</div> : null}

            {!raw && !error ? (
              <div className="map-canvas-empty dash-empty-note">
                Đang tải dữ liệu bản đồ tri thức...
              </div>
            ) : null}

            {Renderer && model && size.width ? (
              <Renderer
                ref={fgRef}
                graphData={data}
                width={size.width}
                height={size.height}
                backgroundColor="#fafafa"
                nodeId="id"
                nodeVal={(node: any) => node.r * node.r}
                nodeCanvasObject={paintNode}
                nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.r + 3, 0, TAU);
                  ctx.fillStyle = color;
                  ctx.fill();
                }}
                linkVisibility={(link: any) =>
                  detail || Boolean(related?.has(endId(link.source)) && related?.has(endId(link.target)))
                }
                linkColor={(link: any) => {
                  if (!isLit(link.source) || !isLit(link.target)) {
                    return "rgba(182, 171, 147, 0.08)";
                  }

                  return related?.has(endId(link.source)) && related?.has(endId(link.target))
                    ? "rgba(125, 115, 98, 0.85)"
                    : "rgba(182, 171, 147, 0.22)";
                }}
                linkWidth={0.4}
                linkDirectionalArrowLength={(link: any) => (link.requires ? 2.5 : 0)}
                linkDirectionalArrowRelPos={1}
                linkDirectionalArrowColor={() => "rgba(125, 115, 98, 0.6)"}
                onNodeHover={(node: any) => setHoverId(node ? node.id : "")}
                onNodeClick={revealNode}
                onBackgroundClick={onBackgroundClick}
                onZoom={onZoom}
                onEngineTick={() => {
                  if (fittedRef.current) {
                    return;
                  }

                  fittedRef.current = true;
                  fgRef.current?.zoomToFit(0, 30);
                }}
                onEngineStop={() => fgRef.current?.zoomToFit(400, 30)}
                warmupTicks={0}
                cooldownTicks={180}
                d3VelocityDecay={0.45}
                minZoom={0.2}
                maxZoom={12}
              />
            ) : null}
          </div>
        </div>

        <div className="map-sidebar">
          <div className="map-card">
            <div className="dash-section-label">ĐANG XEM</div>
            {focus ? (
              <>
                <h2 className="map-focus-title">{focus.label}</h2>
                <p className="map-focus-status" style={{ color: STATUS_COLORS[focus.status] }}>
                  {STATUS_LABELS[focus.status]}
                  {focus.score === null ? "" : ` • ${focus.score}%`} • Lớp {focus.grade}
                </p>
                <div className="dash-section-label">CẦN HỌC TRƯỚC ({prerequisites.length})</div>
                {prerequisites.length ? (
                  <ul className="map-focus-list">
                    {prerequisites.map((id) => (
                      <li key={id}>
                        <button type="button" onClick={() => setFocusId(id)}>
                          {model?.byId.get(id)?.label ?? id}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="dash-empty-note">Không có kiến thức tiên quyết.</p>
                )}
              </>
            ) : (
              <p className="dash-empty-note">Đang phân tích...</p>
            )}
          </div>

          <div className="dash-stat-row" style={{ marginBottom: 0 }}>
            <div className="dash-stat-mini">
              <b>{stats.total}</b>
              <span>chủ đề</span>
            </div>
            <div className="dash-stat-mini">
              <b style={{ color: "var(--green)" }}>{stats.mastered}</b>
              <span>thành thạo</span>
            </div>
            <div className="dash-stat-mini">
              <b style={{ color: "var(--red)" }}>{stats.weak}</b>
              <span>đang yếu</span>
            </div>
          </div>

          <div className="map-card">
            <div className="dash-section-label">CHUỖI LUYỆN TẬP</div>
            <p className="dash-empty-note">Bắt đầu làm bài để ghi nhận chuỗi ngày học của bạn.</p>
          </div>
        </div>
      </div>
    </>
  );
}
