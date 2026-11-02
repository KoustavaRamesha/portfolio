export const profile = {
  name: "Koustava Ramesha",
  first: "Koustava",
  last: "Ramesha",
  role: "Software Engineer",
  location: "Bangalore, India",
  email: "koustava.r@gmail.com",
  phone: "+91 80502 69703",
  phoneHref: "tel:+918050269703",
  resume: "https://drive.google.com/file/d/1ZGmMFQdgqrDpmX7WN4GcvolzvsILVsr6/view?usp=sharing",
  photo: "/avatar-sketch.jpg",
  bio: "I build and ship cloud-hosted products end to end — React and Next.js frontends, Node.js services, and the real-time systems behind them.",
  links: {
    github: "https://github.com/KoustavaRamesha",
    linkedin: "https://www.linkedin.com/in/koustava-ramesha-b86214280/",
  },
};

export const skillGroups = [
  { name: "Orchestration", items: ["LLM Pipelines", "Agents", "Gemini", "Google Genkit", "Prompt Design", "Automation"] },
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", items: ["Node.js", "Express", "RESTful APIs", "WebRTC Signaling", "JWT / OAuth"] },
  { name: "Cloud & DevOps", items: ["Firebase", "Supabase", "Docker", "Vercel", "Git", "CI / CD"] },
  { name: "Vision & Data", items: ["YOLO", "ByteTrack", "OpenCV", "OCR", "MongoDB", "MySQL", "SQLite"] },
  { name: "Architecture", items: ["System Design", "Microservices", "OOP", "Performance Optimization"] },
];

export const timeline = [
  { year: "2023", title: "B.E. Information Science", text: "RV Institute of Technology and Management, Bangalore — fell for the web along the way." },
  { year: "Dec 2024", title: "Aether begins", text: "Started building a decentralized, end-to-end encrypted P2P chat on WebRTC." },
  { year: "2025", title: "Industrial Safety AI", text: "Multi-camera YOLO + ByteTrack surveillance desktop app with automated alerts." },
  { year: "2025", title: "Top 10 · Hack-to-Hire", text: "National hackathon (TRIKAYA × BeetleX) — top 10 among 4,000+ teams." },
  { year: "Now", title: "Orchestrating with AI", text: "Freelance — shipping STR Mix on Next.js 15 + React 19, directing Gemini to do the heavy lifting." },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  tech: string[];
  hue: string; // css gradient
  stats: { k: string; v: string }[];
  points: string[];
  live?: string; // live site URL
  shot?: string; // real screenshot, served from /public
};

export const projects: Project[] = [
  {
    id: "strmix",
    name: "STR Mix",
    tagline: "A portfolio and blog with a full admin dashboard and CMS.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Firebase", "Supabase", "Genkit"],
    hue: "oklch(0.22 0.01 80)",
    live: "https://str-mix.vercel.app/",
    shot: "/projects/str-mix.png",
    stats: [{ k: "monthly visits", v: "1,000+" }, { k: "less admin work", v: "65%" }, { k: "Lighthouse", v: "95+" }],
    points: [
      "Secure admin portal for blog, portfolio and review moderation — response times cut by 40%.",
      "Real-time sync across Firebase Auth, Firestore and Supabase with 99.9% uptime.",
      "Gemini-powered content generation and review summarization.",
      "App Router + SSR tuning boosted page loads by 35%.",
    ],
  },
  {
    id: "safety",
    name: "Safety AI Surveillance",
    tagline: "Every camera, watching for hazards. Live.",
    tech: ["Python", "PySide6", "YOLO", "ByteTrack", "OpenCV", "SQLite"],
    hue: "oklch(0.2 0.008 60)",
    live: "https://github.com/KoustavaRamesha/surveillance-system",
    stats: [{ k: "detections", v: "Helmet · Fire · Smoke" }, { k: "model loads", v: "1×" }, { k: "alerts", v: "SMS" }],
    points: [
      "Multi-camera (USB/IP) desktop app running live YOLO detection with ByteTrack tracking for industrial safety monitoring.",
      "Multi-threaded architecture with shared inference management and per-camera worker queues for concurrent streams.",
      "Resilient camera reconnection with exponential backoff and detection stabilization.",
      "SQLite incident logging, evidence capture and automated safety alert workflows.",
    ],
  },
  {
    id: "aether",
    name: "Aether",
    tagline: "Private chat, peer to peer. Nothing in between.",
    tech: ["React", "TypeScript", "Node.js", "WebRTC", "AES-256"],
    hue: "oklch(0.24 0.006 90)",
    live: "https://aether-woad-three.vercel.app/",
    shot: "/projects/aether.png",
    stats: [{ k: "handshake", v: "<1s" }, { k: "latency", v: "<50ms" }, { k: "channels", v: "100+" }],
    points: [
      "End-to-end encrypted P2P messaging with zero data leakage.",
      "Node.js signaling server handling 100+ concurrent channels — peer discovery, connection establishment and message exchange.",
      "Client-side AES-256 encryption with wallet-signature verification of communication participants.",
      "Tuned connection flow — handshake cut from 2.3s to under 1s.",
    ],
  },
];
