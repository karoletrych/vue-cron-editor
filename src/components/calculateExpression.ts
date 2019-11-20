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

type TabUpdatedEvent =
  | MinutesTabUpdatedEvent
  | HourlyTabUpdatedEvent
  | DailyTabUpdatedEvent
  | WeeklyTabUpdatedEvent;

export const calculateExpression = (event: TabUpdatedEvent) : string => {
  console.log(JSON.stringify(event));
  if (event.type === "minutes") {
    return `0/${event.minutes} * 1/1 * ?`;
  } else if (event.type === "hourly") {
    return `${event.hours} 0/${event.minutes} 1/1 * ?`;
  } else if (event.type === "daily") {
    return `${event.minutes} ${event.hours} 1/${event.dayInterval} * ?`;
  } else if (event.type === "weekly") {
    return `${event.minutes} ${event.hours} ? * ${event.days.filter(d=> d).join()}`;
  }
  throw event;
};

export const tabFromExpression = (expression: string) => {
  expression;
  throw "not implemented";
};
