import { youtubeFallback, type YouTubeVideo } from "./content";
import { formatTimestamp } from "./dates";
import type { Locale } from "./i18n";
import { YOUTUBE_CHANNEL_ID } from "./site";

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export const thumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const decode = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");

function parseFeed(xml: string): YouTubeVideo[] {
  const videos = new Map<string, YouTubeVideo>();
  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!id || !title || !published) continue;
    // One entry per video id, whatever the feed returns
    if (!videos.has(id)) videos.set(id, { id, title: decode(title).trim(), published: published.slice(0, 10) });
  }
  return [...videos.values()].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

/**
 * Latest videos from the channel's public feed, refreshed hourly. If the feed
 * cannot be reached the static list in content.ts is used, so the section is
 * never empty.
 */
export async function getYouTubeVideos(limit = 5): Promise<{ videos: YouTubeVideo[]; live: boolean }> {
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    const videos = parseFeed(await res.text());
    if (videos.length === 0) throw new Error("YouTube feed had no entries");
    return { videos: videos.slice(0, limit), live: true };
  } catch {
    return { videos: youtubeFallback.slice(0, limit), live: false };
  }
}

/** Videos prepared for the player: dates formatted for the page language. */
export async function getPlayerVideos(lang: Locale, limit = 5) {
  const { videos, live } = await getYouTubeVideos(limit);
  return {
    live,
    items: videos.map((v) => ({
      id: v.id,
      title: v.title,
      date: formatTimestamp(v.published, lang),
      thumb: thumbnail(v.id),
    })),
  };
}
