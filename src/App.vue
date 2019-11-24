<template>
    <v-app>
        <VueCronEditor v-model="cronExpression"></VueCronEditor>
        <v-text-field v-model="cronExpression" />
    </v-app>
</template>

<script>
import VueCronEditor from "./components/VueCronEditor";

export default {
    name: "App",
    components: {
        VueCronEditor
    },
    mounted() {},
    data: () => ({
        cronExpression: "4 4 * * 0,2,3,5"
    })
};
</script>
