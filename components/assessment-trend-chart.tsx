"use client";

type AssessmentPoint = {
  id: number;
  source: "TUITION" | "SCHOOL";
  score: number;
  maxScore: number;
  takenAt: string;
};

type ChartPoint = {
  x: number;
  y: number;
  dateLabel: string;
  percent: number;
};

function toPercent(score: number, maxScore: number) {
  if (maxScore <= 0) return 0;
  return Math.max(0, Math.min(100, (score / maxScore) * 100));
}

function buildSeries(points: AssessmentPoint[], source: "TUITION" | "SCHOOL"): ChartPoint[] {
  const filtered = points
    .filter((point) => point.source === source)
    .sort((a, b) => new Date(a.takenAt).getTime() - new Date(b.takenAt).getTime());

  if (filtered.length === 0) return [];

  const width = 600;
  const leftPad = 36;
  const rightPad = 18;
  const innerWidth = width - leftPad - rightPad;

  return filtered.map((point, index) => {
    const percent = toPercent(point.score, point.maxScore);
    const x =
      filtered.length === 1
        ? leftPad + innerWidth / 2
        : leftPad + (index / (filtered.length - 1)) * innerWidth;

    return {
      x,
      y: 220 - percent * 1.8,
      percent,
      dateLabel: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }).format(new Date(point.takenAt)),
    };
  });
}

export function AssessmentTrendChart({ assessments }: { assessments: AssessmentPoint[] }) {
  const tuition = buildSeries(assessments, "TUITION");
  const school = buildSeries(assessments, "SCHOOL");

  const tuitionPath = tuition.map((point) => `${point.x},${point.y}`).join(" ");
  const schoolPath = school.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="w-full rounded-lg border p-3">
      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          Tuition Tests
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          School Tests
        </span>
        <span>Y-axis: score %</span>
      </div>
      <svg viewBox="0 0 600 240" className="h-60 w-full">
        <line x1="36" y1="220" x2="582" y2="220" stroke="currentColor" opacity="0.2" />
        <line x1="36" y1="40" x2="36" y2="220" stroke="currentColor" opacity="0.2" />
        <line x1="36" y1="130" x2="582" y2="130" stroke="currentColor" opacity="0.1" />
        <text x="8" y="45" className="fill-muted-foreground text-[10px]">
          100
        </text>
        <text x="14" y="135" className="fill-muted-foreground text-[10px]">
          50
        </text>
        <text x="18" y="223" className="fill-muted-foreground text-[10px]">
          0
        </text>

        {tuition.length > 1 ? (
          <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" points={tuitionPath} />
        ) : null}
        {school.length > 1 ? (
          <polyline fill="none" stroke="#059669" strokeWidth="2.5" points={schoolPath} />
        ) : null}

        {tuition.map((point, index) => (
          <g key={`tuition-${index}`}>
            <circle cx={point.x} cy={point.y} r="3.5" fill="#2563eb" />
            <title>{`${point.dateLabel}: ${point.percent.toFixed(1)}%`}</title>
          </g>
        ))}
        {school.map((point, index) => (
          <g key={`school-${index}`}>
            <circle cx={point.x} cy={point.y} r="3.5" fill="#059669" />
            <title>{`${point.dateLabel}: ${point.percent.toFixed(1)}%`}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}
