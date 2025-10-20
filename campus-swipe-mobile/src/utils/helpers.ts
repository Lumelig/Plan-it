import { Event } from '../types';

export function toggleId<T>(arr: T[], id: T): T[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

export function normalize(s: string): string {
  return s.trim().toLowerCase();
}

export function eventMatches(e: Event, query: string, clubs: string[]): boolean {
  const qn = normalize(query);
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

export function computeLikeOpacity(x: number): number {
  if (x <= 40) return 0;
  return Math.min((x - 40) / 80, 1);
}

export function computeNopeOpacity(x: number): number {
  if (x >= -40) return 0;
  return Math.min((-x - 40) / 80, 1);
}

export function computeRotate(x: number): number {
  if (x <= -200) return -12;
  if (x >= 200) return 12;
  return (x / 200) * 12;
}
