/* ================================================================
   LogoBar — infinite, responsive carousel matching Figma strip
   ================================================================ */

type LogoItem = {
  name: string
  icon: ({className}: {className?: string}) => React.JSX.Element
}

const LOGOS: LogoItem[] = [
  {name: 'Apple', icon: AppleIcon},
  {name: 'Apple', icon: AppleIcon},
  {name: 'Apple', icon: AppleIcon},
  {name: 'Apple', icon: AppleIcon},
  {name: 'Apple', icon: AppleIcon},
]

function AppleIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 5.5C21.0833 5.5 19.8333 6.08333 18.75 7.25C17.6667 8.41667 17.0833 9.75 17 11.25C18.4167 11.25 19.6667 10.6667 20.75 9.5C21.8333 8.33333 22.4167 7 22.5 5.5ZM26.5 21.5C25.9167 22.5833 25.2917 23.5417 24.625 24.375C23.7083 25.5417 22.9583 26.125 22.375 26.125C22.0417 26.125 21.5 25.9583 20.75 25.625C20 25.2917 19.3333 25.125 18.75 25.125C18.1667 25.125 17.5 25.2917 16.75 25.625C16 25.9583 15.4167 26.125 15 26.125C14.3333 26.125 13.4583 25.4167 12.375 24C11.2083 22.5 10.2917 20.75 9.625 18.75C8.875 16.5833 8.5 14.5 8.5 12.5C8.5 10.25 9.08333 8.375 10.25 6.875C11.4167 5.375 12.9167 4.625 14.75 4.625C15.4167 4.625 16.25 4.83333 17.25 5.25C18.25 5.66667 18.9167 5.875 19.25 5.875C19.5 5.875 20.2083 5.625 21.375 5.125C22.375 4.70833 23.25 4.5 24 4.5C25.25 4.5 26.3333 4.91667 27.25 5.75C26.5833 6.25 26 6.91667 25.5 7.75C24.75 8.91667 24.375 10.1667 24.375 11.5C24.375 13 24.8333 14.3333 25.75 15.5C26.5 16.4167 27.375 17.0833 28.375 17.5C28.0417 18.4167 27.6667 19.2917 27.25 20.125C26.9167 20.7917 26.6667 21.25 26.5 21.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function LogoBar() {
  const carouselItems = [...LOGOS, ...LOGOS]

  return (
    <section className="overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-14">
      <div className="container">
        <div className="logo-carousel-viewport">
          <ul
            className="logo-carousel-track"
            role="list"
            aria-label="Brands trusted by Webkowsky"
          >
            {carouselItems.map((logo, index) => {
              const isDuplicate = index >= LOGOS.length

              return (
                <li
                  key={`${logo.name}-${index}`}
                  className="logo-carousel-item"
                  data-duplicate={isDuplicate ? 'true' : undefined}
                  aria-hidden={isDuplicate ? true : undefined}
                >
                  <logo.icon className="size-8 text-white" />
                  <span className="font-sans text-[20px] font-medium leading-[1.2] text-white">
                    {logo.name}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
