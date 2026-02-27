'use client'

import MagneticLink from '@/app/components/animations/MagneticLink'
import LegacyOfferInteractive, {
  type LegacyOfferTab,
} from '@/app/components/home/shared/LegacyOfferInteractive'

/* ------------------------------------------------------------------ */
/*  Figma asset URLs — replace with Sanity CDN in production           */
/* ------------------------------------------------------------------ */
const IMAGE_FOUNDERS =
  'https://www.figma.com/api/mcp/asset/6b669ef6-f6a1-4cf5-bbfd-37ff1cdfba2e'
const IMAGE_SALES =
  'https://www.figma.com/api/mcp/asset/da14191d-f836-40d6-8d08-88559cd422e2'
const IMAGE_DEVELOPERS =
  'https://www.figma.com/api/mcp/asset/97cc0121-ca63-44a4-be41-0f5f009ee6cf'
const IMAGE_STARTUPS =
  'https://www.figma.com/api/mcp/asset/b1232b41-8c1b-44cb-86fd-c18bebf12059'

const TABS: LegacyOfferTab[] = [
  {
    key: 'Founders',
    label: 'Founders',
    activeFeature: 'Strategia marki i pozycjonowanie oferty dla wzrostu',
    inactiveFeatures: [
      'Projektowanie strony pod konkretny model biznesowy',
      'Roadmapa działań z jasnymi milestone’ami',
      'Wsparcie decyzyjne i szybkie iteracje weekly',
    ],
    description:
      'Układamy fundament oferty i komunikacji, żeby strona sprzedawała to, co naprawdę buduje wartość firmy.',
    visual: {type: 'image', src: IMAGE_FOUNDERS, alt: 'Founders strategy'},
  },
  {
    key: 'Marketing',
    label: 'Marketing',
    activeFeature: 'SEO i content plan dopasowany do realnych intencji użytkownika',
    inactiveFeatures: [
      'Copywriting nastawiony na konwersję',
      'Google Ads spięte z lejkiem sprzedaży',
      'Stała optymalizacja na danych i insightach',
    ],
    description:
      'Dla marketingu najważniejsze kanały pokazujemy od razu jako konkretne bloki działań i priorytety na stronie.',
    visual: {
      type: 'keywords',
      label: 'Marketing stack',
      terms: ['SEO', 'COPYWRITING', 'GOOGLE ADS', 'CONTENT'],
    },
  },
  {
    key: 'Sales',
    label: 'Sales',
    activeFeature: 'Oferta i landingi zaprojektowane pod wzrost liczby leadów',
    inactiveFeatures: [
      'Case studies, które wspierają rozmowy sprzedażowe',
      'Komunikaty wartości dla różnych etapów pipeline’u',
      'Szybkie testy CTA i sekcji konwersyjnych',
    ],
    description:
      'Sekcje sprzedażowe budujemy tak, aby handlowiec miał gotowe argumenty, a użytkownik jasny kolejny krok.',
    visual: {type: 'image', src: IMAGE_SALES, alt: 'Sales enablement preview'},
  },
  {
    key: 'Developers',
    label: 'Developers',
    activeFeature: 'Implementacja techniczna bez kompromisów dla wydajności',
    inactiveFeatures: [
      'Spójny design system do szybszego developmentu',
      'Komponenty gotowe do skalowania produktu',
      'Proces współpracy product + engineering',
    ],
    description:
      'Łączymy design i development tak, żeby efekt końcowy był szybki, czytelny i łatwy do utrzymania przez zespół.',
    visual: {type: 'image', src: IMAGE_DEVELOPERS, alt: 'Developers workflow'},
  },
  {
    key: 'Startups',
    label: 'Startups',
    activeFeature: 'Szybki time-to-market z jasnym zakresem i priorytetami',
    inactiveFeatures: [
      'Pakiet działań dopasowany do etapu wzrostu',
      'Iteracje na bazie feedbacku użytkowników',
      'Skalowanie strony wraz z rozwojem produktu',
    ],
    description:
      'Dla startupów liczy się tempo i dowożenie wyniku. Projektujemy to tak, żeby każda iteracja miała sens biznesowy.',
    visual: {type: 'image', src: IMAGE_STARTUPS, alt: 'Startup growth site'},
  },
]

const CATEGORY_ACCENTS: Record<
  (typeof TABS)[number]['key'],
  {
    activeBorder: string
    activeGlow: string
    activeTint: string
    hoverBorder: string
    hoverTint: string
  }
> = {
  Founders: {
    activeBorder: 'rgba(119,104,255,0.85)',
    activeGlow: 'rgba(119,104,255,0.35)',
    activeTint:
      'linear-gradient(140deg, rgba(15,12,27,0.85) 0%, rgba(57,46,132,0.55) 100%)',
    hoverBorder: 'rgba(119,104,255,0.62)',
    hoverTint: 'rgba(45,35,98,0.45)',
  },
  Marketing: {
    activeBorder: 'rgba(53,23,251,0.88)',
    activeGlow: 'rgba(53,23,251,0.38)',
    activeTint:
      'linear-gradient(140deg, rgba(10,8,21,0.82) 0%, rgba(53,23,251,0.42) 100%)',
    hoverBorder: 'rgba(53,23,251,0.64)',
    hoverTint: 'rgba(53,23,251,0.26)',
  },
  Sales: {
    activeBorder: 'rgba(86,66,255,0.86)',
    activeGlow: 'rgba(86,66,255,0.34)',
    activeTint:
      'linear-gradient(140deg, rgba(12,10,24,0.84) 0%, rgba(79,68,165,0.52) 100%)',
    hoverBorder: 'rgba(86,66,255,0.62)',
    hoverTint: 'rgba(79,68,165,0.24)',
  },
  Developers: {
    activeBorder: 'rgba(104,87,255,0.86)',
    activeGlow: 'rgba(104,87,255,0.32)',
    activeTint:
      'linear-gradient(140deg, rgba(11,10,21,0.84) 0%, rgba(96,83,170,0.5) 100%)',
    hoverBorder: 'rgba(104,87,255,0.62)',
    hoverTint: 'rgba(96,83,170,0.24)',
  },
  Startups: {
    activeBorder: 'rgba(69,49,248,0.86)',
    activeGlow: 'rgba(69,49,248,0.35)',
    activeTint:
      'linear-gradient(140deg, rgba(9,8,18,0.85) 0%, rgba(69,49,248,0.42) 100%)',
    hoverBorder: 'rgba(69,49,248,0.62)',
    hoverTint: 'rgba(69,49,248,0.24)',
  },
}

export default function FeaturesSection() {
  return (
    <LegacyOfferInteractive
      title="xSite"
      subtitlePrefix="All-in-one"
      subtitleHighlight="website strategy"
      tabs={TABS}
      defaultTabKey="Marketing"
      accents={CATEGORY_ACCENTS}
      renderPrimaryCta={(className) => (
        <MagneticLink
          href="/about"
          cursorColor="rgb(53, 23, 251)"
          className={className}
        >
          <span>Learn more</span>
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </MagneticLink>
      )}
      renderSecondaryCta={(className) => (
        <MagneticLink
          href="/contact"
          cursorColor="rgb(232, 232, 232)"
          className={className}
        >
          Book a call
        </MagneticLink>
      )}
    />
  )
}
