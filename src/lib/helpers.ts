// =============================
// Pure helper functions
// =============================

export function computeLikeOpacity(x: number): number {
  // Fade in when dragging right past 40px, full at +120px
  if (x <= 40) return 0;
  return Math.min((x - 40) / 80, 1);
}

export function computeNopeOpacity(x: number): number {
  // Fade in when dragging left past -40px, full at -120px
  if (x >= -40) return 0;
  return Math.min((-x - 40) / 80, 1);
}

export function computeRotate(x: number): number {
  // Map -200..0..200 px drag to -12..0..12 degrees
  if (x <= -200) return -12;
  if (x >= 200) return 12;
  return (x / 200) * 12; // linear piecewise within range
}

export function toggleId<T extends number | string>(arr: T[], id: T): T[] {
  // Pure helper to add/remove an id from a list (idempotent toggle)
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

export function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export function eventMatches(
  e: { tags: string[]; title: string; location: string },
  q: string,
  clubs: string[]
): boolean {
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
