import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Heart,
  MapPin,
  Menu,
  Search,
  ThumbsUp,
  Users,
  X,
  Check,
} from "lucide-react";

// =============================
// Mock Data
// =============================
const MOCK_EVENTS = [
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

const MOCK_FRIENDS = [
  { id: "u1", name: "Lea", avatar: "🟣", likes: [1, 3] },
  { id: "u2", name: "Ben", avatar: "🟢", likes: [2] },
  { id: "u3", name: "Yara", avatar: "🔵", likes: [1, 4] },
];

// Clubs (Search presets)
const CLUBS = [
  "Dance",
  "Coding",
  "Bouldering",
  "Gardening",
  "Fitness",
  "Marathon",
];

// =============================
// Pure helpers + lightweight tests
// =============================
export function computeLikeOpacity(x: number) {
  // Fade in when dragging right past 40px, full at +120px
  if (x <= 40) return 0;
  return Math.min((x - 40) / 80, 1);
}

export function computeNopeOpacity(x: number) {
  // Fade in when dragging left past -40px, full at -120px
  if (x >= -40) return 0;
  return Math.min((-x - 40) / 80, 1);
}

export function computeRotate(x: number) {
  // Map -200..0..200 px drag to -12..0..12 degrees
  if (x <= -200) return -12;
  if (x >= 200) return 12;
  return (x / 200) * 12; // linear piecewise within range
}

export function toggleId(arr: number[], id: number) {
  // Pure helper to add/remove an id from a list (idempotent toggle)
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

export function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function eventMatches(e: (typeof MOCK_EVENTS)[number], q: string, clubs: string[]) {
  const qn = normalize(q);
  const clubSet = new Set(clubs.map(normalize));
  const tagHit = e.tags.some((t) => clubSet.has(normalize(t)));
  const textHit = !qn
    ? true
    : e.title.toLowerCase().includes(qn) ||
      e.location.toLowerCase().includes(qn) ||
      e.tags.some((t) => t.toLowerCase().includes(qn));
  const clubsActive = clubs.length > 0;
  return textHit && (!clubsActive || tagHit);
}

function runDevTests() {
  // Simple inline tests printed to console. Do not modify unless broken.
  const approx = (a: number, b: number, e = 1e-6) => Math.abs(a - b) < e;
  try {
    // Opacity tests (like)
    console.assert(approx(computeLikeOpacity(0), 0), "like @0");
    console.assert(approx(computeLikeOpacity(40), 0), "like @40");
    console.assert(approx(computeLikeOpacity(100), 0.75), "like @100");
    console.assert(approx(computeLikeOpacity(120), 1), "like @120");
    console.assert(approx(computeLikeOpacity(200), 1), "like cap");

    // Opacity tests (nope)
    console.assert(approx(computeNopeOpacity(0), 0), "nope @0");
    console.assert(approx(computeNopeOpacity(-40), 0), "nope @-40");
    console.assert(approx(computeNopeOpacity(-100), 0.75), "nope @-100");
    console.assert(approx(computeNopeOpacity(-120), 1), "nope @-120");
    console.assert(approx(computeNopeOpacity(-200), 1), "nope cap");

    // Sanity: opposing drags shouldn't light the other label
    console.assert(approx(computeLikeOpacity(-200), 0), "like should be 0 on left drag");
    console.assert(approx(computeNopeOpacity(200), 0), "nope should be 0 on right drag");

    // Boundary fuzz
    console.assert(approx(computeLikeOpacity(41), 0.0125), "like small >40");
    console.assert(approx(computeNopeOpacity(-41), 0.0125), "nope small <-40");

    // Rotate tests
    console.assert(approx(computeRotate(-200), -12), "rotate @-200");
    console.assert(approx(computeRotate(0), 0), "rotate @0");
    console.assert(approx(computeRotate(200), 12), "rotate @200");
    console.assert(approx(computeRotate(100), 6), "rotate @100");

    // toggleId tests (new)
    console.assert(JSON.stringify(toggleId([], 1)) === JSON.stringify([1]), "toggle add empty");
    console.assert(JSON.stringify(toggleId([1], 1)) === JSON.stringify([]), "toggle remove single");
    console.assert(JSON.stringify(toggleId([1,2], 3)) === JSON.stringify([1,2,3]), "toggle add new");
    console.assert(JSON.stringify(toggleId([1,2,3], 2)) === JSON.stringify([1,3]), "toggle remove middle");

    // eventMatches tests
    const sample = { id: 99, title: "Dance Coding Jam", date: "", location: "Hall", tags: ["Coding", "Dance"], img: "", description: "" } as any;
    console.assert(eventMatches(sample, "", []) === true, "match: empty query, no clubs");
    console.assert(eventMatches(sample, "coding", []) === true, "match: query only");
    console.assert(eventMatches(sample, "", ["Dance"]) === true, "match: club only");
    console.assert(eventMatches(sample, "jam", ["Dance"]) === true, "match: query + club");
    console.assert(eventMatches(sample, "marathon", ["Dance"]) === false, "no match: wrong query");

    console.log("✅ Dev tests passed (CampusSwipe)");
  } catch (e) {
    console.error("❌ Dev tests failed", e);
  }
}

// Run once in dev (no-op in prod if removed by bundler tree shaking)
if (typeof window !== "undefined" && (window as any).__RUN_CAMPUSWIPE_TESTS__ !== false) {
  runDevTests();
}

// =============================
// UI Components
// =============================
function EventCard({ e }: { e: (typeof MOCK_EVENTS)[number] }) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md">
      <div className="h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={e.img}
          alt={e.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug">{e.title}</h3>
          <div className="flex gap-2">
            {e.tags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{e.date}</span></div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{e.location}</span></div>
        <p className="text-slate-600">{e.description}</p>
      </CardContent>
    </Card>
  );
}

function SwipeCard({
  e,
  onSwipe,
}: {
  e: (typeof MOCK_EVENTS)[number];
  onSwipe: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const threshold = 120;

  // ✅ Use transforms derived from the motion value
  const likeOpacity = useTransform(x, (v) => computeLikeOpacity(v));
  const nopeOpacity = useTransform(x, (v) => computeNopeOpacity(v));
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);

  return (
    <motion.div
      className="absolute inset-0"
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(ev, info) => {
        if (info.offset.x > threshold) onSwipe("right");
        else if (info.offset.x < -threshold) onSwipe("left");
      }}
      initial={{ rotate: 0, scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <EventCard e={e} />
      {/* Like / Nope indicators */}
      <div className="pointer-events-none absolute top-4 left-4">
        <motion.div
          className="rounded-md border-2 px-2 py-1 text-sm font-bold"
          style={{ opacity: likeOpacity }}
        >
          JA
        </motion.div>
      </div>
      <div className="pointer-events-none absolute top-4 right-4">
        <motion.div
          className="rounded-md border-2 px-2 py-1 text-sm font-bold"
          style={{ opacity: nopeOpacity }}
        >
          NEIN
        </motion.div>
      </div>
    </motion.div>
  );
}

// =============================
// Main App
// =============================
export default function CampusSwipe() {
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);
  const [joined, setJoined] = useState<number[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

  // PWA install prompt state
  const [canInstall, setCanInstall] = useState(false);
  const [installEvent, setInstallEvent] = useState<any>(null);

  // Register service worker & hook into the install prompt
  useEffect(() => {
    // Inject manifest if missing (handy for hackathon demos)
    if (typeof document !== "undefined" && !document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = "/manifest.webmanifest";
      document.head.appendChild(link);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {/* ignore in dev */});
    }

    const handler = (e: any) => {
      e.preventDefault();
      setInstallEvent(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Cards remaining in the deck (not liked, not passed)
  const deck = useMemo(
    () => MOCK_EVENTS.filter((e) => !liked.includes(e.id) && !passed.includes(e.id)),
    [liked, passed]
  );

  const top = deck[0];
  const next = deck[1];

  // Filtered list for search panel (query + clubs)
  const filtered = useMemo(() => {
    const q = query.trim();
    return MOCK_EVENTS.filter((e) => eventMatches(e as any, q, selectedClubs));
  }, [query, selectedClubs]);

  // Like helpers
  const like = (id: number) => setLiked((s) => (s.includes(id) ? s : [...s, id]));
  const unlike = (id: number) => setLiked((s) => s.filter((x) => x !== id));
  const toggleLike = (id: number) => setLiked((s) => toggleId(s, id));

  // Join helpers (joining also implies like)
  const joinEvent = (id: number) => {
    setJoined((s) => (s.includes(id) ? s : [...s, id]));
    like(id);
  };
  const leaveEvent = (id: number) => setJoined((s) => s.filter((x) => x !== id));
  const toggleJoin = (id: number) => setJoined((s) => toggleId(s, id));

  // Pass helper
  const nope = (id: number) => setPassed((s) => Array.from(new Set([...s, id])));

  const toggleClub = (c: string) => setSelectedClubs((s) => toggleId(s, c));
  const clearClubs = () => setSelectedClubs([]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-3">
          <div className="text-xl font-semibold">CampusSwipe</div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="font-normal">
              {liked.length} Likes
            </Badge>
            <MenuSheet likes={liked} passed={passed} joined={joined} />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 lg:grid-cols-12">
        {/* Left: Swipe Deck */}
        <div className="lg:col-span-5">
          <div className="relative h-[560px]">
            {/* Next (preview) */}
            {next && (
              <div className="absolute inset-0 translate-y-2 scale-[0.98] opacity-80">
                <EventCard e={next} />
              </div>
            )}
            {/* Top card (swipeable) */}
            {top ? (
              <SwipeCard
                e={top}
                onSwipe={(dir) => (dir === "right" ? like(top.id) : nope(top.id))}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border bg-white">
                <div className="text-center">
                  <div className="text-2xl font-semibold">Keine Events mehr</div>
                  <p className="text-muted-foreground">Ändere die Filter im Menü.</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <Button variant="outline" size="lg" aria-label="Nein" onClick={() => top && nope(top.id)}>
              <X className="mr-2 h-5 w-5" /> Nein
            </Button>
            <Button size="lg" aria-label="Ja" onClick={() => top && like(top.id)}>
              <Heart className="mr-2 h-5 w-5" /> Ja
            </Button>
          </div>
        </div>

        {/* Center: Search */}
        <div className="lg:col-span-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                <div className="font-semibold">Suche</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Suche nach Titel, Ort oder Tag…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Clubs presets */}
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-slate-600">Clubs</div>
                {selectedClubs.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearClubs}>zurücksetzen</Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {CLUBS.map((c) => {
                  const active = selectedClubs.includes(c);
                  return (
                    <Badge
                      key={c}
                      variant={active ? "secondary" : "outline"}
                      className="cursor-pointer select-none"
                      onClick={() => toggleClub(c)}
                    >
                      {c}
                    </Badge>
                  );
                })}
              </div>

              <div className="max-h-[320px] space-y-2 overflow-auto pr-1">
                {filtered.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center gap-3 rounded-xl border p-2 hover:bg-slate-50"
                  >
                    <img src={e.img} alt="" className="h-14 w-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="font-medium leading-tight">{e.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> {e.date}
                        <span>•</span>
                        <MapPin className="h-3 w-3" /> {e.location}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {e.tags.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant={joined.includes(e.id) ? "secondary" : "outline"}
                        aria-pressed={joined.includes(e.id)}
                        aria-label={joined.includes(e.id) ? "Zusage zurückziehen" : "Event beitreten"}
                        onClick={() => (joined.includes(e.id) ? leaveEvent(e.id) : joinEvent(e.id))}
                      >
                        {joined.includes(e.id) ? (<><Check className="h-4 w-4 mr-1"/> Beigetreten</>) : "Beitreten"}
                      </Button>
                      <Button
                        size="sm"
                        variant={liked.includes(e.id) ? "default" : "ghost"}
                        aria-pressed={liked.includes(e.id)}
                        aria-label={liked.includes(e.id) ? "Like entfernen" : "Like hinzufügen"}
                        onClick={() => toggleLike(e.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Friends */}
        <div className="lg:col-span-3">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <div className="font-semibold">Freunde</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_FRIENDS.map((f) => (
                <div key={f.id} className="rounded-xl border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-slate-100 grid place-items-center text-base">
                      {f.avatar}
                    </div>
                    <div className="font-medium">{f.name}</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Likes</div>
                  <div className="mt-1 flex flex-col gap-1">
                    {f.likes.map((id) => {
                      const e = MOCK_EVENTS.find((x) => x.id === id)!;
                      return (
                        <div key={id} className="flex items-center justify-between gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Heart className="h-3 w-3" /> {e.title}
                          </div>
                          {joined.includes(id) ? (
                            <Button size="xs" variant="secondary" onClick={() => leaveEvent(id)}>
                              <Check className="h-3 w-3 mr-1" /> Beigetreten
                            </Button>
                          ) : (
                            <Button size="xs" variant="outline" onClick={() => joinEvent(id)}>
                              Beitreten
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Install (PWA) floating button */}
      {canInstall && (
        <div className="fixed bottom-5 right-5 z-40">
          <Button size="lg" onClick={async () => {
            if (!installEvent) return;
            installEvent.prompt();
            try { await installEvent.userChoice; } catch {}
            setCanInstall(false);
            setInstallEvent(null);
          }}>
            App installieren
          </Button>
        </div>
      )}

      {/* Footer actions */}
      <div className="mx-auto max-w-7xl p-4">
        <div className="rounded-2xl border bg-white p-3 shadow-sm">
          <Tabs defaultValue="likes">
            <TabsList>
              <TabsTrigger value="likes">Meine Likes</TabsTrigger>
              <TabsTrigger value="joined">Meine Zusagen</TabsTrigger>
              <TabsTrigger value="export">Export / n8n</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="likes" className="pt-3">
              <div className="flex flex-wrap gap-2">
                {liked.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    Noch keine Likes – swipe oder suche ein Event.
                  </div>
                )}
                {liked.map((id) => {
                  const e = MOCK_EVENTS.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="flex items-center gap-2 rounded-full border px-2 py-1">
                      <Badge className="rounded-full px-3 py-1">{e.title}</Badge>
                      <Button size="icon" variant="ghost" aria-label="Like entfernen" onClick={() => unlike(id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="joined" className="pt-3">
              <div className="flex flex-wrap gap-2">
                {joined.length === 0 && (
                  <div className="text-sm text-muted-foreground">Noch keine Zusagen – beitreten über Freunde oder Suche.</div>
                )}
                {joined.map((id) => {
                  const e = MOCK_EVENTS.find((x) => x.id === id)!;
                  return (
                    <div key={id} className="flex items-center gap-2 rounded-full border px-2 py-1">
                      <Badge className="rounded-full px-3 py-1">{e.title}</Badge>
                      <Button size="icon" variant="ghost" aria-label="Zusage zurückziehen" onClick={() => leaveEvent(id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="export" className="pt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={async () => {
                    // 👉 Replace with your n8n webhook URL
                    const webhook = (window as any).__N8N_WEBHOOK__ || "";
                    if (!webhook) {
                      alert("Setze window.__N8N_WEBHOOK__ auf deine n8n Webhook-URL");
                      return;
                    }
                    await fetch(webhook, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ likes: liked, joined, at: new Date().toISOString() }),
                    });
                    alert("Likes an n8n gesendet ✅");
                  }}
                >
                  An n8n senden
                </Button>
                <Button
                  onClick={() => {
                    const data = {
                      likes: liked,
                      joined,
                      passed,
                      timestamp: Date.now(),
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "campus-swipe-export.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  JSON herunterladen
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Nutze einen n8n Webhook (HTTP Request Trigger), um Likes in eine DB oder Google Sheet zu schreiben.
              </p>
            </TabsContent>
            <TabsContent value="analytics" className="pt-3">
              <div className="text-sm text-muted-foreground">
                Für Grafana/Prometheus: Sende Metriken ("likes_total", "swipes_total") an einen Pushgateway
                und erstelle ein Dashboard. Alternativ: schreibe in eine Timeseries-DB (z. B. InfluxDB).
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function MenuSheet({ likes, passed, joined }: { likes: number[]; passed: number[]; joined: number[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[360px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Einstellungen & Filter</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-sm font-medium">Kategorien</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Tech",
                "Networking",
                "Hackathon",
                "Green",
                "Kultur",
                "Film",
                "Sport",
              ].map((t) => (
                <Badge key={t} variant="outline" className="cursor-pointer">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Benachrichtigungen</div>
            <div className="mt-2 text-sm text-muted-foreground">
              In n8n einen Flow bauen: Wenn Freund:in ein Event liked, sende Push / E‑Mail.
            </div>
          </div>
          <div className="rounded-xl border p-3">
            <div className="text-sm font-medium mb-2">Debug</div>
            <div className="text-xs text-muted-foreground">Likes: {JSON.stringify(likes)} | Joined: {JSON.stringify(joined)} | Passed: {JSON.stringify(passed)}</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/*
====================================
PWA FILES – add these two files at project root (public/):
------------------------------------
1) public/manifest.webmanifest
------------------------------------
{
  "name": "CampusSwipe",
  "short_name": "Swipe",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

------------------------------------
2) public/sw.js  (very small offline-first shell)
------------------------------------
const CACHE = "campus-swipe-v1";
const ASSETS = [
  "/",
  "/manifest.webmanifest",
  // add your built JS/CSS bundles if known, or rely on runtime caching below
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  e.respondWith(
    caches.match(request).then((cached) =>
      cached || fetch(request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return resp;
      }).catch(() => cached)
    )
  );
});

// Optional: handle app update via postMessage
self.addEventListener("message", (e) => {
  if (e.data === "SW_UPDATE") self.skipWaiting();
});

------------------------------------
Notes:
- Place two PNG icons in public/icons/: icon-192.png and icon-512.png.
- Next.js: files go in /public. Vite/CRA: also /public. No extra plugin needed.
- The component injects a <link rel="manifest"> if none exists (handy for demos).
- You can remove the floating "App installieren" button after first install.
====================================
*/
