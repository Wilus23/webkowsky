/* ================================================================
   TestimonialSection — white bg
   "WHAT MAKES US BETTER" label, CEO card, quote, stats
   ================================================================ */

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const CEO_AVATAR =
  'https://www.figma.com/api/mcp/asset/ed83d52c-27c7-42cc-a96e-5b368ff11b28'
const PLAY_ICON =
  'https://www.figma.com/api/mcp/asset/15235677-3aab-43e1-b6a4-7d650fff00d7'

const STATS = [
  {value: '4+', label: 'years of experience'},
  {value: '120+', label: 'projects done'},
  {value: '100%', label: 'satisfaction rate'},
]

/* ================================================================
   CEO card
   ================================================================ */
function CeoCard() {
  return (
    <div className="relative w-full sm:w-[352px] h-[380px] rounded-[14px] overflow-hidden shrink-0">
      {/* Dark base with semi-transparent black */}
      <div className="absolute inset-0 bg-surface rounded-[14px]" />

      {/* Purple gradient at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[139px] rounded-bl-[10px] rounded-br-[10px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(129,110,252,0) 3.5%, rgba(53,23,251,0.6) 79.8%)',
        }}
      />

      {/* Play icon centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <img src={PLAY_ICON} alt="Play" className="size-8 object-contain" />
        </div>
      </div>

      {/* Bottom: CEO info */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 flex items-end gap-3">
        {/* Stars rating */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="size-3 text-primary"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M6 0L7.35 4.15H11.5L8.08 6.7L9.43 10.85L6 8.3L2.57 10.85L3.92 6.7L0.5 4.15H4.65L6 0Z" />
              </svg>
            ))}
          </div>
          <p className="font-sans text-sm text-white leading-[1.3]">
            Michał Piotrowski, CEO
          </p>
        </div>
        {/* Avatar */}
        <div className="size-[33px] rounded-full overflow-hidden shrink-0">
          <img
            src={CEO_AVATAR}
            alt="CEO"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   TestimonialSection
   ================================================================ */
export default function TestimonialSection() {
  return (
    <section className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="flex flex-col gap-[96px]">
          {/* ---- Header block ---- */}
          <div className="flex flex-col gap-[96px]">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-primary shrink-0" />
              <h2 className="font-sans font-bold text-base text-black tracking-[-0.24px]">
                WHAT{' '}
                <span className="text-primary">MAKES US BETTER</span>
              </h2>
            </div>

            {/* CEO card + quote */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-0 lg:justify-between">
              <CeoCard />

              <blockquote className="lg:max-w-[510px] lg:ml-8">
                <p className="font-sans font-medium text-[22px] sm:text-[28px] leading-[1.2] text-black tracking-[-0.14px]">
                  &ldquo; Very few firms can make products look beautiful and
                  work well at the same time, and that&rsquo;s what I love
                  about Webkowsky! &rdquo;
                </p>
              </blockquote>
            </div>
          </div>

          {/* ---- Stats row ---- */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-0 sm:divide-x sm:divide-black/10">
            {STATS.map(({value, label}) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 sm:px-16 first:pl-0 last:pr-0"
              >
                <span className="font-display font-bold text-[56px] sm:text-[64px] leading-[1.16] tracking-[-0.96px] text-primary">
                  {value}
                </span>
                <span className="font-display font-medium text-base text-black">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
