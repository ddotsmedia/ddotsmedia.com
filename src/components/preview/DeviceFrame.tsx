import Image from "next/image";

type Device = "iphone" | "android" | "macbook";

/** Phone/laptop mockup around an image. */
export function DeviceFrame({
  device,
  src,
  alt,
}: {
  device: Device;
  src: string;
  alt: string;
}) {
  if (device === "macbook") {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-t-xl border-[6px] border-b-0 border-[#2a2f3e] bg-black p-1.5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-navy">
            <Image src={src} alt={alt} fill loading="lazy" className="object-cover object-top" />
          </div>
        </div>
        <div className="h-3 rounded-b-xl bg-gradient-to-b from-[#3a3f4e] to-[#2a2f3e]" />
        <div className="mx-auto h-1.5 w-1/3 rounded-b-lg bg-[#1a1f2e]" />
      </div>
    );
  }

  const radius = device === "iphone" ? "rounded-[2.2rem]" : "rounded-[1.4rem]";
  return (
    <div className="mx-auto w-full max-w-[260px]">
      <div className={`border-[10px] border-[#2a2f3e] bg-black p-1 shadow-2xl ${radius}`}>
        <div className={`relative aspect-[9/19] overflow-hidden bg-navy ${radius}`}>
          {device === "iphone" && (
            <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          )}
          <Image src={src} alt={alt} fill loading="lazy" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}
