import {
    CronOptions,
    UiState,
    aliasToNumberMapping
} from "./expressionCommons";

function toDayAlias(num: number): string {
    let alias = Object.keys(aliasToNumberMapping).find(
        k => aliasToNumberMapping[k] === num
    );
    if (alias == undefined) {
        throw new Error(`unhandled number ${num}`);
    }
    return alias;
}

function isDayAlias(s: string): boolean {
    return Object.keys(aliasToNumberMapping).includes(s);
}

export const parseExpression = (
    options: CronOptions,
    expression: string
): UiState => {
    const advanced: UiState = {
        type: "advanced",
        cronExpression: expression
    };
    const groups = expression.split(" ");
    if (groups.length != 5 && groups.length != 6) {
        return advanced;
    }

    function parseSeconds(expr: string): number {
        return parseInt(expr);
    }
    function parseMinutes(expr: string) {
        expr.match(/\*\/(\d+)/);
    }
    function parseHours(expr: string) {}
    function parseMonth(expr: string) {}
    function parseDayOfWeek(expr: string): string[] {
        let groups = expr.match(
            /([a-zA-Z0-9]+)(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)/
        );
        if (groups == null) throw new Error(`invalid days expression ${expr}`);
        return groups
            .map(d => d && d.replace(/,/, ""))
            .filter(d => d)
            .map(d =>
                options.aliasDayOfWeek && !isDayAlias(d)
                    ? toDayAlias(parseInt(d))
                    : d
            );
    }
    function parseDays(expr: string) {}

    const parsed =
        groups.length == 6
            ? {
                  seconds: parseSeconds(groups[0]),
                  minutes: parseMinutes(groups[1]),
                  hours: parseHours(groups[2]),
                  days: parseDays(groups[3]),
                  month: parseMonth(groups[4]),
                  daysOfWeek: parseDayOfWeek(groups[4])
              }
            : {
                  minutes: parseMinutes(groups[0]),
                  hours: parseHours(groups[1]),
                  days: parseDays(groups[2]),
                  month: parseMonth(groups[3]),
                  daysOfWeek: parseDayOfWeek(groups[4])
              };

    // if ((groups = expression.match(/^\*\/(\d+) \* \* \* \*$/))) {
    //     return {
    //         type: "minutes",
    //         minuteInterval: Number(groups[1])
    //     };
    // }
    // if ((groups = expression.match(/^(\d +) \*\/(\d+) \* \* \*$/))) {
    //     return {
    //         type: "hourly",
    //         minutes: Number(groups[1]),
    //         hourInterval: Number(groups[2])
    //     };
    // }
    // if ((groups = expression.match(/^(\d+) (\d+) \*\/(\d+) \* \*$/))) {
    //     return {
    //         type: "daily",
    //         minutes: Number(groups[1]),
    //         hours: Number(groups[2]),
    //         dayInterval: Number(groups[3])
    //     };
    // }
    // if (
    //     (groups = expression.match(
    //         /^(\d+) (\d+) \* \* ([a-zA-Z0-9]+)(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?(,[a-zA-Z0-9]+)?$/
    //     ))
    // ) {
    //     const optionalDaysBeginIndex = 4;
    //     const matchesEndIndex = 10;
    //     return {
    //         type: "weekly",
    //         minutes: Number(groups[1]),
    //         hours: Number(groups[2]),
    //         days: [groups[3]].concat(
    //             groups
    //             .slice(optionalDaysBeginIndex, matchesEndIndex)
    //                  .map(d => d && d.replace(/,/, ""))
    //                 .filter(d => d)
    //                 .map(d =>
    //                     options.aliasDayOfWeek && !isDayAlias(d)
    //                          ? toDayAlias(parseInt(d))
    //                         : d
    //                 )
    //         )
    //     };
    // }
    // if ((groups = expression.match(/^(\d+) (\d+) (\d+) \*\/(\d+) \*$/))) {
    //     return {
    //         type: "monthly",
    //         minutes: Number(groups[1]),
    //         hours: Number(groups[2]),
    //         day: Number(groups[3]),
    //         monthInterval: Number(groups[4])
    //     };
    // }
    return advanced;
};
