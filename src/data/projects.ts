import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "IntervueAI",
    description: "Real-time mock interviews with AI, no forms or clicks just natural personalized conversation.",
    tech: ["Next.js", "OpenAI", "Tailwind"],
    image: "https://picsum.photos/id/48/600/400",
    demoLink: "#",
  },
  {
    id: 2,
    title: "Blendy",
    description: "A social app where you can connect in real-time, log in with one click, share posts and more.",
    tech: ["React", "Firebase", "Redux"],
    image: "https://picsum.photos/id/180/600/400",
    demoLink: "#",
  },
  {
    id: 3,
    title: "WATCHit",
    description: "A video streaming app made for easy, personal entertainment and everything you need.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://picsum.photos/id/21/600/400",
    demoLink: "#",
  }
];
