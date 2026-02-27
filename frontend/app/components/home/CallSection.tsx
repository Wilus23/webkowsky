import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const AVATAR_LEFT =
  'https://www.figma.com/api/mcp/asset/33e6e316-38a3-4ee9-897b-0856dd299e0e'
const AVATAR_RIGHT =
  'https://www.figma.com/api/mcp/asset/58464288-2450-47c7-b655-3b4639df9879'
const GLOW_CORE =
  'https://www.figma.com/api/mcp/asset/104aff2e-6c04-438e-80a5-1a16dbf32cd7'
const GLOW_LINE_WIDE =
  'https://www.figma.com/api/mcp/asset/52f8c9c5-7151-4207-9653-92e86a6a382a'
const GLOW_LINE_THIN =
  'https://www.figma.com/api/mcp/asset/13b9dfad-f091-4e54-a3cf-393c5149fd43'
const ARROW_ICON =
  'https://www.figma.com/api/mcp/asset/e3fc28b1-729f-4549-a311-25151f35049e'

export default function CallSection() {
  return (
    <article className="relative mx-auto w-full max-w-[800px] overflow-hidden rounded-[40px] bg-surface">
      <img
        src={GLOW_CORE}
        alt=""
        className="pointer-events-none absolute left-[403px] top-[-25px] hidden h-[236px] w-[200px] select-none md:block"
        aria-hidden="true"
      />
      <img
        src={GLOW_LINE_WIDE}
        alt=""
        className="pointer-events-none absolute left-[616px] top-[2px] hidden h-[236px] w-[11px] select-none md:block"
        aria-hidden="true"
      />
      <img
        src={GLOW_LINE_THIN}
        alt=""
        className="pointer-events-none absolute left-[640px] top-px hidden h-[236px] w-[4px] select-none md:block"
        aria-hidden="true"
      />
      <img
        src={GLOW_LINE_WIDE}
        alt=""
        className="pointer-events-none absolute left-[379px] top-[-25px] hidden h-[236px] w-[11px] select-none md:block"
        aria-hidden="true"
      />
      <img
        src={GLOW_LINE_THIN}
        alt=""
        className="pointer-events-none absolute left-[366px] top-[-12px] hidden h-[236px] w-[4px] select-none md:block"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-10 sm:py-10 md:flex-row md:items-end md:justify-between md:px-[65px] md:py-[73px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="relative h-[66px] w-[116px] shrink-0">
            <img
              src={AVATAR_RIGHT}
              alt="Team member"
              className="absolute left-[50px] top-0 h-[66px] w-[66px] rounded-full object-cover"
            />
            <div className="absolute left-0 top-0 h-[66px] w-[66px] overflow-hidden rounded-full border-[3px] border-surface">
              <img src={AVATAR_LEFT} alt="Team member" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="w-full sm:w-[248px]">
            <h2 className="font-sans text-[32px] font-medium leading-[1.2] tracking-[-0.14px] text-white md:text-[28px]">
              Want to join a call?
            </h2>
            <p className="mt-2 font-display text-sm leading-[18.2px] text-white">Book a 30 minute call</p>
          </div>
        </div>

        <Link
          href="/contact"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-[12px] bg-primary px-4 pb-3 pt-[13px] font-sans text-base font-bold tracking-[-0.24px] text-white transition-colors hover:bg-primary-hover"
        >
          <span>Book a call</span>
          <img src={ARROW_ICON} alt="" className="h-6 w-6 object-contain" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
