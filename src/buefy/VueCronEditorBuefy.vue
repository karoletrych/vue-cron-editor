<template>
    <div class="enable-bulma">
        <b-tabs v-model="activeTab" @input="reset">
            <b-tab-item :value="0" :label="_$t('minutes')" class="minutes-tab">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ _$t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.minuteInterval"
                        />
                        <span class="centered-text">{{ _$t("mminutes") }}</span>
                    </b-field>
                </div>
            </b-tab-item>
            <b-tab-item :value="1" :label="_$t('hourly')" class="hourly-tab">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ _$t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.hourInterval"
                        />
                        <span class="centered-text">{{
                            _$t("hoursOnMinute")
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

            <b-tab-item :value="2" :label="_$t('daily')" class="daily-tab">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ _$t("every") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.dayInterval"
                        />
                        <span class="centered-text">{{ _$t("daysAt") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                            :value="dateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="3" :label="_$t('weekly')" class="weekly-tab">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ _$t("everyDay") }}</span>
                        <div class="centered-checkbox-group">
                            <b-checkbox
                                v-model="editorData.days"
                                native-value="SUN"
                            >
                                {{ _$t("sun") }}
                            </b-checkbox>
                            <b-checkbox
                                v-model="editorData.days"
                                native-value="MON"
                            >
                                {{ _$t("mon") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="TUE"
                            >
                                {{ _$t("tue") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="WED"
                            >
                                {{ _$t("wed") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="THU"
                            >
                                {{ _$t("thu") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="FRI"
                            >
                                {{ _$t("fri") }}
                            </b-checkbox>

                            <b-checkbox
                                v-model="editorData.days"
                                native-value="SAT"
                            >
                                {{ _$t("sat") }}
                            </b-checkbox>
                        </div>
                        <span class="centered-text">{{ _$t("at") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                            :value="dateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item :value="4" :label="_$t('monthly')" class="monthly-tab">
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{ _$t("onThe") }}</span>
                        <b-numberinput
                            :controls="false"
                            v-model="editorData.day"
                        />

                        <span class="centered-text">{{
                            _$t("dayOfEvery")
                        }}</span>
                        <b-numberinput
                            :min="1"
                            :max="12"
                            v-model="editorData.monthInterval"
                            :controls="false"
                        />

                        <span class="centered-text">{{ _$t("monthsAt") }}</span>
                        <b-timepicker
                            icon="clock"
                            editable
                            @input="setDateTime"
                            :value="dateTime"
                        />
                    </b-field>
                </div>
            </b-tab-item>

            <b-tab-item
                v-if="isAdvancedTabVisible"
                :value="5"
                :label="_$t('advanced')"
                class="advanced-tab"
            >
                <div class="card">
                    <b-field>
                        <span class="centered-text">{{
                            _$t("cronExpression")
                        }}</span>
                        <b-input v-model="editorData.cronExpression"></b-input>
                        <span class="centered-text">{{ explanation }}</span>
                    </b-field>
                </div>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import vueCronEditorMixin from "./core/vueCronEditorMixin";
import { BField } from "buefy/dist/components/field";
import { BInput } from "buefy/dist/components/input";
import { BTabs, BTabItem } from "buefy/dist/components/tabs";
import { BTimepicker } from "buefy/dist/components/timepicker";
import { BNumberinput } from "buefy/dist/components/numberinput";
import { BCheckbox } from "buefy/dist/components/checkbox";

export default {
    name: "VueCronEditorBuefy",
    mixins: [vueCronEditorMixin],
    components: {
        BField,
        BInput,
        BTabs,
        BTabItem,
        BTimepicker,
        BNumberinput,
        BCheckbox
    },
    data: () => ({
        activeTab: null,
        tabs: [
            { id: 0, key: "minutes" },
            { id: 1, key: "hourly" },
            { id: 2, key: "daily" },
            { id: 3, key: "weekly" },
            { id: 4, key: "monthly" },
            { id: 5, key: "advanced" }
        ]
    }),
    mounted() {
        this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
    },
    watch: {
        currentTab() {
            this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
        }
    },
    computed: {
        dateTime() {
            let dateTime = new Date();
            dateTime.setHours(this.editorData.hours);
            dateTime.setMinutes(this.editorData.minutes);
            return dateTime;
        }
    },
    methods: {
        reset(e) {
            const tabKey = this.tabs.find(t => t.id === e).key;
            this._resetToTab(tabKey);
        },
        setDateTime(e) {
            if (e == null) {
                return;
            }
            this.editorData.hours = e.getHours();
            this.editorData.minutes = e.getMinutes();
        }
    }
};
</script>

<style lang="scss">
.enable-bulma {
    .control {
        display: flex;
        align-items: center;
    }

    .centered-text {
        padding-left: 16px;
        padding-right: 16px;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: flex;
    }

    .centered-checkbox-group {
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-wrap: wrap;
        display: flex;
    }

    @import "~bulma/sass/utilities/functions";

    $primary: #3273dc;
    $primary-invert: findColorInvert($primary);

    @import "~bulma";
    @import "~buefy/src/scss/buefy";
}
</style>
