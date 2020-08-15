import * as cronValidator from "cron-validator";
import * as cronExpressions from "../../../src/buefy/core/cronExpressions";
import * as fc from "fast-check";
import { pre, Arbitrary, array, option } from "fast-check";
import { state } from "./aribitraries";

declare type CronValidatorOptions = {
    alias: boolean;
    seconds: boolean;
    allowBlankDay: boolean;
};
const validateResult = (
    state: cronExpressions.UiState,
    expr: string,
    options?: Partial<CronValidatorOptions>
) => {
    let isValid = cronValidator.isValidCron(expr, options);
    if (!isValid) {
        console.log(JSON.stringify(expr));
        console.log(expr);
        return false;
    }

    const parsed = cronExpressions.parseExpression(
        cronExpressions.basicPreset,
        expr
    );
    if (parsed.type != state.type) {
        console.log(
            `expected to parse as ${state.type} but was ${parsed.type}`
        );
        return false;
    }

    return true;
};

test("with basic preset", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as cronExpressions.UiState;

            let expr = cronExpressions.buildExpression(
                cronExpressions.basicPreset,
                state
            );

            validateResult(state, expr);
        })
    );
});

test("when aliasing week days", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as cronExpressions.UiState;
            cronExpressions.basicPreset.aliasDayOfWeek = true;

            let expr = cronExpressions.buildExpression(
                {
                    ...cronExpressions.basicPreset,
                    aliasDayOfWeek: true
                },
                state
            );

            validateResult(state, expr, { alias: true });
        })
    );
});
