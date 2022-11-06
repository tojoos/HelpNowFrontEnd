import { Announcement } from "./announcement";
import { Fundraise } from "./fundraise";

export interface User {
  id: number;
  name: string;
  imageUrl: string;
  phone: string;
  email: string;
  supportedFundraises: Fundraise[];
  createdAnnouncements: Announcement;
}