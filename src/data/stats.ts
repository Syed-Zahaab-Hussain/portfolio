import { BriefcaseBusiness, Code2, Handshake } from "lucide-react";
import { projects } from "@/data/projects";
import { Stat } from "@/types";

export const stats: Stat[] = [
  { icon: Code2, value: String(projects.length), label: "Featured Projects" },
  {
    icon: BriefcaseBusiness,
    label: "Internship Experience",
    subLabel: "PEC internship programme, Apr–Oct 2026",
  },
  {
    icon: Handshake,
    label: "Freelance Availability",
    subLabel: "Open to projects through Upwork and Fiverr",
  },
];
