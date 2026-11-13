export default function Mark({ size = 36, title = 'RaiseRaise Elevators symbol', ...rest }) {
  return (
    <svg
      viewBox="0 0 302 357"
      width={size}
      height={(size * 357) / 302}
      role="img"
      aria-label={title}
      {...rest}
    >
      <path d="M151 0.5 L151 297 L10 357 L0.5 357 Z" fill="#278672" />
      <path d="M151 0.5 L301.5 357 L292 357 L151 297 Z" fill="#4BC2AC" />
      <g fill="#FFFFFF">
        <path d="M114.5 214 L135.3 214 L29.6 347 L8.6 347 Z" />
        <path d="M166.7 214 L187.5 214 L293.4 347 L272.4 347 Z" />
        <path
          fillRule="evenodd"
          d="M123 142 H178 A43 43 0 0 1 221 185 A43 43 0 0 1 178 228 H123 A43 43 0 0 1 80 185 A43 43 0 0 1 123 142 Z M141 160 H123 A25 25 0 0 0 98 185 A25 25 0 0 0 123 210 H141 Z M160 160 H178 A25 25 0 0 1 203 185 A25 25 0 0 1 178 210 H160 Z"
        />
        <path d="M141.5 226 L151 226 L150.2 296.5 Z" />
        <path d="M151 226 L160.5 226 L151.8 296.5 Z" />
      </g>
    </svg>
  );
}
