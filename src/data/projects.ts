import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1, slug: "battery-pos", title: "Battery POS",
    summary: "A point-of-sale and inventory system for battery retailers.",
    description: "A solo full-stack application for battery retail, covering checkout, serialized inventory and stock movement history. Sale transactions coordinate payment records, inventory updates and battery unit claims so that failed operations roll back together.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma"], image: "/projects/battery-pos.jpg",
    demoLink: "https://pos.syedzahaab.com/",
  },
  {
    id: 2, slug: "market-committee-management-system", title: "Market Committee Management System",
    summary: "A management platform for market committees, built by a two-person internship team.",
    description: "I built user administration, configurable roles and permissions, commodity management and market committee management. Fee-collector workflows and operational dashboards were shared work. The system supports assessment of market fees.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL"], image: "/projects/mcms.jpg",
    demoLink: "https://mcms.syedzahaab.com/",
  },
  {
    id: 3, slug: "simple-furniture-commerce", title: "Simple Furniture Commerce",
    summary: "A furniture storefront with product options, cart and checkout.",
    description: "A solo full-stack furniture commerce project built with Next.js. Customers can browse the catalog, explore product options and use cart and checkout flows.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma"], image: "/projects/furniture.jpg",
    demoLink: "https://furniture-commerce.syedzahaab.com/",
  },
];
