<template>
    <v-app>
        <v-container>
            <section>
                <h2>Basic</h2>
                <section>
                    <h3>vue-cron-editor-buefy</h3>
                    <VueCronEditorBuefy
                        v-model="sample1CronExpression"
                    ></VueCronEditorBuefy>
                </section>
                {{ sample1CronExpression }}
            </section>

            <section>
                <h3>Grid editing</h3>
                <v-data-table
                    :headers="headers"
                    :items-per-page="5"
                    :items="expressions"
                >
                    <template #top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title
                                >CRUD expressions sample</v-toolbar-title
                            >
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="800px">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-on="on"
                                        >New Expression</v-btn
                                    >
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline"
                                            >Adding a CRON expression</span
                                        >
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <section>
                                                <h3>vue-cron-editor-buefy</h3>
                                                <VueCronEditorBuefy
                                                    v-model="
                                                        editedItem.expression
                                                    "
                                                ></VueCronEditorBuefy>
                                            </section>
                                            CRON expression:
                                            {{ editedItem.expression }}
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                            >Cancel</v-btn
                                        >
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                            >Save</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template #item.action="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)"
                            >edit</v-icon
                        >
                        <v-icon small @click="deleteItem(item)">delete</v-icon>
                    </template>
                </v-data-table>
            </section>
        </v-container>
    </v-app>
</template>

<script>
import VueCronEditorBuefy from "./buefy/VueCronEditorBuefy.vue";

export default {
    name: "App",
    components: {
        VueCronEditorBuefy
    },
    methods: {
        editItem(item) {
            this.editedIndex = this.expressions.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            const index = this.expressions.indexOf(item);
            confirm("Are you sure you want to delete this item?") &&
                this.expressions.splice(index, 1);
        },
        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedIndex = -1;
                this.editedItem = {};
            }, 300);
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(
                    this.expressions[this.editedIndex],
                    this.editedItem
                );
            } else {
                const newIndex = this.expressions.push(this.editedItem);
                this.expressions[newIndex - 1].id = newIndex;
            }
            this.close();
        }
    },
    data: () => ({
        sample1CronExpression: "4 4 * * 0,2,3,5",
        headers: [
            { text: "Id", value: "id" },
            { text: "Expression", value: "expression" },
            { text: "Actions", value: "action", sortable: false }
        ],
        expressions: [{ expression: "4 4 * * 0,2,3,5", id: 0 }],
        editedItem: {},
        dialog: false,
        editedIndex: -1
    })
};
</script>
