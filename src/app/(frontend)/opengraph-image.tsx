import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ddotsmedia IT Solutions — Web, Mobile & ERP Development in the UAE";

export default function OgImage() {
  return renderOg({
    eyebrow: "Ddotsmedia · UAE IT Solutions",
    title: "Web, Mobile & ERP Development",
  });
}
