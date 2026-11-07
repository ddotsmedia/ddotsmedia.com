import { renderOg } from "@/lib/og";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET() {
  return renderOg({
    eyebrow: "Ddotsmedia · UAE IT Solutions",
    title: "Web, Mobile & ERP Development",
  });
}
