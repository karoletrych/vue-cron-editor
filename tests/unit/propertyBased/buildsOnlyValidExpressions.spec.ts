import * as cronValidator from "cron-validator";
import cronValidate from "cron-validate";
import * as cronExpressions from "../../../src/buefy/core/buildExpression";
import * as fc from "fast-check";
import { pre, Arbitrary, array, option } from "fast-check";
import { state } from "./aribitraries";
import { parseExpression } from '@/buefy/core/parseExpression';
import { basicPreset, UiState } from '@/buefy/core/expressionCommons';

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
        console.log(JSON.stringify(expr));
        console.log(expr);
        return false;
    }

    const parsed = parseExpression(
        basicPreset,
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
            let state = e as UiState;

            let expr = cronExpressions.buildExpression(
                basicPreset,
                state
            );

            return isResultValid(state, expr);
        })
    );
});

test("when aliasing week days", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as UiState;
            basicPreset.aliasDayOfWeek = true;

            let expr = cronExpressions.buildExpression(
                {
                    ...basicPreset,
                    aliasDayOfWeek: true
                },
                state
            );

            return isResultValid(state, expr, { alias: true });
        })
    );
});

test("with seconds", () => {
    fc.assert(
        fc.property(state, e => {
            let state = e as UiState;
            basicPreset.aliasDayOfWeek = true;

            let expr = cronExpressions.buildExpression(
                {
                    ...basicPreset,
                    aliasDayOfWeek: true,
                    useSeconds: true
                },
                state
            );

            return isResultValid(state, expr, { alias: true, seconds: true });
        })
    );
});
