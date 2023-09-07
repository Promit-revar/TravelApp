export interface RootObject {
  data: PlanData;
  code: number;
  message: string;
  status: number;
}

export interface PlanData {
  plan: PlanType;
}

export interface PlanType {
  plan_title: string;
  schedule: Schedule[];
}

export interface Schedule {
  day: string;
  title: string;
  tagline: string;
  items: { time_slot: string; explain: string }[];
}
