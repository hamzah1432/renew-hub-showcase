import { NavigationItem, MenuItemProps, CourseCategories, ContactInfo } from "../types/navigation";

export const navigation: NavigationItem[] = [
  { name: "Home", href: "#home" },
  { name: "Courses", href: "#courses", hasDropdown: true },
  { name: "Institutional Accreditation", href: "#about" },
  { name: "Business Growth", href: "#team" },
  { name: "Get to know us", href: "#contact", hasDropdown: true },
];

export const courseCategories: CourseCategories = {
  "Renewable Energy Courses": [
    "Mastering Solar PV Off-Grid System Design Course – MSPOD",
    "Advanced Introduction to Solar PV System Course – AISPV",
    "Certified Solar PV Electrical Drawing Design Course – CSPED",
    "Mastering Solar PV Structure Design Course – MSPSD",
    "Mastering Solar PV Sales & Marketing Course – MSPSM",
    "Certified Solar PV Testing & Commissioning Course – CSPTC",
    "Mastering Solar PV System Installation Course – MSPSI",
    "Mastering SketchUP & PVsyst Solar PV Design Course – MSPVD",
    "Mastering Solar PV Project Management Course – MSPPM",
  ],
  "Electrical Power Courses": [
    "Mastering Electrical System Construction Course (MESC)",
  ],
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