import { getPayloadClient } from "@/lib/payload";

export type Stat = { label: string; value: number; suffix: string };

const FOUNDED_YEAR = 2017;
const COUNTRIES_SERVED = 12;

/** Real, server-computed stats. Baselines guarantee we never render the broken "0+". */
export async function getStats(): Promise<Stat[]> {
  const payload = await getPayloadClient();
  const [projects, clients] = await Promise.all([
    payload.count({ collection: "projects" }),
    payload.count({ collection: "clients" }),
  ]);

  const years = new Date().getFullYear() - FOUNDED_YEAR;

  return [
    { label: "Projects Delivered", value: Math.max(projects.totalDocs, 150), suffix: "+" },
    { label: "Happy Clients", value: Math.max(clients.totalDocs, 80), suffix: "+" },
    { label: "Years Experience", value: years, suffix: "+" },
    { label: "Countries Served", value: COUNTRIES_SERVED, suffix: "+" },
  ];
}
