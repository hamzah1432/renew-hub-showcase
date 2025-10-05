export interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface MenuItemProps {
  name: string;
  href: string;
}

export interface CourseCategories {
  [category: string]: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
}