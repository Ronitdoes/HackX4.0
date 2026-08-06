export interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

// Landing Page Scattered Sponsors (8 Sponsors)
export const LANDING_SPONSORS: Sponsor[] = [
  { id: 1, name: "EY", logo: "/assets/sponsors/S2.png.webp" },
  { id: 2, name: "Oracle", logo: "/assets/sponsors/sponsor11.svg" },
  { id: 3, name: "GFG", logo: "/assets/sponsors/S3.png" },
  { id: 4, name: "Quillbot", logo: "/assets/sponsors/sponsor19.svg" },
  { id: 5, name: "Ecell", logo: "/assets/sponsors/sponsor8.svg" },
  { id: 6, name: "Salesforce", logo: "/assets/sponsors/S4.png" },
  { id: 7, name: "CD", logo: "/assets/sponsors/sponsor16.svg" },
  { id: 8, name: "E-Cell", logo: "/assets/sponsors/S1.png" },
];

// Grid Section Sponsors (16 Sponsors - 4 blocks of 2x2 grids)
export const GRID_SPONSORS: Sponsor[] = [
  { id: 101, name: "Sponsor 9", logo: "/assets/sponsors/sponsor9.svg" },
  { id: 102, name: "Sponsor 10", logo: "/assets/sponsors/sponsor10.svg" },
  { id: 103, name: "Sponsor 11", logo: "/assets/sponsors/sponsor11.svg" },
  { id: 104, name: "Sponsor 12", logo: "/assets/sponsors/sponsor12.svg" },
  { id: 105, name: "Sponsor 13", logo: "/assets/sponsors/sponsor13.svg" },
  { id: 106, name: "Sponsor 14", logo: "/assets/sponsors/sponsor14.svg" },
  { id: 107, name: "Sponsor 15", logo: "/assets/sponsors/sponsor15.svg" },
  { id: 108, name: "Sponsor 16", logo: "/assets/sponsors/sponsor16.svg" },
  { id: 109, name: "Sponsor 17", logo: "/assets/sponsors/sponsor17.svg" },
  { id: 110, name: "Sponsor 18", logo: "/assets/sponsors/sponsor18.svg" },
  { id: 111, name: "Sponsor 19", logo: "/assets/sponsors/sponsor19.svg" },
  { id: 112, name: "Sponsor 20", logo: "/assets/sponsors/sponsor20.svg" },
  { id: 113, name: "Sponsor 21", logo: "/assets/sponsors/sponsor21.svg" },
  { id: 114, name: "Sponsor 22", logo: "/assets/sponsors/sponsor22.svg" },
  { id: 115, name: "Sponsor S1", logo: "/assets/sponsors/S1.png" },
  { id: 116, name: "Sponsor S3", logo: "/assets/sponsors/S3.png" },
];

// Combined dataset export
export const SPONSORS: Sponsor[] = [...LANDING_SPONSORS, ...GRID_SPONSORS];
