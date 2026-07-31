// A consistent set of hand-built line-art technical icons standing in for
// product photography — reinforces the "blueprint / schematic" identity
// instead of relying on stock photos that don't match real inventory.

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const icons = {
  igniter: (
    <>
      <rect x="26" y="10" width="12" height="30" rx="2" {...stroke} />
      <path d="M32 40 L32 54" {...stroke} />
      <path d="M24 54 h16" {...stroke} />
      <path d="M29 18 h6 M29 24 h6 M29 30 h6" {...stroke} />
    </>
  ),
  valve: (
    <>
      <rect x="18" y="26" width="28" height="12" rx="2" {...stroke} />
      <path d="M32 26 V14 M26 14 h12" {...stroke} />
      <path d="M18 32 H8 M46 32 H56" {...stroke} />
    </>
  ),
  motor: (
    <>
      <circle cx="30" cy="32" r="14" {...stroke} />
      <circle cx="30" cy="32" r="4" {...stroke} />
      <path d="M44 32 H54 M54 27 v10" {...stroke} />
      <path d="M30 18 v-4 M30 46 v4 M16 32 h-4" {...stroke} />
    </>
  ),
  board: (
    <>
      <rect x="12" y="12" width="40" height="40" rx="3" {...stroke} />
      <path d="M20 20 h10 v10 h-10z" {...stroke} />
      <path d="M36 20 h8 M36 26 h8 M36 32 h8 M20 38 h24 M20 44 h24" {...stroke} />
    </>
  ),
  sensor: (
    <>
      <path d="M32 12 v20" {...stroke} />
      <circle cx="32" cy="40" r="8" {...stroke} />
      <path d="M27 40 h10 M32 35 v10" {...stroke} />
    </>
  ),
  capacitor: (
    <>
      <rect x="20" y="14" width="24" height="36" rx="12" {...stroke} />
      <path d="M28 22 v20 M36 22 v20" {...stroke} />
    </>
  ),
  compressor: (
    <>
      <ellipse cx="32" cy="36" rx="18" ry="14" {...stroke} />
      <circle cx="32" cy="22" r="8" {...stroke} />
      <path d="M50 36 h6 M8 36 h6" {...stroke} />
    </>
  ),
  coil: (
    <>
      <path d="M10 46 L22 18 H42 L54 46" {...stroke} />
      <path d="M16 46 h32" {...stroke} />
      <path d="M20 40 h24 M22 34 h20 M24 28 h16" {...stroke} />
    </>
  ),
  lineset: (
    <>
      <path d="M8 22 Q32 8 56 22" {...stroke} />
      <path d="M8 30 Q32 16 56 30" {...stroke} />
      <path d="M8 22 v8 M56 22 v8" {...stroke} />
    </>
  ),
  duct: (
    <>
      <rect x="10" y="24" width="44" height="16" rx="2" {...stroke} />
      <path d="M10 28 h44 M10 36 h44" {...stroke} />
    </>
  ),
  ductflex: (
    <>
      <path d="M8 32 q6 -10 12 0 t12 0 t12 0 t12 0" {...stroke} />
    </>
  ),
  damper: (
    <>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <path d="M14 32 h36" {...stroke} />
      <path d="M32 20 v-6 M32 44 l8 8" {...stroke} />
    </>
  ),
  register: (
    <>
      <rect x="10" y="18" width="44" height="28" rx="2" {...stroke} />
      <path d="M16 24 h32 M16 30 h32 M16 36 h32 M16 42 h32" {...stroke} />
    </>
  ),
  elbow: (
    <>
      <path d="M14 14 v22 a14 14 0 0 0 14 14 h22" {...stroke} />
      <path d="M22 14 v22 a6 6 0 0 0 6 6 h22" {...stroke} />
    </>
  ),
  thermostat: (
    <>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <circle cx="32" cy="32" r="6" {...stroke} />
      <path d="M32 12 v6 M32 46 v6 M12 32 h6 M46 32 h6" {...stroke} />
    </>
  ),
  water: (
    <>
      <path d="M32 10 C22 26 16 34 16 42 a16 16 0 0 0 32 0 c0 -8 -6 -16 -16 -32Z" {...stroke} />
    </>
  ),
  element: (
    <>
      <path d="M16 46 V26 a16 10 0 0 1 32 0 v20" {...stroke} />
      <path d="M24 46 V30 M32 46 V26 M40 46 V30" {...stroke} />
    </>
  ),
  gauge: (
    <>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <path d="M32 32 L42 20" {...stroke} />
      <path d="M22 40 a14 14 0 0 1 20 -20" {...stroke} strokeDasharray="2 4" />
    </>
  ),
  tools: (
    <>
      <path d="M14 50 L34 30" {...stroke} />
      <path d="M30 14 a8 8 0 1 0 10 10 l-4 -4 -3 3 -3 -3 3 -3z" {...stroke} />
    </>
  ),
}

export default function PartIcon({ name, className = 'w-10 h-10' }) {
  const path = icons[name] || icons.tools
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {path}
    </svg>
  )
}
