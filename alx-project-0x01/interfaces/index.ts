// interfaces/index.ts

// --- Small reusable types ---
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo; // included because some APIs (jsonplaceholder) return geo
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// --- Post-related types ---
export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostData {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface PostModalProps {
  onClose: () => void;
  onSubmit: (post: PostData) => void;
  initialPost?: Partial<PostData>;
}

// --- User-related types ---
// keep `UserProps` for components expecting a full user (matches what jsonplaceholder returns)
export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// `UserData` mirrors the runtime user object structure (useful for forms / local state)
export interface UserData extends Omit<UserProps, "id"> {
  id?: number; // optional when creating a new user
}

// Props for the UserModal component
export interface UserModalProps {
  onClose: () => void;
  onSubmit: (post: UserProps) => void; // caller can add `id` if needed
  initialUser?: Partial<UserData>;
}
