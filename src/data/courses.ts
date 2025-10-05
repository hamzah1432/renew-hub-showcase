export interface Instructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  language: string;
  level: string;
  package: string;
  category: string;
  price: string | number;
  discountPrice: string | number;
  lectures: number;
  capacity: number;
  currentStudents: number;
  instructor: Instructor;
  image: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Mastering Energy Storage Systems Course (MESS) – English Version",
    description:
      "The 'Mastering Energy Storage Systems Course' is a comprehensive program designed to equip participants with the knowledge and skills necessary to understand the fundamental principles and practical applications of energy storage systems. This course covers the technical and economic aspects of various energy storage technologies, including batteries, pumped hydro, thermal storage, and emerging innovations. Participants will explore infrastructure considerations, integration with renewable energy sources, and the potential applications of energy storage in different sectors.",
    duration: "6 hours",
    language: "English",
    level: "All Levels",
    package: "Bronze",
    category: "Renewable Energy",
    price: "400.00",
    discountPrice: "80.00",
    lectures: 8,
    capacity: 100,
    currentStudents: 59,
    instructor: {
      name: "Tarek MERHBI",
      avatar: "public/Tarek_MERHBI.png",
    },
    image: "public/MESS_Course.png",
  },
  {
    id: 2,
    title:
      "Advanced Solar Water Pumping Design and Installation Course (ASPDI) – English Version",
    description:
      "The Advanced Solar Water Pumping Design and Installation Course (ASPDI) – English Version provides participants with in-depth, hands-on training in designing, installing, and maintaining solar water pumping systems. Trainees will develop practical skills to assess site conditions, select appropriate components, design efficient solar pumping solutions, and execute installations with confidence. Through guided exercises, real-life case studies, and step-by-step instruction, participants will gain the expertise to implement reliable solar water pumping systems in diverse settings.",
    duration: "2 hours",
    language: "English",
    level: "All Levels",
    package: "Diamond",
    category: "Renewable Energy",
    price: "120.00",
    discountPrice: "24.00",
    lectures: 1,
    capacity: 80,
    currentStudents: 25,
    instructor: {
      name: "Awangum",
      avatar: "public/Awangum.png",
    },
    image: "public/ASPDI_Course.png",
  },
  {
    id: 3,
    title:
      "Hands-on Training course in Battery and Inverter Repairs Course (HTBIR) – English Version",
    description:
      "The Hands-on Training Course in Battery and Inverter Repairs equips participants with practical expertise to understand inverter and battery systems, diagnose common faults, troubleshoot problems step-by-step, and perform reliable maintenance and repair. Through real-life case studies and guided exercises, trainees gain the confidence and technical skills needed to repair and maintain power systems effectively.",
    duration: "1 hour",
    language: "English",
    level: "All Levels",
    package: "Gold",
    category: "Renewable Energy",
    price: "60.00",
    discountPrice: "12.00",
    lectures: 1,
    capacity: 150,
    currentStudents: 20,
    instructor: {
      name: "Charles Ekpima",
      avatar: "public/Charles_Ekpima.png",
    },
    image: "public/HTBIR_Course.png",
  },
  {
    id: 4,
    title:
      "3D Modeling Integration In Solar System Course (DMISS) – English Version",
    description:
      "The '3D Modeling Integration in Solar System (DMISS) Course' helps solar professionals transform standard 2D drawings into realistic, high-impact 3D visuals that win clients faster. In today's market, showing clients exactly how their solar system will look on their property builds instant trust and sets you apart from competitors still relying on flat blueprints. This course equips you with the tools and techniques to create stunning, accurate, and professional 3D presentations that sell.",
    duration: "7 hours",
    language: "English",
    level: "All Levels",
    package: "Silver",
    category: "Renewable Energy",
    price: "325.00",
    discountPrice: "65.00",
    lectures: 22,
    capacity: 100,
    currentStudents: 25,
    instructor: {
      name: "Abdulrahman Al-Mashti",
      avatar: "public/Abdulrahman_Almashti.png",
    },
    image: "public/DMISS_Course.png",
  },
  {
    id: 5,
    title:
      "Professional Course in SCADA-Based Monitoring & Control for Solar Microgrid Systems (SMGCS) – English Version",
    description:
      "The 'Professional Course in SCADA-Based Monitoring & Control for Solar Microgrid Systems (SMGCS)' provides participants with in-depth technical knowledge and practical skills in the design, setup, and operation of SCADA systems for solar microgrids. This course covers SCADA architecture, sensors and communication protocols, real-time performance monitoring, operational control strategies, and data analytics to ensure reliable, efficient, and safe management of solar microgrid assets.",
    duration: "3 hours",
    language: "English",
    level: "All Levels",
    package: "Bronze",
    category: "Renewable Energy",
    price: 200.0,
    discountPrice: 40.0,
    lectures: 3,
    capacity: 100,
    currentStudents: 36,
    instructor: {
      name: "Salem Al Khawaja",
      avatar: "public/Salem_Al_Khawaja.jpeg",
    },
    image: "public/SMGCS_Course.png",
  },
  {
    id: 6,
    title:
      "Mastering Solar String Inverter Sizing Course (MSSIS) – English Version",
    description:
      "The 'Mastering Solar String Inverter Sizing' course is designed to equip participants with the essential knowledge and practical skills needed to accurately size and select string inverters for solar photovoltaic (PV) systems. The course covers inverter fundamentals, key sizing criteria, design calculations, and real-world application examples to ensure optimal system performance and compliance with industry standards.",
    duration: "3 hours",
    language: "English",
    level: "All Levels",
    package: "Gold",
    category: "Electrical Power",
    price: 140.0,
    discountPrice: 55.0,
    lectures: 9,
    capacity: 150,
    currentStudents: 87,
    instructor: {
      name: "Abdulrahman Smadi",
      avatar: "public/Abdulrahman_Smadi.jpeg",
    },
    image: "public/MSSIC_Course.png",
  },
];