/* ================================================================
   TestimonialSection — Figma node: 1596:368
   ================================================================ */

import CountUpValue from '@/app/components/animations/CountUpValue'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const AVATAR_IMAGE =
  'https://www.figma.com/api/mcp/asset/c87df540-3387-46d5-89e7-e2902fa9d694'
const PLAY_ICON =
  'https://www.figma.com/api/mcp/asset/662f3274-6ffb-496b-88cf-43463a08c0e2'
const BRAND_WORDMARK =
  'https://www.figma.com/api/mcp/asset/5b8c7d0a-9663-4031-bba6-7fd70553b473'
const BRAND_SEPARATOR =
  'https://www.figma.com/api/mcp/asset/f22e3313-5985-431f-959a-7d1dda763dc1'
const BRAND_SUBMARK =
  'https://www.figma.com/api/mcp/asset/a29b4c6f-2742-4ea5-9d08-025c25ef4256'

const STATS = [
  {value: 4, suffix: '+', label: 'years of experience'},
  {value: 120, suffix: '+', label: 'projects done'},
  {value: 100, suffix: '%', label: 'satisfaction rate'},
] as const

function TestimonialCard() {
  return (
    <article className="relative h-[380px] w-full max-w-[352px] overflow-hidden rounded-[14px]">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute bottom-0 left-0 right-0 h-[139px] rounded-b-[10px] bg-[linear-gradient(180deg,rgba(129,110,252,0)_3.509%,rgba(53,23,251,0.6)_79.825%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={PLAY_ICON}
          alt="Play testimonial"
          className="h-8 w-8 object-contain"
        />
      </div>

      <div className="absolute bottom-[36px] left-8 flex items-end gap-[7px]">
        <img
          src={AVATAR_IMAGE}
          alt="Michał piotrowski CEO"
          className="h-[33px] w-[33px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[2px]">
          <p className="font-display text-sm leading-[18.2px] text-white">
            Michał piotrowski CEO
          </p>
          <div className="flex items-end gap-[6px]">
            <img
              src={BRAND_WORDMARK}
              alt="ecodomum"
              className="h-[10px] w-auto object-contain"
            />
            <img
              src={BRAND_SEPARATOR}
              alt=""
              className="h-[9px] w-px object-contain opacity-70"
              aria-hidden="true"
            />
            <img
              src={BRAND_SUBMARK}
              alt="Living"
              className="h-[15px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialSection() {
  return (
    <section id="proof" className="bg-white py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="mx-auto flex max-w-[958px] flex-col gap-[96px]">
          <div className="flex flex-col gap-[96px]">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <h2 className="font-sans text-base font-bold tracking-[-0.24px] text-black">
                WHAT <span className="text-primary">MAKES US BETTER</span>
              </h2>
            </div>

            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <TestimonialCard />

              <blockquote className="max-w-[510px]">
                <p className="font-sans text-[24px] font-medium leading-[1.2] tracking-[-0.14px] text-black sm:text-[28px]">
                  &ldquo; Very few firms can make products look beautiful and work
                  well at the same time, and that&rsquo;s what I love about
                  Webkowsky! &rdquo;
                </p>
              </blockquote>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[887px] flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            {STATS.map(({value, suffix, label}) => (
              <div key={label} className="text-center">
                <CountUpValue
                  value={value}
                  suffix={suffix}
                  className="font-display text-[56px] leading-[1.16] font-bold tracking-[-0.96px] text-primary sm:text-[64px]"
                />
                <p className="font-display text-base font-medium text-black">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
