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

export type TabKey = UiState[keyof UiState];

export const isEventValid = (e: UiState) => {
    if (e.type == "weekly" && e.days.length == 0) return false;
    else return true;
};

const aliasToNumberMapping: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
};
const isDayAlias = (s: string): boolean =>
    Object.keys(aliasToNumberMapping).includes(s);

const toDayNumber = (alias: string): number => {
    let number = aliasToNumberMapping[alias];
    if (number == undefined) {
        throw new Error("unhandled alias " + alias);
    }
    return number;
};

const toDayAlias = (num: number): string => {
    let alias = Object.keys(aliasToNumberMapping).find(
        k => aliasToNumberMapping[k] === num
    );
    if (alias == undefined) {
        throw new Error(`unhandled number ${num}`);
    }
    return alias;
};

export const buildExpression = (
    cronOptions: CronOptions,
    state: UiState
): string => {
    if (state.type === "minutes") {
        return `*/${state.minuteInterval} * * * *`;
    }
    if (state.type === "hourly") {
        return `${state.minutes} */${state.hourInterval} * * *`;
    }
    if (state.type === "daily") {
        return `${state.minutes} ${state.hours} */${state.dayInterval} * *`;
    }
    if (state.type === "weekly") {
        if (!cronOptions.aliasDayOfWeek) {
            state.days = state.days.map(d => toDayNumber(d).toString());
        }
        return (
            `${state.minutes} ${state.hours} * * ` +
            `${state.days.sort().join()}`
        );
    }
    if (state.type === "monthly") {
        return `${state.minutes} ${state.hours} ${state.day} */${state.monthInterval} *`;
    }
    if (state.type === "advanced") {
        return state.cronExpression;
    }
    throw `unknown event type: ${state}`;
};

export const parseExpression = (
    options: CronOptions,
    expression: string
): UiState => {
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
            /^(\d+) (\d+) \* \* ([a-zA-Z0-9]+)(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?$/
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
                    .map(d =>
                        options.aliasDayOfWeek && !isDayAlias(d)
                            ? toDayAlias(parseInt(d))
                            : d
                    )
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
