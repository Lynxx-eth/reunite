export interface MissingImage {
  large?: string | null;
  thumb?: string | null;
  original?: string | null;
  caption?: string | null;
}

export interface MissingPerson {
  uid: string;
  title: string;
  images: MissingImage[];
  photo?: string | null;
  location?: string | null;
  details?: string | null;
  sex?: string | null;
  race?: string | null;
  hair?: string | null;
  eyes?: string | null;
  weight?: string | null;
  height?: string | null;
  ageRange?: string | null;
  datesOfBirth?: string[] | null;
  subjects?: string[] | null;
  fieldOffices?: string[] | null;
  reward?: string | null;
  url?: string | null;
  published?: string | null;
}

export interface MissingResponse {
  total: number;
  page: number;
  items: MissingPerson[];
  error?: string;
}
