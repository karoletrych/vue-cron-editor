import { parseExpression } from "../src/components/calculateExpression";

test("parse week expression", () => {
    expect(parseExpression("4 4 * * 0,2,3,5")).toBe({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["0", "2", "3", "5"]
    });
});
