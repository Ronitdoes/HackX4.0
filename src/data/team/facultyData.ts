import { TeamMember } from "./types";

interface FacultyRawData {
  name: string;
  role: string;
  subTeam: string;
  email?: string;
  image?: string;
}

const R2_FACULTY_BASE = "https://pub-45c102ac14a64011a530ed2864a18405.r2.dev/faculty";

const rawFacultyList: FacultyRawData[] = [
  // ── ORGANIZING CHAIR & CO-CHAIRS ──
  {
    name: "Dr. Kuldeep Singh Sangwan",
    role: "Organizing Chair",
    subTeam: "FACULTY ORGANIZERS",
    image: `${R2_FACULTY_BASE}/Dr20Kuldip20Singh.webp`,
  },
    {
    name: "Dr. Sandeep Chaurasia",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "sandeep.chaurasia@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SANDEEP.webp`,
  },
  {
    name: "Dr. C S Lamba",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "cs.lamba@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/CS-LAMBDA.webp`,
  },
  {
    name: "Dr. Rohit Bhatnagar",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "roheet.bhatnagar@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/ROHEET.webp`,
  },
    {
    name: "Dr. Neha Chauhdhary",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "chaudhary.neha@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/NEHA.webp`,
  },


  // ── CONVENERS ──
   {
    name: "Dr. Juhi Singh",
    role: "Convener",
    subTeam: "FACULTY CONVENERS",
    email: "juhi.singh@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/JUHI.webp`,
  },
  {
    name: "Dr. Shishir Singh Chauhan",
    role: "Convener",
    subTeam: "FACULTY CONVENERS",
    email: "shishir.chauhan@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SHISHRI.webp`,
  },

  // ── FACULTY COORDINATORS ──
  {
    name: "Dr. Bali Devi",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "bali.devi@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/BALI.webp`,
  },
  {
    name: "Ms. Stuti Pandey",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/STUTI.webp`,
  },
  {
    name: "Dr. Usha Jain",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "usha.jain@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/USHA.webp`,
  },
  {
    name: "Mr. Lav Upadhyay",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "lav.upadhyay@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/LAV.webp`,
  },
  {
    name: "Dr. Prashant Vats",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "prashant.vats@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/PRASHANT.webp`,
  },
  {
    name: "Dr. Amit Garg",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "amit.garg@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/AMIT.webp`,
  },
  {
    name: "Mr. Abhay Singh Bisht",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "abhay.bisht@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/ABHAY.webp`,
  },
  {
    name: "Dr. Satyabrata Roy",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "satyabrata.roy@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SATYA.webp`,
  },
  {
    name: "Dr. Sayar Singh Shekhawat",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "sayar.shekhawat@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SAYAR.webp`,
  },
  {
    name: "Dr. Ajay Kumar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "kumar.ajay@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/AJAY.webp`,
  },
  {
    name: "Dr. Mahesh Jangid",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "mahesh.jangid@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/MAHESH.webp`,
  },
  {
    name: "Dr. Surbhi Sharma",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "surbhi.sharma@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SURBHI.webp`,
  },
  {
    name: "Dr. Sunita Singhal",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "sunita.singhal@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/SUNITA.webp`,
  },
  {
    name: "Dr. Ankur Pandey",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "ankur.pandey@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/ANKUR.webp`,
  },
  {
    name: "Ms. Soni Gupta",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Dr. Vivek Singh Sikarwar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "vivek.sikarwar@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/VIVEK.webp`,
  },
  {
    name: "Dr. Mayank Namdev",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "mayank.namdev@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/MAYANK.webp`,
  },
  {
    name: "Dr. Divya Thakur",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "divya.thakur@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/DIVYA.webp`,
  },
  {
    name: "Dr. Anil Kumar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "anil.kumar@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/ANIL.webp`,
  },
  {
    name: "Dr. Umashankar Rawat",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "umashankar.rawat@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/UMASH.webp`,
  },
  {
    name: "Dr. Arunangshu Pal",
    role: "Faculty Coordinator, AIC",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "arunangshu.pal@jaipur.manipal.edu",
  },
  {
    name: "Dr. Babita Tiwari",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "babita.tiwari@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/BABITA.webp`,
  },
  {
    name: "Dr. Anita Shrotriya",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "anita.shrotriya@jaipur.manipal.edu",
    image: `${R2_FACULTY_BASE}/ANITA.webp`,
  },
  {
    name: "Dr. Akhilesh Kumar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/AKHILESH.webp`,
  },
  {
    name: "Dr. Arjun Singh",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/ARJUN.webp`,
  },
  {
    name: "Dr. Deepak Moud",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/DEEPAK.webp`,
  },
  {
    name: "Dr. Geetha K",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/geetha.webp`,
  },
  {
    name: "Ms. Pratistha Mathur",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/Pratistha.webp`,
  },
  {
    name: "Dr. Rishav Sharma",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    image: `${R2_FACULTY_BASE}/RISHAV.webp`,
  },
  {
    name: "Mr. Pradeep Chaturvedi",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Ms. Gunjan",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Dr. Neelam Chaplot",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "neelam.chaplot@jaipur.manipal.edu",
  },
  {
    name: "Dr. Anand Pandey",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "anand.pandey@jaipur.manipal.edu",
  },
  {
    name: "Dr. Sandeep Joshi",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Ms. Prachi Chandrawat",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Mr. Arihant Bothra",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Mr. Lakshit",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
];

const generateFacultyForYear = (year: "2026" | "2025"): TeamMember[] => {
  return rawFacultyList.map((item, index) => ({
    id: `${year}-faculty-${index + 1}`,
    name: item.name,
    role: item.role,
    year,
    category: "FACULTY",
    subTeam: item.subTeam,
    email: item.email,
    image: item.image,
  }));
};

export const facultyMembers: TeamMember[] = [
  // ── 2026 FACULTY ──
  ...generateFacultyForYear("2026"),
];
