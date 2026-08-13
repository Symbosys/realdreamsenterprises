export const NAV = [
  { to: "/products", label: "Products & Pricing" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export const SITE_CONTACT = {
  companyName: "Rashmi TMT Bars",
  fullName: "Real Dreams Enterprises — Exclusive Supplier of Rashmi TMT Bars in Jharkhand",
  phone: "651-3511561",
  phoneRaw: "6513511561",
  email: "steelcrafttrading@gmail.com",
  regdAddress: "H.No. E-1/3, Ground Floor, Lajpat Nagar-1 (South Delhi), New Delhi - 110024",
  stateAddress: "5th Floor, Mangal Tower, Kantatoli, Ranchi - 834001",
  address: "5th Floor, Mangal Tower, Kantatoli, Ranchi - 834001",
  hours: "Mon–Sat, 09:00–19:00 IST. Project & tender inquiries answered 24/7.",
} as const;


export type SceneKind = "tmt" | "rod" | "stambh" | "structural";

export type Product = {
  slug: string;
  scene: SceneKind;
  name: string;
  tag: string;
  category: "Light MM (8-10mm)" | "Medium MM (12-16mm)" | "Heavy MM (20-32mm)";
  blurb: string;
  grade: string;
  stock: "In stock" | "Made to order" | "Limited";
  quality: number;
  image: string;
  specs: [string, string][];
  hotspots: { label: string; position: [number, number, number] }[];
  applications: { title: string; body: string }[];
  process: { step: string; body: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "rashmi-tmt-8mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 8mm",
    tag: "8mm Diameter · Fe 550D / Fe 500D · Government Authorized",
    category: "Light MM (8-10mm)",
    blurb:
      "Government-authorized 8mm Rashmi TMT bar designed for stirrups, slab mesh, and light structural tying. Provides high ductility, bendability, and earthquake safety.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 98,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "8 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "500–600 N/mm²"],
      ["Nominal Weight", "0.395 kg/m"],
      ["Primary Use", "Stirrups & Slab Mesh"],
    ],
    hotspots: [
      { label: "8mm Precision Ribs", position: [1.1, 0.28, 0] },
      { label: "High Bendability", position: [-1.3, -0.3, 0.2] },
      { label: "Most Affordable", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Column Stirrups", body: "Tying main vertical bars in residential & commercial pillars." },
      { title: "Slab Reinforcement", body: "Distribution steel mesh in roof slabs and chajjas." },
      { title: "Boundary Walls", body: "Light structural reinforcement and lintels." },
      { title: "Precast Components", body: "Tying rings for concrete drainage pipes and boundary posts." },
    ],
    process: [
      { step: "Raw Billet", body: "Virgin billets cast with pure iron ore and sponge iron." },
      { step: "Reheating", body: "Billets heated uniformly to 1,150 °C." },
      { step: "Precision Rolling", body: "High-speed continuous rolling mill forms 8mm ribbed rebar." },
      { step: "Thermex Quenching", body: "Water spray hardens martensitic outer rim in milliseconds." },
      { step: "Self-Tempering", body: "Internal core heat tempers rim to achieve high ductility." },
      { step: "Quality Audit", body: "100% tensile, 180° bend, and rebend testing per heat." },
      { step: "Dispatch", body: "Bundled, tagged with heat number, and loaded for Jharkhand sites." },
    ],
  },
  {
    slug: "rashmi-tmt-10mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 10mm",
    tag: "10mm Diameter · Fe 550D / Fe 500D · Government Authorized",
    category: "Light MM (8-10mm)",
    blurb:
      "Government-authorized 10mm Rashmi TMT rebar ideal for roof slabs, staircases, and primary residential beam reinforcement across Jharkhand.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 98,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "10 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "500–600 N/mm²"],
      ["Nominal Weight", "0.617 kg/m"],
      ["Primary Use", "Roof Slabs & Staircases"],
    ],
    hotspots: [
      { label: "10mm Rib Pattern", position: [1.1, 0.28, 0] },
      { label: "Ductile Core", position: [-1.3, -0.3, 0.2] },
      { label: "SOR Approved", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Roof Slabs", body: "Main bottom steel reinforcement in house and building slabs." },
      { title: "Staircases", body: "Flight slab and waist slab structural reinforcement." },
      { title: "Residential Beams", body: "Secondary beam longitudinal bars." },
      { title: "Culverts & Drains", body: "Reinforcement for PWD storm water drains." },
    ],
    process: [
      { step: "Raw Billet", body: "Virgin billets cast with pure iron ore and sponge iron." },
      { step: "Reheating", body: "Billets heated uniformly to 1,150 °C." },
      { step: "Precision Rolling", body: "Continuous mill draws the 10mm cross-ribbed profile." },
      { step: "Quenching", body: "Rapid water box quenching hardens the outer skin." },
      { step: "Self-Tempering", body: "Core heat diffuses outward to yield high toughness." },
      { step: "Testing", body: "Tensile strength and bend checks per IS 1786." },
      { step: "Dispatch", body: "Fast 24-48 hour delivery to any district in Jharkhand." },
    ],
  },
  {
    slug: "rashmi-tmt-12mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 12mm",
    tag: "12mm Diameter · Fe 550D / Fe 500D · Government Authorized",
    category: "Medium MM (12-16mm)",
    blurb:
      "The most popular 12mm Rashmi TMT bar for primary residential and commercial columns, beams, lintels, and frame structures across Jharkhand.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 99,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "12 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "500–600 N/mm²"],
      ["Nominal Weight", "0.888 kg/m"],
      ["Primary Use", "Columns & Beams"],
    ],
    hotspots: [
      { label: "12mm High Grip Ribs", position: [1.1, 0.28, 0] },
      { label: "Seismic Ductility", position: [-1.3, -0.3, 0.2] },
      { label: "Direct Mill Pricing", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Building Columns", body: "Primary main vertical reinforcement for G+3 to G+5 buildings." },
      { title: "Main Beams", body: "Flexural tension reinforcement in floor beams." },
      { title: "Retaining Walls", body: "Basement wall and boundary embankment reinforcement." },
      { title: "Government Quarters", body: "PWD housing project structural framing." },
    ],
    process: [
      { step: "Raw Billet", body: "Clean steel billets with low sulphur and phosphorus content." },
      { step: "Reheating", body: "Automated walking beam reheat furnace." },
      { step: "Rolling", body: "Precision rolling mill shapes 12mm high-grip rebar." },
      { step: "Quenching", body: "Water jet quenching creates hard outer martensite." },
      { step: "Tempering", body: "Ferrite-pearlite core remains highly ductile." },
      { step: "MTC Testing", body: "Mill Test Certificate generated with heat trace number." },
      { step: "Dispatch", body: "Bundled, tagged, and delivered directly to site gates." },
    ],
  },
  {
    slug: "rashmi-tmt-16mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 16mm",
    tag: "16mm Diameter · Fe 550D / Fe 500D · Government Authorized",
    category: "Medium MM (12-16mm)",
    blurb:
      "High-yield 16mm Rashmi TMT rebar engineered for multi-storey columns, heavy foundation footings, commercial slabs, and bridges.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 99,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "16 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "500–600 N/mm²"],
      ["Nominal Weight", "1.580 kg/m"],
      ["Primary Use", "Multi-Storey Footings"],
    ],
    hotspots: [
      { label: "16mm Heavy Ribs", position: [1.1, 0.28, 0] },
      { label: "Seismic Zone V", position: [-1.3, -0.3, 0.2] },
      { label: "SOR Letter Certified", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Heavy Columns", body: "Load-bearing pillars for high-rise commercial complexes." },
      { title: "Raft Foundations", body: "Mat and raft foundation rebar cages." },
      { title: "Bridge Girders", body: "PWD highway bridge deck and pier caps." },
      { title: "Water Reservoirs", body: "Overhead and underground concrete tank structures." },
    ],
    process: [
      { step: "Raw Steel", body: "High-grade low-carbon steel billets." },
      { step: "Reheating", body: "Controlled furnace temperature at 1,150 °C." },
      { step: "Rolling", body: "Heavy multi-stand mill rolls the 16mm rebar." },
      { step: "Quenching", body: "Controlled water quenching hardens the outer layer." },
      { step: "Self-Tempering", body: "Self-tempered to withstand high dynamic seismic loads." },
      { step: "MTC Tagging", body: "Tagged with heat number and IS 1786 BIS stamp." },
      { step: "Dispatch", body: "Site delivery across all 24 districts of Jharkhand." },
    ],
  },
  {
    slug: "rashmi-tmt-20mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 20mm",
    tag: "20mm Diameter · Fe 550D / Fe 600 · Government Authorized",
    category: "Heavy MM (20-32mm)",
    blurb:
      "Heavy-duty 20mm Rashmi TMT bar for high-rise pillars, heavy commercial frames, highway bridge pier caps, and industrial plants across Jharkhand.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 98,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "20 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "550–600 N/mm²"],
      ["Nominal Weight", "2.470 kg/m"],
      ["Primary Use", "High-Rise Pillars & Bridges"],
    ],
    hotspots: [
      { label: "20mm High Load Ribs", position: [1.1, 0.28, 0] },
      { label: "High Elastic Ratio", position: [-1.3, -0.3, 0.2] },
      { label: "CRS Corrosion Proof", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "High-Rise Pillars", body: "Main vertical steel for 10+ storey residential towers." },
      { title: "Highway Flyovers", body: "NHAI and state highway bridge pier reinforcement." },
      { title: "Industrial Plants", body: "Heavy equipment foundations and furnace hall pedestals." },
      { title: "Railway Overbridges", body: "Rail infrastructure abutments and piers." },
    ],
    process: [
      { step: "Raw Billet", body: "Continuously cast virgin steel billets." },
      { step: "Rolling", body: "Precision multi-pass rolling of 20mm profile." },
      { step: "Quenching", body: "High-pressure Thermex water cooling." },
      { step: "Tempering", body: "Tempered core ensures zero micro-cracks on bending." },
      { step: "Audit", body: "UT and tensile audit for high elastic ratio." },
      { step: "Dispatch", body: "Flatbed trailer dispatch with mill test certificates." },
    ],
  },
  {
    slug: "rashmi-tmt-25mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 25mm",
    tag: "25mm Diameter · Fe 550D / Fe 600 · Government Authorized",
    category: "Heavy MM (20-32mm)",
    blurb:
      "High-capacity 25mm Rashmi TMT bar certified for government flyovers, metro viaducts, national highways, and heavy industrial foundations.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 98,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "25 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "550–600 N/mm²"],
      ["Nominal Weight", "3.850 kg/m"],
      ["Primary Use", "Flyovers & Metro Viaducts"],
    ],
    hotspots: [
      { label: "25mm Heavy Ribs", position: [1.1, 0.28, 0] },
      { label: "High Tensile Strength", position: [-1.3, -0.3, 0.2] },
      { label: "Government Certified", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Metro Viaducts", body: "Elevated track piers and station concourse columns." },
      { title: "River Bridges", body: "Deep underwater pier foundations." },
      { title: "Heavy Warehouses", body: "Crane gantry column footings and foundations." },
      { title: "Mining Infrastructure", body: "Heavy crusher plants and conveyor gantries." },
    ],
    process: [
      { step: "Raw Billet", body: "Refined EAF steel billets with degassing." },
      { step: "Rolling", body: "Universal mill shapes 25mm heavy rebar." },
      { step: "Quenching", body: "Controlled water bath hardens outer rim." },
      { step: "Tempering", body: "Ductile core prevents brittle failure." },
      { step: "Inspection", body: "Hardness, elongation and tensile check." },
      { step: "Dispatch", body: "Direct delivery to state & national contractors." },
    ],
  },
  {
    slug: "rashmi-tmt-32mm",
    scene: "tmt",
    name: "Rashmi TMT Bar 32mm",
    tag: "32mm Diameter · Fe 550D / Fe 600 · Government Authorized",
    category: "Heavy MM (20-32mm)",
    blurb:
      "Extra-heavy 32mm Rashmi TMT rebar engineered for dam structures, power plants, deep piling works, and mega foundation footings across Jharkhand.",
    grade: "Fe 550D",
    stock: "In stock",
    quality: 99,
    image: "/images/tmt_bars.png",
    specs: [
      ["Diameter", "32 mm"],
      ["Government Approval", "Approved for all Govt Projects"],
      ["SOR Status", "SOR Letter Certified"],
      ["Yield Strength", "550–600 N/mm²"],
      ["Nominal Weight", "6.310 kg/m"],
      ["Primary Use", "Dams & Deep Foundation Piles"],
    ],
    hotspots: [
      { label: "32mm Maximum Load Ribs", position: [1.1, 0.28, 0] },
      { label: "Extreme Yield Capacity", position: [-1.3, -0.3, 0.2] },
      { label: "Government Approved", position: [0.5, 0.1, 0.3] },
    ],
    applications: [
      { title: "Dam Spillways", body: "Reinforcement for hydroelectric and irrigation dams." },
      { title: "Power Plants", body: "Turbine generator foundations and cooling tower structures." },
      { title: "Deep Piling Works", body: "Bored cast-in-situ pile cages for heavy bridges." },
      { title: "Mega Commercial Towers", body: "Super-tall tower transfer girders and basement rafts." },
    ],
    process: [
      { step: "Raw Billet", body: "Vacuum degassed high purity steel billets." },
      { step: "Rolling", body: "Heavy-duty rolling mill draws the 32mm section." },
      { step: "Quenching", body: "Controlled water quenching sets outer rim." },
      { step: "Tempering", body: "Self-tempering creates ultimate toughness." },
      { step: "Certifying", body: "100% heat-traceable MTC report attached." },
      { step: "Dispatch", body: "Loaded and shipped to heavy infrastructure sites." },
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
