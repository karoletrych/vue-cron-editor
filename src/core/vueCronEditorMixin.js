/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

import { buildExpression, parseExpression } from "./cronExpressions.ts";
import { isValidCron } from "cron-validator";

const initialData = {
    initialTab: "",
    minutes: {
        minuteInterval: 1
    },
    hourly: {
        minutes: 0,
        hourInterval: 1
    },
    daily: {
        minutes: 0,
        hours: 0,
        dayInterval: 1
    },
    weekly: {
        minutes: 0,
        hours: 0,
        days: ["1"]
    },
    monthly: {
        hours: 0,
        minutes: 0,
        day: 1,
        monthInterval: 1
    },
    advanced: {
        cronExpression: ""
    }
};

export default {
    created() {
        this._loadDataFromExpression();
    },
    props: {
        value: { type: String, default: "*/1 * * * *" }
    },
    data() {
        return {
            editorData: Object.assign({}, initialData.minutes),
            currentTab: ""
        };
    },
    methods: {
        _loadDataFromExpression() {
            const tabData = parseExpression(this.value);
            this.$data.editorData = { ...tabData };
            this.currentTab = tabData.type;
        },
        _updateCronExpr(event, type) {
            const cronExpression = buildExpression({
                ...event,
                type: type
            });

            if (isValidCron(cronExpression)) {
                this.$emit("input", cronExpression);
            }
            else {
                this.$emit("input", null);
            }
        },
        resetToTab(tabKey) {
            this.$data.editorData = Object.assign({}, initialData[tabKey]);
            this.currentTab = tabKey;
            this._updateCronExpr(initialData[tabKey], tabKey);
        }
    },
    watch: {
        value: {
            handler() {
                this._loadDataFromExpression();
            }
        },
        editorData: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, this.currentTab);
            }
        }
    }
};
