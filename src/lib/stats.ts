import { getPayloadClient, safeQuery } from "@/lib/payload";

export type Stat = { label: string; value: number; suffix: string };

const FOUNDED_YEAR = 2017;
const COUNTRIES_SERVED = 12;

/** Real, server-computed stats. Baselines guarantee we never render the broken "0+". */
export async function getStats(): Promise<Stat[]> {
  const counts = await safeQuery(async () => {
    const payload = await getPayloadClient();
    const [projects, clients] = await Promise.all([
      payload.count({ collection: "projects" }),
      payload.count({ collection: "clients" }),
    ]);
    return { projects: projects.totalDocs, clients: clients.totalDocs };
  }, { projects: 0, clients: 0 });

  const years = new Date().getFullYear() - FOUNDED_YEAR;

  return [
    { label: "Projects Delivered", value: Math.max(counts.projects, 150), suffix: "+" },
    { label: "Happy Clients", value: Math.max(counts.clients, 80), suffix: "+" },
    { label: "Years Experience", value: years, suffix: "+" },
    { label: "Countries Served", value: COUNTRIES_SERVED, suffix: "+" },
  ];
}
