<template>
    <div class="px-2">
        <v-tabs v-model="activeTab" @change="reset">
            <v-tab v-for="tab in tabs" :key="tab.key">{{ tab.key }}</v-tab>

            <v-tab-item :value="0">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">{{$t("every")}}</div>
                    <v-select
                        class="px-2"
                        bottom
                        v-model="editorData.minuteInterval"
                        :items="range(1, 59)"
                    />
                    <div class="px-2">{{$t("minutes")}}</div>
                </v-card>
            </v-tab-item>

            <v-tab-item :value="1">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">{{$t("every")}}</div>
                    <v-select
                        :items="range(1, 24)"
                        v-model="editorData.hourInterval"
                    />
                    <div class="px-2">{{$t("hoursOnMinute")}}</div>
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="2">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">{{$t("every")}}</div>
                    <v-select
                        :items="range(1, 30)"
                        v-model="editorData.dayInterval"
                    />
                    <div class="px-2">{{$t("daysAt")}}</div>
                    <v-select :items="range(0, 23)" v-model="editorData.hours" />
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="3">
                <v-card outlined class="d-inline-flex pa-2 align-center" tile>
                    <div class="px-2">{{$t("everyDay")}}</div>
                    <div class="d-inline-flex">
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('sun')"
                            value="0"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('mon')"
                            value="1"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('tue')"
                            value="2"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('wed')"
                            value="3"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('thu')"
                            value="4"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('fri')"
                            value="5"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            :label="$t('sat')"
                            value="6"
                        />
                    </div>
                    <div class="px-2">{{$t("at")}}</div>
                    <v-select :items="range(0, 23)" v-model="editorData.hours" />
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="4">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">{{$t("onThe")}}</div>
                    <v-select :items="range(1, 30)" v-model="editorData.day" />
                    <div class="px-2">{{$t("dayOfEvery")}}</div>
                    <v-select
                        :items="range(1, 12)"
                        v-model="editorData.monthInterval"
                    />
                    <div class="px-2">{{$t("monthsAt")}}</div>
                    <v-select :items="range(0, 23)" v-model="editorData.hours" />
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="5">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <v-text-field
                        v-model="editorData.cronExpression"
                    ></v-text-field>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import vueCronEditorMixin from "./vueCronEditorMixin";
import defaultI18n from "./i18n";

export default {
    name: "VueCronEditor",
    mixins: [vueCronEditorMixin],
    props: {
        locale: {type: String, default: "en"},
        customLocales: {type: Object, default: null},
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
        ],
        vTabsInitialized: false,
        i18n: null
    }),
    created(){
        this.i18n = defaultI18n.withRegisteredLocales(this.customLocales);
    },
    mounted() {
        this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
    },
    watch: {
        currentTab(){
            this.activeTab = this.tabs.find(t => t.key === this.currentTab).id;
        }
    },
    methods: {
        range(from, to) {
            return [...Array(to - from + 1).keys()].map(i => i + from);
        },
        reset(e) {
            if(e == 0 && !this.vTabsInitialized) // TODO: do it better
            {
                this.vTabsInitialized = true;
                return;
            }

            const tabKey = this.tabs.find(t => t.id === e).key;
            this.resetToTab(tabKey);
        },
        $t(key){
            return this.i18n[this.locale][key];
        }
    }
};
</script>

<style>
.inline {
    display: inline-flex;
}
</style>
