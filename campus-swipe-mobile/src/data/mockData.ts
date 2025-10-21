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
  
  // Auto-generated mock events 5..49 for testing
  ...(() => {
    const TAGS = [
      'Tech','Networking','Coding','Hackathon','Green','Gardening','Kultur','Film','Sport','Fitness',
      'Dance','Bouldering','Marathon','Music','Art','Startup','AI','Sustainability','Food','Workshop'
    ];
    const LOCATIONS = [
      'Aula','Audimax A','Makerspace','Sporthalle 1','Sporthalle 2','Bibliothek','Café Campus','Hörsaal 3','Lab 2','Innenhof'
    ];
    const TIMES = ['16:00','17:00','18:00','19:30','20:00'];
    const IMAGES = [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515165562835-c3b8c1eaecf2?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1600&auto=format&fit=crop'
    ];
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const start = new Date('2025-10-26T16:00:00');
    const items: Event[] = [];
    for (let i = 0; i < 45; i++) {
      const id = 5 + i;
      const d = new Date(start.getTime());
      d.setDate(start.getDate() + i);
      const time = TIMES[i % TIMES.length];
      const yyyy = d.getFullYear();
      const mm = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const date = `${yyyy}-${mm}-${dd} ${time}`;
      const location = LOCATIONS[i % LOCATIONS.length];
      const img = IMAGES[i % IMAGES.length];
      const tagA = TAGS[i % TAGS.length];
      const tagB = TAGS[(i + 7) % TAGS.length];
      const tagC = TAGS[(i + 13) % TAGS.length];
      items.push({
        id,
        title: `Campus Event #${id}`,
        date,
        location,
        tags: [tagA, tagB, tagC].slice(0, 3),
        img,
        description: 'Testevent für Swipe/Search/Friends. Enthält Themen, Networking und gemütliches Beisammensein.',
      });
    }
    return items;
  })(),
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
