export default function DuctSchematic() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" role="img" aria-label="Schematic diagram of airflow through a duct system">
      <g stroke="#3E5A76" strokeWidth="1" fill="none" opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="360" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 44} x2="480" y2={i * 44} />
        ))}
      </g>

      {/* duct run */}
      <path d="M20 300 H160 V120 H340" stroke="#7FDBDB" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M20 300 H160 V120 H340" stroke="#F26522" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="duct-flow" />

      {/* branch */}
      <path d="M240 120 V220 H400" stroke="#7FDBDB" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M240 120 V220 H400" stroke="#F26522" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="duct-flow" style={{ animationDelay: '1.2s' }} />

      {/* register endpoints */}
      <rect x="340" y="108" width="28" height="24" rx="2" fill="#0AA3A3" opacity="0.9" />
      <rect x="400" y="208" width="28" height="24" rx="2" fill="#0AA3A3" opacity="0.9" />
      <rect x="6" y="288" width="28" height="24" rx="2" fill="#F6F7F5" opacity="0.9" />

      {/* labels */}
      <text x="8" y="284" fill="#B9C6D1" fontSize="10" fontFamily="IBM Plex Mono, monospace">SUPPLY</text>
      <text x="336" y="102" fill="#B9C6D1" fontSize="10" fontFamily="IBM Plex Mono, monospace">RUN-01</text>
      <text x="396" y="202" fill="#B9C6D1" fontSize="10" fontFamily="IBM Plex Mono, monospace">RUN-02</text>
    </svg>
  )
}
