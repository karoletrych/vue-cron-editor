<template>
    <v-text-field
        v-model="innerValue"
        type="number"
        :rules="[numberRule]"
        class="px2"
    ></v-text-field>
</template>

<script>
export default {
    inject: ["i18n"],
    name: "NumberInput",
    props: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 999999 },
        value: { type: Number }
    },
    methods: {
        numberRule(v) {
            if (v == null) return true;

            if (!isNaN(parseInt(v)) && v >= this.min && v <= this.max) {
                return true;
            }
            return `${this.i18n.hasToBeBetween} ${this.min} ${this.i18n.and} ${this.max}`;
        }
    },
    data() {
        return {
            innerValue: null
        };
    },
    watch: {
        innerValue() {
            if (this.numberRule(this.innerValue) === true) {
                this.$emit("input", parseInt(this.innerValue));
            }
        }
    },
    mounted() {
        this.innerValue = this.value;
    }
};
</script>
