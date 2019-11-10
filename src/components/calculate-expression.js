export const calculateExpression = (event) => {
    if(event.type === "minutes")
    {
        return `0/${event.minutes} * 1/1 * ?`;
    }
    else if (event.type === "hourly")
    {
        return `${event.hours} 0/${event.minutes} 1/1 * ?`;
    }
    else if (event.type === "daily")
    {
        return `${event.minutes} ${event.hours} 1/${dayInterval} * ?`
    }
}

export const tabFromExpression = (expression) => {

}