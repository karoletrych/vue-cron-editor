import { parseExpression } from "../../src/buefy/core/cronExpressions";

test("parse week expression", () => {
    expect(parseExpression("4 4 * * 0,2,3,5")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["0", "2", "3", "5"]
    });
});

test("parse all week days expression", () => {
    expect(parseExpression("4 4 * * 0,1,2,3,4,5,6")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["0", "1", "2", "3", "4", "5", "6"]
    });
});
