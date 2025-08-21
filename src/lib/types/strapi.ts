export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface StrapiSingleType<T> {
  id: number;
  documentId: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GdprContent extends StrapiSingleType<any> {
  title: string;
  content: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

export interface TermsContent extends StrapiSingleType<any> {
  title: string;
  content: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

export interface Service extends StrapiSingleType<any> {
  title: string;
  image?: StrapiImage;
  whats_included?: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  price: number;
  duration: number;
  slug: string;
}

export interface Location extends StrapiSingleType<any> {
  region: string;
  employee_count: number;
}
