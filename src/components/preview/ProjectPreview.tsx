import type { Project } from "@/payload-types";
import { mediaAlt, mediaUrl } from "@/lib/media";
import { BrowserFrame } from "./BrowserFrame";
import { DeviceFrame } from "./DeviceFrame";
import { LiveEmbed } from "./LiveEmbed";
import { PreviewVideo } from "./PreviewVideo";
import Image from "next/image";

/** Server switch: render the right preview component for a project's previewType. */
export function ProjectPreview({ project }: { project: Project }) {
  const cover = mediaUrl(project.coverImage, "feature");
  const coverAlt = mediaAlt(project.coverImage) || project.title;

  switch (project.previewType) {
    case "liveEmbed":
      if (project.liveUrl) return <LiveEmbed url={project.liveUrl} />;
      break;
    case "video":
      if (project.previewVideoUrl)
        return <PreviewVideo src={project.previewVideoUrl} poster={cover ?? undefined} />;
      break;
    case "deviceMockup":
      if (cover && project.deviceType && project.deviceType !== "browser")
        return <DeviceFrame device={project.deviceType} src={cover} alt={coverAlt} />;
      if (cover)
        return (
          <BrowserFrame url={project.liveUrl ?? undefined}>
            <div className="relative aspect-[16/9]">
              <Image src={cover} alt={coverAlt} fill className="object-cover object-left-top" />
            </div>
          </BrowserFrame>
        );
      break;
  }

  // Fallback: plain cover image (also covers "screenshots" — gallery renders separately).
  if (!cover) return null;
  return (
    <BrowserFrame url={project.liveUrl ?? undefined}>
      <div className="relative aspect-[16/9]">
        <Image src={cover} alt={coverAlt} fill priority className="object-cover object-left-top" />
      </div>
    </BrowserFrame>
  );
}
