<template>
    <div class="enable-bulma">
        <b-tabs v-model="activeTab" @change="reset">
            <b-tab-item :value="0" label="MINUTES">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ $t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.minuteInterval"
                        />
                        <span class="centered-text">{{ $t("minutes") }}</span>
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="1" label="HOURLY">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ $t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.hourInterval"
                        />
                        <span class="centered-text">{{
                            $t("hoursOnMinute")
                        }}</span>
                        <b-numberinput
                            :controls="false"
                            :min="0"
                            :max="59"
                            v-model="editorData.minutes"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="2" label="DAILY">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ $t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.dayInterval"
                        />
                        <span class="centered-text">{{ $t("daysAt") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="3" label="WEEKLY">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ $t("everyDay") }}</span>
                        <div class="centered-text">
                            <b-checkbox
                                v-model="editorData.days"
                                native-value="0"
                            >
                                {{ $t("sun") }}
                            </b-checkbox>
                            <b-checkbox
                                v-model="editorData.days"
                                native-value="1"
                            >
                                {{ $t("mon") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="2"
                            >
                                {{ $t("tue") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="3"
                            >
                                {{ $t("wed") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="4"
                            >
                                {{ $t("thu") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="5"
                            >
                                {{ $t("fri") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="6"
                            >
                                {{ $t("sat") }}
                            </b-checkbox>
                        </div>
                        <span class="centered-text">{{ $t("at") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="4" label="MONTHLY">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ $t("onThe") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.day"
                        />

                        <span class="centered-text">{{
                            $t("dayOfEvery")
                        }}</span>
                        <b-numberinput
                            :min="1"
                            :max="12"
                            v-model="editorData.monthInterval"
                            :controls="false"
                        />

                        <span class="centered-text">{{ $t("monthsAt") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="5" label="ADVANCED">
                <div class="card">
                    <b-field>
                        <b-input v-model="editorData.cronExpression"></b-input>
                    </b-field>
                </div>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import vueCronEditorMixin from "vue-cron-editor-core/dist/vueCronEditorMixin";
import defaultI18n from "vue-cron-editor-core/dist/i18n";


import Vue from "vue";
import Field from 'buefy/dist/components/field'
import Input from 'buefy/dist/components/input'
import Tabs from 'buefy/dist/components/tabs'
import Timepicker from 'buefy/dist/components/timepicker'
import NumberInput from 'buefy/dist/components/numberinput'
import Checkbox from 'buefy/dist/components/checkbox'
Vue.use(Field)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(Timepicker)
Vue.use(NumberInput)
Vue.use(Checkbox)



export default {
    name: "VueCronEditorBuefy",
    mixins: [vueCronEditorMixin],
    components: {},
    provide: function() {
        return {
            i18n: this.createI18n()
        };
    },
    props: {
        locale: { type: String, default: "en" },
        customLocales: { type: Object, default: null }
    },
    data: () => ({
        activeTab: null,
        tabsInitialized: false,
        i18n: null,
        tabs: [
            { id: 0, key: "minutes" },
            { id: 1, key: "hourly" },
            { id: 2, key: "daily" },
            { id: 3, key: "weekly" },
            { id: 4, key: "monthly" },
            { id: 5, key: "advanced" }
        ]
    }),
    created() {
        this.i18n = this.createI18n();
    },
    mounted() {
        this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
    },
    watch: {
        currentTab() {
            this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
        }
    },
    methods: {
        createI18n() {
            return defaultI18n.withRegisteredLocales(this.customLocales)[
                this.locale
            ];
        },
        reset(e) {
            if (!this.tabsInitialized) {
                this.tabsInitialized = true;
                return;
            }

            const tabKey = this.tabs.find(t => t.id === e).key;
            this.resetToTab(tabKey);
        },
        setDateTime(e) {
            if (e == null) {
                return;
            }
            this.editorData.hours = e.getHours();
            this.editorData.minutes = e.getMinutes();
        },
        $t(key) {
            return this.i18n[key];
        }
    }
};
</script>

<style lang="scss">
.enable-bulma {
    .centered-text {
        justify-content: center;
        padding-bottom: calc(0.375em - 1px);
        padding-left: 0.75em;
        padding-right: 0.75em;
        padding-top: calc(0.375em - 1px);
        text-align: center;
        display: flex;
    }

    @import "~bulma/sass/utilities/functions";

    $primary: #3273dc;
    $primary-invert: findColorInvert($primary);

    @import "~bulma";
    @import "~buefy/src/scss/buefy";

    .centered-text {
        justify-content: center;
        padding-bottom: calc(0.375em - 1px);
        padding-left: 0.75em;
        padding-right: 0.75em;
        padding-top: calc(0.375em - 1px);
        text-align: center;
    }
}
</style>
