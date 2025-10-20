import { Event, Friend } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "AI x Campus Kickoff",
    date: "2025-10-22 18:00",
    location: "Audimax A",
    tags: ["Tech", "Networking", "Coding"],
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop",
    description:
      "Vorträge, Demos und Networking mit lokalen Startups und Studierenden.",
  },
  {
    id: 2,
    title: "Sustainability Hack Night",
    date: "2025-10-23 19:30",
    location: "Makerspace",
    tags: ["Hackathon", "Green", "Gardening"],
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    description:
      "Schnellprojekte rund um Energie, Mobilität und Campus-Garten.",
  },
  {
    id: 3,
    title: "Kino: Indie Film Night",
    date: "2025-10-24 20:00",
    location: "Aula",
    tags: ["Kultur", "Film"],
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    description:
      "Drei Kurzfilme + Q&A mit Regie, danach Getränkestand im Foyer.",
  },
  {
    id: 4,
    title: "Basketball Turnier",
    date: "2025-10-25 16:00",
    location: "Sporthalle 2",
    tags: ["Sport", "Fitness"],
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
    description:
      "3v3 Bracket – Teams können sich vor Ort registrieren.",
  },
];

export const MOCK_FRIENDS: Friend[] = [
  { id: "u1", name: "Lea", avatar: "🟣", likes: [1, 3] },
  { id: "u2", name: "Ben", avatar: "🟢", likes: [2] },
  { id: "u3", name: "Yara", avatar: "🔵", likes: [1, 4] },
];

export const CLUBS = [
  "Dance",
  "Coding",
  "Bouldering",
  "Gardening",
  "Fitness",
  "Marathon",
];
