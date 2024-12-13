import { Status } from "../enums/status.enum";
import { Priority } from "../enums/priority.enum";
import type { User } from "./user.interface";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  assigned: User[];
  columnPosition: number;
}