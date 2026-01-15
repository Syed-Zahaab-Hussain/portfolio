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
  title: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
