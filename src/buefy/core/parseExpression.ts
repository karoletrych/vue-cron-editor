/**
 * parseExpression
 * Parses given expression and picks a matching tab for it.
 * It would be best if it was not dependent on cron syntax or too many configurable options.
 */

import { UiState } from "./expressionCommons";
import { toDayAlias, isDayAlias } from "./dayAliases";

type Number = {
    type: "number";
    value: number;
};

type Asterisk = {
    type: "asterisk";
};
type QuestionMark = {
    type: "question";
};
type CronNumber = {
    type: "cronNumber";
    at: Number | Asterisk;
    every: Number;
};
type SubExpr = Number | CronNumber | Asterisk | QuestionMark;

type SetOfDays = {
    type: "setOfDays";
    days: string[];
};

type CronExpr = {
    seconds?: SubExpr;
    minutes: SubExpr;
    hours: SubExpr;
    dayOfTheMonth: SubExpr;
    month: SubExpr;
    dayOfWeek: SetOfDays | Asterisk | QuestionMark;
};

function parseSubExpr(expr: string): SubExpr {
    expr = expr.trim();
    let match;
    if ((match = expr.match(/\*\/(\d+)/)) != null) {
        return {
            type: "cronNumber",
            at: { type: "asterisk" },
            every: { type: "number", value: parseInt(match[1]) }
        };
    }
    if ((match = expr.match(/(\d+)\/(\d+)/)) != null) {
        return {
            type: "cronNumber",
            at: { type: "number", value: parseInt(match[1]) },
            every: { type: "number", value: parseInt(match[2]) }
        };
    }
    if ((match = expr.match(/(\d+)/)) != null) {
        return {
            type: "number",
            value: parseInt(match[1])
        };
    }
    if (expr == "?") {
        return { type: "question" };
    }
    if (expr == "*") {
        return { type: "asterisk" };
    }
    throw new Error(`Unhandled subexpression: ${expr}`);
}
function parseDayOfWeek(expr: string): Asterisk | SetOfDays | QuestionMark {
    expr = expr.trim();
    if (expr == "*")
        return {
            type: "asterisk"
        };
    if (expr == "?")
        return {
            type: "question"
        };

    let groups = expr.match(
        /([a-zA-Z0-9]+)(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?/
    );
    if (groups == null) throw new Error(`invalid days expression: ${expr}`);
    return {
        type: "setOfDays",
        days: groups
            .slice(1)
            .map(d => d && d.replace(/,/, ""))
            .filter(d => d)
            .map(d => (!isDayAlias(d) ? toDayAlias(parseInt(d)) : d))
    };
}

const isAny = (token: SubExpr | SetOfDays): boolean =>
    token.type == "question" || token.type == "asterisk";

const isAnyTime = (token: Number | Asterisk): boolean =>
    token.type == "asterisk" || (token.type == "number" && token.value == 0);

export const parseExpression = (expression: string): UiState => {
    const advanced: UiState = {
        type: "advanced",
        cronExpression: expression
    };
    const groups = expression.split(" ");
    if (groups.length != 5 && groups.length != 6) {
        return advanced;
    }
    const cron: CronExpr =
        groups.length == 6
            ? {
                  seconds: parseSubExpr(groups[0]),
                  minutes: parseSubExpr(groups[1]),
                  hours: parseSubExpr(groups[2]),
                  dayOfTheMonth: parseSubExpr(groups[3]),
                  month: parseSubExpr(groups[4]),
                  dayOfWeek: parseDayOfWeek(groups[5])
              }
            : {
                  minutes: parseSubExpr(groups[0]),
                  hours: parseSubExpr(groups[1]),
                  dayOfTheMonth: parseSubExpr(groups[2]),
                  month: parseSubExpr(groups[3]),
                  dayOfWeek: parseDayOfWeek(groups[4])
              };
    if (
        cron.minutes.type == "cronNumber" &&
        isAnyTime(cron.minutes.at) &&
        cron.hours.type == "asterisk" &&
        cron.dayOfTheMonth.type == "asterisk" &&
        cron.month.type == "asterisk" &&
        isAny(cron.dayOfWeek)
    )
        return {
            type: "minutes",
            minuteInterval: cron.minutes.every.value
        };
    if (
        cron.minutes.type == "number" &&
        cron.hours.type == "cronNumber" &&
        isAnyTime(cron.hours.at) &&
        cron.dayOfTheMonth.type == "asterisk" &&
        cron.month.type == "asterisk" &&
        isAny(cron.dayOfWeek)
    )
        return {
            type: "hourly",
            minutes: cron.minutes.value,
            hourInterval: cron.hours.every.value
        };

    if (
        cron.minutes.type == "number" &&
        cron.hours.type == "number" &&
        cron.dayOfTheMonth.type == "cronNumber" &&
        cron.dayOfTheMonth.at.type == "asterisk" &&
        cron.month.type == "asterisk" &&
        isAny(cron.dayOfWeek)
    )
        return {
            type: "daily",
            minutes: cron.minutes.value,
            hours: cron.hours.value,
            dayInterval: cron.dayOfTheMonth.every.value
        };
    if (
        cron.minutes.type == "number" &&
        cron.hours.type == "number" &&
        isAny(cron.dayOfTheMonth) &&
        cron.month.type == "asterisk" &&
        cron.dayOfWeek.type == "setOfDays"
    )
        return {
            type: "weekly",
            minutes: cron.minutes.value,
            hours: cron.hours.value,
            days: cron.dayOfWeek.days
        };
    if (
        cron.minutes.type == "number" &&
        cron.hours.type == "number" &&
        cron.dayOfTheMonth.type == "number" &&
        cron.month.type == "cronNumber" &&
        cron.month.at.type == "asterisk" &&
        isAny(cron.dayOfWeek)
    )
        return {
            type: "monthly",
            minutes: cron.minutes.value,
            hours: cron.hours.value,
            day: cron.dayOfTheMonth.value,
            monthInterval: cron.month.every.value
        };

    return advanced;
};
