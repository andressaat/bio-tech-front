export declare type Credentials = {
  email: string;
  password: string;
};

export interface User {
  id ?: string;
  name?: string;
  username?: string;
  email?: string;
  emailVerified?: string;
  verificationToken?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
