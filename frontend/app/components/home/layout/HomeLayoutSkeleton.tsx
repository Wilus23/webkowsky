import CallSection from '@/app/components/home/CallSection'
import FeaturesSection from '@/app/components/home/FeaturesSection'
import FaqSection from '@/app/components/home/FaqSection'
import HeroSection from '@/app/components/home/HeroSection'
import LogoBar from '@/app/components/home/LogoBar'
import OurWorkSection from '@/app/components/home/OurWorkSection'
import PricingSection from '@/app/components/home/PricingSection'
import TestimonialSection from '@/app/components/home/TestimonialSection'

export default function HomeLayoutSkeleton() {
  return (
    <>
      <section id="hero" className="bg-surface pb-6 pt-0 text-white sm:pb-8">
        <div className="container">
          <div className="flex flex-col gap-6 sm:gap-8">
            <HeroSection />
          </div>
        </div>
      </section>

      <section id="logos" className="bg-surface text-white">
        <LogoBar />
      </section>

      <section id="work" className="bg-surface text-white">
        <OurWorkSection />
      </section>

      <TestimonialSection />

      <section id="offer" className="bg-surface text-white">
        <FeaturesSection />
      </section>

      <section id="sales" className="bg-white text-black">
        <PricingSection />
      </section>

      <section id="faq" className="bg-white text-black">
        <FaqSection />
      </section>

      <section id="cta" className="bg-surface pb-16 md:pb-20 lg:pb-24">
        <div className="container">
          <CallSection />
        </div>
      </section>
    </>
  )
}
