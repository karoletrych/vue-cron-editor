export interface CronOptions {
    useSeconds: boolean,
    useBlankDay: false,
    allowOnlyOneBlankDayField: boolean,
    aliasDayOfWeek: boolean
}

export const basicPreset : CronOptions = {
    aliasDayOfWeek: false,
    allowOnlyOneBlankDayField: false,
    useBlankDay: false,
    useSeconds: false
};


export interface MinutesTabUpdatedEvent {
    type: "minutes";
    minuteInterval: number;
}
export interface HourlyTabUpdatedEvent {
    type: "hourly";
    minutes: number;
    hourInterval: number;
}
export interface DailyTabUpdatedEvent {
    type: "daily";
    minutes: number;
    hours: number;
    dayInterval: number;
}
export interface WeeklyTabUpdatedEvent {
    type: "weekly";
    minutes: number;
    hours: number;
    days: string[];
}
export interface MonthlyTabUpdatedEvent {
    type: "monthly";
    minutes: number;
    hours: number;
    day: number;
    monthInterval: number;
}

export interface AdvancedTabUpdatedEvent {
    type: "advanced";
    cronExpression: string;
}

export type TabUpdatedEvent =
    | MinutesTabUpdatedEvent
    | HourlyTabUpdatedEvent
    | DailyTabUpdatedEvent
    | WeeklyTabUpdatedEvent
    | MonthlyTabUpdatedEvent
    | AdvancedTabUpdatedEvent;

export type TabKey = TabUpdatedEvent[keyof TabUpdatedEvent];

export const isEventValid = (e: TabUpdatedEvent) => {
    if (e.type == "weekly" && e.days.length == 0)
        return false;
    else
        return true;
}

const aliasToNumberMapping : Record<string, number> = {
    "SUN": 0,
    "MON": 1,
    "TUE": 2,
    "WED": 3,
    "THU": 4,
    "FRI": 5,
    "SAT": 6,
}

export const buildExpression = (cronOptions: CronOptions, event: TabUpdatedEvent): string => {
    if (event.type === "minutes") {
        return `*/${event.minuteInterval} * * * *`;
    }
    if (event.type === "hourly") {
        return `${event.minutes} */${event.hourInterval} * * *`;
    }
    if (event.type === "daily") {
        return `${event.minutes} ${event.hours} */${event.dayInterval} * *`;
    }
    if (event.type === "weekly") {
        if (!cronOptions.aliasDayOfWeek) {
            event.days = event.days.map(d => aliasToNumberMapping[d].toString());
        }
        return (
            `${event.minutes} ${event.hours} * * ` +
            `${event.days
                .sort()
                .join()
            }`
        );
    }
    if (event.type === "monthly") {
        return `${event.minutes} ${event.hours} ${event.day} */${event.monthInterval} *`;
    }
    if (event.type === "advanced") {
        return event.cronExpression;
    }
    throw `unknown event type: ${event}`;
};

export const parseExpression = (expression: string): TabUpdatedEvent => {
    let groups = null;

    if (expression.split(" ").length != 5) {
        return {
            type: "advanced",
            cronExpression: expression
        };
    }
    if ((groups = expression.match(/^\*\/(\d+) \* \* \* \*$/))) {
        return {
            type: "minutes",
            minuteInterval: Number(groups[1])
        };
    }
    if ((groups = expression.match(/^(\d+) \*\/(\d+) \* \* \*$/))) {
        return {
            type: "hourly",
            minutes: Number(groups[1]),
            hourInterval: Number(groups[2])
        };
    }
    if ((groups = expression.match(/^(\d+) (\d+) \*\/(\d+) \* \*$/))) {
        return {
            type: "daily",
            minutes: Number(groups[1]),
            hours: Number(groups[2]),
            dayInterval: Number(groups[3])
        };
    }
    if (
        (groups = expression.match(
            /^(\d+) (\d+) \* \* (\d)(,\d)?(,\d)?(,\d)?(,\d)?(,\d)?(,\d)?$/
        ))
    ) {
        const optionalDaysBeginIndex = 4;
        const matchesEndIndex = 10;
        return {
            type: "weekly",
            minutes: Number(groups[1]),
            hours: Number(groups[2]),
            days: [groups[3]].concat(
                groups
                    .slice(optionalDaysBeginIndex, matchesEndIndex)
                    .map(d => d && d.replace(/,/, ""))
                    .filter(d => d)
            )
        };
    }
    if ((groups = expression.match(/^(\d+) (\d+) (\d+) \*\/(\d+) \*$/))) {
        return {
            type: "monthly",
            minutes: Number(groups[1]),
            hours: Number(groups[2]),
            day: Number(groups[3]),
            monthInterval: Number(groups[4])
        };
    }
    return {
        type: "advanced",
        cronExpression: expression
    };
};
