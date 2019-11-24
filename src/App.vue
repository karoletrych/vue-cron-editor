<template>
    <v-app>
        <SimpleVueCronEditor v-model="cronExpression"></SimpleVueCronEditor>
        <v-text-field v-model="cronExpression" />
    </v-app>
</template>

<script>
import SimpleVueCronEditor from "./components/SimpleVueCronEditor";

export default {
    name: "App",
    components: {
        SimpleVueCronEditor
    },
    mounted() {},
    data: () => ({
        cronExpression: "4 4 * * 0,2,3,5"
    })
};
</script>
