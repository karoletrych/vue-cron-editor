/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

import * as cronValidator from "cron-validator";
import * as cronstrue from "cronstrue/i18n";
import { createI18n, toCronstrueLocale } from "./i18n";

import Vue, { computed, ref, toRefs, watch } from "vue";
import { defineEmits } from 'vue'

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


export default Vue.defineComponent({
    props: {
        value: { type: String, default: "*/1 * * * *" },
        visibleTabs: {
            type: Array as PropType<string[]>,
            default: () => [
                "minutes",
                "hourly",
                "daily",
                "weekly",
                "monthly",
                "advanced"
            ]
        },
        preserveStateOnSwitchToAdvanced: { type: Boolean, default: false },
        locale: { type: String, default: "en" },
        customLocales: { type: Object, default: null },
        cronSyntax: { type: String as PropType<string>, default: "basic" }
    },
    setup(props) {

        const emit = defineEmits(['input'])

        const { locale, value, cronSyntax } = toRefs(props)

        const innerValue = ref<string | null>("*/1 * * * *");
        const editorData = ref(Object.assign({}, initialData.minutes));
        const currentTab = ref("minutes");
        const i18n = ref<Record<string, string> | null>(null);

        i18n.value = createI18n(props.customLocales, props.locale);
        innerValue.value = props.value;
        __loadDataFromExpression();

        function _$t(key: string) {
            return i18n.value![key];
        }
        function __loadDataFromExpression() {
            const tabData = parseExpression(props.value);
            if (!props.visibleTabs.includes(tabData.type)) {
                editorData.value = {
                    type: "advanced",
                    cronExpression: props.value
                };
                currentTab.value = "advanced";
                return;
            }
            editorData.value = { ...tabData };
            currentTab.value = tabData.type;
        }
        function __updateCronExpression(state: UiState) {
            if (!isStateValid(state)) {
                innerValue.value = null;
                emit("input", null);
                return;
            }
            const cronExpression = buildExpression(
                props.cronSyntax as CronSyntax,
                {
                    ...state
                }
            );
            if (!_isValidExpression(cronExpression)) {
                innerValue.value = null;
                emit("input", null);
                return;
            }
            innerValue.value = cronExpression;
            emit("input", cronExpression);
        }

        function _isValidExpression(cronExpression: string) {
            const options =
                props.cronSyntax == "quartz"
                    ? {
                        seconds: true,
                        allowBlankDay: true,
                        alias: true
                    }
                    : undefined;
            return cronValidator.isValidCron(cronExpression, options);
        }
        function _resetToTab(tabKey: TabKey) {
            currentTab.value = tabKey;
            if (props.preserveStateOnSwitchToAdvanced && tabKey === "advanced") {
                editorData.value = {
                    type: "advanced",
                    cronExpression: innerValue.value as string
                };
                return;
            }

            editorData.value = Object.assign({}, initialData[tabKey]);
            __updateCronExpression(initialData[tabKey]);
        }

        watch(locale, () => {
            i18n.value = createI18n(props.customLocales, props.locale);
        });


        watch(value, () => {
            if (value.value == innerValue.value) {
                return;
            }
            __loadDataFromExpression();
        });

        watch(cronSyntax, () => {
            __updateCronExpression(
                JSON.parse(JSON.stringify(editorData.value))
            );
        });
        watch(editorData, (changedData) => {
            const nonReactiveData = JSON.parse(JSON.stringify(changedData));
            __updateCronExpression(nonReactiveData);
        },
            { deep: true });

        const explanation = computed(() => {
            if (!innerValue.value) return "";

            const cronstrueLocale = toCronstrueLocale(props.locale);
            return (cronstrue as any).toString(innerValue.value, {
                locale: cronstrueLocale
            });
        })

    }
})

