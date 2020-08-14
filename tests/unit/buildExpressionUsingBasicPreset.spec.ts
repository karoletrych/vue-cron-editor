import * as cronValidator from "cron-validator";
import * as cronExpressions from "../../src/buefy/core/cronExpressions";
import * as fc from "fast-check";
import { pre, Arbitrary, array } from "fast-check";



const zero2sixty = fc.integer(0, 59);
const zero2twentyThree = fc.integer(0, 23);
const one2ThirtyOne = fc.integer(1, 31);
const one2Twelve = fc.integer(1, 12);
const one2safeInteger = fc.integer(1, Number.MAX_SAFE_INTEGER);

const array0to6 = fc.set(fc.integer(0, 6), 1, 7);

const minutesEventArbitrary = fc.record({
    type: fc.constant("minutes"),
    minuteInterval: one2safeInteger
});

const hourlyEventArbitrary = fc.record({
    type: fc.constant("hourly"),
    minutes: zero2sixty,
    hourInterval: zero2twentyThree
});

const dailyEventArbitrary = fc.record({
    type: fc.constant("daily"),
    minutes: zero2sixty,
    hours: zero2twentyThree,
    dayInterval: one2safeInteger
});

const weeklyEventArbitrary = fc.record({
    type: fc.constant("weekly"),
    minutes: zero2sixty,
    hours: zero2twentyThree,
    days: array0to6
});

const monthlyEventArbitrary = fc.record({
    type: fc.constant("monthly"),
    minutes: zero2sixty,
    hours: zero2twentyThree,
    day: one2ThirtyOne,
    monthInterval: one2Twelve
});

const event = fc.oneof(
    minutesEventArbitrary,
    hourlyEventArbitrary,
    dailyEventArbitrary,
    weeklyEventArbitrary,
    monthlyEventArbitrary
);

test("builds only valid expressions", () => {
    fc.assert(
        fc.property(event, e => {
            let event = (e as cronExpressions.TabUpdatedEvent);

            let expr = cronExpressions.buildExpression(
                event);

            let isValid =  cronValidator.isValidCron(expr);
            if (!isValid) {
                console.log(JSON.stringify(e));
                console.log(expr);
            }
            return isValid;
        })
    );
});
