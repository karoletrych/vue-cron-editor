import {
    UiState,
    aliasToNumberMapping,
    Preset
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
    preset: Preset,
    state: UiState
): string => {
    if (preset == "basic") {
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
            let days = state.days.map(d => toDayNumber(d).toString());
            return (
                `${state.minutes} ${state.hours} * * ` +
                `${days.sort().join()}`
            );
        }
        if (state.type === "monthly") {
            return `${state.minutes} ${state.hours} ${state.day} */${state.monthInterval} *`;
        }
        if (state.type === "advanced") {
            return state.cronExpression;
        }
    }
    else if (preset === "quartz") {
        if (state.type === "minutes") {
            return `0 */${state.minuteInterval} * * * *`;
        }
        if (state.type === "hourly") {
            return `0 ${state.minutes} */${state.hourInterval} * * *`;
        }
        if (state.type === "daily") {
            return `0 ${state.minutes} ${state.hours} */${state.dayInterval} * *`;
        }
        if (state.type === "weekly") {
            let days = state.days.map(d => toDayNumber(d).toString());
            return `0 ${state.minutes} ${state.hours} * * ${days.sort().join()}`;
        }
        if (state.type === "monthly") {
            return `0 ${state.minutes} ${state.hours} ${state.day} */${state.monthInterval} *`;
        }
        if (state.type === "advanced") {
            return state.cronExpression;
        }
    }
    
    throw `unknown event type: ${state}`;
};
