/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

import {
    buildExpression,
    parseExpression,
    TabUpdatedEvent,
    TabKey
} from "./cronExpressions";
import { isValidCron } from "cron-validator";
import Vue from "vue";

const initialData: Record<TabKey, TabUpdatedEvent> = {
    minutes: {
        type: "minutes",
        minuteInterval: 1
    },
    hourly: {
        type: "hourly",
        minutes: 0,
        hourInterval: 1
    },
    daily: {
        type: "daily",
        minutes: 0,
        hours: 0,
        dayInterval: 1
    },
    weekly: {
        type: "weekly",
        minutes: 0,
        hours: 0,
        days: ["1"]
    },
    monthly: {
        type: "monthly",
        hours: 0,
        minutes: 0,
        day: 1,
        monthInterval: 1
    },
    advanced: {
        type: "advanced",
        cronExpression: ""
    }
};

interface ComponentData {
    editorData: Object;
    currentTab: TabKey;
    innerValue: string | null;
}

export default Vue.extend({
    created() {
        this.innerValue = this.value;
        this._loadDataFromExpression();
    },
    props: {
        value: { type: String, default: "*/1 * * * *" },
        isAdvancedTabVisible: { type: Boolean, default: true },
        preserveStateOnSwitchToAdvanced: { type: Boolean, default: false }
    },
    data() {
        return <ComponentData>{
            innerValue: "*/1 * * * *",
            editorData: Object.assign({}, initialData.minutes),
            currentTab: "minutes"
        };
    },
    methods: {
        _loadDataFromExpression() {
            const tabData = parseExpression(this.value);
            this.$data.editorData = { ...tabData };

            this.currentTab = tabData.type;
        },
        _updateCronExpression(event: TabUpdatedEvent) {
            const cronExpression = buildExpression({
                ...event
            });

            if (isValidCron(cronExpression)) {
                this.innerValue = cronExpression;
                this.$emit("input", cronExpression);
            } else {
                this.innerValue = null;
                this.$emit("input", null);
            }
        },
        resetToTab(tabKey: TabKey) {
            this.currentTab = tabKey;
            if (this.preserveStateOnSwitchToAdvanced && tabKey === "advanced") {
                this.$data.editorData = {
                    type: "advanced",
                    cronExpression: this.innerValue
                };
                return;
            }

            this.$data.editorData = Object.assign({}, initialData[tabKey]);
            this._updateCronExpression(initialData[tabKey]);
        }
    },
    watch: {
        value: {
            handler() {
                if (this.value == this.innerValue) {
                    return;
                }
                this._loadDataFromExpression();
            }
        },
        editorData: {
            deep: true,
            handler(changedData) {
                this._updateCronExpression(changedData);
            }
        }
    }
});
