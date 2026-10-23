import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "System Monitor — Ddotsmedia" };

const MONITOR_KEY =
  process.env.MONITOR_KEY ?? process.env.PAYLOAD_SECRET?.slice(0, 16) ?? "";

interface Metrics {
  status: string;
  ts: number;
  responseMs: number;
  system: {
    uptimeSeconds: number;
    nodeVersion: string;
    memory: {
      heapUsedMB: number;
      heapTotalMB: number;
      heapUsedPct: number;
      rssMB: number;
      externalMB: number;
    };
  };
  database: {
    status: string;
    latencyMs: number;
    collections: Record<string, number>;
    totals: { content: number; crm: number; team: number };
  };
  queues: {
    activeJobListings: number;
    pendingContactSubmissions: number;
    newsletterSubscribers: number;
    mediaAssets: number;
  };
}

async function fetchMetrics(key: string): Promise<Metrics | null> {
  try {
    const hdrs = await headers();
    const host = hdrs.get("host") ?? "localhost:3000";
    const proto = hdrs.get("x-forwarded-proto") ?? "http";
    const res = await fetch(`${proto}://${host}/api/metrics?key=${key}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-green-500" : "bg-red-500"}`} />
      {label}
    </span>
  );
}

function Bar({ pct, color = "bg-blue-500" }: { pct: number; color?: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900 tabular-nums">
        {value}
        {sub && <span className="text-xs text-gray-400 font-normal ml-1">{sub}</span>}
      </span>
    </div>
  );
}

function fmtUptime(s: number) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return d > 0 ? `${d}d ${h}h ${m}m` : h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default async function MonitorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const key = params.key ?? "";

  if (!MONITOR_KEY || key !== MONITOR_KEY) {
    redirect("/");
  }

  const data = await fetchMetrics(key);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-gray-600 font-medium">Metrics unavailable</p>
          <p className="text-gray-400 text-sm mt-1">Could not reach /api/metrics</p>
        </div>
      </div>
    );
  }

  const isHealthy = data.status === "healthy";
  const { system, database, queues } = data;
  const memPct = system.memory.heapUsedPct;
  const memColor = memPct > 80 ? "bg-red-500" : memPct > 60 ? "bg-yellow-500" : "bg-green-500";
  const dbLatencyColor =
    database.latencyMs > 500 ? "text-red-600" : database.latencyMs > 200 ? "text-yellow-600" : "text-green-600";

  const collectionList = Object.entries(database.collections).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Monitor</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              ddotsmedia.com · Last checked {new Date(data.ts).toLocaleTimeString()} · {data.responseMs}ms
            </p>
          </div>
          <StatusBadge ok={isHealthy} label={isHealthy ? "All Systems Healthy" : "Degraded"} />
        </div>

        {/* Top stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Uptime", value: fmtUptime(system.uptimeSeconds) },
            { label: "DB Latency", value: `${database.latencyMs}ms`, cls: dbLatencyColor },
            { label: "Heap Used", value: `${system.memory.heapUsedMB} MB`, sub: `/ ${system.memory.heapTotalMB} MB` },
            { label: "RSS", value: `${system.memory.rssMB} MB` },
          ].map(({ label, value, sub, cls }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
              <p className={`text-xl font-bold mt-1 ${cls ?? "text-gray-900"}`}>
                {value}
                {sub && <span className="text-sm text-gray-400 font-normal"> {sub}</span>}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Memory */}
          <Card title="Memory Usage">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Heap</span>
                  <span className="font-medium">{memPct}% ({system.memory.heapUsedMB}/{system.memory.heapTotalMB} MB)</span>
                </div>
                <Bar pct={memPct} color={memColor} />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">RSS (total process)</span>
                  <span className="font-medium">{system.memory.rssMB} MB</span>
                </div>
                <Bar pct={Math.round((system.memory.rssMB / 512) * 100)} color="bg-blue-400" />
              </div>
              <Stat label="External" value={`${system.memory.externalMB} MB`} />
              <Stat label="Node.js" value={system.nodeVersion} />
            </div>
          </Card>

          {/* Database */}
          <Card title="Database">
            <Stat label="Status" value={database.status === "connected" ? "✓ Connected" : "✗ " + database.status} />
            <Stat label="Query latency" value={`${database.latencyMs} ms`} />
            <Stat label="Content docs" value={database.totals.content} />
            <Stat label="CRM records" value={database.totals.crm} />
            <Stat label="Team & partners" value={database.totals.team} />
            <Stat label="Total docs" value={Object.values(database.collections).reduce((a, b) => a + b, 0)} />
          </Card>

          {/* Job Queues */}
          <Card title="Work Queues">
            <Stat label="Active job listings" value={queues.activeJobListings ?? "—"} />
            <Stat label="Contact submissions" value={queues.pendingContactSubmissions ?? "—"} />
            <Stat label="Newsletter subscribers" value={queues.newsletterSubscribers ?? "—"} />
            <Stat label="Media assets" value={queues.mediaAssets ?? "—"} />
          </Card>

          {/* Collection Counts */}
          <Card title="All Collections">
            <div className="space-y-0.5">
              {collectionList.map(([slug, count]) => (
                <div key={slug} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-600 font-mono">{slug}</span>
                  <span className="text-xs font-semibold tabular-nums text-gray-900 bg-gray-50 px-2 py-0.5 rounded">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p className="text-center text-xs text-gray-400">
          ddotsmedia.com · <a href="/" className="underline">Home</a> ·{" "}
          <a href="/admin" className="underline">Payload Admin</a>
        </p>
      </div>
    </div>
  );
}
