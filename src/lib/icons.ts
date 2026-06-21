import {
  Building2,
  Cloud,
  Code,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** Maps a stored icon-name (from a Payload select) to a lucide component. */
export const ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Code,
  Palette,
  Cloud,
  LayoutDashboard,
  HeartPulse,
  Building2,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Truck,
  Search,
  Rocket,
};

export const iconByName = (name?: string | null, fallback: LucideIcon = Globe): LucideIcon =>
  (name && ICONS[name]) || fallback;
