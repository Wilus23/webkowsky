import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const AVATAR_A =
  'https://www.figma.com/api/mcp/asset/53818a82-a374-4992-af61-f408ae4c8cb0'
const AVATAR_B =
  'https://www.figma.com/api/mcp/asset/90b41a63-314f-40f2-bf03-9a58d5a5755b'
const COMPANY_VIDEO =
  'https://www.figma.com/api/mcp/asset/71a8867d-916c-4735-9171-ce643d6b9ffd'

/* ================================================================
   AvatarStack — overlapping profile photos next to the CTA
   ================================================================ */
function AvatarStack() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-[7px]">
        {[AVATAR_B, AVATAR_A, AVATAR_A].map((src, i) => (
          <div
            key={i}
            className="relative size-[21px] rounded-full border-2 border-primary overflow-hidden shrink-0"
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 object-cover size-full"
            />
          </div>
        ))}
      </div>
      {/* Online indicator */}
      <div className="size-3 rounded-full bg-green-400 border-2 border-primary shrink-0" />
    </div>
  )
}

/* ================================================================
   InfoCard — the three bottom cards in the hero section
   ================================================================ */
function InfoCard({
  label,
  variant = 'placeholder',
}: {
  label: string
  variant?: 'placeholder' | 'image'
}) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 min-w-0 flex-1">
      <p className="font-display text-sm text-black/90 leading-[1.3]">
        {label}
      </p>
      {variant === 'image' ? (
        <div className="relative h-[120px] sm:h-[147px] w-full rounded-[14px] overflow-hidden bg-gray-200">
          <img
            src={COMPANY_VIDEO}
            alt=""
            className="absolute inset-0 object-cover size-full"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg
                className="text-black ml-0.5"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="currentColor"
              >
                <path d="M0 0L14 8L0 16V0Z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[120px] sm:h-[147px] w-full rounded-[14px] bg-black/20 backdrop-blur-sm" />
      )}
    </div>
  )
}

/* ================================================================
   HeroSection — the main white card
   ================================================================ */
export default function HeroSection() {
  return (
    <section className="bg-white rounded-[20px] sm:rounded-[30px] px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-[79px] lg:px-[120px] xl:px-[228px]">
      <div className="flex flex-col gap-16 sm:gap-20 md:gap-[140px]">
        {/* ---- Top area: headline + description ---- */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-[173px]">
          {/* Headline */}
          <h1 className="font-display font-bold text-[40px] sm:text-[52px] md:text-[56px] lg:text-[64px] leading-[1.16] tracking-[-0.96px] shrink-0">
            <span className="text-primary">We create</span>
            <br />
            <span className="text-black">Fortune 500</span>
            <br />
            <span className="text-black">websites</span>
          </h1>

          {/* Description + CTA */}
          <div className="flex flex-col gap-3 md:max-w-[378px] md:pt-2">
            <p className="font-sans font-medium text-base sm:text-[20px] leading-[1.2] text-black">
              Webkowsky is a leading UX design agency based in Poland and US. We
              help startups &amp; Fortune 500 companies delight humans on the
              other side of the screen.
            </p>

            <div className="mt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[12px] bg-primary px-4 py-3 font-sans font-bold text-base text-white tracking-[-0.24px] hover:bg-primary-hover transition-colors"
              >
                <AvatarStack />
                <span>Book a call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ---- Bottom area: three info cards ---- */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-[13px]">
          <InfoCard label="How do you want to build?" />
          <InfoCard label="Watch how we build your brand." variant="image" />
          <InfoCard label="How do you want to build?" />
        </div>
      </div>
    </section>
  )
}
