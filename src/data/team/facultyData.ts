import { TeamMember } from "./types";

interface FacultyRawData {
  name: string;
  role: string;
  subTeam: string;
  email?: string;
}

const rawFacultyList: FacultyRawData[] = [
  // ── ORGANIZING CHAIR & CO-CHAIRS ──
  {
    name: "Dr. Kuldeep Singh Sangwan",
    role: "Organizing Chair",
    subTeam: "FACULTY ORGANIZERS",
  },
  {
    name: "Dr. C S Lamba",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "cs.lamba@jaipur.manipal.edu",
  },
  {
    name: "Dr. Neha Chauhdhary",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "chaudhary.neha@jaipur.manipal.edu",
  },
  {
    name: "Dr. Rohit Bhatnagar",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "roheet.bhatnagar@jaipur.manipal.edu",
  },
  {
    name: "Dr. Sandeep Chaurasia",
    role: "Organizer Co-Chair",
    subTeam: "FACULTY ORGANIZERS",
    email: "sandeep.chaurasia@jaipur.manipal.edu",
  },

  // ── CONVENERS ──
  {
    name: "Dr. Shishir Singh Chauhan",
    role: "Convener",
    subTeam: "FACULTY CONVENERS",
    email: "shishir.chauhan@jaipur.manipal.edu",
  },
  {
    name: "Dr. Juhi Singh",
    role: "Convener",
    subTeam: "FACULTY CONVENERS",
    email: "juhi.singh@jaipur.manipal.edu",
  },

  // ── FACULTY COORDINATORS ──
  {
    name: "Dr. Bali Devi",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "bali.devi@jaipur.manipal.edu",
  },
  {
    name: "Ms. Stuti Pandey",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
  },
  {
    name: "Dr. Usha Jain",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "usha.jain@jaipur.manipal.edu",
  },
  {
    name: "Mr. Lav Upadhyay",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "lav.upadhyay@jaipur.manipal.edu",
  },
  {
    name: "Dr. Prashant Vats",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "prashant.vats@jaipur.manipal.edu",
  },
  {
    name: "Dr. Amit Garg",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "amit.garg@jaipur.manipal.edu",
  },
  {
    name: "Mr. Abhay Singh Bisht",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "abhay.bisht@jaipur.manipal.edu",
  },
  {
    name: "Dr. Satyabrata Roy",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "satyabrata.roy@jaipur.manipal.edu",
  },
  {
    name: "Dr. Sayar Singh Shekhawat",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "sayar.shekhawat@jaipur.manipal.edu",
  },
  {
    name: "Dr. Ajay Kumar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "kumar.ajay@jaipur.manipal.edu",
  },
  {
    name: "Dr. Mahesh Jangid",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "mahesh.jangid@jaipur.manipal.edu",
  },
  {
    name: "Dr. Surbhi Sharma",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "surbhi.sharma@jaipur.manipal.edu",
  },
  {
    name: "Dr. Sunita Singhal",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "sunita.singhal@jaipur.manipal.edu",
  },
  {
    name: "Dr. Ankur Pandey",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "ankur.pandey@jaipur.manipal.edu",
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
  },
  {
    name: "Dr. Mayank Namdev",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "mayank.namdev@jaipur.manipal.edu",
  },
  {
    name: "Dr. Divya Thakur",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "divya.thakur@jaipur.manipal.edu",
  },
  {
    name: "Dr. Anil Kumar",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "anil.kumar@jaipur.manipal.edu",
  },
  {
    name: "Dr. Umashankar Rawat",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "umashankar.rawat@jaipur.manipal.edu",
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
  },
  {
    name: "Dr. Anita Shrotriya",
    role: "Faculty Coordinator",
    subTeam: "FACULTY CO-ORDINATORS",
    email: "anita.shrotriya@jaipur.manipal.edu",
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
  }));
};

export const facultyMembers: TeamMember[] = [
  // ── 2026 FACULTY ──
  ...generateFacultyForYear("2026"),

  // ── 2025 FACULTY ──
  ...generateFacultyForYear("2025"),

  // ── 2024 FACULTY ──
  // PATRON
  {
    id: "2024-faculty-patron-1",
    name: "Mr. S. Vaitheeswaran",
    role: "CHAIRPERSON, MUJ",
    year: "2024",
    category: "FACULTY",
    subTeam: "PATRON",
  },
  {
    id: "2024-faculty-patron-2",
    name: "Dr. N N Sharma",
    role: "PRESIDENT, MUJ",
    year: "2024",
    category: "FACULTY",
    subTeam: "PATRON",
  },

  // CO-PATRON
  {
    id: "2024-faculty-copatron-1",
    name: "Dr. Jawar N Jangir",
    role: "PRO PRESIDENT, MUJ",
    year: "2024",
    category: "FACULTY",
    subTeam: "CO-PATRON",
  },
  {
    id: "2024-faculty-copatron-2",
    name: "Dr. Nitu Bhatnagar",
    role: "REGISTRAR, MUJ",
    year: "2024",
    category: "FACULTY",
    subTeam: "CO-PATRON",
  },
  {
    id: "2024-faculty-copatron-3",
    name: "Dr. Kuldeep Singh Sangwan",
    role: "DEAN FOE, MUJ",
    year: "2024",
    category: "FACULTY",
    subTeam: "CO-PATRON",
  },

  // CHAIR
  {
    id: "2024-faculty-chair-1",
    name: "Dr. Sandeep Chaurasia",
    role: "CHAIR",
    year: "2024",
    category: "FACULTY",
    subTeam: "CHAIR",
  },
  {
    id: "2024-faculty-chair-2",
    name: "Dr. Sandeep Joshi",
    role: "CEO AIC",
    year: "2024",
    category: "FACULTY",
    subTeam: "CHAIR",
  },

  // PROGRAM CHAIR
  {
    id: "2024-faculty-program-chair-1",
    name: "Dr. Neha Chaudhary",
    role: "PROGRAM CHAIR",
    year: "2024",
    category: "FACULTY",
    subTeam: "PROGRAM CHAIR",
    email: "chaudhary.neha@jaipur.manipal.edu",
  },

  // CONVENER
  {
    id: "2024-faculty-convener-1",
    name: "Dr. Juhi Singh",
    role: "CONVENER",
    year: "2024",
    category: "FACULTY",
    subTeam: "CONVENER",
    email: "juhi.singh@jaipur.manipal.edu",
  },
  {
    id: "2024-faculty-convener-2",
    name: "Mr. Shishir Singh",
    role: "CONVENER",
    year: "2024",
    category: "FACULTY",
    subTeam: "CONVENER",
    email: "shishir.chauhan@jaipur.manipal.edu",
  },
];
