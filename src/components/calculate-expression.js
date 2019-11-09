export const calculateExpression = (event) => {
    if(event.type === "minutes")
    {
        return event.minutes;
    }
    else if (event.type === "hourly")
    {
        return event.hourly;
    }
    else if (event.type === "daily")
    {
        return event.daily;
    }
}