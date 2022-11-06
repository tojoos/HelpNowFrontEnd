import { User } from "./user";

export interface Announcement {
  id: number;
  name: string;
  imageUrl: string;
  title: string;
  description: string;
  user: User;
}