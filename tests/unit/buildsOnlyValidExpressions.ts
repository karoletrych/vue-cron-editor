import * as cronValidator from "cron-validator";
import * as cronExpressions from "../../src/buefy/core/cronExpressions";
import * as fc from "fast-check";
import { pre, Arbitrary, array, option } from "fast-check";

const zero2sixty = fc.integer(0, 59);
const zero2twentyThree = fc.integer(0, 23);
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
    1,
    7
);

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
    days: arrayOfDays
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


const validateResult = (expr: string, options? : cronValidator.Options) =>
{
    let isValid = cronValidator.isValidCron(expr, options);
    if (!isValid) {
        console.log(JSON.stringify(expr));
        console.log(expr);
    }
    return isValid;
}

test("with basic preset", () => {
    fc.assert(
        fc.property(event, e => {
            let event = e as cronExpressions.TabUpdatedEvent;

            let expr = cronExpressions.buildExpression(
                cronExpressions.basicPreset,
                event
            );

            validateResult(expr);
        })
    );
});

test("when aliasing week days", () => {
    fc.assert(
        fc.property(event, e => {
            let event = e as cronExpressions.TabUpdatedEvent;
            cronExpressions.basicPreset.aliasDayOfWeek = true;

            let expr = cronExpressions.buildExpression(
                {
                    ...cronExpressions.basicPreset,
                    aliasDayOfWeek: true
                },
                event
            );

            let isValid = cronValidator.isValidCron(expr, {
                alias: true
            });
            validateResult(expr, {);
        })
    );
});
