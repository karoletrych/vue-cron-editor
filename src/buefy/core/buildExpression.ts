import {
    CronOptions,
    UiState,
    aliasToNumberMapping
} from "./expressionCommons";

export type TabKey = UiState[keyof UiState];

export function isStateValid(e: UiState) {
    if (e.type == "weekly" && e.days.length == 0) return false;
    else return true;
}

function toDayNumber(alias: string): number {
    let number = aliasToNumberMapping[alias];
    if (number == undefined) {
        throw new Error("unhandled alias " + alias);
    }
    return number;
}

export const buildExpression = (
    cronOptions: CronOptions,
    state: UiState
): string => {
    let mainPart = buildExpressionMainPart(cronOptions, state);
    return cronOptions.useSeconds ? "0 " + mainPart : mainPart;
};

const buildExpressionMainPart = (
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
