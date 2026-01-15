import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoLink: string;
  repoLink?: string;
}

export interface Certificate {
  id: number;
  title: string; // Used for alt text or future expansion
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  subLabel?: string;
}