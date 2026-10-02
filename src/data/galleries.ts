// ────────────────────────────────────────────────────────────────────────────
//  Digital gallery — files from src/assets/gallery/.
//
//  Each entry can later receive a year, month and location to show captions in
//  the gallery and lightbox. For now, all entries are intentionally blank so the
//  new photos appear immediately and you can add the descriptions yourself later.
// ────────────────────────────────────────────────────────────────────────────

export interface GalleryPhoto {
  year: number; // e.g. 2025  (0 = not set yet)
  month: number; // 1–12       (0 = not set yet)
  location: string; // e.g. "Lisbon, Portugal"
  file: string; // filename in src/assets/gallery/
}

export const digital: GalleryPhoto[] = [
  { year: 0, month: 0, location: "", file: "IMGL1003.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0818-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0774-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0717-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0599-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0520-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0243-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0216-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL0124-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2363.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2306.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2237.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL1608.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL1305.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL1175.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL1069.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2480.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2456.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2451.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2528.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2520.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2613.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL2648.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL9933-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL9879-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL9759-Mejorado-NR.jpg" },
  { year: 0, month: 0, location: "", file: "IMGL3859.jpg" },
];

export const analog: GalleryPhoto[] = [];
