import { parseExpression } from "../../src/core/cronExpressions";

test("parse week expression", () => {
    expect(parseExpression("4 4 * * 0,2,3,5")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["0", "2", "3", "5"]
    });
});
