import * as fc from "fast-check";

const zero2sixty = fc.integer(0, 59);
const one2twentyThree = fc.integer(1, 23);
const one2ThirtyOne = fc.integer(1, 31);
const one2Twelve = fc.integer(1, 12);
const one2safeInteger = fc.integer(1, Number.MAX_SAFE_INTEGER);

const arrayOfDays = fc.set(
    fc.oneof(
        fc.constant("MON"),
        fc.constant("TUE"),
        fc.constant("WED"),
        fc.constant("THU"),
        fc.constant("FRI"),
        fc.constant("SAT"),
        fc.constant("SUN")
    ),
    { minLength: 1, maxLength: 7 }
);

const minutesStateArbitrary = fc.record({
    type: fc.constant("minutes"),
    minuteInterval: one2safeInteger
});

const hourlyStateArbitrary = fc.record({
    type: fc.constant("hourly"),
    minutes: zero2sixty,
    hourInterval: one2twentyThree
});

const dailyStateArbitrary = fc.record({
    type: fc.constant("daily"),
    minutes: zero2sixty,
    hours: one2twentyThree,
    dayInterval: one2safeInteger
});

const weeklyStateArbitrary = fc.record({
    type: fc.constant("weekly"),
    minutes: zero2sixty,
    hours: one2twentyThree,
    days: arrayOfDays
});

const monthlyStateArbitrary = fc.record({
    type: fc.constant("monthly"),
    minutes: zero2sixty,
    hours: one2twentyThree,
    day: one2ThirtyOne,
    monthInterval: one2Twelve
});

export const state = fc.oneof(
    minutesStateArbitrary,
    hourlyStateArbitrary,
    dailyStateArbitrary,
    weeklyStateArbitrary,
    monthlyStateArbitrary
);
