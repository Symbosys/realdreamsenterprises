export const NAV = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export const SITE_CONTACT = {
  companyName: "Stambh Steel",
  fullName: "Real Dreams Enterprises / Stambh Steel Works",
  phone: "651-3511561",
  phoneRaw: "6513511561",
  email: "steelcrafttrading@gmail.com",
  address: "Stambh Steel Works, Hinjawadi Phase II, Pune 411057",
  hours: "Mon–Sat, 09:00–19:00 IST. Site emergencies answered 24/7.",
} as const;


export type SceneKind = "tmt" | "rod" | "stambh" | "structural";

export type Product = {
  slug: string;
  scene: SceneKind;
  name: string;
  tag: string;
  category: "Reinforcement" | "Sections" | "Systems" | "Bright Steel";
  blurb: string;
  grade: string;
  stock: "In stock" | "Made to order" | "Limited";
  quality: number;
  specs: [string, string][];
  hotspots: { label: string; position: [number, number, number] }[];
  applications: { title: string; body: string }[];
  process: { step: string; body: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tmt-bars",
    scene: "tmt",
    name: "TMT Bars",
    tag: "Fe 500D · Fe 550D · Fe 600",
    category: "Reinforcement",
    blurb:
      "Thermo-mechanically treated rebar with a tough martensitic rim and ductile ferrite-pearlite core — high yield strength without losing bendability.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 98,
    specs: [
      ["Yield strength", "500–600 N/mm²"],
      ["Elongation", "≥ 16%"],
      ["Diameter range", "8mm – 40mm"],
      ["Corrosion", "CRS grade available"],
    ],
    hotspots: [
      { label: "Rib pattern", position: [1.1, 0.28, 0] },
      { label: "Soft core", position: [-1.3, -0.3, 0.2] },
    ],
    applications: [
      { title: "Residential", body: "Slab and column cages for high-rise housing." },
      { title: "Bridges", body: "Pier reinforcement under cyclic seismic load." },
      { title: "Commercial towers", body: "Core walls and transfer girders." },
      { title: "Factories", body: "Heavy machine foundations and pile caps." },
    ],
    process: [
      { step: "Raw steel", body: "Billets cast from certified scrap and sponge iron." },
      { step: "Heating", body: "Reheat furnace brings billets to 1,150 °C." },
      { step: "Rolling", body: "Continuous mill draws the ribbed profile." },
      { step: "Quenching", body: "Water box hardens the outer rim in milliseconds." },
      { step: "Self-tempering", body: "Core heat tempers the rim back to ductility." },
      { step: "Testing", body: "Tensile, bend and rebend checks on every heat." },
      { step: "Dispatch", body: "Bundled, tagged and loaded for site delivery." },
    ],
  },
  {
    slug: "steel-rods",
    scene: "rod",
    name: "Steel Rods",
    tag: "Bright bar · Hot rolled",
    category: "Bright Steel",
    blurb:
      "Precision-drawn rounds with consistent metallurgy and surface finish for machining, fabrication and structural fastening.",
    grade: "EN8 / C45",
    stock: "In stock",
    quality: 94,
    specs: [
      ["Tolerance", "h9 / h11"],
      ["Surface", "Ra ≤ 0.8 µm"],
      ["Lengths", "3m – 12m"],
      ["Finish", "Bright / black"],
    ],
    hotspots: [{ label: "Drawn finish", position: [1.4, 0.45, 0.2] }],
    applications: [
      { title: "Fabrication", body: "Anchor rods, tie bars and shop-welded assemblies." },
      { title: "Machining", body: "Turned components with tight concentricity." },
      { title: "Warehouses", body: "Bracing systems for portal frames." },
    ],
    process: [
      { step: "Raw steel", body: "Hot-rolled coil selected by chemistry." },
      { step: "Pickling", body: "Scale removed for a clean drawing surface." },
      { step: "Drawing", body: "Cold draw sets diameter and finish." },
      { step: "Straightening", body: "Roller straightening to sub-mm runout." },
      { step: "Testing", body: "Hardness and dimensional audit per lot." },
      { step: "Packing", body: "Oiled, bundled and moisture wrapped." },
      { step: "Dispatch", body: "Cut-to-length delivery on request." },
    ],
  },
  {
    slug: "stambh-column-system",
    scene: "stambh",
    name: "Stambh Column System",
    tag: "Structural pillar system",
    category: "Systems",
    blurb:
      "A modular column system engineered for rapid erection: cast base, load-bearing shaft and capital plate that transfer forces cleanly to the foundation.",
    grade: "S355 / E350",
    stock: "Made to order",
    quality: 96,
    specs: [
      ["Axial capacity", "Up to 2,400 kN"],
      ["Base plate", "Grouted anchor set"],
      ["Coating", "Hot-dip galvanised"],
      ["Erection", "< 40 min / unit"],
    ],
    hotspots: [
      { label: "Capital plate", position: [0.7, 2, 0] },
      { label: "Anchored base", position: [1.3, -1.4, 0] },
    ],
    applications: [
      { title: "Commercial towers", body: "Podium columns with clean load paths." },
      { title: "Warehouses", body: "Rapid erection across long-span grids." },
      { title: "Bridges", body: "Temporary works and falsework towers." },
    ],
    process: [
      { step: "Raw steel", body: "Plate and hollow sections cut to drawing." },
      { step: "Heating", body: "Pre-heat before heavy fillet welding." },
      { step: "Assembly", body: "Jig-set shaft, base and capital." },
      { step: "Galvanising", body: "Hot-dip bath for 60-year coating life." },
      { step: "Testing", body: "UT weld scans and load simulation." },
      { step: "Packing", body: "Anchor kits bagged per column." },
      { step: "Dispatch", body: "Sequenced to the erection schedule." },
    ],
  },
  {
    slug: "structural-steel",
    scene: "structural",
    name: "Structural Steel",
    tag: "I-beams · Channels · Angles",
    category: "Sections",
    blurb:
      "Rolled sections with certified mill test reports, built for long spans, seismic detailing and heavy industrial loading.",
    grade: "E250 – E450",
    stock: "Limited",
    quality: 97,
    specs: [
      ["Grades", "E250 – E450"],
      ["Section depth", "100mm – 900mm"],
      ["Standard", "IS 2062 / EN 10025"],
      ["Weldability", "CE ≤ 0.42"],
    ],
    hotspots: [
      { label: "Top flange", position: [1.6, 1, 0.4] },
      { label: "Web", position: [-1.6, 0, 0.2] },
    ],
    applications: [
      { title: "Commercial towers", body: "Composite floor framing." },
      { title: "Factories", body: "Crane gantries and heavy portals." },
      { title: "Bridges", body: "Plate girder decks and bracing." },
      { title: "Warehouses", body: "Clear-span roof trusses." },
    ],
    process: [
      { step: "Raw steel", body: "Blooms from certified heats." },
      { step: "Heating", body: "Walking beam furnace to rolling temperature." },
      { step: "Rolling", body: "Universal mill forms flange and web." },
      { step: "Cooling", body: "Controlled cooling bed to avoid distortion." },
      { step: "Testing", body: "Charpy, tensile and dimensional checks." },
      { step: "Packing", body: "Bundled with mill test certificates." },
      { step: "Dispatch", body: "Trailer-loaded to site tolerance." },
    ],
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export type Post = {
  slug: string;
  title: string;
  category: "Materials" | "Structures" | "Sustainability" | "Site Practice";
  excerpt: string;
  readMinutes: number;
  date: string;
  author: string;
  sections: { heading: string; body: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "why-fe-550d-outperforms",
    title: "Why Fe 550D outperforms on seismic detailing",
    category: "Materials",
    excerpt:
      "Ductility is not a nice-to-have. Here is how the D-grade elongation floor changes the way a frame fails.",
    readMinutes: 7,
    date: "2026-05-14",
    author: "R. Kulkarni, Chief Metallurgist",
    sections: [
      {
        heading: "The rim-and-core structure",
        body: "Quenching hardens only the outer 2mm of the bar. The retained core heat then tempers that rim while keeping a ferrite-pearlite centre, which is why a TMT bar can be both high-yield and bendable around a small mandrel.",
      },
      {
        heading: "What D-grade actually guarantees",
        body: "The D suffix locks minimum elongation and a controlled UTS-to-yield ratio. In a seismic event that ratio decides whether a joint hinges predictably or snaps.",
      },
      {
        heading: "Detailing consequences",
        body: "Higher confidence in ductility lets designers reduce congestion at beam-column joints, which improves concrete compaction and, in turn, real-world durability.",
      },
    ],
  },
  {
    slug: "long-span-without-transfer-girders",
    title: "Long spans without transfer girders",
    category: "Structures",
    excerpt: "Composite decking and deeper rolled sections can remove an entire structural storey.",
    readMinutes: 6,
    date: "2026-04-02",
    author: "A. Menon, Structural Lead",
    sections: [
      {
        heading: "Where the weight goes",
        body: "A transfer girder solves a planning problem with tonnage. Deeper universal beams with composite action often solve the same problem with a fraction of the steel.",
      },
      {
        heading: "Vibration, not strength, is the limit",
        body: "At 15m clear spans, serviceability governs. Damping strategy and slab mass matter more than a further grade jump.",
      },
      {
        heading: "Procurement effects",
        body: "Fewer bespoke plate girders means shorter fabrication queues and a more predictable erection sequence.",
      },
    ],
  },
  {
    slug: "green-steel-on-real-projects",
    title: "Green steel on real projects, not slide decks",
    category: "Sustainability",
    excerpt: "Scrap-led routes, EPDs and what a contractor can actually specify this year.",
    readMinutes: 8,
    date: "2026-03-11",
    author: "S. Iyer, Sustainability",
    sections: [
      {
        heading: "Measure before you claim",
        body: "An environmental product declaration turns embodied carbon from a marketing figure into an auditable number tied to a specific mill and heat.",
      },
      {
        heading: "The scrap ceiling",
        body: "Electric arc routes cut emissions sharply, but scrap availability and residual copper set a practical quality ceiling for reinforcement.",
      },
      {
        heading: "Design for disassembly",
        body: "Bolted connections and documented sections make the next building the recycling plan for this one.",
      },
    ],
  },
  {
    slug: "storing-rebar-on-site",
    title: "Storing rebar on site without losing a grade",
    category: "Site Practice",
    excerpt: "Stacking, cover and sequencing decisions that quietly protect your specification.",
    readMinutes: 5,
    date: "2026-02-08",
    author: "D. Rathore, Site Systems",
    sections: [
      {
        heading: "Off the ground, always",
        body: "Timber sleepers at 1.5m centres keep bars out of standing water and stop bending under their own weight.",
      },
      {
        heading: "Rust is not automatically failure",
        body: "Light surface oxidation improves bond. Flaking, pitted corrosion does not — the difference is measurable with a wire brush test.",
      },
      {
        heading: "Sequence by pour, not by delivery",
        body: "Tagging bundles against pour numbers removes the most common cause of on-site cutting waste.",
      },
    ],
  },
  {
    slug: "cranes-and-erection-tolerance",
    title: "Cranes, tolerance and the first 40 minutes",
    category: "Site Practice",
    excerpt: "Why modular column systems live or die on base-plate grouting.",
    readMinutes: 6,
    date: "2026-01-20",
    author: "A. Menon, Structural Lead",
    sections: [
      {
        heading: "Tolerance stacks upward",
        body: "A 4mm base error becomes a 40mm façade problem twelve storeys later. Survey control at the plinth is the cheapest correction you will ever make.",
      },
      {
        heading: "Grout is structural",
        body: "Non-shrink grout transfers axial load into the foundation. Under-filled pockets concentrate stress on the anchor bolts instead.",
      },
      {
        heading: "Rehearse the lift",
        body: "A dry-run pick sequence cuts crane hours more reliably than a bigger crane does.",
      },
    ],
  },
  {
    slug: "reading-a-mill-test-certificate",
    title: "How to actually read a mill test certificate",
    category: "Materials",
    excerpt: "Six lines on an MTC decide whether your weld procedure is valid.",
    readMinutes: 4,
    date: "2025-12-05",
    author: "R. Kulkarni, Chief Metallurgist",
    sections: [
      {
        heading: "Carbon equivalent first",
        body: "CE governs preheat. Everything else on the sheet is secondary if the welder is working blind on this number.",
      },
      {
        heading: "Heat number traceability",
        body: "Every bundle tag should map to a heat on the certificate. If it does not, you have an unverified material on site.",
      },
      {
        heading: "Impact values in cold regions",
        body: "Charpy results at the right test temperature are the only guard against brittle fracture in exposed structures.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const MILESTONES = [
  { year: "1994", label: "Founded", body: "A single trading yard and one weighbridge." },
  { year: "1999", label: "First warehouse", body: "8,000 sq ft of covered steel storage." },
  { year: "2003", label: "Rolling mill", body: "In-house rolling brings quality under our roof." },
  { year: "2008", label: "Distribution network", body: "Nine depots across four states." },
  { year: "2011", label: "ISO 9001", body: "Certified quality management across every line." },
  { year: "2016", label: "Landmark partnerships", body: "Framework supply with national contractors." },
  { year: "2018", label: "1M tonnes", body: "Annual dispatch crosses a million tonnes." },
  { year: "2022", label: "New headquarters", body: "A vertical campus built from our own steel." },
  { year: "2026", label: "Green steel", body: "Scrap-led route with published EPDs." },
];

export const LEADERSHIP = [
  { name: "V. Deshmukh", role: "Managing Director", note: "Third-generation steel, first-generation software." },
  { name: "R. Kulkarni", role: "Chief Metallurgist", note: "28 years across rolling and heat treatment." },
  { name: "A. Menon", role: "Structural Lead", note: "Bridges, podiums and awkward transfer levels." },
  { name: "S. Iyer", role: "Head of Sustainability", note: "Carbon accounting that survives an audit." },
];

export const CERTIFICATIONS = [
  { code: "ISO 9001", body: "Quality management system" },
  { code: "ISO 14001", body: "Environmental management" },
  { code: "IS 1786", body: "High strength deformed bars" },
  { code: "EN 10025", body: "Hot rolled structural steel" },
  { code: "BIS", body: "Standard mark licence" },
  { code: "EPD", body: "Environmental product declaration" },
];

export const GALLERY = [
  { title: "Meridian Tower", sector: "Commercial", city: "Pune", span: "tall" },
  { title: "Kaveri Flyover", sector: "Infrastructure", city: "Nashik", span: "wide" },
  { title: "Northline Depot", sector: "Industrial", city: "Nagpur", span: "normal" },
  { title: "Aster Residences", sector: "Residential", city: "Mumbai", span: "normal" },
  { title: "Harbour Logistics Park", sector: "Industrial", city: "Mundra", span: "wide" },
  { title: "Civic Metro Line 4", sector: "Infrastructure", city: "Pune", span: "tall" },
  { title: "Skyline One", sector: "Commercial", city: "Hyderabad", span: "normal" },
  { title: "Green Valley Homes", sector: "Residential", city: "Indore", span: "normal" },
];

export const GALLERY_SECTORS = ["All", "Commercial", "Residential", "Infrastructure", "Industrial"];

export const FAQS = [
  {
    q: "What grades of TMT bar do you supply?",
    a: "Fe 500D, Fe 550D and Fe 600, in 8mm to 40mm diameters, with corrosion-resistant variants available on order.",
  },
  {
    q: "Do you provide mill test certificates?",
    a: "Every dispatch ships with an MTC traceable to the heat number printed on the bundle tag.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Five tonnes for stocked reinforcement. Fabricated systems are quoted per project with no fixed floor.",
  },
  {
    q: "How fast is delivery?",
    a: "48 to 72 hours to serviced metros from stock, and sequenced weekly slots for long-running sites.",
  },
  {
    q: "Can you cut and bend to a bar bending schedule?",
    a: "Yes. Send the BBS and we return a cut-optimised plan with waste percentage before production starts.",
  },
  {
    q: "Do you support seismic zone detailing?",
    a: "Our engineering desk reviews congestion, lap lengths and ductility requirements for zones III to V.",
  },
  {
    q: "How is embodied carbon reported?",
    a: "Through published EPDs per product family, with project-level summaries on request.",
  },
];

export const SUPPORT_JOURNEY = [
  { step: "Submit enquiry", body: "Quantity, grade and site window." },
  { step: "Sales review", body: "Stock and logistics checked the same day." },
  { step: "Quotation", body: "Priced with freight and taxes broken out." },
  { step: "Approval", body: "Digital confirmation and pour schedule lock." },
  { step: "Dispatch", body: "Loaded, tagged and tracked to gate." },
  { step: "Delivery", body: "Signed off with certificates in hand." },
];

export const STATS = [
  { value: "1.4M t", label: "Annual capacity" },
  { value: "2,800+", label: "Projects delivered" },
  { value: "18", label: "States served" },
  { value: "48h", label: "Typical dispatch" },
];
