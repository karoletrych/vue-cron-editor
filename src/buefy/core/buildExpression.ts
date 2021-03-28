import { UiState, CronSyntax } from "./expressionCommons";
import { toDayNumber, toDayAlias } from "./dayAliases";

export type TabKey = UiState[keyof UiState];

export function isStateValid(e: UiState) {
    if (e.type == "weekly" && e.days.length == 0) return false;
    else return true;
}

export const buildExpression = (syntax: CronSyntax, state: UiState): string => {
    if (syntax == "basic") {
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
            let days = state.days
                .map(d => toDayNumber(d).toString())
                .sort()
                .join(",");
            return `${state.minutes} ${state.hours} * * ${days}`;
        }
        if (state.type === "monthly") {
            return `${state.minutes} ${state.hours} ${state.day} */${state.monthInterval} *`;
        }
        if (state.type === "advanced") {
            return state.cronExpression;
        }
        throw `unknown event type: ${state}`;
    } else if (syntax === "quartz") {
        if (state.type === "minutes") {
            return `0 0/${state.minuteInterval} * * * ?`;
        }
        if (state.type === "hourly") {
            return `0 ${state.minutes} 0/${state.hourInterval} * * ?`;
        }
        if (state.type === "daily") {
            return `0 ${state.minutes} ${state.hours} */${state.dayInterval} * ?`;
        }
        if (state.type === "weekly") {
            let days = state.days
                .map(d => toDayNumber(d))
                .sort()
                .map(d => toDayAlias(d))
                .join(",");
            return `0 ${state.minutes} ${state.hours} ? * ${days}`;
        }
        if (state.type === "monthly") {
            return `0 ${state.minutes} ${state.hours} ${state.day} */${state.monthInterval} ?`;
        }
        if (state.type === "advanced") {
            return state.cronExpression;
        }
        throw `unknown event type: ${state}`;
    }
    throw `unknown syntax: ${syntax}`;
};
