import { Timestamp } from 'rxjs';

export interface Users {
  name: string;
}

export interface PeriodicElement {
  name: string;
  action: string;
}

export interface VoteList {
  title: string;
  user_id: string;
  one_star: string;
  two_star: string;
  three_star: string;
  starTime: Date;
  endVoting: boolean;
}

export const teamList: any[] = [
  { id: 1, group: "Dott 1" },
  { id: 2, group: "Dott 2" },
  { id: 3, group: "Mobile" },
  { id: 4, group: "Vogaro" },
  { id: 5, group: "Balgonia" },
  { id: 6, group: "SonicMoov" }]
