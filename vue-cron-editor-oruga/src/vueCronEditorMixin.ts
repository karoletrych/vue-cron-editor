/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

 import * as cronValidator from "cron-validator";
 import * as cronstrue from "cronstrue/i18n";
 import { createI18n, toCronstrueLocale } from "./i18n";
 
 import Vue from "vue";
 import { UiState, CronSyntax } from "./expressionCommons";
 import { parseExpression } from "./parseExpression";
 import { buildExpression, TabKey, isStateValid } from "./buildExpression";
import { PropType } from "vue";
 
 const initialData: Record<TabKey, UiState> = {
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
         days: ["MON"]
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
     editorData: UiState;
     currentTab: TabKey;
     innerValue: string | null;
     i18n: Record<string, string> | null;
 }
 
 export default Vue.defineComponent({
     created() {
         this.i18n = createI18n(this.customLocales, this.locale);
         this.innerValue = this.value;
         this.__loadDataFromExpression();
     },
     props: {
         value: { type: String as PropType<string>, default: "*/1 * * * *" },
         visibleTabs: {
             type: Array,
             default() {
                 return [
                     "minutes",
                     "hourly",
                     "daily",
                     "weekly",
                     "monthly",
                     "advanced"
                 ];
             }
         },
         preserveStateOnSwitchToAdvanced: { type: Boolean, default: false },
         locale: { type: String, default: "en" },
         customLocales: { type: Object, default: null },
         cronSyntax: { type: String as PropType<string>, default: "basic" }
     },
     data() {
         return <ComponentData>{
             innerValue: "*/1 * * * *",
             editorData: Object.assign({}, initialData.minutes),
             currentTab: "minutes",
             i18n: null
         };
     },
     computed: {
         explanation(): string {
             if (!this.innerValue) return "";
 
             const cronstrueLocale = toCronstrueLocale(this.locale);
             return (cronstrue as any).toString(this.innerValue, {
                 locale: cronstrueLocale
             });
         }
     },
     methods: {
         _$t(key: string) {
             return this.i18n![key];
         },
         __loadDataFromExpression() {
             const tabData = parseExpression(this.value);
             if (!this.visibleTabs.includes(tabData.type)) {
                 this.editorData = {
                     type: "advanced",
                     cronExpression: this.value
                 };
                 this.currentTab = "advanced";
                 return;
             }
             this.editorData = { ...tabData };
             this.currentTab = tabData.type;
         },
         __updateCronExpression(state: UiState) {
             if (!isStateValid(state)) {
                 this.innerValue = null;
                 this.$emit("input", null);
                 return;
             }
 
             const cronExpression = buildExpression(
                 this.cronSyntax as CronSyntax,
                 {
                     ...state
                 }
             );
 
             if (!this._isValidExpression(cronExpression)) {
                 this.innerValue = null;
                 this.$emit("input", null);
                 return;
             }
             this.innerValue = cronExpression;
             this.$emit("input", cronExpression);
         },
         _isValidExpression(cronExpression: string) {
             const options =
                 this.cronSyntax == "quartz"
                     ? {
                           seconds: true,
                           allowBlankDay: true,
                           alias: true
                       }
                     : undefined;
             return cronValidator.isValidCron(cronExpression, options);
         },
         _resetToTab(tabKey: TabKey) {
             this.currentTab = tabKey;
             if (this.preserveStateOnSwitchToAdvanced && tabKey === "advanced") {
                 this.editorData = {
                     type: "advanced",
                     cronExpression: this.innerValue as string
                 };
                 return;
             }
 
             this.editorData = Object.assign({}, initialData[tabKey]);
             this.__updateCronExpression(initialData[tabKey]);
         }
     },
     watch: {
         locale() {
             this.i18n = createI18n(this.customLocales, this.locale);
         },
         value: {
             handler() {
                 if (this.value == this.innerValue) {
                     return;
                 }
                 this.__loadDataFromExpression();
             }
         },
         cronSyntax() {
             this.__updateCronExpression(
                 JSON.parse(JSON.stringify(this.editorData))
             );
         },
         editorData: {
             deep: true,
             handler(changedData) {
                 const nonReactiveData = JSON.parse(JSON.stringify(changedData));
                 this.__updateCronExpression(nonReactiveData);
             }
         }
     }
 });
 