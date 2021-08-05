import { parseExpression } from "../../src/buefy/core/parseExpression";

test("parse minutes expression", () => {
    expect(parseExpression("*/4 * * * *")).toStrictEqual({
        type: "minutes",
        minuteInterval: 4
    });
});

test("parse quartz hours expression", () => {
    expect(parseExpression("0 0 0/1 * * ?")).toStrictEqual({
        type: "hourly",
        hourInterval: 1,
        minutes: 0
    });
});

test("parse week expression", () => {
    expect(parseExpression("4 4 * * 0,2,3,5")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["SUN", "TUE", "WED", "FRI"]
    });
});

test("parse all week days expression", () => {
    expect(parseExpression("4 4 * * 0,1,2,3,4,5,6")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    });
});
