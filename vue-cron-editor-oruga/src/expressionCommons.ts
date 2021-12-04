export type CronSyntax = "basic" | "quartz";

export interface MinutesTabState {
    type: "minutes";
    minuteInterval: number;
}
export interface HourlyTabState {
    type: "hourly";
    minutes: number;
    hourInterval: number;
}
export interface DailyTabState {
    type: "daily";
    minutes: number;
    hours: number;
    dayInterval: number;
}
export interface WeeklyTabState {
    type: "weekly";
    minutes: number;
    hours: number;
    days: string[];
}
export interface MonthlyTabState {
    type: "monthly";
    minutes: number;
    hours: number;
    day: number;
    monthInterval: number;
}

export interface AdvancedTabState {
    type: "advanced";
    cronExpression: string;
}

export type UiState =
    | MinutesTabState
    | HourlyTabState
    | DailyTabState
    | WeeklyTabState
    | MonthlyTabState
    | AdvancedTabState;
