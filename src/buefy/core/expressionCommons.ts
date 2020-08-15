export interface CronOptions {
    useSeconds: boolean;
    useBlankDay: false;
    allowOnlyOneBlankDayField: boolean;
    aliasDayOfWeek: boolean;
}

export const basicPreset: CronOptions = {
    aliasDayOfWeek: false,
    allowOnlyOneBlankDayField: false,
    useBlankDay: false,
    useSeconds: false
};

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

export const aliasToNumberMapping: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
};
