import {
    parseExpression,
} from "../../src/buefy/core/parseExpression";
import { basicPreset } from '@/buefy/core/expressionCommons';


test("parse minutes expression", () => {
    expect(parseExpression(basicPreset, "*/4 * * * *")).toStrictEqual(
        {
            type: "minutes",
            minuteInterval: 4
        });
});

test("parse week expression", () => {
    expect(parseExpression(basicPreset, "4 4 * * 0,2,3,5")).toStrictEqual({
        type: "weekly",
        hours: 4,
        minutes: 4,
        days: ["0", "2", "3", "5"]
    });
});

test("parse all week days expression", () => {
    expect(parseExpression(basicPreset, "4 4 * * 0,1,2,3,4,5,6")).toStrictEqual({
            type: "weekly",
            hours: 4,
            minutes: 4,
            days: ["0", "1", "2", "3", "4", "5", "6"]
        }
    );
});
