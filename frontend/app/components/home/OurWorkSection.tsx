/* ================================================================
   OurWorkSection — dark bg, "OUR WORK" label, 3 portfolio cards
   ================================================================ */

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const PORTFOLIO_1 =
  'https://www.figma.com/api/mcp/asset/97cc0121-ca63-44a4-be41-0f5f009ee6cf'
const PORTFOLIO_2 =
  'https://www.figma.com/api/mcp/asset/b1232b41-8c1b-44cb-86fd-c18bebf12059'
const PORTFOLIO_3 =
  'https://www.figma.com/api/mcp/asset/4960a9b6-fded-4a11-92ef-aa2cae7ebb8a'
const ICON_BADGE_1 =
  'https://www.figma.com/api/mcp/asset/5e36ea71-5bad-4cbe-95e2-9134bc208aa7'
const ICON_BADGE_2 =
  'https://www.figma.com/api/mcp/asset/3b0b7d90-147d-48ca-a081-cebe5f4a22d8'
const LAPTOP_MOCKUP =
  'https://www.figma.com/api/mcp/asset/076a6722-947b-4135-aaa5-8d88c3ce2b96'

const CARDS = [
  {
    image: PORTFOLIO_1,
    badge: ICON_BADGE_1,
    company: 'Ecodomum',
    description:
      'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
  },
  {
    image: PORTFOLIO_2,
    badge: ICON_BADGE_1,
    company: 'Ecodomum',
    description:
      'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
  },
  {
    image: PORTFOLIO_3,
    badge: ICON_BADGE_2,
    company: 'ecodomum',
    description:
      'Ecodomum is a leading UX design agency based in Poland and US. We help startups.',
  },
]

/* ================================================================
   PortfolioCard
   ================================================================ */
function PortfolioCard({
  image,
  badge,
  company,
  description,
}: (typeof CARDS)[number]) {
  return (
    <div className="relative flex-1 min-w-[280px] max-w-full sm:max-w-[403px] h-[460px] rounded-[28px] border border-[rgba(56,56,56,0.6)] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Portfolio background image */}
      <img
        src={image}
        alt={company}
        className="absolute inset-0 object-cover size-full"
      />

      {/* Subtle dark vignette so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

      {/* Company badge — top area */}
      <div className="absolute top-[26px] left-[25px] right-[25px]">
        <img
          src={badge}
          alt={company}
          className="h-[43px] w-auto max-w-full object-contain object-left"
        />
      </div>

      {/* Description text — upper-middle */}
      <div className="absolute top-[90px] left-[25px] right-[25px]">
        <p className="font-sans text-sm text-white leading-[1.3] line-clamp-4">
          {description}
        </p>
      </div>

      {/* Laptop mockup — centered, lower portion */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[229px] h-[238px]">
        <img
          src={LAPTOP_MOCKUP}
          alt=""
          className="absolute inset-0 object-cover size-full"
        />
      </div>
    </div>
  )
}

/* ================================================================
   OurWorkSection
   ================================================================ */
export default function OurWorkSection() {
  return (
    <section className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="flex flex-col gap-[71px]">
          {/* Section label */}
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-primary shrink-0" />
            <h2 className="font-sans font-bold text-base text-white tracking-[-0.24px]">
              OUR{' '}
              <span className="text-white">WORK</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {CARDS.map((card) => (
              <PortfolioCard key={card.company + card.image} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
