import {
    calculateExpression,
    parseExpression,
    TabKey
} from "./calculateExpression";
import Vue from "vue";

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

export default Vue.extend({
    created() {
        this._loadDataFromExpression(this.value);
    },
    props: {
        value: { type: String, default: "*/1 * * * *" }
    },
    data() {
        return {
            editorData: Object.assign({}, initialData.minutes),
            currentTab: ""
        }
    },
    methods: {
        _loadDataFromExpression(expression: string) {
            const tabData = parseExpression(this.value);
            this.$data.editorData = { ...tabData };
            this.currentTab = tabData.type;
        },
        _updateCronExpr(event: any, type: TabKey) {
            const cronExpression = calculateExpression({
                ...event,
                type: type
            });
            this.$emit("input", cronExpression);
        },
        resetToTab(tabKey: TabKey) {
            this.$data.editorData = Object.assign({}, initialData[tabKey]);
            this.currentTab = tabKey;
            this._updateCronExpr(initialData[tabKey], tabKey);
        }
    },
    watch: {
        value() {
            this._loadDataFromExpression(this.value);
        },
        editorData: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, this.currentTab as TabKey);
            }
        }
    }
});
