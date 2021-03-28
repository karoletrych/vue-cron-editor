import * as cronValidator from "cron-validator";
import cronValidate from "cron-validate";
import * as cronExpressions from "../../../src/buefy/core/buildExpression";
import * as fc from "fast-check";
import { state } from "./aribitraries";
import { parseExpression } from "@/buefy/core/parseExpression";
import { UiState } from "@/buefy/core/expressionCommons";

declare type CronValidatorOptions = {
    alias: boolean;
    seconds: boolean;
    allowBlankDay: boolean;
};
const isResultValid = (
    state: UiState,
    expr: string,
    options?: Partial<CronValidatorOptions>
) => {
    let isValid = cronValidator.isValidCron(expr, options);
    let isValid2 = cronValidate(expr);

    if (!isValid || !isValid2) {
        console.log(
            "Invalid expression produced: " +
                expr +
                " for state " +
                JSON.stringify(state)
        );
        return false;
    }

    try {
        const parsed = parseExpression(expr);
        if (parsed.type != state.type) {
            console.log(
                `expected to parse ${JSON.stringify(state)} -> ${expr} as ${
                    state.type
                } but was ${parsed.type}`
            );
            return false;
        }
    } catch (e) {
        console.log(
            "Cannot parse produced expression: " +
                expr +
                " for state " +
                JSON.stringify(state)
        );
        throw e;
    }

    return true;
};
const quartzOptions = {
    seconds: true,
    allowBlankDay: true,
    alias: true
};

test("with basic syntax", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as UiState;

            let expr = cronExpressions.buildExpression("basic", state);

            return isResultValid(state, expr);
        })
    );
});

test("when aliasing week days", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as UiState;
            let expr = cronExpressions.buildExpression("quartz", state);

            return isResultValid(state, expr, quartzOptions);
        })
    );
});

test("with seconds", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as UiState;
            let expr = cronExpressions.buildExpression("quartz", state);

            return isResultValid(state, expr, quartzOptions);
        })
    );
});
