import { User } from "./User";

export class Post {
  id: string;
  title: string;
  content: string;
  author: User;
  approvedBy: User;
  submitDate: Date;
  revisionDate: Date;
  status: number;
  //comments: Comment[]
}
