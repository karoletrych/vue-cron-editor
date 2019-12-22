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
    name: "NumberInput",
    props: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 999999 },
        value: { type: Number }
    },
    data() {
        return {
            innerValue: null,
            numberRule: v  => {
                if (!v.trim()) return true;

                if (!isNaN(parseFloat(v)) && v >= this.min && v <= this.max) {
                    return true;
                }
                return `Has to be between ${this.min} and ${this.max}`;
            }
        };
                    
    },
    watch:{
        innerValue(){
            debugger;
        }
    },
    mounted() {
        this.innerValue = this.value;
    },
};
</script>