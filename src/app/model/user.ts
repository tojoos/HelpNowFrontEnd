import { Announcement } from "./announcement";

export interface User {
  id: number;
  name: string;
  imageUrl: string;
  phone: string;
  email: string;
  createdAnnouncements: Announcement[];
}