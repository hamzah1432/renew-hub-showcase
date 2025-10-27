export interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface MenuItemProps {
  name: string;
  href: string;
}

export interface CourseItem {
  name: string;
  href: string;
}

export interface CourseCategory {
  name: string;
  href: string;
  courses: CourseItem[];
}

export interface CourseCategories {
  [category: string]: CourseCategory;
}

export interface ContactInfo {
  phone: string;
  email: string;
}