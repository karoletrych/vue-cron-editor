<script>
export default {
    name: "AbstractSelect",
    inject:["selectImplementation"],
    props:{
        items: Array
    },
    render(){
        return this.selectImplementation({
            items: this.items,
            onChange: (event) => this.$emit("change", event),
            inputEvents: {
                input: (e) => { 
                    this.$emit("input", e);
                },
            }
        });
    }
}
</script>