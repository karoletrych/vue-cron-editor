interface MinutesTabUpdatedEvent {
  type: "minutes";
  minutes: number;
}
interface HourlyTabUpdatedEvent {
  type: "hourly";
  minutes: number;
  hours: number;
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

type TabUpdatedEvent =
  | MinutesTabUpdatedEvent
  | HourlyTabUpdatedEvent
  | DailyTabUpdatedEvent
  | WeeklyTabUpdatedEvent
  | MonthlyTabUpdatedEvent
  | AdvancedTabUpdatedEvent

export const calculateExpression = (event: TabUpdatedEvent) : string => {
  console.log(JSON.stringify(event));
  if (event.type === "minutes") {
    return `*/${event.minutes} * * * *`;
  } else if (event.type === "hourly") {
    return `${event.minutes} */${event.hours} * * *`;
  } else if (event.type === "daily") {
    return `${event.minutes} ${event.hours} */${event.dayInterval} * *`;
  } else if (event.type === "weekly") {
    return `${event.minutes} ${event.hours} * * ${event.days.filter(d=> d).join()}`;
  } else if (event.type === "monthly") {
    return `${event.minutes} ${event.hours} ${event.day} */${event.monthInterval} *`;
  } else if (event.type === "advanced") {
    return event.cronExpression;
  }
  throw `unknown event type: ${event}`;
};

export const tabFromExpression = (expression: string) => {
  expression;
  throw "not implemented";
};
