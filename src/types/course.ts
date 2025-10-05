export type CourseCategory = {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  id: number;
};

export type CourseInstructor = {
  avatar: string;
  id: number;
  name: string;
  description: string;
};

export type CourseMetaData = {
  _lp_passing_condition: number;
};

export type Course = {
  id: number;
  name: string;
  image: string;
  instructor: CourseInstructor;
  duration: string;
  categories: CourseCategory[];
  price: number;
  price_rendered: string;
  origin_price: string;
  origin_price_rendered: string;
  on_sale: boolean;
  sale_price: number;
  sale_price_rendered: string;
  rating: boolean;
  meta_data: CourseMetaData;
};

// Internal course type for the component (converted from API response)
export type InternalCourse = {
  id: number;
  title: string;
  description: string;
  duration: string;
  language: string;
  level: string;
  package: string;
  category: string;
  price: string;
  discountPrice: string;
  lectures: number;
  capacity: number;
  currentStudents: number;
  instructor: {
    name: string;
    avatar: string;
  };
  image: string;
  onSale: boolean;
};