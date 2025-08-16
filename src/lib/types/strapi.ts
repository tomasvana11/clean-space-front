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
