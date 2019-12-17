<template>
    <div class="px-2">
        <v-tabs v-model="activeTab" @change="reset">
            <v-tab v-for="tab in tabs" :key="tab.key">{{ tab.key }}</v-tab>

            <v-tab-item :value="0">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">Every</div>
                    <v-select
                        class="px-2"
                        bottom
                        v-model="editorData.minuteInterval"
                        :items="range(1, 59)"
                    />
                    <div class="px-2">minute(s)</div>
                </v-card>
            </v-tab-item>

            <v-tab-item :value="1">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">Every</div>
                    <v-select
                        :items="range(1, 24)"
                        v-model="editorData.hourInterval"
                    />
                    <div class="px-2">hour(s) on minute</div>
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="2">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">Every</div>
                    <v-select
                        :items="range(1, 30)"
                        v-model="editorData.dayInterval"
                    />
                    <div class="px-2">day(s) at</div>
                    <v-select :items="range(0, 23)" v-model="editorData.hours" />
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="3">
                <v-card outlined class="d-inline-flex pa-2 align-center" tile>
                    <div class="px-2">Every</div>
                    <div class="d-inline-flex">
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Sun"
                            value="0"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Mon"
                            value="1"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Tue"
                            value="2"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Wed"
                            value="3"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Thu"
                            value="4"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Fri"
                            value="5"
                        />
                        <v-checkbox
                            dense
                            class="px-1"
                            v-model="editorData.days"
                            label="Sat"
                            value="6"
                        />
                    </div>
                    <div class="px-2">at</div>
                    <v-select :items="range(0, 23)" v-model="editorData.hours" />
                    <v-select :items="range(0, 59)" v-model="editorData.minutes" />
                </v-card>
            </v-tab-item>

            <v-tab-item :value="4">
                <v-card class="d-inline-flex pa-2 align-center" outlined tile>
                    <div class="px-2">On the</div>
                    <v-select :items="range(1, 30)" v-model="editorData.day" />
                    <div class="px-2">day of every</div>
                    <v-select
                        :items="range(1, 12)"
                        v-model="editorData.monthInterval"
                    />
                    <div class="px-2">month(s) at</div>
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
export default {
    name: "VueCronEditor",
    mixins: [vueCronEditorMixin],
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
        this.activeTab = this.tabs.find(t => t.key === this.initialTab).id;
    },
    methods: {
        range(from, to) {
            return [...Array(to - from + 1).keys()].map(i => i + from);
        },
        reset(e) {
            const tabKey = this.tabs.find(t => t.id === e).key;
            this.resetToTab(tabKey);
        }
    }
};
</script>

<style>
.inline {
    display: inline-flex;
}
</style>
