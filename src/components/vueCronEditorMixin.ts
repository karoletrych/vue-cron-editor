import {calculateExpression} from './calculateExpression';

export default {
    data() {
        return {
            innerValue: null,
            minutes:{
                minutes: null
            },
            hourly: {
                minutes: null,
                hours: null
            },
            daily: {
                minutes: null,
                hours: null,
                dayInterval: null
            },
            weekly: {
                minutes: null,
                hours: null,
                days: []
            },
            monthly:{
                hours: null,
                minutes: null,
                dayInterval: null,
                monthInterval: null
            }
        };
    },
    methods:{
        _updateCronExpr(event, type){
            const cronExpr = calculateExpression({...event, type: type});
            this.innerValue = cronExpr;
            this.$emit("input", cronExpr);
        }
    },
    watch: {
        minutes:{
            deep: true,
            handler(e){
                this._updateCronExpr(e, "minutes");
            }
        },
        hourly:{
            deep: true,
            handler(e){
                this._updateCronExpr(e, "hourly");
            }
        },
        daily:{
            deep: true,
            handler(e){
                this._updateCronExpr(e, "daily");
            }
        },
        weekly:{
            deep: true,
            handler(e){
                this._updateCronExpr(e, "weekly");
            }
        },
        monthly:{
            deep: true,
            handler(e){
                this._updateCronExpr(e, "monthly");
            }
        }
    }
}