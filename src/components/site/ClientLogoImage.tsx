export function ClientLogoImage({ name }: { name: string }) {
  // Pure vector SVG emblem/logo representations for clients
  switch (name) {
    case "Jharkhand PWD":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <rect x="5" y="5" width="50" height="50" rx="8" className="fill-ember/15 stroke-ember" strokeWidth="2" />
          <path d="M30 14 L42 24 L38 24 L38 42 L22 42 L22 24 L18 24 Z" className="fill-ember" />
          <text x="68" y="30" fontSize="16" fontWeight="900" className="fill-foreground font-display">JHARKHAND</text>
          <text x="68" y="46" fontSize="14" fontWeight="800" className="fill-ember tracking-widest font-display">P.W.D.</text>
        </svg>
      );
    case "CPWD (Central PWD)":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <circle cx="30" cy="30" r="24" className="fill-ember/15 stroke-ember" strokeWidth="2" />
          <path d="M30 12 L35 22 L46 22 L37 29 L41 40 L30 33 L19 40 L23 29 L14 22 L25 22 Z" className="fill-ember" />
          <text x="66" y="32" fontSize="18" fontWeight="900" className="fill-foreground font-display">C P W D</text>
          <text x="66" y="47" fontSize="10" fontWeight="700" className="fill-muted-foreground tracking-wider">INDIA GOVT</text>
        </svg>
      );
    case "NHAI (Highways Authority)":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <rect x="5" y="8" width="48" height="44" rx="6" className="fill-ember/20 stroke-ember" strokeWidth="2" />
          <path d="M15 44 L26 16 L34 16 L45 44 M22 34 L38 34" className="stroke-ember fill-none" strokeWidth="3.5" strokeLinecap="round" />
          <text x="64" y="32" fontSize="18" fontWeight="900" className="fill-foreground font-display">N H A I</text>
          <text x="64" y="46" fontSize="10" fontWeight="700" className="fill-ember tracking-widest">HIGHWAYS</text>
        </svg>
      );
    case "Indian Railways (SE Division)":
      return (
        <svg viewBox="0 0 220 60" className="h-12 w-auto fill-current text-foreground">
          <circle cx="30" cy="30" r="22" className="fill-ember/15 stroke-ember" strokeWidth="2" />
          <rect x="20" y="20" width="20" height="16" rx="3" className="fill-ember" />
          <circle cx="24" cy="32" r="2" className="fill-background" />
          <circle cx="36" cy="32" r="2" className="fill-background" />
          <text x="64" y="30" fontSize="15" fontWeight="900" className="fill-foreground font-display">INDIAN RAILWAYS</text>
          <text x="64" y="46" fontSize="11" fontWeight="700" className="fill-ember tracking-wider">S.E. DIVISION</text>
        </svg>
      );
    case "Tata Steel Growth Shop":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <path d="M10 15 H50 V23 H34 V45 H26 V23 H10 Z" className="fill-ember" />
          <text x="62" y="32" fontSize="18" fontWeight="900" className="fill-foreground font-display">TATA STEEL</text>
          <text x="62" y="46" fontSize="10" fontWeight="700" className="fill-muted-foreground tracking-wider">GROWTH SHOP</text>
        </svg>
      );
    case "NTPC Limited":
      return (
        <svg viewBox="0 0 190 60" className="h-12 w-auto fill-current text-foreground">
          <rect x="6" y="10" width="46" height="40" rx="8" className="fill-ember/20 stroke-ember" strokeWidth="2" />
          <path d="M18 40 L18 20 L34 40 L34 20" className="stroke-ember fill-none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="62" y="34" fontSize="20" fontWeight="900" className="fill-foreground font-display">N T P C</text>
          <text x="62" y="47" fontSize="9" fontWeight="700" className="fill-ember tracking-widest">LIMITED</text>
        </svg>
      );
    case "Ranchi Smart City Corp":
      return (
        <svg viewBox="0 0 210 60" className="h-12 w-auto fill-current text-foreground">
          <path d="M10 44 L10 24 L20 14 L30 24 L30 44 Z M32 44 L32 20 L42 12 L52 20 L52 44 Z" className="fill-ember/30 stroke-ember" strokeWidth="2" />
          <text x="62" y="30" fontSize="15" fontWeight="900" className="fill-foreground font-display">RANCHI SMART</text>
          <text x="62" y="46" fontSize="13" fontWeight="800" className="fill-ember tracking-wider">CITY CORP</text>
        </svg>
      );
    case "L&T Construction":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <rect x="6" y="8" width="46" height="44" rx="6" className="fill-ember" />
          <text x="14" y="38" fontSize="22" fontWeight="900" className="fill-background font-display">L&T</text>
          <text x="62" y="32" fontSize="16" fontWeight="900" className="fill-foreground font-display">L & T</text>
          <text x="62" y="47" fontSize="10" fontWeight="700" className="fill-ember tracking-wider">CONSTRUCTION</text>
        </svg>
      );
    case "Shapoorji Pallonji":
      return (
        <svg viewBox="0 0 210 60" className="h-12 w-auto fill-current text-foreground">
          <circle cx="28" cy="30" r="22" className="fill-ember/20 stroke-ember" strokeWidth="2" />
          <text x="17" y="37" fontSize="18" fontWeight="900" className="fill-ember font-display">SP</text>
          <text x="60" y="30" fontSize="15" fontWeight="900" className="fill-foreground font-display">SHAPOORJI</text>
          <text x="60" y="46" fontSize="14" fontWeight="800" className="fill-ember font-display">PALLONJI</text>
        </svg>
      );
    case "Simplex Infrastructures":
      return (
        <svg viewBox="0 0 200 60" className="h-12 w-auto fill-current text-foreground">
          <path d="M12 40 L28 14 L44 40 Z" className="fill-ember/20 stroke-ember" strokeWidth="2.5" />
          <text x="58" y="32" fontSize="17" fontWeight="900" className="fill-foreground font-display">SIMPLEX</text>
          <text x="58" y="46" fontSize="9" fontWeight="700" className="fill-ember tracking-widest">INFRASTRUCTURES</text>
        </svg>
      );
    case "Ahluwalia Contracts":
      return (
        <svg viewBox="0 0 210 60" className="h-12 w-auto fill-current text-foreground">
          <rect x="6" y="10" width="44" height="40" rx="6" className="fill-ember/15 stroke-ember" strokeWidth="2" />
          <text x="14" y="38" fontSize="24" fontWeight="900" className="fill-ember font-display">AC</text>
          <text x="60" y="30" fontSize="15" fontWeight="900" className="fill-foreground font-display">AHLUWALIA</text>
          <text x="60" y="46" fontSize="12" fontWeight="800" className="fill-ember font-display">CONTRACTS</text>
        </svg>
      );
    case "Vasundhara Realcon":
    default:
      return (
        <svg viewBox="0 0 210 60" className="h-12 w-auto fill-current text-foreground">
          <path d="M10 40 L26 14 L42 40 Z M26 24 L34 40 H18 Z" className="fill-ember" />
          <text x="56" y="30" fontSize="14" fontWeight="900" className="fill-foreground font-display">VASUNDHARA</text>
          <text x="56" y="46" fontSize="12" fontWeight="800" className="fill-ember font-display">REALCON</text>
        </svg>
      );
  }
}
