export type ClientItem = {
  name: string;
  category: "Government & Infra" | "Industrial & Energy" | "Commercial & Developers";
  location: string;
  project: string;
  badge: string;
  tagline: string;
  supplied: string;
  logo: string;
};

export const CLIENTS: ClientItem[] = [
  {
    name: "Jharkhand PWD",
    category: "Government & Infra",
    location: "Ranchi, Jharkhand",
    project: "State Highway & Elevated Flyover Corridors",
    badge: "Government Sector",
    tagline: "PWD Approved SOR Steel Supply",
    supplied: "50,000+ Tonnes Rashmi TMT",
    logo:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Seal_of_Jharkhand.svg",
  },
  {
    name: "CPWD (Central PWD)",
    category: "Government & Infra",
    location: "Jharkhand Zone",
    project: "Central Institutional & Administrative Complexes",
    badge: "Central Govt",
    tagline: "Certified Heat-Traceable IS 1786 Steel",
    supplied: "35,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBL2bb4knLLVYkZF9ULZgFCFcq8NWM6sciMO7As3kRA&s=10",
  },
  {
    name: "NHAI (Highways Authority)",
    category: "Government & Infra",
    location: "Ranchi - Jamshedpur Expressway",
    project: "4-Lane Highway Bridges & Underpasses",
    badge: "Infrastructure",
    tagline: "Fe 550 EQCR Seismic Rebar",
    supplied: "60,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTWJqlkKeJra_PENg7t9VVfqwCH_7LoHi30fN4Ee_flQ&s=10",
  },
  {
    name: "Indian Railways",
    category: "Government & Infra",
    location: "Dhanbad - Chakradharpur",
    project: "Railway Overbridges & Station Platforms",
    badge: "Rail Network",
    tagline: "High Ductility Bridge Steel",
    supplied: "45,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpCCw8dBTHyQFfo1yxKr7Xgstbae5iCdL-KoB9iOHZw&s=10",
  },
  {
    name: "Tata Steel Growth Shop",
    category: "Industrial & Energy",
    location: "Jamshedpur & Gamharia",
    project: "Heavy Industrial Foundry & Crane Gantries",
    badge: "Industrial Leader",
    tagline: "Heavy Load Foundation Steel",
    supplied: "28,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgsTWtgL_wxuemWuyxdBJJtpUoGOkP-q5EobDOLCJTIQ&s=10",
  },
  {
    name: "NTPC Limited",
    category: "Industrial & Energy",
    location: "North Karanpura Thermal Power",
    project: "Turbine Foundations & Cooling Towers",
    badge: "Energy & Power",
    tagline: "Thermal Stress Resistant (600°C)",
    supplied: "40,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjWP1TxAHo_DTIG_dX6hH6onGw0icO2WLmuXUYu5a4Q&s=10",
  },
  {
    name: "Ranchi Smart City Corp",
    category: "Government & Infra",
    location: "Ranchi, Jharkhand",
    project: "Smart City Infrastructure & Civic Buildings",
    badge: "Smart City",
    tagline: "Direct Mill Rate Supply",
    supplied: "22,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmM6kdDkS7MIHLcdg4mqmRMHFsS2-aAntP6Dh2RNDE1A&s=10",
  },
  {
    name: "L&T Construction",
    category: "Commercial & Developers",
    location: "Jharkhand Infra Sites",
    project: "State Elevated Metro Viaduct & Water Grid",
    badge: "National Contractor",
    tagline: "Framework Steel Partner",
    supplied: "55,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-cfW8shNT7EHcEowDFmGQhTdUNprJHApotGiPF7TTlg&s=10",
  },
  {
    name: "Shapoorji Pallonji",
    category: "Commercial & Developers",
    location: "Jamshedpur & Bokaro",
    project: "Commercial Complexes & High-Rise Towers",
    badge: "EPC Contractor",
    tagline: "Super Bond Concrete Rebar",
    supplied: "30,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeoxSbuwDYlZxe5h2FKqxqYGouHwpUT-8DRRmQab7HJQ&s=10",
  },
  {
    name: "Simplex Infrastructures",
    category: "Commercial & Developers",
    location: "Dhanbad & Hazaribagh",
    project: "Heavy Bridge Abutments & Viaduct Piles",
    badge: "Infrastructure",
    tagline: "Deep Foundation Piling Steel",
    supplied: "25,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBg0y2cOEPBJiUlxWWjz4Fo4Yb8QNScKXIqkq8FgTE8w&s=10",
  },
  {
    name: "Ahluwalia Contracts",
    category: "Commercial & Developers",
    location: "Ranchi & Deoghar",
    project: "AIIMS & Super-Specialty Hospital Towers",
    badge: "Healthcare Infra",
    tagline: "Fe 500D High Elongation Steel",
    supplied: "18,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsw0EsRvs8I1ZHoi8CnEKWxMnIpQKJqh6iS9rz59fPFw&s=10",
  },
  {
    name: "Vasundhara Realcon",
    category: "Commercial & Developers",
    location: "Ranchi, Jharkhand",
    project: "Luxury Residential High-Rise Communities",
    badge: "Real Estate",
    tagline: "Seismic Safety Construction",
    supplied: "15,000+ Tonnes Rashmi TMT",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58ryqkDA3nBWkT_cuBcT_ufS5U3uuLmHZmtGz-RZZGw&s=10",
  },
];