import {
  Award,
  BookOpen,
  Building2,
  CalendarCheck,
  Cloud,
  Code,
  Globe,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  MessagesSquare,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** Maps a stored icon-name (from a Payload select or CMS text field) to a lucide component. */
export const ICONS: Record<string, LucideIcon> = {
  // General UI
  Award,
  BookOpen,
  Building2,
  CalendarCheck,
  Cloud,
  Code,
  Globe,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  MessagesSquare,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
};

export const iconByName = (name?: string | null, fallback: LucideIcon = Globe): LucideIcon =>
  (name && ICONS[name]) || fallback;
