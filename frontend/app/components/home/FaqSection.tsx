const FAQ_ITEMS = [
  {
    question: 'Can we have calls?',
    answer:
      'Yes. We can run regular calls and async updates in parallel. The cadence depends on the package and delivery phase.',
  },
  {
    question: 'How does retainer work?',
    answer:
      'Retainer gives you dedicated capacity every month. We align milestones upfront and adapt priorities weekly.',
  },
  {
    question: 'What if results do not perform?',
    answer:
      'We iterate quickly based on feedback and measurable outcomes. The process is designed for continuous optimization.',
  },
  {
    question: 'How do we share feedback?',
    answer:
      'Feedback is shared directly in Figma and weekly review threads. We keep one source of truth to avoid context loss.',
  },
  {
    question: 'Is there a trial period?',
    answer:
      'Yes. We can start with a scoped sprint before moving into a long-term engagement.',
  },
  {
    question: 'What is included in xSite?',
    answer:
      'xSite includes strategy, design direction, key conversion pages, and delivery support for launch.',
  },
]

export default function FaqSection() {
  return (
    <section className="py-20 sm:py-24 md:py-[96px]">
      <div className="container">
        <div className="rounded-[28px] border border-[#d7dae3] bg-white px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-primary shrink-0" />
                <p className="font-sans font-bold text-base tracking-[-0.24px] text-black">
                  FREQUENTLY <span className="text-primary">ASKED QUESTIONS</span>
                </p>
              </div>

              <p className="max-w-[46ch] font-sans text-sm leading-[1.45] text-black/65">
                xSite is built to ship fast without sacrificing quality. Below are the most common questions
                teams ask before starting.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[14px] border border-[#d7dae3] bg-[#f8f9fc] px-4 py-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="font-sans text-sm font-semibold leading-[1.35] text-black">
                      {item.question}
                    </span>
                    <span className="inline-flex size-6 items-center justify-center rounded-full border border-black/20 text-black/75 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 font-sans text-sm leading-[1.45] text-black/70">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
