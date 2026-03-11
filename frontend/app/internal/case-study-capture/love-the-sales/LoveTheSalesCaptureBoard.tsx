import Link from 'next/link'
import {Quicksand} from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

type CaptureMetric = {
  value: string
  label: string
}

type StrategyPrinciple = {
  id: string
  title: string
  detail: string
}

type DraftFrame = {
  clientLogo: {
    name: string
  }
  title: string
  summary: string
  clientContext: string
  serviceLine: string
  deliverables: string[]
  results: CaptureMetric[]
  problem: string
  solution: string
  resultNarrative: string
  beforeAfterSection: {
    title: string
    body: string
  }
  testimonialSection: {
    quote: string
    author: string
    role: string
    company: string
  }
  finalCta: {
    eyebrow: string
    title: string
    body: string
    buttonText: string
    href: string
  }
  strategyPrinciples: StrategyPrinciple[]
  checkoutPrinciples: string[]
}

const draft: DraftFrame = {
  clientLogo: {
    name: 'LoveTheSales',
  },
  title: 'E-commerce rebrand infused with behavioral psychology, boosting cart conversion by 50%.',
  summary:
    'LoveTheSales asked for a sharper brand, cleaner shopping journey, and a product language that could build trust faster at every decision point.',
  clientContext:
    'Based out of London, LoveTheSales operates as a leading e-commerce marketplace helping shoppers discover standout deals across fashion, beauty, home, and lifestyle brands. The product needed to feel as intelligent as the business behind it.',
  serviceLine: 'Web Design',
  deliverables: ['UI Design', 'UX Strategy', 'Brand Refresh', 'Conversion Copy'],
  results: [
    {value: '+50%', label: 'Cart conversion rate'},
    {value: '+30%', label: 'Sign-up uplift'},
    {value: '850+', label: 'Retailers connected'},
    {value: '4M+', label: 'Shoppers influenced'},
  ],
  problem:
    'The experience felt fragmented. Visual inconsistency, competing calls to action, and checkout friction diluted trust in what should have been a confident, high-conviction marketplace.',
  solution:
    'We rebuilt the interface around clarity, familiarity, and persuasive decision support. The new direction blended an editorial brand layer with purchase psychology patterns that reduced hesitation and made the flow feel obvious.',
  resultNarrative:
    'The redesign gave LoveTheSales a crisper identity and a more persuasive conversion journey. The outcome was not just a cleaner surface, but a shopping experience that nudged people toward action without feeling pushy.',
  beforeAfterSection: {
    title: 'Transformation that made shopping feel easier, lighter, and more credible.',
    body: 'The refreshed direction balanced emotional brand cues with a practical, low-friction browsing flow. The result was a more modern surface that still felt grounded in trust.',
  },
  testimonialSection: {
    quote:
      "The team put in an incredible amount of thought into the product and delivered a direction we're genuinely proud to share.",
    author: 'Mark Solomon',
    role: 'Founder & CPO',
    company: 'LoveTheSales',
  },
  finalCta: {
    eyebrow: 'Have a project like this in mind?',
    title: "Let's build the next conversion story.",
    body: 'Webkowsky helps e-commerce and product teams shape sharper interfaces, clearer brands, and high-intent journeys that convert.',
    buttonText: 'Start a project',
    href: '/contact',
  },
  strategyPrinciples: [
    {
      id: '01',
      title: 'Category heuristics',
      detail: 'Sharper wayfinding and product grouping to reduce orientation cost.',
    },
    {
      id: '02',
      title: 'Power of now',
      detail: 'Timely cues and short feedback loops that reward immediate action.',
    },
    {
      id: '03',
      title: 'Social proof',
      detail: 'Trust touchpoints placed where hesitation used to show up.',
    },
    {
      id: '04',
      title: 'Scarcity principle',
      detail: 'Offer framing designed to create urgency without visual noise.',
    },
    {
      id: '05',
      title: 'Authority principle',
      detail: 'Clearer product structure and editorial tone to reinforce confidence.',
    },
    {
      id: '06',
      title: 'Power of free',
      detail: 'Incentive language used to pull users deeper into the funnel.',
    },
  ],
  checkoutPrinciples: [
    'Urgency & scarcity',
    'Free-delivery threshold',
    'Eliminate choice paralysis',
    'Guest checkout',
    'Promotion vs loss aversion',
    'Mental accounting',
  ],
}

function LoveTheSalesLogo({compact = false}: {compact?: boolean}) {
  return (
    <div className={compact ? 'inline-flex items-center gap-3' : 'inline-flex items-center gap-4'}>
      <svg
        width={compact ? '34' : '48'}
        height={compact ? '34' : '48'}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M24.001 42.836L6.69 25.526C1.103 19.938 1.103 10.879 6.69 5.291C12.278 -0.296 21.337 -0.296 26.924 5.291L29.657 8.024L24.001 13.681L21.268 10.948C18.804 8.484 14.809 8.484 12.345 10.948C9.881 13.412 9.881 17.407 12.345 19.871L24.001 31.527L35.657 19.871C38.121 17.407 38.121 13.412 35.657 10.948C33.193 8.484 29.198 8.484 26.734 10.948L24.001 13.681L18.344 8.024L21.077 5.291C26.665 -0.296 35.724 -0.296 41.311 5.291C46.899 10.879 46.899 19.938 41.311 25.526L24.001 42.836Z"
          fill="#1EC7A8"
        />
        <circle cx="34.5" cy="14.5" r="3.5" fill="#D8FFF4" />
      </svg>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-semibold tracking-[-0.05em] text-[#101214] ${compact ? 'text-[21px]' : 'text-[31px]'}`}
        >
          love
        </span>
        <span
          className={`font-semibold tracking-[-0.05em] text-[#101214] ${compact ? 'text-[21px]' : 'text-[31px]'}`}
        >
          the
        </span>
        <span
          className={`font-semibold tracking-[-0.05em] text-[#101214] ${compact ? 'text-[21px]' : 'text-[31px]'}`}
        >
          sales
        </span>
      </div>
    </div>
  )
}

function CaptureBoard({
  label,
  widthClass,
  children,
}: {
  label: string
  widthClass: string
  children: React.ReactNode
}) {
  return (
    <section className={`mx-auto w-full ${widthClass}`}>
      <div className="mb-3 flex items-center justify-between gap-4 px-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#53606f]">{label}</p>
        <div className="h-px flex-1 bg-black/8" />
      </div>
      {children}
    </section>
  )
}

function FrameTitle({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow: string
  title: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      <p className="text-[15px] font-semibold uppercase tracking-[0.24em] text-[#08b99a]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-[48px] font-bold leading-[0.96] tracking-[-0.06em] text-[#111111]">
        {title}
      </h2>
    </div>
  )
}

function EditorialDivider({centered = false}: {centered?: boolean}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-16 w-px bg-[#16c5a7] ${centered ? 'mx-auto' : ''}`}
    />
  )
}

function MetricCard({metric}: {metric: CaptureMetric}) {
  return (
    <div className="min-w-0 rounded-[26px] border border-black/7 bg-white/88 p-6 shadow-[0_20px_45px_rgba(17,18,20,0.06)]">
      <p className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-[#5d6570] [font-variant-numeric:tabular-nums]">
        Metric
      </p>
      <p className="mt-4 text-[38px] font-bold leading-none tracking-[-0.05em] text-[#111111] [font-variant-numeric:tabular-nums]">
        {metric.value}
      </p>
      <p className="mt-3 max-w-[18ch] text-[15px] leading-6 text-[#4a525b]">{metric.label}</p>
    </div>
  )
}

function DeviceShell({
  variant,
  className = '',
  children,
}: {
  variant: 'phone' | 'tablet'
  className?: string
  children: React.ReactNode
}) {
  const frameClasses =
    variant === 'phone'
      ? 'w-[260px] rounded-[34px] border-[8px] border-[#15171d] p-[6px]'
      : 'w-[760px] rounded-[34px] border-[10px] border-[#16181d] p-[8px]'

  const notch =
    variant === 'phone' ? (
      <span className="absolute left-1/2 top-[10px] h-[18px] w-[112px] -translate-x-1/2 rounded-full bg-[#0a0b0d]" />
    ) : null

  return (
    <div
      className={`relative bg-[#15171d] shadow-[0_48px_80px_rgba(12,16,20,0.22)] ${frameClasses} ${className}`}
    >
      {notch}
      <div className="overflow-hidden rounded-[24px] bg-white">{children}</div>
    </div>
  )
}

function ScreenHeader({compact = false}: {compact?: boolean}) {
  return (
    <div className="flex items-center justify-between border-b border-black/7 px-4 py-3">
      <LoveTheSalesLogo compact />
      <div className="flex items-center gap-2">
        <span className="h-8 w-20 rounded-full bg-[#f1f4f2]" />
        {!compact ? <span className="h-8 w-8 rounded-full bg-[#eff2f5]" /> : null}
      </div>
    </div>
  )
}

function TabletCommerceScreen() {
  return (
    <div className="bg-[#fcfcfb]">
      <ScreenHeader />
      <div className="grid gap-8 px-8 py-8">
        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#08b99a]">
              Editorial commerce
            </p>
            <h3 className="mt-4 max-w-[12ch] text-[54px] font-bold leading-[0.95] tracking-[-0.06em] text-[#111111]">
              Pay less for the brands you love.
            </h3>
            <p className="mt-4 max-w-[40ch] text-[18px] leading-8 text-[#59616c]">
              A lighter browsing flow designed to reduce friction and make value feel immediate.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <span className="inline-flex min-h-12 items-center rounded-full bg-[#12b89a] px-6 py-3 text-sm font-semibold text-white">
                Start browsing
              </span>
              <span className="text-sm font-semibold text-[#515a66]">Trusted by deal-driven shoppers</span>
            </div>
          </div>
          <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,#ebfffa_0%,#d6fff3_46%,#baf4e5_100%)] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-[0.9] rounded-[24px] bg-[linear-gradient(180deg,#ffffff_0%,#d7fff4_100%)] p-5">
                <div className="flex h-full flex-col justify-between">
                  <div className="grid gap-3">
                    <span className="h-4 w-24 rounded-full bg-[#dce8e5]" />
                    <span className="h-4 w-16 rounded-full bg-[#dce8e5]" />
                  </div>
                  <div className="grid gap-3">
                    <span className="h-28 rounded-[18px] bg-[linear-gradient(145deg,#ffe7c4,#ffbf68)]" />
                    <span className="h-10 rounded-full bg-[#14bf9f]" />
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="h-28 rounded-[24px] bg-[linear-gradient(135deg,#e7f4ff,#ffffff)]" />
                <div className="h-36 rounded-[24px] bg-[linear-gradient(145deg,#ffffff,#f7f7f5)] p-4">
                  <div className="grid gap-3">
                    <span className="h-8 rounded-full bg-[#eaf1ef]" />
                    <span className="h-8 rounded-full bg-[#eaf1ef]" />
                    <span className="h-8 rounded-full bg-[#eaf1ef]" />
                  </div>
                </div>
                <div className="h-24 rounded-[24px] bg-[linear-gradient(135deg,#fce9ed,#ffffff)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 pt-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#65707a]">
          {['Women', 'Men', 'Kids', 'Home', 'Beauty', 'Brands'].map((item) => (
            <span key={item} className="rounded-full border border-black/6 px-3 py-3">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneBrowseScreen() {
  return (
    <div className="bg-[#fbfbfa]">
      <ScreenHeader compact />
      <div className="grid gap-5 px-4 pb-5 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#08b99a]">
            Welcome
          </p>
          <h4 className="mt-2 text-[30px] font-bold leading-[1] tracking-[-0.05em] text-[#111111]">
            Shop with less friction.
          </h4>
        </div>
        <div className="rounded-[24px] bg-[linear-gradient(180deg,#d7fff4_0%,#ffffff_100%)] p-4">
          <div className="grid gap-3">
            <span className="h-4 w-24 rounded-full bg-[#d4e4df]" />
            <span className="h-20 rounded-[18px] bg-[linear-gradient(145deg,#ffffff,#dffdf5)]" />
            <span className="h-11 rounded-full bg-[#16c5a7]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[20px] border border-black/6 p-3">
            <p className="text-[12px] font-semibold text-[#111111]">Saved brands</p>
            <p className="mt-2 text-[12px] leading-5 text-[#5c6570]">Personalized feed and cleaner routing.</p>
          </div>
          <div className="rounded-[20px] border border-black/6 p-3">
            <p className="text-[12px] font-semibold text-[#111111]">Fast checkout</p>
            <p className="mt-2 text-[12px] leading-5 text-[#5c6570]">Less decision load, more forward motion.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneStyleSurveyScreen() {
  return (
    <div className="bg-[#fbfbfa]">
      <ScreenHeader compact />
      <div className="grid gap-5 px-4 pb-5 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#08b99a]">
            Personalization
          </p>
          <h4 className="mt-2 text-[28px] font-bold leading-[1.02] tracking-[-0.05em] text-[#111111]">
            What kind of style do you prefer?
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['Urban', 'Classic', 'Bright', 'Minimal'].map((item, index) => (
            <div
              key={item}
              className={`aspect-[0.85] rounded-[20px] ${
                index === 0
                  ? 'bg-[linear-gradient(145deg,#d2ffe8,#ffefc8)]'
                  : index === 1
                    ? 'bg-[linear-gradient(145deg,#e9efff,#ffffff)]'
                    : index === 2
                      ? 'bg-[linear-gradient(145deg,#ffffff,#d7fff4)]'
                      : 'bg-[linear-gradient(145deg,#ffe5cf,#ffffff)]'
              }`}
            />
          ))}
        </div>
        <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#16c5a7] px-4 py-3 text-sm font-semibold text-white">
          Continue
        </span>
      </div>
    </div>
  )
}

function PhoneCheckoutPromptScreen() {
  return (
    <div className="bg-[#fbfbfa]">
      <ScreenHeader compact />
      <div className="grid gap-5 px-4 pb-5 pt-6">
        <div className="grid gap-2 rounded-[24px] border border-black/6 bg-white p-5">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e5fffa]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 17.5L2.917 10.417C0.972 8.472 0.972 5.319 2.917 3.374C4.862 1.429 8.015 1.429 9.96 3.374L10 3.414L10.04 3.374C11.985 1.429 15.138 1.429 17.083 3.374C19.028 5.319 19.028 8.472 17.083 10.417L10 17.5Z"
                fill="#16c5a7"
              />
            </svg>
          </span>
          <p className="text-center text-[15px] font-semibold text-[#111111]">Enjoying the app?</p>
          <div className="grid grid-cols-2 gap-3">
            <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/8 text-sm font-semibold text-[#5d6570]">
              Not yet
            </span>
            <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#16c5a7] text-sm font-semibold text-white">
              Yes
            </span>
          </div>
        </div>
        <div className="rounded-[24px] border border-black/6 bg-white p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#65707a]">
            Checkout guidance
          </p>
          <p className="mt-2 text-[12px] leading-5 text-[#5b6470]">
            Progress cues, reward framing, and a softer decision sequence reduce drop-off.
          </p>
        </div>
      </div>
    </div>
  )
}

function AbstractTeamCard() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-black/8 bg-[linear-gradient(180deg,#fcfbf8_0%,#eeece7_100%)] px-12 pb-12 pt-10 shadow-[0_40px_65px_rgba(16,18,20,0.08)]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(90deg,#2b2020,#6b5048,#2f2d38)] opacity-85" />
      <div className="absolute left-6 top-6">
        <LoveTheSalesLogo compact />
      </div>
      <div className="relative mt-24 grid grid-cols-3 gap-6">
        {[
          ['#cfd8e7', '#f2f3ef'],
          ['#dfe7d3', '#f4efe5'],
          ['#d7d8df', '#efebe6'],
        ].map(([accent, neutral], index) => (
          <div
            key={`portrait-${index}`}
            className="flex aspect-[0.82] items-end justify-center overflow-hidden rounded-[28px] bg-white"
          >
            <div
              className="relative flex h-full w-full items-end justify-center rounded-[28px]"
              style={{background: `linear-gradient(180deg, ${neutral} 0%, ${accent} 100%)`}}
            >
              <span className="absolute top-[14%] h-[18%] w-[24%] rounded-full bg-[#f3d0b1]" />
              <span
                className={`absolute top-[10%] h-[20%] w-[28%] rounded-full ${
                  index === 1 ? 'bg-[#8b7754]' : index === 2 ? 'bg-[#3d342e]' : 'bg-[#4d433d]'
                }`}
              />
              <span
                className={`h-[58%] w-[54%] rounded-t-[120px] ${
                  index === 1 ? 'bg-[#b8c09e]' : index === 2 ? 'bg-[#20232a]' : 'bg-[#7f8aa1]'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PrincipleCard({principle}: {principle: StrategyPrinciple}) {
  return (
    <div className="min-w-0 border border-black/8 bg-white/72 p-7">
      <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#08b99a]">
        {principle.id}
      </p>
      <h3 className="mt-6 text-[24px] font-bold leading-[1.05] tracking-[-0.04em] text-[#111111]">
        {principle.title}
      </h3>
      <p className="mt-4 max-w-[26ch] text-[15px] leading-7 text-[#525b67]">{principle.detail}</p>
    </div>
  )
}

function ProblemCollage() {
  const labels = [
    {text: 'Inconsistent design', className: 'left-10 top-10'},
    {text: 'Dissonant UI elements', className: 'left-[-12px] top-[290px]'},
    {text: 'Different logos', className: 'right-14 bottom-8'},
  ]

  return (
    <div className="relative rounded-[40px] border border-black/8 bg-white/72 px-10 pb-10 pt-12 shadow-[0_40px_65px_rgba(17,18,20,0.08)]">
      {labels.map((label) => (
        <span
          key={label.text}
          className={`absolute rounded-full bg-[#1914a8] px-5 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_16px_30px_rgba(53,23,251,0.28)] ${label.className}`}
        >
          {label.text}
        </span>
      ))}
      <div className="mx-auto grid max-w-[860px] gap-6 pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[26px] border border-black/7 bg-[#faf9f6] p-8">
            <div className="grid gap-5">
              <div className="flex items-center gap-4">
                <span className="h-12 w-36 rounded-full bg-[#eef2f0]" />
                <span className="h-8 w-20 rounded-full bg-[#eff2f5]" />
              </div>
              <div className="grid gap-4">
                <span className="h-10 w-[72%] rounded-full bg-[#eef1ee]" />
                <span className="h-32 rounded-[22px] bg-[linear-gradient(135deg,#ffffff,#f2f0ec)]" />
                <div className="grid grid-cols-3 gap-3">
                  <span className="h-16 rounded-[18px] bg-[#f3f5f8]" />
                  <span className="h-16 rounded-[18px] bg-[#f3f5f8]" />
                  <span className="h-16 rounded-[18px] bg-[#f3f5f8]" />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[26px] border border-black/7 bg-[#f6f6f4] p-6">
            <div className="grid gap-4">
              <span className="h-8 w-24 rounded-full bg-[#dffbf2]" />
              <span className="h-10 rounded-full bg-white" />
              <span className="h-10 rounded-full bg-white" />
              <span className="h-10 rounded-full bg-white" />
              <span className="h-10 rounded-full bg-white" />
              <span className="h-10 rounded-full bg-white" />
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[26px] border border-black/7 bg-white p-6">
            <div className="grid gap-3">
              <span className="h-9 rounded-full bg-[#1fc9ab]" />
              <span className="h-9 rounded-full bg-[#1914a8]" />
              <span className="h-9 rounded-full bg-[#17c0a2]" />
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-6 rounded-[26px] border border-black/7 bg-white p-8">
            <div className="flex items-center gap-4">
              <span className="h-12 w-12 rounded-full bg-[#20c4a7]" />
              <span className="text-[17px] font-semibold text-[#111111]">LTS</span>
            </div>
            <div className="flex items-center justify-center">
              <svg
                width="50"
                height="46"
                viewBox="0 0 50 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M25 43L7.3 25.3C1.23 19.23 1.23 9.39 7.3 3.32C13.37 -2.75 23.21 -2.75 29.28 3.32L31.07 5.11C30.17 6.06 29.31 6.99 28.46 7.93L26.67 6.15C21.83 1.3 13.98 1.3 9.13 6.15C4.29 10.99 4.29 18.84 9.13 23.69L25 39.56L40.87 23.69C45.71 18.84 45.71 10.99 40.87 6.15C36.02 1.3 28.17 1.3 23.33 6.15L21.54 7.93L19.02 5.41L20.8 3.63C26.87 -2.44 36.71 -2.44 42.78 3.63C48.85 9.7 48.85 19.54 42.78 25.61L25 43Z"
                  fill="#1EC7A8"
                />
              </svg>
            </div>
            <div className="text-right text-[20px] font-semibold tracking-[-0.04em] text-[#1fc9ab]">
              LoveTheSales
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckoutCluster({items}: {items: string[]}) {
  const placements = [
    'left-[8%] top-[10%]',
    'right-[10%] top-[18%]',
    'left-[20%] top-[42%]',
    'left-[5%] bottom-[16%]',
    'right-[7%] bottom-[23%]',
    'left-[33%] bottom-[8%]',
  ]

  return (
    <div className="relative h-[540px] rounded-[40px] border border-black/8 bg-[linear-gradient(180deg,#f8f8f5_0%,#f1f0eb_100%)] shadow-[0_40px_70px_rgba(17,18,20,0.08)]">
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="64"
          height="58"
          viewBox="0 0 64 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M32 56L9.33 33.33C1.78 25.78 1.78 13.54 9.33 5.99C16.87 -1.55 29.11 -1.55 36.66 5.99L39.2 8.53L34.1 13.63L31.56 11.09C26.82 6.35 19.14 6.35 14.4 11.09C9.67 15.82 9.67 23.51 14.4 28.24L32 45.84L49.6 28.24C54.33 23.51 54.33 15.82 49.6 11.09C44.86 6.35 37.18 6.35 32.44 11.09L29.9 13.63L24.8 8.53L27.34 5.99C34.89 -1.55 47.13 -1.55 54.67 5.99C62.22 13.54 62.22 25.78 54.67 33.33L32 56Z"
            fill="#16c5a7"
          />
        </svg>
      </div>
      {items.map((item, index) => (
        <div
          key={item}
          className={`absolute min-h-[88px] min-w-[220px] max-w-[260px] rounded-[24px] border border-black/7 bg-white/92 px-6 py-5 text-center shadow-[0_24px_45px_rgba(17,18,20,0.08)] ${placements[index]}`}
        >
          <span className="block text-[19px] font-semibold leading-7 tracking-[-0.03em] text-[#111111]">
            {item}
          </span>
        </div>
      ))}
      <span className="absolute left-[16%] top-[76%] h-2.5 w-2.5 rounded-full bg-[#24d4b6]" />
      <span className="absolute left-[54%] top-[16%] h-3 w-3 rounded-full bg-[#24d4b6]" />
      <span className="absolute right-[12%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#24d4b6]" />
      <span className="absolute left-[28%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#24d4b6]" />
    </div>
  )
}

function QuoteBlock() {
  return (
    <div className="relative mx-auto max-w-[900px] rounded-[40px] border border-black/7 bg-white/84 px-12 py-14 text-center shadow-[0_30px_65px_rgba(17,18,20,0.08)]">
      <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#dffdf4,#fefcf8)] text-[24px] font-bold text-[#0b1115] shadow-[0_16px_30px_rgba(17,18,20,0.08)]">
        MS
      </div>
      <p className="mt-8 text-balance text-[34px] font-medium leading-[1.4] tracking-[-0.03em] text-[#1b1f24]">
        &ldquo;{draft.testimonialSection.quote}&rdquo;
      </p>
      <div className="mt-10">
        <p className="text-[23px] font-bold tracking-[-0.03em] text-[#111111]">
          {draft.testimonialSection.author}
        </p>
        <p className="mt-2 text-[16px] leading-7 text-[#59616d]">
          {draft.testimonialSection.role} at {draft.testimonialSection.company}
        </p>
      </div>
      <span className="pointer-events-none absolute left-8 top-10 text-[160px] leading-none text-[#eef2ef]">
        &ldquo;
      </span>
      <span className="pointer-events-none absolute bottom-0 right-12 text-[160px] leading-none text-[#eaf9f5]">
        &rdquo;
      </span>
    </div>
  )
}

function DesktopCaseStudyFrame() {
  return (
    <div
      id="desktop-capture"
      className="overflow-hidden rounded-[36px] border border-black/8 bg-[#f5f4ef] shadow-[0_40px_90px_rgba(17,18,20,0.12)]"
    >
      <div className="px-[72px] py-[76px]">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(540px,0.95fr)] lg:items-center">
          <div className="min-w-0">
            <LoveTheSalesLogo />
            <p className="mt-10 max-w-[18ch] text-balance text-[62px] font-bold leading-[0.94] tracking-[-0.07em] text-[#111111]">
              {draft.title}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-[14px_minmax(0,1fr)] sm:items-start">
              <EditorialDivider />
              <p className="max-w-[38ch] text-[20px] leading-9 text-[#4f5864]">{draft.summary}</p>
            </div>
            <dl className="mt-12 grid gap-6 text-[16px] leading-7 text-[#4e5762] sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#5b6571]">
                  Service
                </dt>
                <dd className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-[#111111]">
                  {draft.serviceLine}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#5b6571]">
                  Deliverables
                </dt>
                <dd className="mt-3 flex min-w-0 flex-wrap gap-2">
                  {draft.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-11 items-center rounded-full border border-black/8 bg-white/86 px-4 py-2 text-[14px] font-semibold text-[#20242a]"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[40px] bg-[linear-gradient(145deg,#f2f4f2_0%,#ededeb_46%,#f6f5f0_100%)] p-8 sm:min-h-[540px] sm:p-10 lg:min-h-[620px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_48%)]" />
            <DeviceShell
              variant="tablet"
              className="absolute right-[-96px] top-12 rotate-[10deg] scale-[0.48] origin-top-right sm:right-[-72px] sm:scale-[0.56] lg:right-4 lg:top-10 lg:scale-[0.68]"
            >
              <TabletCommerceScreen />
            </DeviceShell>
            <DeviceShell
              variant="phone"
              className="absolute left-[-8px] top-[54px] rotate-[-9deg] scale-[0.74] origin-top-left sm:left-2 sm:scale-[0.82] lg:left-6 lg:top-[62px] lg:scale-[0.96]"
            >
              <PhoneStyleSurveyScreen />
            </DeviceShell>
            <DeviceShell
              variant="phone"
              className="absolute bottom-2 right-2 rotate-[18deg] scale-[0.68] origin-bottom-right sm:bottom-4 sm:right-8 sm:scale-[0.76] lg:bottom-6 lg:right-[56px] lg:scale-[0.88]"
            >
              <PhoneCheckoutPromptScreen />
            </DeviceShell>
            <div className="absolute bottom-[62px] left-[180px] h-6 w-6 rounded-full bg-[#1dd0b1]" />
          </div>
        </section>
      </div>

      <section className="border-t border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.18)_100%)] px-[72px] py-8">
        <div className="grid gap-5 lg:grid-cols-4">
          {draft.results.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      <section className="px-[72px] py-[92px]">
        <FrameTitle eyebrow="Meet the Client" title="A marketplace that needed to feel as smart as it already was." />
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(520px,0.96fr)] lg:items-start">
          <div className="grid gap-6 sm:grid-cols-[14px_minmax(0,1fr)] sm:items-start">
            <EditorialDivider />
            <p className="max-w-[34ch] text-[20px] leading-9 text-[#505965]">{draft.clientContext}</p>
          </div>
          <AbstractTeamCard />
        </div>
      </section>

      <section className="bg-[#efefea] px-[72px] py-[96px]">
        <FrameTitle eyebrow="Understanding the Problem" title="Trust was leaking through every inconsistent surface." centered />
        <div className="mx-auto mt-10 max-w-[920px]">
          <EditorialDivider centered />
          <p className="mx-auto mt-10 max-w-[35ch] text-center text-[22px] leading-10 text-[#4d5560]">
            {draft.problem}
          </p>
        </div>
        <div className="mt-16">
          <ProblemCollage />
        </div>
      </section>

      <section className="px-[72px] py-[96px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)] lg:items-start">
          <div className="min-w-0">
            <FrameTitle eyebrow="A more engaging" title="Shopping experience" />
            <div className="mt-10 grid gap-6 sm:grid-cols-[14px_minmax(0,1fr)] sm:items-start">
              <EditorialDivider />
              <p className="max-w-[33ch] text-[20px] leading-9 text-[#505965]">{draft.solution}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-0 border border-black/8 bg-[#f8f8f5]">
            {draft.strategyPrinciples.map((principle) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-[72px] py-[96px]">
        <div className="overflow-hidden rounded-[40px] border border-black/8 bg-[linear-gradient(180deg,#1bd0b2_0%,#13ba9d_100%)] shadow-[0_40px_80px_rgba(17,18,20,0.12)]">
          <div className="grid gap-8 px-10 pb-12 pt-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold uppercase tracking-[0.22em] text-white/78">
                  Transformation showcase
                </p>
                <h2 className="mt-4 max-w-[13ch] text-balance text-[52px] font-bold leading-[0.96] tracking-[-0.06em] text-[#071113]">
                  {draft.beforeAfterSection.title}
                </h2>
                <p className="mt-6 max-w-[34ch] text-[19px] leading-8 text-[#072025]/84">
                  {draft.beforeAfterSection.body}
                </p>
              </div>
              <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_100%)] p-6">
                <DeviceShell
                  variant="tablet"
                  className="mx-auto w-[820px] max-w-full rotate-[-7deg] scale-[0.98] origin-bottom"
                >
                  <TabletCommerceScreen />
                </DeviceShell>
              </div>
            </div>
            <div className="flex justify-end">
              <DeviceShell variant="phone" className="rotate-[12deg]">
                <PhoneBrowseScreen />
              </DeviceShell>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efefea] px-[72px] py-[96px]">
        <FrameTitle eyebrow="Mobile product" title="Personalization cues that feel lighter on the hand." centered />
        <div className="mt-16 flex flex-wrap items-end justify-center gap-8">
          <DeviceShell variant="phone" className="rotate-[-10deg]">
            <PhoneStyleSurveyScreen />
          </DeviceShell>
          <DeviceShell variant="phone" className="translate-y-10">
            <PhoneBrowseScreen />
          </DeviceShell>
          <DeviceShell variant="phone" className="rotate-[13deg]">
            <PhoneCheckoutPromptScreen />
          </DeviceShell>
        </div>
      </section>

      <section className="px-[72px] py-[96px]">
        <FrameTitle eyebrow="Optimizing the" title="Checkout flow" centered />
        <div className="mx-auto mt-10 max-w-[920px]">
          <EditorialDivider centered />
          <p className="mx-auto mt-10 max-w-[36ch] text-center text-[21px] leading-9 text-[#4d5560]">
            {draft.resultNarrative}
          </p>
        </div>
        <div className="mt-16">
          <CheckoutCluster items={draft.checkoutPrinciples} />
        </div>
      </section>

      <section className="bg-[#efefea] px-[72px] py-[96px]">
        <QuoteBlock />
      </section>

      <section className="px-[72px] py-[96px]">
        <div className="mx-auto max-w-[1020px] rounded-[40px] border border-black/8 bg-white/88 px-12 py-16 text-center shadow-[0_32px_70px_rgba(17,18,20,0.08)]">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#3517fb]">
            {draft.finalCta.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-[58px] font-bold leading-[0.96] tracking-[-0.06em] text-[#111111]">
            {draft.finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[38ch] text-[20px] leading-9 text-[#525b67]">
            {draft.finalCta.body}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={draft.finalCta.href}
              className="inline-flex min-h-14 items-center rounded-full bg-[#3517fb] px-7 py-3 text-base font-semibold text-white shadow-[0_20px_38px_rgba(53,23,251,0.3)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-[#2a0ee0] hover:shadow-[0_24px_44px_rgba(53,23,251,0.34)] hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3517fb] touch-manipulation"
            >
              {draft.finalCta.buttonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function MobileFrame({
  label,
  eyebrow,
  title,
  children,
}: {
  label: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-black/8 bg-[#f5f4ef] shadow-[0_26px_60px_rgba(17,18,20,0.12)]">
      <div className="border-b border-black/6 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#53606f]">{label}</p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#08b99a]">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-balance text-[28px] font-bold leading-[1.02] tracking-[-0.05em] text-[#111111]">
          {title}
        </h3>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  )
}

function MobileIntroFrame() {
  return (
    <MobileFrame label="Mobile / Intro" eyebrow="LoveTheSales" title="Editorial entry without the heavy hero chrome.">
      <LoveTheSalesLogo compact />
      <p className="mt-5 text-[16px] leading-7 text-[#4d5560]">{draft.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {draft.deliverables.slice(0, 3).map((item) => (
          <span
            key={item}
            className="inline-flex min-h-11 items-center rounded-full border border-black/7 bg-white/86 px-3 py-2 text-[12px] font-semibold text-[#15191f]"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 grid justify-center gap-4">
        <DeviceShell variant="phone">
          <PhoneBrowseScreen />
        </DeviceShell>
      </div>
      <div className="mt-6 grid gap-3">
        {draft.results.slice(0, 3).map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] border border-black/7 bg-white/86 px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b6571]">
              {metric.label}
            </p>
            <p className="mt-2 text-[28px] font-bold tracking-[-0.05em] text-[#111111] [font-variant-numeric:tabular-nums]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </MobileFrame>
  )
}

function MobileStoryFrame() {
  return (
    <MobileFrame label="Mobile / Story" eyebrow="Problem & solution" title="Make trust visible, not implied.">
      <div className="rounded-[24px] border border-black/7 bg-white/82 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#08b99a]">Problem</p>
        <p className="mt-3 text-[15px] leading-7 text-[#4d5560]">{draft.problem}</p>
      </div>
      <div className="mt-4 rounded-[24px] border border-black/7 bg-white/82 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#08b99a]">Solution</p>
        <p className="mt-3 text-[15px] leading-7 text-[#4d5560]">{draft.solution}</p>
      </div>
      <div className="mt-4 rounded-[28px] bg-[linear-gradient(180deg,#1bd0b2_0%,#15b89c_100%)] p-5">
        <div className="grid justify-center">
          <DeviceShell variant="phone" className="rotate-[-8deg] scale-[0.88]">
            <PhoneStyleSurveyScreen />
          </DeviceShell>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {draft.strategyPrinciples.slice(0, 3).map((principle) => (
          <div
            key={principle.id}
            className="rounded-[22px] border border-black/7 bg-white/86 px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#08b99a]">
              {principle.id}
            </p>
            <p className="mt-2 text-[18px] font-bold tracking-[-0.04em] text-[#111111]">
              {principle.title}
            </p>
          </div>
        ))}
      </div>
    </MobileFrame>
  )
}

function MobileClosingFrame() {
  return (
    <MobileFrame label="Mobile / Closing" eyebrow="Checkout & proof" title="Close with lighter momentum and one clear action.">
      <div className="rounded-[26px] border border-black/7 bg-white/84 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#08b99a]">
          Checkout optimization
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {draft.checkoutPrinciples.slice(0, 4).map((item) => (
            <span
              key={item}
              className="inline-flex min-h-11 items-center rounded-full border border-black/7 bg-[#f6f7f5] px-3 py-2 text-[12px] font-semibold text-[#12161c]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-[26px] border border-black/7 bg-white/84 p-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8fff8] text-[20px] font-bold text-[#111111]">
          MS
        </div>
        <p className="mt-4 text-[17px] font-medium leading-8 text-[#1b1f24]">
          &ldquo;{draft.testimonialSection.quote}&rdquo;
        </p>
        <p className="mt-4 text-[14px] font-semibold text-[#111111]">{draft.testimonialSection.author}</p>
      </div>
      <div className="mt-4 rounded-[28px] border border-black/7 bg-[linear-gradient(180deg,#ffffff_0%,#f2f4ff_100%)] p-5 text-center">
        <p className="text-[13px] font-semibold tracking-[-0.02em] text-[#3517fb]">
          {draft.finalCta.eyebrow}
        </p>
        <p className="mt-3 text-balance text-[28px] font-bold leading-[1.02] tracking-[-0.05em] text-[#111111]">
          {draft.finalCta.title}
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#4d5560]">{draft.finalCta.body}</p>
        <div className="mt-5 flex justify-center">
          <Link
            href={draft.finalCta.href}
            className="inline-flex min-h-12 items-center rounded-full bg-[#3517fb] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(53,23,251,0.28)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-[#2a0ee0] hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3517fb] touch-manipulation"
          >
            {draft.finalCta.buttonText}
          </Link>
        </div>
      </div>
    </MobileFrame>
  )
}

export default function LoveTheSalesCaptureBoard() {
  return (
    <div
      className={`${quicksand.className} min-h-dvh overflow-x-hidden bg-[#d7d8d2] px-5 py-10 text-[#111111] [color-scheme:light] md:px-8`}
    >
      <a
        href="#desktop-capture"
        className="sr-only rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#111111] focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3517fb]"
      >
        Skip to desktop case-study frame
      </a>

      <div className="mx-auto flex max-w-[1540px] flex-col gap-10">
        <CaptureBoard label="Desktop / Full Page" widthClass="max-w-[1480px]">
          <DesktopCaseStudyFrame />
        </CaptureBoard>

        <section aria-labelledby="mobile-frames-heading" className="grid gap-8">
          <div className="flex items-center justify-between gap-4 px-2">
            <p
              id="mobile-frames-heading"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[#53606f]"
            >
              Mobile Key Frames
            </p>
            <div className="h-px flex-1 bg-black/8" />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <CaptureBoard label="Mobile / Intro" widthClass="max-w-[390px]">
              <MobileIntroFrame />
            </CaptureBoard>
            <CaptureBoard label="Mobile / Story" widthClass="max-w-[390px]">
              <MobileStoryFrame />
            </CaptureBoard>
            <CaptureBoard label="Mobile / Closing" widthClass="max-w-[390px]">
              <MobileClosingFrame />
            </CaptureBoard>
          </div>
        </section>
      </div>
    </div>
  )
}
