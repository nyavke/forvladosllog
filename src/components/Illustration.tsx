export default function Illustration() {
  return (
    <div className="illustration" aria-hidden="true">
      <svg viewBox="0 0 560 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b1148" />
            <stop offset="1" stopColor="#0c0a26" />
          </linearGradient>
          <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a2bd6" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7b3ff5" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#6a3cf5" stopOpacity="0.55" />
            <stop offset="1" stopColor="#6a3cf5" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* glowing orbital ring on the floor */}
        <ellipse cx="280" cy="300" rx="250" ry="58" fill="url(#floor)" />
        <ellipse cx="280" cy="300" rx="210" ry="46" stroke="#8b5cff" strokeWidth="2" opacity="0.7" filter="url(#glow)" />
        <ellipse cx="280" cy="300" rx="150" ry="32" stroke="#4f7bff" strokeWidth="1.5" opacity="0.5" />

        {/* floating code panel - left */}
        <g filter="url(#glow)" opacity="0.9">
          <rect x="40" y="150" width="120" height="150" rx="12" fill="url(#screen)" stroke="#5b8bff" strokeWidth="1.5" />
          <circle cx="70" cy="185" r="10" stroke="#5b8bff" strokeWidth="1.5" />
          <path d="M95 178h45M95 192h35M60 220h80M60 236h60M60 252h70" stroke="#4f7bff" strokeWidth="2" strokeLinecap="round" />
          <path d="M64 220 q-6-8 0-16" stroke="#8b5cff" strokeWidth="2" />
        </g>

        {/* laptop */}
        <g filter="url(#glow)">
          <rect x="175" y="120" width="200" height="135" rx="10" fill="url(#screen)" stroke="#7b6bff" strokeWidth="1.8" />
          <path d="M205 150h70M205 166h120M205 182h55M225 182h0M205 198h95M205 214h60M280 214h70" stroke="#ff6b9d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M205 166h40" stroke="#4fd1ff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M255 198h60" stroke="#5bff9d" strokeWidth="2.5" strokeLinecap="round" />
          {/* base */}
          <path d="M150 255h250l22 22H128l22-22Z" fill="#241a52" stroke="#7b6bff" strokeWidth="1.5" />
        </g>

        {/* purple code badge */}
        <g filter="url(#glow)">
          <rect x="330" y="95" width="70" height="70" rx="16" fill="url(#panel)" stroke="#a06bff" strokeWidth="1.8" />
          <path d="M356 118l-10 12 10 12M374 118l10 12-10 12" stroke="#d9c4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* books + graduation cap */}
        <g filter="url(#glow)">
          <rect x="395" y="225" width="90" height="14" rx="3" fill="#2a1f63" stroke="#7b6bff" strokeWidth="1.3" />
          <rect x="400" y="211" width="90" height="14" rx="3" fill="#241a52" stroke="#5b8bff" strokeWidth="1.3" />
          <rect x="392" y="239" width="95" height="14" rx="3" fill="#2a1f63" stroke="#8b5cff" strokeWidth="1.3" />
          {/* cap */}
          <path d="M395 200l45-18 45 18-45 18-45-18Z" fill="#3a2bd6" stroke="#a06bff" strokeWidth="1.5" />
          <path d="M440 218v16M485 200v18" stroke="#a06bff" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="485" cy="220" r="3" fill="#ff6b9d" />
        </g>

        {/* mug */}
        <g filter="url(#glow)">
          <rect x="300" y="262" width="46" height="40" rx="8" fill="#241a52" stroke="#7b6bff" strokeWidth="1.5" />
          <path d="M346 272h8a8 8 0 0 1 0 16h-8" stroke="#7b6bff" strokeWidth="1.5" />
          <path d="M312 256c0-6 6-6 6-12M328 256c0-6 6-6 6-12" stroke="#8b5cff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* small floating chart panel - right */}
        <g filter="url(#glow)" opacity="0.85">
          <rect x="430" y="120" width="95" height="70" rx="10" fill="url(#screen)" stroke="#5b8bff" strokeWidth="1.3" />
          <path d="M445 175l15-18 12 10 18-26" stroke="#5bff9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="445" cy="138" r="4" stroke="#ff6b9d" strokeWidth="1.5" />
        </g>

        {/* play button */}
        <g filter="url(#glow)">
          <rect x="70" y="270" width="60" height="60" rx="14" fill="url(#panel)" stroke="#5b8bff" strokeWidth="1.5" />
          <path d="M92 286l18 14-18 14V286Z" fill="#9d8cff" />
        </g>

        {/* sparkles */}
        <g fill="#9d8cff">
          <circle cx="150" cy="110" r="2" />
          <circle cx="430" cy="80" r="2.5" />
          <circle cx="60" cy="200" r="1.8" />
          <circle cx="510" cy="250" r="2" />
          <circle cx="250" cy="90" r="1.6" />
        </g>
      </svg>
    </div>
  )
}
