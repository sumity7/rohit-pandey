import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { facebookPage, YOUTUBE_CHANNEL_URL } from "@/lib/site";
import { getPlayerVideos } from "@/lib/youtube";
import FacebookEmbed from "./FacebookEmbed";
import YouTubePlayer from "./YouTubePlayer";

/** YouTube beside Facebook on desktop, stacked on phones. */
export default async function SocialSection({ lang, t }: { lang: Locale; t: Dict }) {
  const s = t.social;
  const { items, live } = await getPlayerVideos(lang, 5);

  return (
    <section id="social" data-youtube-feed={live ? "live" : "fallback"} aria-labelledby="social-title" className="scroll-mt-24 bg-white py-20 md:py-32">
      <div className="shell">
        <h2 id="social-title" className="title-lg text-red">
          {s.title}
        </h2>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-black">{s.youtube}</h3>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="link-draw min-h-11 items-center text-sm text-red-dk">
                {s.openChannel}
                <span className="sr-only"> ({t.footer.newTab})</span>
              </a>
            </div>
            <YouTubePlayer videos={items} labels={{ latest: s.latestVideo, more: s.moreVideos, play: s.play }} />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-black">{s.facebook}</h3>
              <a href={facebookPage} target="_blank" rel="noopener noreferrer" className="link-draw min-h-11 items-center text-sm text-red-dk">
                {s.openFacebook}
                <span className="sr-only"> ({t.footer.newTab})</span>
              </a>
            </div>
            <FacebookEmbed pageUrl={facebookPage} title={`${s.facebook}, Rohit Pandey`} />
          </div>
        </div>
      </div>
    </section>
  );
}
