export default function InfoPage({ eyebrow, title, introduction, sections }) {
  return (
    <div className="min-h-screen bg-[#111] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <section className="section-inner">
        <div className="mx-auto max-w-4xl">
          <header className="border-b border-[#ba8a44]/30 pb-10 text-center sm:pb-12">
            <p className="text-xs font-light uppercase tracking-[3.6px] text-[#f5f5f5]">
              {eyebrow}
            </p>
            <h1 className="text-gold-gradient mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              {title}
            </h1>
            {introduction && (
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                {introduction}
              </p>
            )}
          </header>

          <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="!font-accent text-xl text-[#d6a85e] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/75 sm:text-base">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items && (
                    <ul className="space-y-3 pl-5">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc marker:text-[#ba8a44]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
