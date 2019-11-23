interface MinutesTabUpdatedEvent {
    type: "minutes";
    minuteInterval: number;
}
interface HourlyTabUpdatedEvent {
    type: "hourly";
    minutes: number;
    hourInterval: number;
}
interface DailyTabUpdatedEvent {
    type: "daily";
    minutes: number;
    hours: number;
    dayInterval: number;
}
interface WeeklyTabUpdatedEvent {
    type: "weekly";
    minutes: number;
    hours: number;
    days: boolean[];
}
interface MonthlyTabUpdatedEvent {
    type: "monthly";
    minutes: number;
    hours: number;
    day: number;
    monthInterval: number;
}

interface AdvancedTabUpdatedEvent {
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

export type TabUpdatedEventKey = TabUpdatedEvent[keyof TabUpdatedEvent];

export const calculateExpression = (event: TabUpdatedEvent): string => {
    console.log(JSON.stringify(event));
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
        return `${event.minutes} ${event.hours} * * ` +
            `${event.days
            .filter(d => d)
            .sort()
            .join()}`;
    }
    if (event.type === "monthly") {
        return `${event.minutes} ${event.hours} ${event.day} */${event.monthInterval} *`;
    }
    if (event.type === "advanced") {
        return event.cronExpression;
    }
    throw `unknown event type: ${event}`;
};

export const tabFromExpression = (expression: string): TabUpdatedEventKey => {
    if (expression.split(" ").length != 5) {
        return "advanced";
    }
    if (expression.match(/^\*\/\d+ \* \* \* \*$/)) {
        return "minutes";
    }
    if (expression.match(/^\d+ \*\/\d+ \* \* \*$/)) {
        return "hourly";
    }
    if (expression.match(/^\d+ \d+ \*\/\d+ \* \*$/)) {
        return "daily";
    }
    if (expression.match(/^\d+ \d+ \* \* (\d)(,\d)*$/)) {
        return "weekly";
    }
    if (expression.match(/^\d+ \d+ \d+ \*\/\d+ \*$/)) {
        return "monthly";
    }
    return "advanced";
};
