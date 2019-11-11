<script>
export default {
    name: "AbstractCheckbox",
    inject:["checkboxImplementation"],
    props:{
        value: Array,
        label: String
    },
    render(){
        return this.checkboxImplementation({
            value: this.value,
            label: this.label,
            inputEvents: {
                change: (e) => { 
                    this.$emit("input", e);
                }
            }
        });
    }
}
</script>