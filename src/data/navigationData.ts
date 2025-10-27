import { NavigationItem, MenuItemProps, CourseCategories, ContactInfo } from "../types/navigation";

export const navigation: NavigationItem[] = [
  { name: "Home", href: "#home" },
  { name: "Courses", href: "#courses", hasDropdown: true },
  { name: "Institutional Accreditation", href: "#about" },
  { name: "Business Growth", href: "#team" },
  { name: "News", href: "#news" },
  { name: "Get to know us", href: "#contact", hasDropdown: true },
];

export const courseCategories: CourseCategories = {
  "Renewable Energy Courses": {
    name: "Renewable Energy Courses",
    href: "#renewable-energy-courses",
    courses: [
      { name: "Mastering Solar PV Off-Grid System Design Course – MSPOD", href: "#course-mspod" },
      { name: "Advanced Introduction to Solar PV System Course – AISPV", href: "#course-aispv" },
      { name: "Certified Solar PV Electrical Drawing Design Course – CSPED", href: "#course-csped" },
      { name: "Mastering Solar PV Structure Design Course – MSPSD", href: "#course-mspsd" },
      { name: "Mastering Solar PV Sales & Marketing Course – MSPSM", href: "#course-mspsm" },
      { name: "Certified Solar PV Testing & Commissioning Course – CSPTC", href: "#course-csptc" },
      { name: "Mastering Solar PV System Installation Course – MSPSI", href: "#course-mspsi" },
      { name: "Mastering SketchUP & PVsyst Solar PV Design Course – MSPVD", href: "#course-mspvd" },
      { name: "Mastering Solar PV Project Management Course – MSPPM", href: "#course-msppm" },
    ]
  },
  "Electrical Power Courses": {
    name: "Electrical Power Courses",
    href: "#electrical-power-courses",
    courses: [
      { name: "Mastering Electrical System Construction Course (MESC)", href: "#course-mesc" },
    ]
  },
  "Webinars": {
    name: "Webinars",
    href: "#webinars",
    courses: [
      { name: "Marketing & Development – Basic Package", href: "#webinar-marketing-dev" },
      { name: "C & I Solar Project Development and", href: "#webinar-ci-solar" },
      { name: "Commercial and Industrial Energy Storage System", href: "#webinar-energy-storage" },
    ]
  },
  "workshops": {
    name: "Workshops",
    href: "#workshops",
    courses: [
      { name: "3D Modeling Integration in Solar System Workshop", href: "#workshop-3d-modeling" },
      { name: "Solar PV Electrical Drawing Design Workshop", href: "#workshop-electrical-drawing" },
      { name: "Solar PV Testing & Commissioning Workshop", href: "#workshop-testing-commissioning" },
      { name: "Mastering Solar PV Project Management Workshop", href: "#workshop-project-management" },
      { name: "Mastering Solar PV Installation Workshop", href: "#workshop-installation" },
    ]
  },
};

export const aboutUsMenuItems: MenuItemProps[] = [
  { name: "About Us", href: "#about" },
  { name: "Become an Instructor", href: "#instructor" },
  { name: "Contact Us", href: "#contact" },
];

export const contactInfo: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "info@professionalinstitute.com",
};