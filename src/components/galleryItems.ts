import type { MediaItem } from "@/lib/content";
import type { Dict } from "@/lib/dictionary";
import type { GalleryItem, GalleryLabels } from "./MediaGallery";

export function toGalleryItems(t: Dict, list: MediaItem[]): GalleryItem[] {
  return list.map((m) => ({ ...m, ...t.media.items[m.id] }));
}

export function galleryLabels(t: Dict): GalleryLabels {
  const m = t.media;
  return { open: m.open, close: m.close, prev: m.prev, next: m.next, of: m.of, dialog: m.dialog };
}
