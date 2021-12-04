export const aliasToNumberMapping: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
};

export function toDayNumber(alias: string): number {
    const number = aliasToNumberMapping[alias];
    if (number == undefined) {
        throw new Error("unhandled alias " + alias);
    }
    return number;
}

export function toDayAlias(num: number): string {
    const alias = Object.keys(aliasToNumberMapping).find(
        k => aliasToNumberMapping[k] === num
    );
    if (alias == undefined) {
        throw new Error(`unhandled number ${num}`);
    }
    return alias;
}

export function isDayAlias(s: string): boolean {
    return Object.keys(aliasToNumberMapping).includes(s);
}
