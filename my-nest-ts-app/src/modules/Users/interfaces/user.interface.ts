export interface IUserResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  createdAt: Date;
  updatedAt: Date;
}
